import { FC, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

export interface TabItem {
    value: string;
    content: ReactNode;
}

interface TabsProps {
    className?: string;
    tabs: TabItem[];
    value: string;
    onTabClick: (tab: TabItem) => void;
}
export const Tabs: FC<TabsProps> = memo(
    ({
        className, onTabClick, tabs, value,
    }) => {
        const clickHandle = (tab: TabItem) => () => {
            onTabClick(tab);
        };

        return (
            <div className={classNames(cls.Tabs, {}, [className])}>
                {tabs.map((tab) => (
                    <Card
                        onClick={clickHandle(tab)}
                        theme={
                            value === tab.value
                                ? CardTheme.NORMAL
                                : CardTheme.OUTLINE
                        }
                        key={tab.value}
                        className={cls.tab}
                    >
                        {tab.content}
                    </Card>
                ))}
            </div>
        );
    },
);
