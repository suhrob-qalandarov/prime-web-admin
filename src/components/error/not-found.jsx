import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                {/* 404 Number */}
                <h1 className="text-9xl font-black text-slate-900 mb-4 tracking-tighter">404</h1>

                {/* Message */}
                <p className="text-2xl font-bold text-slate-700 mb-8">Sahifa topilmadi</p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => navigate("/")}
                        className="flex items-center justify-center gap-2 px-8 py-3 hover: text-black rounded-lg transition-all duration-300"
                    >
                        Bosh sahifa
                    </button>
                </div>
            </div>
        </div>
    )
}

export default NotFound
