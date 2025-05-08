import {useMemo} from "react"
import { useImmer } from "use-immer"

type Operator = '+' | '-' | '*' | '/';
interface CalculatorRow{
    id: string;
    value: string;
    operator: Operator;
}
const App = () => {
    // const [inputValue, setInputValue] = useState<string>('');
    // const [selectedOperator, setSelectedOperator] = useState<Operator>('+');
    const initialRow: CalculatorRow = {
        id: crypto.randomUUID(),
        value: '',
        operator: '+',
    };
    
    const [rows, setRows] = useImmer<CalculatorRow[]>([initialRow]);   // Başlangıç değeri olarak initialROW[]

    const addRow = () => {
        setRows (draft => {
            draft.push({
                id: crypto.randomUUID(),
                value: '',
                operator: '+',
            })
        })
    };

    const deleteRow = (idToDelete: string) => {
        setRows (draft => {
            const rowIndex = draft.findIndex(row=>row.id === idToDelete);
            if (rowIndex !== -1) {
                draft.splice(rowIndex, 1);
            }
        });
    };

    const clearAllRows = () => {
        setRows(draft=> {
            draft.length = 0;
            draft.push(initialRow);
        });
    };

    // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     setInputValue(e.target.value);
    // };
    const handleInputChange = (id: string, newValue: string) => {
        setRows (draft => {
            const rowToUpdate = draft.find(row => row.id === id);
            if (rowToUpdate) {
                rowToUpdate.value = newValue;
            }
        })
    }

    // const handleOperatorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     handleOperatorChange(e.target.value as Operator);
    // };
    const handleOperatorChange = (id: string, newOperator: Operator) => {
        setRows (draft => {
            const rowToUpdate = draft.find(row => row.id === id);
            if (rowToUpdate) {
                rowToUpdate.operator = newOperator;
            }
        })
    }
    const calculatedResult = useMemo(() => {
        if (rows.length === 0) {
            return 0;
        }

    let currentResult = parseFloat(rows[0].value) || 0;

    if (rows.length> 1) {
        for (let i = 0; i < rows.length -1; i++) {
            const currentOperator = rows[i].operator;
            const nextValue = parseFloat(rows[i + 1].value) || 0; 

            switch (currentOperator) {
                case "+":
                    currentResult += nextValue;
                    break;
                case "-":
                    currentResult -= nextValue;
                    break;
                case "*":
                    currentResult *= nextValue;
                    break;
                case "/":
                    if (nextValue === 0) {
                        return "Hata: 0'a bölme";
                    }
                    currentResult /= nextValue;
                    break;
            }
        }
    }

        return currentResult;
    }, [rows]);

    const calculationDisplay = useMemo(() => {
        if (rows.length === 0) {
            return "0";
        }

        const displayParts: string[] = [];
        const firstValue = rows[0].value.trim();
        displayParts.push(firstValue === '' ? '0' : firstValue);

        for (let i = 1; i < rows.length; i++) {
            displayParts.push(rows[i-1].operator);  // bir önceki satırın operatörünü almalı
            const currentValue = rows[i].value.trim();   
            displayParts.push(currentValue === '' ? '0' : currentValue);
        }

        return displayParts.join(' ');
    }, [rows]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-10">
            <div className="p-6 bg-white shadow-md rounded-lg w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center"> ∞ Hesap Makinesi </h1>

                <div className="space-y-4 mb-4">
                    {rows.map((row) => (
                    <div key={row.id} className="flex items-center space-x-2">
                        <input
                            type="number"
                            value={row.value}
                            onChange={(e) => handleInputChange(row.id, e.target.value)} // value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Sayı girin"
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 flex-grow"
                        />
                        <select
                            value={row.operator}
                            onChange={(e) => handleOperatorChange(row.id, e.target.value as Operator)} // value={selectedOperator} onChange={(e) => setSelectedOperator(e.target.value as Operator)}
                            className="p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="+">+</option>
                            <option value="-">-</option>
                            <option value="*">*</option>
                            <option value="/">/</option>
                        </select>
                        <button
                            onClick={() => deleteRow(row.id)}
                            className="px-3 py-2 bg-red-500 text-white font-semibold rounded-md shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                        >
                            Sil
                        </button>
                    </div>
                    ))}
                </div>
                <div className="flex space-x-2 mb-4">
                    <button 
                        onClick={addRow}
                        className="w-full mb-4 px-4 py-2 bg-green-500 text-white font-semibold rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
                    > 
                        Yeni Satır Ekle
                    </button>
                    <button
                        onClick={clearAllRows}
                        className="w-full mb-4 px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50"
                    >
                        Hepsini Temizle
                    </button>
                </div>
                <div className="mb-0.5 p-3 bg-gray-200 rounded-md text-right text-2xl font-mono h-14 flex items-center justify-end overflow-x-auto whitespace-nowrap">
                    <span>{calculationDisplay}</span>
                </div>
                <p className="text-xs italic text-gray-500 text-right mb-3">
                    *Hesaplamalar giriş sırasına göre yapılır, işlem önceliği uygulanmaz.
                </p>
                <div className="mt-3 pt-2 border-t border-gray-300">
                    <p className="text-xl font-semibold text-gray-700">
                        Sonuç: <span className="text-indigo-600">{calculatedResult}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export { App }