---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAQBLTA4%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6HQniPTdjKoZLcBMS3Fk5m4h0i9hrDwAoOM5aF9PYHQIhAJ9N6sf82xlBL5Rx%2BThSdxqVIjv75TIv6Dfx%2FHhvf83HKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzeWHF%2FMcOBe3UKH7oq3APnFe5LihyOoXFTp8FFd%2FNQ0rQprSw%2BHy9QTqOBXCZSJSD32s%2FVsvkziwg4EXi8Ax%2F%2BDD1FKe1nJUYCKiV9WItLB%2BYkEGXUER5gU22cjahoJ63qkeYRoEE%2Fn%2FpOFRVFSgk%2FQelEZbVFwAg9Ta6A0Yd41bljKygO9U3DaMHcBOjv4YN60ovw4%2BQCK6v7eaA32SqbHj2meK%2B%2BvSv%2F3VNswK11OX%2FdnxSZbjRQz%2FX2SLpbfTyw7p5oOsVp5eDkaTQAWeqmzWw8msYZl2USOzyJYyOrx3zv4YsnQhR8oiXan8FMNnF64sZRCp2xGeiBJTOdv3yRng6U0PbgV3FvvGPBagbnXibOuHEeN30utPY5gFDO3RUg%2FrNOkzCXYwFozzp4SZhW3KBQqc6H9js5VGDlQa8mjkN0eV73A3Ii%2FXlDMG588cp2g5yxhvo1Rggau776K0LKq1roT4Zf1VTXFg8dMMWqniAvdvJYG3OGSC0kd6x%2F0YgQwS8yWa2cm%2F8KUkWES7s6qJ4X9SjKm4zQVgW3I81H93b988oJRst4EbKFcIup13m%2B35UVnvUqv3R04vat8qV6gF99EbJKssKBNZwPdQEI79EWKIdwSNN5mVAsCGUaG03l4b9PSs7ydU%2FKWDDXgpHOBjqkAb3tMwTjBsKYss%2BnYehsMdcSv%2FVjXmmp873kCQIPU1fzKZXbODPuTRCeXFQii7PGCZD4vRKwff4LV94tOxq7K4WNDbvD0LaBfetUH3gIykzAj2S086jcydAfjXT0hJ%2FtAc%2Bo%2F6SeM6Ttch8snqY5c4c1nB2PfRjIbpmB%2F4%2BhTK9A6ntrrYhJPR0OScPZ4F4NMeBCWBGGUxdk251%2BYZFAxy3E1%2F%2BC&X-Amz-Signature=330d9063eb14f6f40cb1d6dbbdfef4a35528fa44bab111da096e859d4d4a8aef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VAQBLTA4%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6HQniPTdjKoZLcBMS3Fk5m4h0i9hrDwAoOM5aF9PYHQIhAJ9N6sf82xlBL5Rx%2BThSdxqVIjv75TIv6Dfx%2FHhvf83HKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzeWHF%2FMcOBe3UKH7oq3APnFe5LihyOoXFTp8FFd%2FNQ0rQprSw%2BHy9QTqOBXCZSJSD32s%2FVsvkziwg4EXi8Ax%2F%2BDD1FKe1nJUYCKiV9WItLB%2BYkEGXUER5gU22cjahoJ63qkeYRoEE%2Fn%2FpOFRVFSgk%2FQelEZbVFwAg9Ta6A0Yd41bljKygO9U3DaMHcBOjv4YN60ovw4%2BQCK6v7eaA32SqbHj2meK%2B%2BvSv%2F3VNswK11OX%2FdnxSZbjRQz%2FX2SLpbfTyw7p5oOsVp5eDkaTQAWeqmzWw8msYZl2USOzyJYyOrx3zv4YsnQhR8oiXan8FMNnF64sZRCp2xGeiBJTOdv3yRng6U0PbgV3FvvGPBagbnXibOuHEeN30utPY5gFDO3RUg%2FrNOkzCXYwFozzp4SZhW3KBQqc6H9js5VGDlQa8mjkN0eV73A3Ii%2FXlDMG588cp2g5yxhvo1Rggau776K0LKq1roT4Zf1VTXFg8dMMWqniAvdvJYG3OGSC0kd6x%2F0YgQwS8yWa2cm%2F8KUkWES7s6qJ4X9SjKm4zQVgW3I81H93b988oJRst4EbKFcIup13m%2B35UVnvUqv3R04vat8qV6gF99EbJKssKBNZwPdQEI79EWKIdwSNN5mVAsCGUaG03l4b9PSs7ydU%2FKWDDXgpHOBjqkAb3tMwTjBsKYss%2BnYehsMdcSv%2FVjXmmp873kCQIPU1fzKZXbODPuTRCeXFQii7PGCZD4vRKwff4LV94tOxq7K4WNDbvD0LaBfetUH3gIykzAj2S086jcydAfjXT0hJ%2FtAc%2Bo%2F6SeM6Ttch8snqY5c4c1nB2PfRjIbpmB%2F4%2BhTK9A6ntrrYhJPR0OScPZ4F4NMeBCWBGGUxdk251%2BYZFAxy3E1%2F%2BC&X-Amz-Signature=330d9063eb14f6f40cb1d6dbbdfef4a35528fa44bab111da096e859d4d4a8aef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YG6KFWJ6%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAzV%2BY25zdObE7wiYGJa8Rj23OHcN0b0mPgbMVH4a0PQAiEA45XXmKQ5ySixiO1pd5ts2Ptzwx4iYbgx8p7TE8nSmpQqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEOTyjosgVO71nXW7SrcA45k6WC1a5zS4fFsK0D7E%2F1v0T6mz4TCP1GD82c09tsjUg0DHrkgXBeJR9twnS%2FpWp%2BpOECDDExqBKJvTjMtHtHcz%2BjlnFTJNicNhW%2BrMfkZXre60iWoBramWUbxATJ3lpjguY9QQbTi%2F5qYzRaXHezhd%2FeM2FcdX413TPp%2ByKnbkFCNdMDR5TI1tmlO7OTZB5Y%2BrHswjnqNsg4yB88tkhbJvjp5Uilc13d9XemNrqYtNwHCvdZ39Dba%2FxYC7EY2zIU03iNNoRLAD96I4FEj7BcIvYggTsc6XXjkEqwRYxmLH%2BbhTjLCqFY65OeSivXesM%2FjLW5hsuLCaw6tIS4C3G9bs3FsI%2BT%2FPQfZxy0Xcz%2Fsn8gVhCkfSq1Wt3%2FMfu3jUNGy1WrvdsdwwMA87GblmxwS3I8JFVzinE83CMINftyzKhlG6es0nLV2XQpXvH8b4OsCqdsuoIhUC8D4ij%2BPV5MdijRhOFcgrOX8jxhOgZa8llO7UziNmM8NdYpbp0%2Bn2GaEIHrBT%2FbsvBVjELlBIqNhuq1MEIS1EZsPlRxM%2FPq6esvHS8vJKfraGsyEyz%2FVTIxEIveeySqA03X5nHGqCSFtBWCo6711Phv%2B0qZ6v7q61%2FHWCtfG0Hvk%2FjOWMK2Akc4GOqUB3nwhrA%2Bk6EWUed4edQuEzsrDpixQQx37nMIz0cVPxhVKEPsUKaDEP6pJtIYrHEef6i4vm91Hbs%2Bo0adZ1l9lkM0IZuJmAR%2Bkor1o6VnpZix9T0eZsiYO3nG9uRw22SpWX5skL8%2FRMhIIPR3lh7spkEynTlgvLLcu3c1ZIK3QBPXMLjtwlYNNgMmP6QKPQe6SSPivHUzO2OuLgj0T537y5UTPp7ck&X-Amz-Signature=21a135793687500ec92a3d08fcbac4814bfee0dfe2fc6334743007f266774f2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZGYVLXK%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDV241qAZ9MQuyPyd%2B%2For6xQStGUYb6wYL6EgCfP%2Bco9wIgf5N8ltZxXmYvRjPUv7e1Ct0HlMuKSO%2BKgdSNUQGWipwqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPiMC6FHq15fgQuSJSrcA%2F6dyTsezT3tMoGqXnfha3OR%2F1D5ykNFCjqOEqgEjROWJ5zYi%2BkNQomzNlowHNJ19NMVYqHypvGa45SSbCSdTrM%2FNkdAIYRzzb9XBnGbSW8QguvLBpW6ux9d5sNaVZ6FrkgUQEm1Bhc3iXbWJP0shhskUuQC7gfRN4kBu7FPxYGksHFwunJGejSBzbD3nkPCyUAKtdzOL42ASJPTnBJ3JtMDTHHXOnnXVRz90JRNEOPRX1nSsxFokd3Trk%2BUN0155XwVQ27V4zhjDUa6gYXaMyD5Yq9BvXA23K47zIWtRrtM9SgHReNqfko1FjkkUU%2B7YDm2mYQQcmtrpWW5MwFagX%2FYJdACjG1GUZ%2Fnh0R3gORvgUKbVJk%2FleSKYT3Vgl1taYTqaQRkNqwmK%2F4xT2KA3nvuDolC3HBBUGPt15OdkKmL%2BAdbOzCRlzs1B%2FpaC1ev32hwEEMrrvBqeqUyS7tvjh7AZeA99ypu51plMb%2FatE5cyU2MQvpr7ga1ToxaICLO0Aj427tmjYm7rWlixKa3DNIevKYiBTmxErkT2CUWtBvRQ4D72tAln5cQURjZrQ%2BnBQcvnEVcDbWMykV6Jg5p%2FmC%2BMUQiASQeZgUzoWm8%2Bt9kdv3rx3RLZQ5lgIRjMKmBkc4GOqUB2zfTYqlVgqz1Npugu5CLPRh6eItsqFHKCJcv4EcHoRy7Yzu%2FxyFgmdX29i%2B9PlJ6%2BlcUZGUaPRvLXPzGK7yFbH%2FNg%2Fmghw34yGArK1p5VTt30NJBTpD9ojpfjOkVYLW03nnOe1w3QUrV04ItamNjftkSJiEuBnmjAvmZiciNNpCs8rhicuU30ewuNoA9tMruAI49M2iOZnqaC6cfVbL4%2FDPh8ekS&X-Amz-Signature=114016a90de95a7ae8c8b634b38cd782f260251eea578d890dde444453558a4b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZGYVLXK%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212437Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDV241qAZ9MQuyPyd%2B%2For6xQStGUYb6wYL6EgCfP%2Bco9wIgf5N8ltZxXmYvRjPUv7e1Ct0HlMuKSO%2BKgdSNUQGWipwqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPiMC6FHq15fgQuSJSrcA%2F6dyTsezT3tMoGqXnfha3OR%2F1D5ykNFCjqOEqgEjROWJ5zYi%2BkNQomzNlowHNJ19NMVYqHypvGa45SSbCSdTrM%2FNkdAIYRzzb9XBnGbSW8QguvLBpW6ux9d5sNaVZ6FrkgUQEm1Bhc3iXbWJP0shhskUuQC7gfRN4kBu7FPxYGksHFwunJGejSBzbD3nkPCyUAKtdzOL42ASJPTnBJ3JtMDTHHXOnnXVRz90JRNEOPRX1nSsxFokd3Trk%2BUN0155XwVQ27V4zhjDUa6gYXaMyD5Yq9BvXA23K47zIWtRrtM9SgHReNqfko1FjkkUU%2B7YDm2mYQQcmtrpWW5MwFagX%2FYJdACjG1GUZ%2Fnh0R3gORvgUKbVJk%2FleSKYT3Vgl1taYTqaQRkNqwmK%2F4xT2KA3nvuDolC3HBBUGPt15OdkKmL%2BAdbOzCRlzs1B%2FpaC1ev32hwEEMrrvBqeqUyS7tvjh7AZeA99ypu51plMb%2FatE5cyU2MQvpr7ga1ToxaICLO0Aj427tmjYm7rWlixKa3DNIevKYiBTmxErkT2CUWtBvRQ4D72tAln5cQURjZrQ%2BnBQcvnEVcDbWMykV6Jg5p%2FmC%2BMUQiASQeZgUzoWm8%2Bt9kdv3rx3RLZQ5lgIRjMKmBkc4GOqUB2zfTYqlVgqz1Npugu5CLPRh6eItsqFHKCJcv4EcHoRy7Yzu%2FxyFgmdX29i%2B9PlJ6%2BlcUZGUaPRvLXPzGK7yFbH%2FNg%2Fmghw34yGArK1p5VTt30NJBTpD9ojpfjOkVYLW03nnOe1w3QUrV04ItamNjftkSJiEuBnmjAvmZiciNNpCs8rhicuU30ewuNoA9tMruAI49M2iOZnqaC6cfVbL4%2FDPh8ekS&X-Amz-Signature=e5017e17e780396e2c51dd8e816e2f107af05bf29462debb0031bd737ba4de61&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663YZFXG47%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212438Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiGj5r%2B4Kc6MJCncbp2%2B0DkvFUbQm3MwFWgEC%2FvzjijQIgWUlifMJKMXez0VHEeHKpHnQiscqfLJihe%2FF2KRmCOUEqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK5pHYZdtOnxb8c4xSrcA6waTXrvlbZZyeEJZeYFp2Zkv5PiEluSrvawQhFOshwjLOj3n%2BPNtyuvN9jB2Z6qEzFQhJsWaz8O7GcuhxIxQpiH5Zo65YipApuGlw8kQpLI8xV%2FOnKOqN1yMsx7AYdzZ7QOeZsvOKmHEUN1%2BAxtzIPexzXFCbTTmNc0ilksfb04sz1EGKf4f0NdLhV0bzr9x8QsQGI1DQjjOeb%2FphTUucnZeerJoVMziazyZ5LnwGdumk9Cff%2BGkxiRl%2FszTaw3c3%2FICYA9soaZdERuNUwIbe813B%2FgNVOf1UbGNviFLVb5xCHKvQueY8dbUJ9AObPkwiI2uoy6RaCNa7VL5woU07laff%2FaiTp%2BO8xtywvwjAhjhLOe2ZcSc0F1%2F36r28PJx4FZBUcdbiTnLYQB9sMaD3f9pMczqCUSIi00TAprGdd4vKVcASTEm7mR3r6v3WQzsXvrj6rv2awippx%2BMgwLWTXX933GyygSF1PJFlOzvPFkmAkn830LNZUqtl7JZ8Wbc2cLbziAIE6Wg3b2E3HOqwKPYB1yedpZ%2Bo9fz9oZh01EbX48ef5EBoAMr3GF0IB2Sxc%2BEXRTVYi%2B%2FmSJPjnQcjBO4qreq2MRbrMfRBnb4S%2BWZ7NYyiSK5%2BFPSjy1MK6Akc4GOqUB%2B29jnkSb%2F%2BTH7AS%2BmptmsUstSZT1eK%2BmrcnlYjHVJ573XY0vB6HV4xk998A1yRJ6PiwlrKVXjW0IpsF94iAEPO4GHBN0Q1UFB8PqPVx7MF9oAJB65AkMkWmOpvVYEywXeFXfcBVIQ%2B9m7Yvg7fpwyv1V1AYdah%2FPZMHCaFtinHiHiVP0xENgjkDU8w0WPHb%2B0nZQCX20bwZdEkQsr8uOhdcRL0WH&X-Amz-Signature=445346a98f3cf95162518dd10133d18b7f3d4df370d9bc17fc312f1a212c6521&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBC5YXN2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICiJLuN%2FImD0WkyDcb%2F9nf%2FGO6I%2Bt3Iw7WTPvjSAygD5AiEAtorX%2BYvYoOUmgBKLzFhV24TNzMjdMNyHWlj3BqVIo1gqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAl56rVZs4Grz2TUGyrcA8J5d0qAEuJmPh7mK%2BzdtWUYHjAEbxgt1SQpTd1iN2zo%2BgcdkC1wonGWpwrJkZNoUB6MuQuV0C7%2BL1Qt1SJ3DF5jxNEa1XyOyhSrUgRES1LPTrhNRNgZG4sgfGsuovfQAFkPkxGUvz2%2BMoY253C3EXqMxPclAsAPz4Qippr8LWbii4gjRwu7tlPjoIaYkWxghlNtpL12PFLlqRKVk0ZilhRy51I66i%2F5sB6Hk4ZtbImq2Un%2FkiwnBtS4Xh8YVGu0lO3AzZoyU6qBx1ON45r%2BH7R9M4YtfR8jfUCbhNB6A9GXtkMaVWvQr%2BROFzBlzCjYvSzXjJndAFXy8nDTMFex41knZHeEU0E5Ip9UJl1QBloFtzd6MLf3906w7dXQ8%2F2Z8kFbWcSynZjbH5wUn5XSfyH0b9WX1y37bUvkgNiTqWkpyimYgCe%2BKhBowYAlhClreY8y2JCQJ5p3EesU0c4RFBSYLnP8hEMMmcmz491khEg5RX%2B3oG3AQ%2BdW%2BLjE%2BWF2sxZ9t5ozTail91%2BcnVhDejDjWoXUDXPSnQ%2BzCDfP0%2Bf7vfNfWPG%2Fa1YEyrJ%2B8vjrDFC%2BiDhxYi0fn4F9fmT5qtkUsilAzP%2BIcYwX7YKld8Otc%2F%2BJEavA%2BCWITtmWMIqBkc4GOqUBHangdUdcjfmbd61XqtHBsP%2BS6FXsPw2Ey%2BBbNQetilklc6kN0Kip59cSMDI42sA2aZjV3oWIKLGmMYCJJBagiaQRESGbN7wnCOluV%2FqMp2Y%2BG8BZ360n4zLkB4hKPMEJP9tmlu9Wa1KVgkoWDJS0ArbmpAhXJih6Qjo33QeAIKTzucJdd4r2RRHaF67g59KGo4QHHlEi8wcpnpWIa5czYf1mcyIj&X-Amz-Signature=4f124f7a0cdddfba112285d801d3a75bd95afce2efcb2f115d81d9c9e05958c2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UGQLRJXS%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDuJAQfA4QaU%2FS3eGhqJqDbrcjjUAsnLRlz9C3rLyFQ8QIgWwImLCZ68mbPKjVNmtP4woWbSwfUKKndarPVnbE24BAqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN5xPLoRHbAE8cEhjircA9O8%2BXtgdve61K2Lw3FD09NfswbYZxBMaXVVaoM6MAZuOYK6P1Z8BAhHw59SmhC798EeeW0CiIwXzcubMpkwxlbqUDra8MqMFgVMVJb0VryPmJdbcRNycMi%2FjB7CojJJGcGMMaiRRbFCJZK%2FHjN%2BmUNARmcorPYmB6fvTnNF%2FwnaCcKtJydGhxZxO0IwL1YL%2BxzeVn9z%2FsJIQsY%2FvY5irW%2Bougw8NqXEPkscpQQxZ8ei2S9gixGE3ReSBkPSdrrGRbsO5m1RcCShauo1SKtHhDB6iE6fSkI3ew4IzlWA0UEDqRfCeNJrCc%2BFK8YVGPOZrvfQBAbBbFrRdBKj3r7qksRXzPYtS8h1nuUlt2UDsVROp74EDETYFIvss5H3bPzloUub7iZZp2NvSXn%2F0FLJYqJ5%2FSgpcDyYDYFi%2FOs2FN%2FBE3DVzxGUj9JYaLfFpCDRhuVKem5j3UobXcWl8B7m%2BfzU%2BAsqZ3KMtGlqz0anlRYnx0dU9DlDOinSFuJWP2ErzT7waI3irVC0VlWgmTf%2BB%2FEO4Y9bDJTb5GaHqVm0ji27AP0Z1%2BE8%2B1PRdpEyVSbrTHllLZeiH0Ha9XlKZjLapuiptHdzb80UsUfvIpcMi3kT7IObm2fmyLhuPuc%2FMN2Ckc4GOqUBb1bPBTgMNJK%2Bf%2BnZ65DBh%2FqBp4PhPE8d5ZjeS2WyfbLzuOECMIAX7ykKzrK9VanQP5ClTdn2RFJt0QRYen%2FrjcguBw7Azx5CPCqYvgAGGuXn%2FcfAW6VSH%2FKqYkFJV8RVrSzrxGOZKDe12OAfU3mA8wMeJCg%2BDSeB8jZrhcuOqw%2FY7fXrs%2BuJLArfAw0rwdPo2HvcRVs3%2B9UdgNV6kPnUeXYIVxHD&X-Amz-Signature=f458bda14684e7c50bc4b07ad0b4a8215aa7348a9d703592d1938fd9b45d0371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQWW2RJ2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG0Pd%2Fvt%2BATH0gevaABlZub4rHLXPdJPsti%2BEHv1pbQYAiAwGQwmwOhXX%2BqICtJPHVX%2FsGTPl4gpD8lfzk2KFbXo0SqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzC%2B7qSCAbPV1%2Bk0uKtwDSehY5PXJYHPBekaJr2HdWbyjm747sRoix9GvyTkv6hu8NYWU8BZgqkri4%2FYkTKWIqykNxEVZ7q3yTJP3w1k64z0ub7twnKOijVwv9OSHOaZcc%2F2pTTmQOqFekrHvkHgjzTj4ZN3SeNaqi0ZWuAVIxYS4saWrxPfJFHKAXtC6DGBXrv5WUl4pobQlEjGbu92UagS4UGwentxbZzWgSMDgOVzrkAIGGv96LHHmx%2BYfP2ZlBtivCoYpJzTIYNQLxGkrFNe4DmNJIc%2BPrghX9rqINoU81T4wHJt6DA4h0SrkOgDgmuV4dQCKtQMDX%2BzHH2zr8nS%2F5sy4RTrtYtV8qIWrCl4gWz%2B5JLsGKDsIUUl4dHfZD7RragVPxPY7RCY%2FgebBkIzUkw98RI9fnYHNT2k4aDARHafxqwabCAm6pRVfF25suZKUDSpJunJVxq9pxe1UlOsWcmkOiDDUkk8OsoJo4dtISdLmHNuuh8FwXmhxbQwt5SMAiMWYDYTyIDLMB52Ngi18eI7ZdS50DOTl585nLP7Vtj10uA1PE1MQnkQjbBKOs3L00frZdhQvmJMOn7%2BD%2Bi7CXRc26fMxoJf%2BfWNaZkMteGyX8KpY9Ni6HfcWZmkp9aW95iG1%2B2cT4Qsw7YGRzgY6pgFM1aadBV6s8PdYakjXK4APID%2BYXSRPQwA7IYknyQ1JDlNnZPkOav9cEJKqA9r8x85qjSi%2BWnO5vRnE3IMToBrCV%2BGOUiwNiXbbbDlaSzVkymH5%2BtHA9MAvau7Oc0T7HDJ66%2FqmMmw1aK5Ujg0ySRTYr2X6YY6yl4a0rRtOtd1bHBoSRAFEBrEXHgbkD6TxRxCSoDwcH8XfIDnFdMJqmMLo4beq7tCK&X-Amz-Signature=131476d57243156899964b4d797fca0f8af7d5eaa7e3c1b4e8cebb4c051c7c0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQWW2RJ2%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212442Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIG0Pd%2Fvt%2BATH0gevaABlZub4rHLXPdJPsti%2BEHv1pbQYAiAwGQwmwOhXX%2BqICtJPHVX%2FsGTPl4gpD8lfzk2KFbXo0SqIBAi1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzC%2B7qSCAbPV1%2Bk0uKtwDSehY5PXJYHPBekaJr2HdWbyjm747sRoix9GvyTkv6hu8NYWU8BZgqkri4%2FYkTKWIqykNxEVZ7q3yTJP3w1k64z0ub7twnKOijVwv9OSHOaZcc%2F2pTTmQOqFekrHvkHgjzTj4ZN3SeNaqi0ZWuAVIxYS4saWrxPfJFHKAXtC6DGBXrv5WUl4pobQlEjGbu92UagS4UGwentxbZzWgSMDgOVzrkAIGGv96LHHmx%2BYfP2ZlBtivCoYpJzTIYNQLxGkrFNe4DmNJIc%2BPrghX9rqINoU81T4wHJt6DA4h0SrkOgDgmuV4dQCKtQMDX%2BzHH2zr8nS%2F5sy4RTrtYtV8qIWrCl4gWz%2B5JLsGKDsIUUl4dHfZD7RragVPxPY7RCY%2FgebBkIzUkw98RI9fnYHNT2k4aDARHafxqwabCAm6pRVfF25suZKUDSpJunJVxq9pxe1UlOsWcmkOiDDUkk8OsoJo4dtISdLmHNuuh8FwXmhxbQwt5SMAiMWYDYTyIDLMB52Ngi18eI7ZdS50DOTl585nLP7Vtj10uA1PE1MQnkQjbBKOs3L00frZdhQvmJMOn7%2BD%2Bi7CXRc26fMxoJf%2BfWNaZkMteGyX8KpY9Ni6HfcWZmkp9aW95iG1%2B2cT4Qsw7YGRzgY6pgFM1aadBV6s8PdYakjXK4APID%2BYXSRPQwA7IYknyQ1JDlNnZPkOav9cEJKqA9r8x85qjSi%2BWnO5vRnE3IMToBrCV%2BGOUiwNiXbbbDlaSzVkymH5%2BtHA9MAvau7Oc0T7HDJ66%2FqmMmw1aK5Ujg0ySRTYr2X6YY6yl4a0rRtOtd1bHBoSRAFEBrEXHgbkD6TxRxCSoDwcH8XfIDnFdMJqmMLo4beq7tCK&X-Amz-Signature=917073e38aba19319fdb474683b18e3bbc63dc0f19892bb56baa2ff55c2ea2d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YJ5LUTFU%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDX3wg0Su7Jp5oPsXqO2lXrpYUIN3oCXmHoOe0ucSt7bgIgda5BS9T9jdE9s1af8m9j0cckgrcZJ56J%2FHjvZfDG9RUqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAAhtjOVu%2FPSu6ArFSrcAxJYemQHxYrcNWI04bcUNGqnhUzMenVDr41S%2Bl9GxO0PktJ%2BTk6iaPkcEo4d4qXAYMWn3KCErpvQBbHKnHx4bU%2FO%2FH1pNt5Cv2yLJq2KxQUICPOk2fjfpBjq6Hu1G5CUZwXz6jnk6%2FciFGl4o1zM8ncoyL740a%2FvbNI1%2FZcz0Pu6swlqHt%2FJNC%2FfWfOX2taCn6A1d8Fd0omj6AzOlFxzdR13sA1Fl2BjlKY7aXapwZgFfEnGcvmwRY5jHVoVWUBYX4ev2ymIs5PwfWxoRv9KenUO70YfQDOU%2FWAKR%2Bqy8X5ZstHHh08OuA670rytuWoPHss874AoZR3k3RDu09BP3HDGDT5Eb9swa7EOOA0p6wf9s6QSXyJzno9BKmT9B5lMrrV5JdqvpciptDdBXCDElGQgBYp5J4lbDiYz0Pm%2FutD0IILN0CsiJ8IbaPqp%2BTEyaIxGAeRjkUGPG1lHQF1n7qv1rdC%2By68hCwgxOtptVEDx4jsqNsXX5Do%2FKT6btAJoxiZzxFInln3z5mOycBoAw9Cek4ZK%2B7Lap5NWTO9WnY5ivZK4o3xJctv6pS21EKyabW3e%2FY0EFfovlLeJIdLZ4IB4fIVBkTxw6LWdqKACDrJ7DQOIL8h5dSlKcAxFMK%2BAkc4GOqUBRPQxtIJqow2zpZofgGp4475fwEpfkLoLtW%2BEgFB23IWnD7FO9uyuinQlukcheUSdNCeiMrV133MSL2y%2BNGTVeTYMxs3cxahtl2JNYUbBLQj8i7lWIhG%2BHpozqg0eypaIVx2TAnbnKROJB0V3gajKz0VugCOnUWeEam9Pnp535Ddb3zyMVnsEBYbQHrAY0YfK5EYNbqjYsB3XmOXqP%2B7fpKq0w20c&X-Amz-Signature=6fbb8e0d9fd31fd3913ac63ce1ef805841879e2c68c2721a7662addae91d4b67&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL5ZHBZ3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcNdhC51mCtSnuNAmjoaTR9ykkFxxAARLNe%2Ft9T9%2B4WQIgTMDyng2dyW6E8A1Ac%2B%2BBWfiybhfyd3CgdN7zKo8CabkqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFJbwT%2F3ZyWEZWSOnircA9dQgjh1X69lb9jYSAyskI3YxfzQbr3npwpmyGhhnK0YV6qxsPUHVMwzpvDHJ3lgEl0itpLzlmR4b9Maexu2PRVcJfq4VuPqqOLX2CWcxdjhsZlsoIYLzsOnOywiWqZJZnj5j3qc9MRx9VeuIZt%2BfFkOSFsXHw8XuPw8ZE5sH2ZNNruZR%2F33EFww2eynTjq0UiNdjCvZA6TTyqtAXF4dRRb62kLhGx7BDxwo0SZ40qC3dxFcDaP7%2F8NXcH2QsIcs7elsr8qSUb9z9JNxDjkYABr3PmspI3E6O1cEuOwT7kgWHglfwZf2dTHq%2FSnh6kTRVpth4hgX4y2P5NmC%2Fyhyci9w8yjR%2BJ0JooPmyuHW6307co1CVu4uOv6A39dyz%2FCcHDJK7dPn9r5SxVkfGShabbHOZfOZz1LzJux%2BZKqLMKcN%2Fu8%2BeEPuBGKWt0tSvgi47VVUCtDFSZvB2CS6y5Rg6Eb24o7FGoSNq1%2Bbh9vDyNAojrvYqhB%2FerksU9AZHxBY8fmpKMdkVjxKgVE%2FrJBY3Oswufn2Wz4KGSPjJcx2quk3iA8rE0Gm5GtcRI6QxtvYvr4Lqe0jH5FWsm9WUs8tDozwuyqqOPVQtVNuXkJFiAKwqsAIjOjObXZGtxjdMLqBkc4GOqUBFJLYaSKmbBq4AwasCbANS7%2BD3zbWS7ziDLQbWnPkwtD%2FV%2BCsssTPEaWWBUGOSLpbUvDSTjhQD4zw4RFcyR7oowPr%2FzwuYLEmwyQbyd15eES39zfgi7pyAwWpWWssMqpG5ObXSdy5QQkFNT6EJs83XIS9Es19g8FWpCbXBDiMtGZK0hZnmgUt7voEWrLcrnsW%2F6pg0ZQ%2FFynQjiYmh6s2oNF34OmB&X-Amz-Signature=16473b973b1abdd5e67449c294afb405c2342926d6f27d44309b9fa30abdfe26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UL5ZHBZ3%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcNdhC51mCtSnuNAmjoaTR9ykkFxxAARLNe%2Ft9T9%2B4WQIgTMDyng2dyW6E8A1Ac%2B%2BBWfiybhfyd3CgdN7zKo8CabkqiAQItf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFJbwT%2F3ZyWEZWSOnircA9dQgjh1X69lb9jYSAyskI3YxfzQbr3npwpmyGhhnK0YV6qxsPUHVMwzpvDHJ3lgEl0itpLzlmR4b9Maexu2PRVcJfq4VuPqqOLX2CWcxdjhsZlsoIYLzsOnOywiWqZJZnj5j3qc9MRx9VeuIZt%2BfFkOSFsXHw8XuPw8ZE5sH2ZNNruZR%2F33EFww2eynTjq0UiNdjCvZA6TTyqtAXF4dRRb62kLhGx7BDxwo0SZ40qC3dxFcDaP7%2F8NXcH2QsIcs7elsr8qSUb9z9JNxDjkYABr3PmspI3E6O1cEuOwT7kgWHglfwZf2dTHq%2FSnh6kTRVpth4hgX4y2P5NmC%2Fyhyci9w8yjR%2BJ0JooPmyuHW6307co1CVu4uOv6A39dyz%2FCcHDJK7dPn9r5SxVkfGShabbHOZfOZz1LzJux%2BZKqLMKcN%2Fu8%2BeEPuBGKWt0tSvgi47VVUCtDFSZvB2CS6y5Rg6Eb24o7FGoSNq1%2Bbh9vDyNAojrvYqhB%2FerksU9AZHxBY8fmpKMdkVjxKgVE%2FrJBY3Oswufn2Wz4KGSPjJcx2quk3iA8rE0Gm5GtcRI6QxtvYvr4Lqe0jH5FWsm9WUs8tDozwuyqqOPVQtVNuXkJFiAKwqsAIjOjObXZGtxjdMLqBkc4GOqUBFJLYaSKmbBq4AwasCbANS7%2BD3zbWS7ziDLQbWnPkwtD%2FV%2BCsssTPEaWWBUGOSLpbUvDSTjhQD4zw4RFcyR7oowPr%2FzwuYLEmwyQbyd15eES39zfgi7pyAwWpWWssMqpG5ObXSdy5QQkFNT6EJs83XIS9Es19g8FWpCbXBDiMtGZK0hZnmgUt7voEWrLcrnsW%2F6pg0ZQ%2FFynQjiYmh6s2oNF34OmB&X-Amz-Signature=16473b973b1abdd5e67449c294afb405c2342926d6f27d44309b9fa30abdfe26&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Z5V2GEX%2F20260325%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260325T212445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC718GzD4Gjj734k4KdK%2F0WGyZNoR78rhZjzpCyZu%2BjtAIhAJlVv3gjYp1fFofgtwCaesiS4nVKKN5TI4Q8mc1qiH2mKogECLX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgziGiTAnOGTaPP%2Bvs0q3AMt571RVBa%2B%2BydGHHuZ3zAyni5X5C2ASI2mM4XxIsEizPYdRsaoufeoWmypSoPY8UiwjxMQTuy8x35qqTzbJ32OCadc6b1D%2FrAYOeBj35%2B8sckBEIzuE6XY87llfHaRcwuCz0P%2Bz8S6eyoZEyJdHRxnxa7GpLznwagpvV%2FmQkMeP7odfDZv0HtoPJq6bv84Ia9TwD8HbLzD%2BmO9wHbjw63lsFSKbYAHHiu%2FcNen0mXf9C%2FAxETA%2F%2FCxBCdxjSp37nPsu0gG2w7RE9BlOOQTZWwP2D7l0Be0uZ%2FvOHtB0aE%2FCgSaBSiqqZ%2Fjh3che%2FtvbHnAHKsGlltAxkoX07WMYZSMgH8dC0ssu81W93C5CuxdD6upgG5%2F11bga291oFy6yr0uIvCKIKQtjUbnRqZ2yZW163ckfPyWlE4RZT20QDFDES0E%2BobV0C25eetGNGWKCpmo4KtaPRJ8YMrmD0%2Bc675Dv5d9oUvh3v1nGnld8W1tk%2FI7P2CEfwUHoubrPI2Om9t6iJXKv1xp9y1u6kdvL0GRE2vPRS44kwSP0UAv5S%2F4lmQV0fEier04UcTE94mUCD%2Brz42nE2qC6WxpNaWcgLFz9zQhgnrdHL1jF1ybRUtkrDyrcD7u%2Fxo%2FwTmRlTDHgZHOBjqkAaZ0PldnBa3K7IQ4yT7qKsEsHWruizY3abHkpbjKKEcedzzf2y6jJojDeE6CrMjHy6BrFwp6pMuxJWbzO05dhPTNK1rag5%2Fih1uLqwTKJ1yh3kgoArjTSTBVmjOviJkHRIuludbZhoOXElQ2rEopAMpIthjTBWVb27aU5g8LZ7f00iIyYOwH%2FV%2BgvT1WTy9eNaSSJokavtvCUym1vtnj19Ds%2Bm6l&X-Amz-Signature=90b642a7b635660b1f1dc402ac9773e4e2324ebec238a1d427c3d293527f1a7b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

