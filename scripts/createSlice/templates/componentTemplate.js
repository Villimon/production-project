const interfaceConst = 'interface';

module.exports = (componentName) => {
    return `import { FC, memo } from "react"
    import { classNames } from "shared/lib/classNames/classNames"
    import cls from "./${componentName}.module.scss"
    import { useTranslation } from 'react-i18next'

    ${interfaceConst} ${componentName}Props {
          className?: string;
    }

    export const ${componentName}: FC<${componentName}Props> = memo(({className}) => {
        const { t } = useTranslation() 


        return (
            <div className={classNames(cls.${componentName}, {}, [className])}>
                
            </div>
          );
    });`;
};
