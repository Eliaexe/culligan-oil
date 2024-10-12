import React, { createContext, useContext, useState, useEffect } from 'react';

interface Product {
    id: number;
    name: string;
    price: number;
    description?: string;
}

interface Order {
    id: number;
    total: number;
}

interface Customer {
    id: number;
    name: string;
    email: string;
}

interface DashboardData {
    products: Product[];
    orders: Order[];
    customers: Customer[];
    sales: number;
    settings: {
        storeName: string;
        currency: string;
    };
}

interface DashboardContextType {
    data: DashboardData;
    loading: boolean;
    activeSection: string;
    setActiveSection: (section: string) => void;
    updateSettings: (newSettings: Partial<DashboardData['settings']>) => void;
    addProduct: (product: Omit<Product, 'id'>) => void;
    updateProduct: (id: number, updates: Partial<Product>) => void;
    deleteProduct: (id: number) => void;
}

const AdminDashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const AdminDashboardProvider: React.FC = ({ children }: { children:React.ReactNode}) => {
    const [data, setData] = useState<DashboardData>({
        products: [],
        orders: [],
        customers: [],
        sales: 0,
        settings: {
            storeName: '',
            currency: 'USD',
        },
    });
    const [loading, setLoading] = useState(true);
    const [activeSection, setActiveSection] = useState('overview');

    useEffect(() => {
        // Simula il caricamento dei dati
        const fetchData = async () => {
            // In un'app reale, qui faresti delle chiamate API
            const mockData = {
                products: [{ id: 1, name: 'Product 1', price: 10, description: 'A sample product' }],
                orders: [{ id: 1, total: 10 }],
                customers: [{ id: 1, name: 'Customer 1', email: 'customer1@example.com' }],
                sales: 1000,
                settings: {
                    storeName: 'My Store',
                    currency: 'USD',
                },
            };

            setData(mockData);
            setLoading(false);
        };

        fetchData();
    }, []);

    const updateSettings = (newSettings: Partial<DashboardData['settings']>) => {
        setData(prevData => ({
            ...prevData,
            settings: {
                ...prevData.settings,
                ...newSettings,
            },
        }));
    };

    const addProduct = (product: Omit<Product, 'id'>) => {
        setData(prevData => ({
            ...prevData,
            products: [...prevData.products, { ...product, id: Date.now() }],
        }));
    };

    const updateProduct = (id: number, updates: Partial<Product>) => {
        setData(prevData => ({
            ...prevData,
            products: prevData.products.map(product =>
                product.id === id ? { ...product, ...updates } : product
            ),
        }));
    };

    const deleteProduct = (id: number) => {
        setData(prevData => ({
            ...prevData,
            products: prevData.products.filter(product => product.id !== id),
        }));
    };

    return (
        <AdminDashboardContext.Provider
            value={{
                data,
                loading,
                activeSection,
                setActiveSection,
                updateSettings,
                addProduct,
                updateProduct,
                deleteProduct
            }}
        >
            {children}
        </AdminDashboardContext.Provider>
    );
};

export const useAdminDashboard = () => {
    const context = useContext(AdminDashboardContext);
    if (context === undefined) {
        throw new Error('useAdminDashboard must be used within an AdminDashboardProvider');
    }
    return context;
};