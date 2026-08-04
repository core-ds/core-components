/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { act, fireEvent, render, RenderResult, waitFor } from '@testing-library/react';
import { Gallery, TestIds } from '.';

const mockMatchMedia = (matches: boolean, query: string) => {
    window.matchMedia = jest.fn().mockImplementation((q) => {
        return {
            matches: q === query ? matches : !matches,
            media: q,
            onchange: null,
            addListener: jest.fn(), // Deprecated
            removeListener: jest.fn(), // Deprecated
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        };
    });
};

const images = [
    {
        name: 'Горизонтальное изображение.jpg',
        src: 'https://unsplash.com/photos/ywiAen4L4qA/download?force=true',
    },
    {
        name: 'Вертикальное изображение.jpg',
        src: 'https://unsplash.com/photos/J3WbMATCz8I/download?force=true',
    },
    {
        name: 'Маленькое изображение.jpg',
        src: 'https://picsum.photos/100/100',
    },
    {
        name: 'Битое изображение.jpg',
        src: 'https://picsum.photos',
    },
];

const getImageIndex = (src: string): number => images.findIndex((image) => image.src === src);

const GalleryWrapper = () => {
    const [open, setOpen] = useState(true);

    return <Gallery open={open} images={images} onClose={() => setOpen(false)} />;
};

const waitForActiveImage = async (getByTestId: RenderResult['getByTestId'], imageIndex: number) => {
    await waitFor(() => {
        const activeImage = getByTestId(TestIds.ACTIVE_IMAGE);
        const activeImageSrc = activeImage.getAttribute('src') || '';

        return expect(getImageIndex(activeImageSrc)).toBe(imageIndex);
    });
};

const waitForFullscreen = async (baseElement: HTMLElement) => {
    await waitFor(() => {
        const swiper = baseElement.querySelector('.swiper');

        return expect(swiper).toHaveClass('hidden');
    });
};

const waitForExitFullscreen = async (baseElement: HTMLElement) => {
    await waitFor(() => {
        const swiper = baseElement.querySelector('.swiper');

        return expect(swiper).not.toHaveClass('hidden');
    });
};

describe('Gallery desktop', () => {
    mockMatchMedia(true, '(min-width: 1024px)');

    describe('Switch images tests', () => {
        it('should show next image, if clicked on button next', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const nextSildeButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);
            const activeImage = getByTestId(TestIds.ACTIVE_IMAGE);
            const activeImageSrc = activeImage.getAttribute('src') || '';

            expect(getImageIndex(activeImageSrc)).toBe(0);

            fireEvent.click(nextSildeButton);

            await waitForActiveImage(getByTestId, 1);

            fireEvent.click(nextSildeButton);

            await waitForActiveImage(getByTestId, 2);
        });

        // broken in swiper@12
        xit('should show prev image, if clicked on button prev', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} initialSlide={2} />,
            );

            const prevSildeButton = getByTestId(TestIds.PREV_SLIDE_BUTTON);
            const activeImage = getByTestId(TestIds.ACTIVE_IMAGE);
            const activeImageSrc = activeImage.getAttribute('src') || '';

            expect(getImageIndex(activeImageSrc)).toBe(2);

            fireEvent.click(prevSildeButton);

            await waitForActiveImage(getByTestId, 1);

            fireEvent.click(prevSildeButton);

            await waitForActiveImage(getByTestId, 0);
        });

        it('should loop slides by default', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} initialSlide={0} />,
            );

            const nextSildeButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);

            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);

            await waitForActiveImage(getByTestId, 0);
        });

        it('should dont loop slides, if pass loop=false', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} loop={false} />,
            );

            const nextSildeButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);

            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);
            fireEvent.click(nextSildeButton);

            await waitForActiveImage(getByTestId, 3);
        });

        it('should switch image, if press left/right arrow key', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            fireEvent.keyDown(window.document, { key: 'ArrowRight', code: 'ArrowRight' });

            await waitForActiveImage(getByTestId, 1);

            fireEvent.keyDown(window.document, { key: 'ArrowLeft', code: 'ArrowLeft' });

            await waitForActiveImage(getByTestId, 0);
        });

        it('should request next page at the edge and show its first image', async () => {
            const nextPage = [images[1], images[2]];

            const PaginatedGallery = () => {
                const [page, setPage] = useState([images[0]]);

                return (
                    <Gallery
                        open={true}
                        images={page}
                        onClose={() => null}
                        paginationConfig={{
                            onEdgeReached: async (direction) => {
                                if (direction === 'next') {
                                    setPage(nextPage);
                                }
                            },
                        }}
                    />
                );
            };

            const { getByTestId } = render(<PaginatedGallery />);

            fireEvent.click(getByTestId(TestIds.NEXT_SLIDE_BUTTON));

            await waitFor(() => {
                expect(getByTestId(TestIds.ACTIVE_IMAGE)).toHaveAttribute('src', nextPage[0].src);
            });
        });

        it('should request prev page at the edge and show its last image', async () => {
            const prevPage = [images[0], images[1]];

            const PaginatedGallery = () => {
                const [page, setPage] = useState([images[2]]);

                return (
                    <Gallery
                        open={true}
                        images={page}
                        onClose={() => null}
                        paginationConfig={{
                            onEdgeReached: async (direction) => {
                                if (direction === 'prev') {
                                    setPage(prevPage);
                                }
                            },
                        }}
                    />
                );
            };

            const { baseElement, getByTestId } = render(<PaginatedGallery />);

            fireEvent.click(getByTestId(TestIds.PREV_SLIDE_BUTTON));

            await waitFor(() => {
                expect(getByTestId(TestIds.ACTIVE_IMAGE)).toHaveAttribute(
                    'src',
                    prevPage[prevPage.length - 1].src,
                );
                expect(baseElement.querySelector('.swiper-slide-active img')).toHaveAttribute(
                    'src',
                    prevPage[prevPage.length - 1].src,
                );
            });
        });

        it('should keep a single video page active after pagination', async () => {
            const playSpy = jest
                .spyOn(HTMLMediaElement.prototype, 'play')
                .mockResolvedValue(undefined);
            const pauseSpy = jest
                .spyOn(HTMLMediaElement.prototype, 'pause')
                .mockImplementation(() => undefined);
            const videoPage = [
                {
                    name: 'Video.m3u8',
                    src: 'https://example.com/video.m3u8',
                },
            ];

            const PaginatedGallery = () => {
                const [page, setPage] = useState(images);

                return (
                    <Gallery
                        open={true}
                        images={page}
                        onClose={() => null}
                        paginationConfig={{
                            onEdgeReached: async (direction) => {
                                if (direction === 'next') {
                                    setPage(videoPage);
                                }
                            },
                        }}
                    />
                );
            };

            const { getByTestId } = render(<PaginatedGallery />);
            const nextSlideButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);

            fireEvent.click(nextSlideButton);
            fireEvent.click(nextSlideButton);
            fireEvent.click(nextSlideButton);

            await waitForActiveImage(getByTestId, images.length - 1);

            fireEvent.click(nextSlideButton);

            await waitFor(() => {
                expect(getByTestId(TestIds.UNMUTE_BUTTON)).toBeInTheDocument();
            });

            playSpy.mockRestore();
            pauseSpy.mockRestore();
        });

        it('should not request another page while the previous request is pending', async () => {
            let resolveRequest: () => void = () => undefined;
            const request = new Promise<void>((resolve) => {
                resolveRequest = resolve;
            });
            const onEdgeReached = jest.fn(() => request);

            const { getByTestId } = render(
                <Gallery
                    open={true}
                    images={[images[0]]}
                    onClose={() => null}
                    paginationConfig={{ onEdgeReached }}
                />,
            );

            const nextSlideButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);

            fireEvent.click(nextSlideButton);
            fireEvent.click(nextSlideButton);

            await waitFor(() => {
                expect(onEdgeReached).toHaveBeenCalledTimes(1);
                expect(onEdgeReached).toHaveBeenCalledWith('next');
            });

            await act(async () => {
                resolveRequest();
                await request;
            });
        });

        it('should allow retrying page request after an error', async () => {
            const onEdgeReached = jest.fn().mockRejectedValue(new Error('Pagination failed'));

            const { getByTestId } = render(
                <Gallery
                    open={true}
                    images={[images[0]]}
                    onClose={() => null}
                    paginationConfig={{ onEdgeReached }}
                />,
            );

            const nextSlideButton = getByTestId(TestIds.NEXT_SLIDE_BUTTON);

            fireEvent.click(nextSlideButton);

            await waitFor(() => {
                expect(onEdgeReached).toHaveBeenCalledTimes(1);
            });

            fireEvent.click(nextSlideButton);

            await waitFor(() => {
                expect(onEdgeReached).toHaveBeenCalledTimes(2);
            });
        });

        it('should show pagination error and retry the failed request', async () => {
            const onEdgeReached = jest
                .fn()
                .mockRejectedValueOnce(new Error('Pagination failed'))
                .mockResolvedValueOnce(undefined);

            const { findByRole, getByRole, getByTestId, queryByTestId } = render(
                <Gallery
                    open={true}
                    images={[images[0], images[1]]}
                    onClose={() => null}
                    paginationConfig={{ onEdgeReached }}
                />,
            );

            expect(getByTestId(TestIds.NAVIGATION_BAR)).toBeInTheDocument();

            fireEvent.click(getByTestId(TestIds.NEXT_SLIDE_BUTTON));
            await waitForActiveImage(getByTestId, 1);
            fireEvent.click(getByTestId(TestIds.NEXT_SLIDE_BUTTON));

            expect(await findByRole('alert', { hidden: true })).toHaveTextContent(
                'Не получилось загрузить',
            );
            expect(queryByTestId(TestIds.NAVIGATION_BAR)).not.toBeInTheDocument();

            fireEvent.click(getByRole('button', { name: 'Попробовать ещё раз', hidden: true }));

            await waitFor(() => {
                expect(onEdgeReached).toHaveBeenCalledTimes(2);
                expect(onEdgeReached).toHaveBeenLastCalledWith('next');
            });
        });

        it('should visually hide edge controls when adjacent pages are unavailable', () => {
            const onEdgeReached = jest.fn();
            const { getByTestId } = render(
                <Gallery
                    open={true}
                    images={[images[0]]}
                    onClose={() => null}
                    paginationConfig={{
                        onEdgeReached,
                        hasPrevPage: false,
                        hasNextPage: false,
                    }}
                />,
            );

            expect(getByTestId(TestIds.PREV_SLIDE_BUTTON)).toHaveClass('arrowHidden');
            expect(getByTestId(TestIds.NEXT_SLIDE_BUTTON)).toHaveClass('arrowHidden');
            expect(getByTestId(TestIds.PREV_SLIDE_BUTTON)).toHaveAttribute('tabindex', '-1');
            expect(getByTestId(TestIds.NEXT_SLIDE_BUTTON)).toHaveAttribute('tabindex', '-1');

            fireEvent.keyDown(window.document, { key: 'ArrowLeft', code: 'ArrowLeft' });
            fireEvent.keyDown(window.document, { key: 'ArrowRight', code: 'ArrowRight' });

            expect(onEdgeReached).not.toHaveBeenCalled();
        });
    });

    describe('Closing tests', () => {
        it('should close if clicked on close button', async () => {
            const { getByTestId, getByRole } = render(<GalleryWrapper />);

            const closeButton = getByTestId(TestIds.CLOSE_BUTTON);
            const modal = getByRole('dialog');

            fireEvent.click(closeButton);

            await waitFor(() => expect(modal).not.toBeInTheDocument());
        });

        it('should close if pressed Escape key', async () => {
            const { getByRole } = render(<GalleryWrapper />);

            const modal = getByRole('dialog');

            fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

            await waitFor(() => expect(modal).not.toBeInTheDocument());
        });
    });

    describe('Fullscreen tests', () => {
        it('should open fullscreen mode', async () => {
            const { getByTestId, baseElement } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const fullscreenButton = getByTestId(TestIds.FULLSCREEN_BUTTON);

            fireEvent.click(fullscreenButton);

            await waitForFullscreen(baseElement);
        });

        it('should close fullscreen mode, if clicked on exit-fullscreen button', async () => {
            const { getByTestId, baseElement } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const fullscreenButton = getByTestId(TestIds.FULLSCREEN_BUTTON);

            fireEvent.click(fullscreenButton);

            await waitForFullscreen(baseElement);

            const exitFullscreenButton = getByTestId(TestIds.EXIT_FULLSCREEN_BUTTON);

            fireEvent.click(exitFullscreenButton);

            await waitForExitFullscreen(baseElement);
        });

        it('should close fullscreen mode, if pressed Escape key', async () => {
            const { getByTestId, baseElement, getByRole } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const fullscreenButton = getByTestId(TestIds.FULLSCREEN_BUTTON);

            fireEvent.click(fullscreenButton);

            await waitForFullscreen(baseElement);

            const modal = getByRole('dialog');

            fireEvent.keyDown(modal, { key: 'Escape', code: 'Escape' });

            await waitForExitFullscreen(baseElement);
        });

        it('should ignore arrows keydown, if open fullscreen', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const fullscreenButton = getByTestId(TestIds.FULLSCREEN_BUTTON);

            fireEvent.click(fullscreenButton);

            fireEvent.keyDown(window.document, { key: 'ArrowRight', code: 'ArrowRight' });

            await waitForActiveImage(getByTestId, 0);
        });
    });

    describe('Header tests', () => {
        // broken in swiper@12
        xit('should display active image name and active index', () => {
            const initialSlide = 1;

            const { baseElement } = render(
                <Gallery
                    open={true}
                    images={images}
                    onClose={() => null}
                    initialSlide={initialSlide}
                />,
            );

            const headerComponent = baseElement.querySelector('.header') as HTMLElement;

            const filenameContainer = headerComponent.querySelector(
                '.filenameContainer',
            ) as HTMLElement;

            expect(filenameContainer.textContent).toBe(images[initialSlide].name);

            const description = headerComponent.querySelector('.description') as HTMLElement;

            expect(description.textContent).toBe(`${initialSlide + 1} из ${images.length}`);
        });

        it('should open tooltip, if hover on buttons', async () => {
            const { getByTestId, getByText } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const fullscreenButton = getByTestId(TestIds.FULLSCREEN_BUTTON);
            const downloadButton = getByTestId(TestIds.DOWNLOAD_BUTTON);

            fireEvent.mouseOver(fullscreenButton);

            await waitFor(
                () => expect(getByText('Открыть в полноэкранном режиме')).toBeInTheDocument(),
                { timeout: 4000 },
            );

            fireEvent.mouseOver(downloadButton);

            await waitFor(() => expect(getByText('Скачать')).toBeInTheDocument(), {
                timeout: 2000,
            });
        });
    });

    describe('Navigation bar tests', () => {
        it('should go to clicked image', async () => {
            const { getByTestId } = render(
                <Gallery open={true} images={images} onClose={() => null} />,
            );

            const navigationBar = getByTestId(TestIds.NAVIGATION_BAR);

            const previewButtons = navigationBar.querySelectorAll('div[role="button"]');

            fireEvent.click(previewButtons[1]);

            await waitForActiveImage(getByTestId, 1);

            fireEvent.click(previewButtons[2]);

            await waitForActiveImage(getByTestId, 2);
        });
    });

    describe('Single image view tests', () => {
        it('should don`t display arrows and navigation bar ', async () => {
            const { queryByTestId } = render(
                <Gallery open={true} images={[images[0]]} onClose={() => null} />,
            );

            expect(queryByTestId(TestIds.NAVIGATION_BAR)).not.toBeInTheDocument();
            expect(queryByTestId(TestIds.PREV_SLIDE_BUTTON)).not.toBeInTheDocument();
            expect(queryByTestId(TestIds.NEXT_SLIDE_BUTTON)).not.toBeInTheDocument();
        });
    });

    it('should unmount without errors', () => {
        const { unmount } = render(<Gallery open={true} images={images} onClose={() => null} />);

        expect(unmount).not.toThrow();
    });
});
