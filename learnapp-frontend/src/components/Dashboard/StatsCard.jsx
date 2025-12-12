import {
    TrendingUp,
    TrendingDown
} from 'lucide-react';

const StatsCard = ({ title, value, change, icon: Icon, color }) => {

    return (
        <div className="card border-0 hover-shadow">
            <div className="card-body p-4">
                <div className="d-flex justify-content-between align-items-center">
                    <div>
                        <h6 className="text-muted mb-2 text-uppercase small fw-bold">{title}</h6>
                        <h2 className="mb-0 fw-bold text-dark">{value}</h2>
                        <div className="d-flex align-items-center mt-2">
                            {change >= 0 ? (
                                <TrendingUp size={16} className="text-success me-1" />
                            ) : (
                                <TrendingDown size={16} className="text-danger me-1" />
                            )}
                            <small className={change >= 0 ? 'text-success fw-medium' : 'text-danger fw-medium'}>
                                {change >= 0 ? '+' : ''}{change}% from last month
                            </small>
                        </div>
                    </div>
                    <div className={`rounded-circle p-3 bg-${color}-light`}>
                        <Icon size={24} className={`text-${color}`} />
                    </div>
                </div>
            </div>
        </div>
    );
};

// Default props to prevent errors
StatsCard.defaultProps = {
    change: 0,
    color: 'primary'
};

export default StatsCard;