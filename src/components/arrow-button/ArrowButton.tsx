import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { clsx } from 'clsx';

/** Функция для обработки открытия/закрытия формы */

export type ArrowButton = {
	isOpened: boolean;
	onClick: () => void;
};

export const ArrowButton = ({ isOpened, onClick }: ArrowButton) => {
	// const[isHovered, setIsHovered] = useState(false);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpened && styles.container_open)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpened && styles.arrow_open)}
			/>
		</div>
	);
};
