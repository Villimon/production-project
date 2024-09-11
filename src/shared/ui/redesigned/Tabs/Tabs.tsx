import { FC, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '../Card/Card';
import cls from './Tabs.module.scss';
import { Flex, FlexDirection } from '../Stack/Flex/Flex';

export interface TabItem {
    value: string
    content: ReactNode
}

interface TabsProps {
    className?: string
    tabs: TabItem[]
    value: string
    onTabClick: (tab: TabItem) => void
    direction?: FlexDirection
}

export const Tabs: FC<TabsProps> = memo(
    ({
        className, onTabClick, tabs, value, direction = 'row',
    }) => {
        const clickHandle = (tab: TabItem) => () => {
            onTabClick(tab);
        };

        return (
            <Flex
                gap="8"
                align="start"
                direction={direction}
                className={classNames(cls.Tabs, {}, [className])}
            >
                {tabs.map((tab) => (
                    <Card
                        border="round"
                        onClick={clickHandle(tab)}
                        variant={value === tab.value ? 'light' : 'normal'}
                        key={tab.value}
                        className={cls.tab}
                    >
                        {tab.content}
                    </Card>
                ))}
            </Flex>
        );
    },
);
