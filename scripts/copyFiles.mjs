/* eslint-disable no-console */
import path from 'path';
import fse from 'fs-extra';

const packagePath = process.cwd();
const buildPath = path.join(packagePath, './dist');


export async function copyPackageFile() {
    const packageData = await fse.readFile(path.resolve(packagePath, './package.json'), 'utf8');
    const { tsup, scripts, publishConfig, devDependencies, ...packageDataOther } =
        JSON.parse(packageData);

    const entryPoints = {
        "main": "./index.js",
        "module": "./index.mjs",
        "types": "./index.d.ts"
    }

    const newPackageData = {
        ...packageDataOther,
        ...entryPoints
    };

    const targetPath = path.resolve(buildPath, './package.json');
    await fse.writeFile(targetPath, JSON.stringify(newPackageData, null, 2), 'utf8');
    return newPackageData;
}


export async function copyReadme() {
    const sourcePath = path.resolve(packagePath, './readme.md');
    const targetPath = path.resolve(buildPath, './readme.md');

    fse.copyFile(sourcePath, targetPath)
}

export default async function copyFiles() {
    await copyPackageFile()
    await copyReadme()
}

await copyFiles()

