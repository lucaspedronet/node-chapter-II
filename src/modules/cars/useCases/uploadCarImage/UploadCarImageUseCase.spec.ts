import { UploadCarsImagesUseCase } from './UploadCarsImagesUseCase';

let uploadCarImageUseCase: UploadCarsImagesUseCase;
describe('Upload multiple images to a car', () => {
  beforeEach(() => {
    uploadCarImageUseCase = new UploadCarsImagesUseCase();
  });

  it('Must allow Upload multiple Images a to Car', async () => {
    await uploadCarImageUseCase.execute();
  });
});
