import React from 'react';
import { Dropzone } from '@alfalab/core-components-dropzone';
import { Wrapper } from './Wrapper';

const DropzoneExample = () => {
    const [filesList, setFilesList] = React.useState<string[]>([]);

    const handleDrop = (files: FileList) => {
        setFilesList(
            Array.from(files)
                .map(file => file.name)
                .filter(Boolean),
        );
    };

    return (
        <Wrapper>
            <Dropzone error={false} overlayVisible={false} onDrop={handleDrop}>
                <div
                    style={{
                        width: 400,
                        height: 200,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {filesList.length > 0 ? (
                        <ul>
                            {filesList.map(file => (
                                <li key={file}>{file}</li>
                            ))}
                        </ul>
                    ) : (
                        <span>children</span>
                    )}
                </div>
            </Dropzone>
        </Wrapper>
    );
};

export default DropzoneExample;
