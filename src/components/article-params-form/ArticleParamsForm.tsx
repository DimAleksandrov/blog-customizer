import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { FormEvent, useRef, useState } from 'react';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	OptionType,
	ArticleStateType,
} from 'src/constants/articleProps';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Separator } from '../separator';
import { Text } from '../text';
import { Select } from '../select';

type ArticleParamsFormsProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (param: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsFormsProps) => {
	const styleForm = {
		overflow: 'hidden',
	};

	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [formState, setFormState] =
		useState<ArticleStateType>(currentArticleState);

	const sidebarRef = useRef<HTMLDivElement>(null);

	useOutsideClickClose({
		isOpen,
		rootRef: sidebarRef,
		onChange: setIsOpen,
		onClose: () => console.log('Sidebar closed'),
	});

	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState(formState);
	};

	const handleReset = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCurrentArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	const handleChange = (key: keyof ArticleStateType, value: OptionType) => {
		setFormState({ ...formState, [key]: value });
	};

	return (
		<>
			<ArrowButton isOpened={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				style={styleForm}
				ref={sidebarRef}
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					onSubmit={handleSubmit}
					onReset={handleReset}
					className={styles.form}
					style={{ overflow: 'none' }}>
					<Text family={'open-sans'} uppercase={true} weight={800} size={31}>
						Задайте параметры
					</Text>

					<Select
						title='Шрифт'
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>

					<RadioGroup
						title='Размер шрифта'
						name='fontSizeOption'
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>

					<Select
						title='Цвет шрифта'
						selected={formState.fontColor}
						options={fontColors}
						onChange={(option) => handleChange('fontColor', option)}
					/>

					<Separator />

					<Select
						title='Цвет фона'
						selected={formState.backgroundColor}
						options={backgroundColors}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>

					<Select
						title='Ширина контента'
						selected={formState.contentWidth}
						options={contentWidthArr}
						onChange={(option) => handleChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
