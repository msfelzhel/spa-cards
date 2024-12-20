// src/components/Header/Header.tsx
import React from 'react';
import './styles.css';

interface HeaderProps {
  userLogin: string;
}

export const Header: React.FC<HeaderProps> = ({ userLogin }) => {
  const [currentDateTime, setCurrentDateTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDateTime = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }).format(date).replace(',', '');
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="datetime">
          Текущая дата и время: {formatDateTime(currentDateTime)}
        </div>
        <div className="user-info">
          Логин пользователя: {userLogin}
        </div>
      </div>
    </header>
  );
};