import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	onChange: (newValue: boolean) => void;
	onClose?: () => void;
	rootRef: React.RefObject<HTMLDivElement>;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onClose,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		 if(!isOpen) {
			const handleClick = (event: MouseEvent) => {
				const { target } = event;
				if (target instanceof Node && !rootRef.current?.contains(target)) {
					isOpen && onClose?.();
					onChange?.(false);
				}
			};

			window.addEventListener('mousedown', handleClick);
            console.log('+');
			return () => {
				window.removeEventListener('mousedown', handleClick);
				console.log('-')
			};
		 }
	}, [onClose, onChange, isOpen]);
};
