import React from 'react';
import { Panel, PanelHeader, PanelHeaderBack, Placeholder, Button, Spacing } from '@vkontakte/vkui';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import PropTypes from 'prop-types';
import bridge from '@vkontakte/vk-bridge';
import HistoryImage from '../assets/persik.png';

const fetchRandomDogImage = async () => {
    try {
        const response = await fetch('https://api.thedogapi.com/v1/images/search');
        const data = await response.json();

        if (data && data[0] && data[0].url) {
            console.log('URL изображения:', data[0].url);
            return data[0].url;
        } else {
            throw new Error('Ошибка при получении изображения');
        }
    } catch (error) {
        console.error('Ошибка при получении изображения:', error);
        return 'https://via.placeholder.com/720x1280?text=Ошибка+загрузки+картинки';
    }
};

const openVKStoryEditor = async () => {
    try {
        const imageUrl = await fetchRandomDogImage();

        await bridge.send('VKWebAppShowStoryBox', {
            background_type: 'image',
            url: imageUrl,
        });
    } catch (error) {
        console.error('Ошибка при открытии редактора историй:', error);
    }
};

export const History = ({ id }) => {
    const routeNavigator = useRouteNavigator();

    return (
        <Panel id={id}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.back()} />}>
                HISTORY
            </PanelHeader>
            <Placeholder>
                <img width={230} src={HistoryImage} alt="Persik The Cat" />
            </Placeholder>
            <Spacing size={16} />
            <Button stretched size="l" mode="primary" onClick={openVKStoryEditor}>
                Открыть историю
            </Button>
        </Panel>
    );
};

History.propTypes = {
    id: PropTypes.string.isRequired,
};
