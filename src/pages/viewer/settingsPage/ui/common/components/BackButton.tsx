import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { IoMdClose } from 'react-icons/io';

export const BackButton: FunctionComponent = () => {
    const navigate = useNavigate();
    const onPress = (): void => navigate(-1);

    return (
        <Button
            variant="ghost"
            onPress={onPress}
            className="flex items-center gap-1 text-xl"
            isIconOnly
        >
            <IoMdClose />
        </Button>
    );
};
