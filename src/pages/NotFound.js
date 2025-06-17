import { Link } from 'wouter';
import { Cloud, ArrowLeft } from 'lucide-react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <Card className="bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl shadow-xl p-8 text-center max-w-md w-full">
        <div className="pt-6">
          <div className="bg-gradient-to-br from-gray-400 to-slate-500 p-4 rounded-2xl shadow-lg w-fit mx-auto mb-6">
            <Cloud className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-slate-800 mb-3">404 - Page Not Found</h1>
          <p className="text-slate-600 text-lg mb-6">
            The weather forecast for this page seems to be missing!
          </p>
          <Link href="/">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Weather
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}