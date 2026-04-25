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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG63ZO7G%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD32UwXui2%2BEiFIM2GrCKtHkm6wCLi0nAUosxy3SaZfwAIhANDse1ObCnhR1c3oLTw8LeHLvjXyiT0rJxJBdo5oLz0PKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxFyJt9ohlyYOPnYH8q3ANtBK8T%2FJ%2BDedjq79arSeu5ekD3cy%2B43xslB3N4VvfRCxNvipeLEj0mnfBTTyhsmZXCo6lqatNKTce3h0ba4xCBt%2BATO5jnGw77%2F6%2B7Z2sd6svCerBmPXj9UJ5uiCsnUvJjySsBd2ZvJgWGrVYu9zkeHP93z%2BdwjS4NiQQMwvAAf6KU4jEXsz6cA1npJY%2FG3DMhbHwSuxFp5GoTuL7D7lssjxNc2fDinP%2F%2BJ6AHfSn1HrkVClP80xZZCfPaAFwNPbLYAt5mGlzWPKEY0QK5EWv67Tovoayu%2B1pXwvdp6wpwTn9qN1seESKKrJ4%2BTzUqyTs5Bic8PmFU%2BlyyxNTV9zUA2pMrs3QQUWVaPactMyesDyx0DJt%2Fnbh1swZ15SDOifaXrXbzH5jQ3SjmkCVm64zBlbnYj%2BHMaKNDKd89wbBlTKww7eNi3jwo1Y6vW%2FebKVQI62JCd1MXzWZhqAMeS%2BCpiwW%2FnqJsrodW4VgIXpU2kxiyLo8%2Fo8MR0ftJuO1ZUxuI1AMbEJc3s%2BLHpHrwUnYqACj1OOI3yvhkztuL%2FIFTJtzFf7ZQD27pn6%2BBO1cBnOA2EOUcyFrmp9wKKqb5ZjWAKBCpRZ%2FTAdppgnK7AjAT3Y%2Fx2pcCqyWehMk72jC2k7XPBjqkAXLex94%2FkyyX%2Fdtg4%2BnDqsj2%2BScaMyHwof%2BH%2FnRWyl%2FkFr3V1hCt1vKwwGl2y2vKdEsPmVqJP1ttmnHu9MKLEzsqfQTRYDp3cXCtP5fYzaGBr9892DY%2Fc4McMcnThYIiX9od3dB%2B2FsUawdgzH%2F3T%2BDyMot2Hx2vJOUEEH%2FYgly4wgv34113GgB8IX3D6VsgJwovFa%2FCR2ilC5NwU6TzyaJC7%2FEw&X-Amz-Signature=e5244f82cefb68b75f44655b5bc9cca61bb61f40a50f4f8dd8fd146cb5b7519d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VG63ZO7G%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD32UwXui2%2BEiFIM2GrCKtHkm6wCLi0nAUosxy3SaZfwAIhANDse1ObCnhR1c3oLTw8LeHLvjXyiT0rJxJBdo5oLz0PKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxFyJt9ohlyYOPnYH8q3ANtBK8T%2FJ%2BDedjq79arSeu5ekD3cy%2B43xslB3N4VvfRCxNvipeLEj0mnfBTTyhsmZXCo6lqatNKTce3h0ba4xCBt%2BATO5jnGw77%2F6%2B7Z2sd6svCerBmPXj9UJ5uiCsnUvJjySsBd2ZvJgWGrVYu9zkeHP93z%2BdwjS4NiQQMwvAAf6KU4jEXsz6cA1npJY%2FG3DMhbHwSuxFp5GoTuL7D7lssjxNc2fDinP%2F%2BJ6AHfSn1HrkVClP80xZZCfPaAFwNPbLYAt5mGlzWPKEY0QK5EWv67Tovoayu%2B1pXwvdp6wpwTn9qN1seESKKrJ4%2BTzUqyTs5Bic8PmFU%2BlyyxNTV9zUA2pMrs3QQUWVaPactMyesDyx0DJt%2Fnbh1swZ15SDOifaXrXbzH5jQ3SjmkCVm64zBlbnYj%2BHMaKNDKd89wbBlTKww7eNi3jwo1Y6vW%2FebKVQI62JCd1MXzWZhqAMeS%2BCpiwW%2FnqJsrodW4VgIXpU2kxiyLo8%2Fo8MR0ftJuO1ZUxuI1AMbEJc3s%2BLHpHrwUnYqACj1OOI3yvhkztuL%2FIFTJtzFf7ZQD27pn6%2BBO1cBnOA2EOUcyFrmp9wKKqb5ZjWAKBCpRZ%2FTAdppgnK7AjAT3Y%2Fx2pcCqyWehMk72jC2k7XPBjqkAXLex94%2FkyyX%2Fdtg4%2BnDqsj2%2BScaMyHwof%2BH%2FnRWyl%2FkFr3V1hCt1vKwwGl2y2vKdEsPmVqJP1ttmnHu9MKLEzsqfQTRYDp3cXCtP5fYzaGBr9892DY%2Fc4McMcnThYIiX9od3dB%2B2FsUawdgzH%2F3T%2BDyMot2Hx2vJOUEEH%2FYgly4wgv34113GgB8IX3D6VsgJwovFa%2FCR2ilC5NwU6TzyaJC7%2FEw&X-Amz-Signature=e5244f82cefb68b75f44655b5bc9cca61bb61f40a50f4f8dd8fd146cb5b7519d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7WYXN2V%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232523Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDNbpJBANLT22toRfwfShkn3XBj4Z%2BoTB%2BKbVfqnqF1lgIhAM4%2B3YCq9H9InwIBNvrP9OkZF0NIzM9J3cwhWDsNP3zgKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyFnrsS3QX2ikfxlwQq3APsY9YnE9iJCo50mD07ezWZJ5FFbUe7P8qekbn%2BuCvDNLXt241Xu1HsS2NmcPjSU%2BZXerhUp9do3a6a8ZdD0SJd9zRZreYEQviOeT0cDzmPPYXcxWPHhGHSkyeS7YJnMLiABczO9I1N397%2BqC09gfUBiYqXrtxtzYB3%2FMUF2lGdklfPQo0EQXk7Xb9Okn%2B9R4AyAzKN%2BMHknb7by08ZDFjCjEfO8J%2BoWFqf0p1TxUXtFPjt6QkZHat%2B75AARgulw5xEh4zd7tLweYxVRfGko%2BmJTyXuMQ7KNJXGKCOSapiX%2FFqhawIh9u0de6ipHf54FDIk0gnaCjW9PexH%2Bnk2Yhu5Fsdfb1bcRPX1R%2F%2BpOs%2BokXNEnNbHQkZy59ogDSsqCo4iiOvqpAf4JLoczsTSjVQC%2Bbfbb924mzY%2BhOAB21ba29kPvaDwSpyN%2FaQfcPqbliX6bXE4hhrib6GG1RKscSIS0lEg%2FGL5hBCixaFFIo2i2bif%2F3oKg%2Btv5zno96bUSKz8f2dod5bfzxUOUDML52v3tegxTnS71npQ0tLA3L0Dg6T5wPjeQo4miqLC5rl9GNJKisNSec9wfKOjAupsD1fzdKeUS3hQyk%2BSd5tgCmOUbC2m3BBSqKKa%2FkfMsTD6krXPBjqkAZM4QHLCH7rtYbG8%2BLPQesIdNn4ziHf3I0psHDdroJStRdgcx6Ts2JLFZhgEHosV3vgyISfTfq6wW99V4pGpW9dfkxCDphcQZpRU5%2BVUink%2B2RxDyUTszyrb0Q3WYwRkC6Xhl3vpDp6%2BYh6DLTrQA%2BiWixjzYEDUEH9k64EvlDWASqc8broY5ecrPXWlLaMrf87QAzOqNgR5Hhv%2F3AB52onyov8M&X-Amz-Signature=2afc8a54f3d1aa4e3ff9700b4e16f4664c6cf9d842d2d13b9583be22fd755607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JRHIMRT%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFsURVdApNTIHN8kFSxqmuQCrfIOSWusKELDtrPM7byhAiBxLSSi7%2FImEfbGHQmGtSYPFbkdKeF%2FCLaxc%2BZRYN2SRCqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2M%2Fy6j%2FAzfbubEKxKtwDbCL0cLqFuYiUw89DzsdJETO9ujAqxJc0FqZCY7fk6F%2FaqrEP85yatY1KsNZVSDB0BMImSAuvQEYzNMq389K6nMZ7Bxxb42kMgxX544QtzdSkUxVMhYgvci5zjBXX6e18uGNMzCnrfdUxE3iL4IVVxsZ0oy%2FijIvBR%2BBCcn2kbFI7LpY3AntgPanAuDUW1dNJ0R9r0xa29hEr%2FAL54UTd6f97KiYTtedGSN0AccJzeh5bD20WdCj4DXSCjiUAYw9EdCtNw3IebptuDk1tD7KscqVLhr%2ByXue8dGC383bdlbqIR13GNWUuSyZNKn4HX4k9r5w4H2U%2BTQtN6Szi6oJvz9wuYEnHpxlywGgXrd49rGyQ8ddsxhFMGntoZaKwxC8IQtyzaDTlp20fleaBEaxBOAmsbFpQp7YH6I5MuwbzQidVNbhtEYZhkQ9iHjBmbZEwGy9Bt3iU0538T7Xn7WpyJ%2BJxBNeCCTCoJ4hGRq9YkjeAC8nS%2FbXTqRAVbiKEgGGCfFWtUNahiMnPII2HyZHq6eDwfCh%2FDQtvfngQg6o0GbTo%2Bxk5T3w80pO9dEvZ1f0UZYNj90lDNNg5H%2FD%2FhuRyV7msZFnuW1epbZv1eCN%2BJUs5xFeuc7UNaI2fhe8w1pG1zwY6pgECMZfi7KBODklPzi1ZeWx4JE2zel89xNG0MRBlWxeADpimAegG%2BZ9pa%2F0WCg%2Fd1ezEJnkVzQaWYEGAzjRT0E3fVhwtvBy655EFQLbQCK3RCLqcCPTiwb101IUQOEb13Qb6F8VxICNGno53knc5S4gR3TNgHQIgEVS0jIbByIFj5C4DoEh0iP0azrBMWQ2MG4E4ISj2qyF05hgvoszoxE9NVs%2ByKkKA&X-Amz-Signature=c59b5a516a071dcca5949fb99e7e055a6d5a0e36b024ca0586e6291fd0c597a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JRHIMRT%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFsURVdApNTIHN8kFSxqmuQCrfIOSWusKELDtrPM7byhAiBxLSSi7%2FImEfbGHQmGtSYPFbkdKeF%2FCLaxc%2BZRYN2SRCqIBAig%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM2M%2Fy6j%2FAzfbubEKxKtwDbCL0cLqFuYiUw89DzsdJETO9ujAqxJc0FqZCY7fk6F%2FaqrEP85yatY1KsNZVSDB0BMImSAuvQEYzNMq389K6nMZ7Bxxb42kMgxX544QtzdSkUxVMhYgvci5zjBXX6e18uGNMzCnrfdUxE3iL4IVVxsZ0oy%2FijIvBR%2BBCcn2kbFI7LpY3AntgPanAuDUW1dNJ0R9r0xa29hEr%2FAL54UTd6f97KiYTtedGSN0AccJzeh5bD20WdCj4DXSCjiUAYw9EdCtNw3IebptuDk1tD7KscqVLhr%2ByXue8dGC383bdlbqIR13GNWUuSyZNKn4HX4k9r5w4H2U%2BTQtN6Szi6oJvz9wuYEnHpxlywGgXrd49rGyQ8ddsxhFMGntoZaKwxC8IQtyzaDTlp20fleaBEaxBOAmsbFpQp7YH6I5MuwbzQidVNbhtEYZhkQ9iHjBmbZEwGy9Bt3iU0538T7Xn7WpyJ%2BJxBNeCCTCoJ4hGRq9YkjeAC8nS%2FbXTqRAVbiKEgGGCfFWtUNahiMnPII2HyZHq6eDwfCh%2FDQtvfngQg6o0GbTo%2Bxk5T3w80pO9dEvZ1f0UZYNj90lDNNg5H%2FD%2FhuRyV7msZFnuW1epbZv1eCN%2BJUs5xFeuc7UNaI2fhe8w1pG1zwY6pgECMZfi7KBODklPzi1ZeWx4JE2zel89xNG0MRBlWxeADpimAegG%2BZ9pa%2F0WCg%2Fd1ezEJnkVzQaWYEGAzjRT0E3fVhwtvBy655EFQLbQCK3RCLqcCPTiwb101IUQOEb13Qb6F8VxICNGno53knc5S4gR3TNgHQIgEVS0jIbByIFj5C4DoEh0iP0azrBMWQ2MG4E4ISj2qyF05hgvoszoxE9NVs%2ByKkKA&X-Amz-Signature=ba29b10d62766710871acf09d418b09cb093d2635baa0cbf19359a315cf24fb2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662G4Z6YV2%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIASGA7yCrLTHVjXXH6kU7XhU46oYj8R2uA6d03j%2BnQJ2AiEAu27qZHJCHmeqgmNOC%2BZkwfmv3phT61iX5MWDp7yZ54sqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEYTWUudDwmuHo87yCrcA3L5sHq%2B5ssemSc9hb6D9xHy7nw3%2FAGVv2Ef7h8Sifg%2FdqOsABDp7akVJUZxb59RT6VEPy7IXOHbACBDJaA5Z6%2FvJgQ2MGYJ1BDvW3DJLYZWS23QwSMd1UjIOsCVvygEf2xFrEB%2F4UXLvZ85qpRSYYsiRTRzdn7TB68jN3LidIcucjt6t11dVcF2ZsWHfwyRnSP5v0m08dqvWngnw%2F2CNAvQnwNGIbXjRI9IBjVAQwo11F2%2BWs6RNtYJHugyCDsYK5%2FiQlrIUPXJBjykzGxNhiJDPQz6bNPEHDr3Gss3eVWaXMB%2BUq8hE%2FZCcKNhK%2FPFuNnIDYWAsArRANSN8vVY%2B6z9K2PWNbYRmtQURltXi%2BdBz6NyeOnK5MVsXpjynC7kZ5U7szvT2lrOia8K9NCMrG5GRRkkc3yZ155%2BQuGT2cpDZWWS4Swkg5T3nDT%2FKfxiXTLXtRp0M3sWvOkgZ8OuWb2qgqmeD%2FN5Uwc4atvh27MGCjw34QL48Ovu1AQ43hTkaA7h3tuvDixfZkDOJ6nRGucrZ2D9Z5QKIzg%2FtXDt%2FjCizrCd5L7M17eNmK0Uy2uYw8N%2B0%2B2UYr11ZrOnMftlMHGWFJ6chPro5WXR%2FdN1kXFn1Y6jyousy65bbiUMMNiRtc8GOqUBnse9OiWob12gz959MD4OkP%2FHRRp%2BIpWNbimN8dujw9kT2CHljTjK4N3AEz%2BLh0Rjhv%2B%2FlHVQ88P61%2B9JgXD8QG40Wr3oXOspko6Frc5vSRK7169xzGkLyOIbo3XJI7ajSbGy3mGf3D5Gst3M9qa9dsJTZDovBpTI7%2BK3OL1Rye8REnLmzGcNyTaNFEMfUDUnxE2VvOvf743d1UswSKzPxJ86IK3y&X-Amz-Signature=020877954b8cf21aa88701a98d51ce69d3dab5f69decd6e3c7bc8970e962ad66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WFQ2GMUA%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232525Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDGr08yRc9kMIjKFpaqs5yhECOrrj3WMx6gRHrq0gjhMAiEAsv3y401GiZUnH%2BtOGXA26tMysO7tuNgNDX%2Fv%2F%2FIU6CYqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDZt0xRj%2Bj9025WuCCrcAzdXNiYvwB9aBwVenYmRJeNqUfFCJMKV%2FKu40okYGiybIemg3U%2BUd2Ovz%2Fk3eZqB3OwVhPzpUZnXo9%2F23X7gmD5wJqpz8Yz4TetNNY6JJG8dLgeV0Q0WRAzuhwbCTaRA64TObEVUh%2BiwCbCXRBVVtiln%2BNEi6COcoBGjSFH%2BtOIYUMCHi0ZygNy9FHIEOUodAk0ZSwo8GbZaNlhhB7T9C038mujST6BloxcsGkmvo5xWpXHuNAG9eeF%2FprPs0QAvbu0%2FxcEvJpiQNK%2BhX2WVent5tcitx2dVOsrNsfeaTTOc1NFzDimhiz8O2CcBBFzKvwRgHT4NOkOErkQSBaJdRxEEtvFxrV0U65GrtXwiaWIUnhkPJsS0pUW9H0HIpRYtvwWWN6Y8IAeMFrdEFexw8ga9ucb2vdabJO5Gn7o3z9OKXhA4yXtro%2FYMEFp9yF49vGH%2FOLtkcprwe83VynWJuG2YLzUdGkmTvRtY%2FqUXJM0zv%2Bbn9B25280WymEBSYpGTpJ7Q7r0UkARvSWGb0VgODL%2FWl2M7lf3zeZP6rK%2FWs7RQ4avhu%2FPOYAaUtc1lt47GRtB4NH75ZVcFeGMj0pLupeZTH%2Bim5R0lUqEoW%2FaL4VwdIVCzqyviP7O6jW5MJGStc8GOqUBBSkDBadAhJCxuEwQZQpHQZCbXHdYWwMFyl1bghvHbc2R%2BkgT9hWBurOSQ%2BrecHD18iXMZSkJmLXXjhQmxraG3T3tQHcpha3LutrL%2BAabQatU473GxyDfURx8nQPBayBn%2Ftzuw04ptKXV7lx4PijKTULDbLZ5%2BqXDNpWEJ9JjcRUE0Tjx%2Bmc3l9VltIqaaatwY6LgFquRXA4e%2FubIIGJ8uj1HMP%2Fn&X-Amz-Signature=f8943e0df5d492cb154946e4a8730b989abbe0a91edb83e70325e08f2271c629&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZWHVV57F%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDHVFZFjVVDwEnIevfkaDXyR4nf0p%2FXcBB7UNIROn8Q6AIhAIToE5hPdnDXf9jPOm0lnLtxaqo86zDO4hxC5JnAvKm0KogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgziKjsMS9VTzRD82s8q3AOGBD%2BwB5K4Bj4vuE19OSVSauALJTTCVWOjm5vuT%2BcPHAmK6lT3WmnsLCncR99xXSaru3Ix8Z9H3gTwqjdufEDkPFb8JhR8BzajWV%2FbNx4IdwOfDZVEFp8NMz%2BysB%2FcJ6BAzrHIWg97VFHtbhU523f9XIzVZ0WfY8gfSqYCguBYtSMxsEUJWAswguWvHb%2BNm59NDBz61mkCkJpgNZvxititr7MylapYBisK9fQEMMKTMBZ29UBU0Qp6tdLXmekgIh72V8oj4o1Xc%2BWWpzJhm8f1NgnxS6gXr6flD8h7mx4p6EWX%2BFBHcylmFseJsxhCM5EGI61TS30gr6oxepAvCrpxUNKgfREX4tUGn8r8ugmiZbdZWUCaZEjwSh9Fl4uDArN8b6kui5didQ9Xo80MF8EoLQHKuDai6T0TYlKgSFcrzgVESB0vbmS4Sevr6DwUx3e6g%2B%2B7pQyH%2F5WzaRa5SwkXD6ht0nMxTzFbP90G%2B6E0mXDOwlZ%2F696CFXzDcNIDqlRtCg%2BgEHO3p%2FVKI0thlTD0QdQK0whxxSPT0%2BxaMRLq4ZSE7hlZLkCHeBr5eMSaSWPtCJLd%2Bpo5zfFxE7Vcw7j61eYrMxbCu4cgOQBL7%2FFxXIsD12kSv9%2FBoTPb%2BjD6kLXPBjqkAdhHcg4ii6FlJcbh16erZajKRzakKYoQR1m94gaEj4euqgMnJILfZOXAxEWNk2QwDx2TatSJEEX8HCAOyEVW18j6AaggR2xZPJxjbvNNo2j4H9urGCiybXhgxK%2Bl48pupRfTlRHFq3%2BmAhASle7fJVLcovD7fJ6CQIiPNVl4UseVLts9%2BVW%2FFHlJEOignkw2wfsxEBRIm62iOR0pJuunYTZciVRr&X-Amz-Signature=de9a1e0c99d3b4f2e3f10ac833a935b3c44be91b4fe52c0768fb2a463eb1f18c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKVZ7LGZ%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWNIYc9HvjozNiAq5cnXyKALgjKpkSpg4DWUZXCBDDawIgKm6u8YENGKR8vh9qYRTbosEuC%2FspnDZODLveJoVbM0sqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBqJwQ0JItS9ziXnBSrcA23NVJHe1GFLjIPc4flmzG7uSI09G4KkZEiPAGN%2FSJXjISxQFPXeayrpcmkiuBxCQT%2BpYrVx9B2NLwtuxlj43R%2FbuA2nnUl3B3h%2BWoSIbj3rOatdZm6kSOXhF7s6yIpQZHxE5zYMUQsIfumX17WJxVh2n3SE%2FWyq4y5LyxgVkb2O3Kzzs8eccynsEzWcobhcVn9x49oe17pYCxqfctN85B%2B8IcBF%2FQKt6lYE3XtvOi4JrZbM4h4HQZc%2Fi2L24l6D4BcbNX319pdjmIEyAnr1UpcpkhHQeThBOxp1oFgyAZia267MahUY4QnpBfq%2B5CHlZaj1%2F1SoOdjRNLDf9u6Xlt2nv0Hkm2UA6pjRx98psOc6C9aK7Rs3sCMKduU9fgWkDYWbZTB5503Z6UDSimkZRPPp%2B8d%2FhyA4uCuy81lM1QoDuxhcETD0wsJj5zCyS4YGlPw61znANAcNMP4grf%2Bg%2BzsWFiqgCKLYH%2BGXrfnpQRp5WCb6eoVQ3l%2BXVs49POmYZEIEZxGTn1EwktbFiCTmScOAhJwfv9P0HMkTN2C22MN4M9%2F72hh4rknfPMaabhiXUmQ7PVCcX%2F3JIM0aGpjnrQBQOwmgxsj0%2F6%2F2BbbWfdSvCTtw%2FNER%2B9y%2F0PSMMNqQtc8GOqUBaWbCljjoVepy4LVakf7Kx3pewjX6laWBvXJh27x6lZG3sEfyrpw21A6NuK2UIjqJ6aS1Oi0TlzK7ICpLBPsskIwoO%2B8t6hHpeFJj7yVXixsc7vyF5NLm8SfC1mCZnLFkKQtOrjg7tadRuvebFNz0vUtnITbOFo7XH1Ht0fBVMcsIcEpSDw5uQPV9AJ0AK42xSEEo4maSVs4pHGnbBeKqO2%2BFLHl%2F&X-Amz-Signature=999572613ebb6b49d30b3d3dd213d5a8ab7a3baec18a648855cf368c9b5dc5bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKVZ7LGZ%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCWNIYc9HvjozNiAq5cnXyKALgjKpkSpg4DWUZXCBDDawIgKm6u8YENGKR8vh9qYRTbosEuC%2FspnDZODLveJoVbM0sqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBqJwQ0JItS9ziXnBSrcA23NVJHe1GFLjIPc4flmzG7uSI09G4KkZEiPAGN%2FSJXjISxQFPXeayrpcmkiuBxCQT%2BpYrVx9B2NLwtuxlj43R%2FbuA2nnUl3B3h%2BWoSIbj3rOatdZm6kSOXhF7s6yIpQZHxE5zYMUQsIfumX17WJxVh2n3SE%2FWyq4y5LyxgVkb2O3Kzzs8eccynsEzWcobhcVn9x49oe17pYCxqfctN85B%2B8IcBF%2FQKt6lYE3XtvOi4JrZbM4h4HQZc%2Fi2L24l6D4BcbNX319pdjmIEyAnr1UpcpkhHQeThBOxp1oFgyAZia267MahUY4QnpBfq%2B5CHlZaj1%2F1SoOdjRNLDf9u6Xlt2nv0Hkm2UA6pjRx98psOc6C9aK7Rs3sCMKduU9fgWkDYWbZTB5503Z6UDSimkZRPPp%2B8d%2FhyA4uCuy81lM1QoDuxhcETD0wsJj5zCyS4YGlPw61znANAcNMP4grf%2Bg%2BzsWFiqgCKLYH%2BGXrfnpQRp5WCb6eoVQ3l%2BXVs49POmYZEIEZxGTn1EwktbFiCTmScOAhJwfv9P0HMkTN2C22MN4M9%2F72hh4rknfPMaabhiXUmQ7PVCcX%2F3JIM0aGpjnrQBQOwmgxsj0%2F6%2F2BbbWfdSvCTtw%2FNER%2B9y%2F0PSMMNqQtc8GOqUBaWbCljjoVepy4LVakf7Kx3pewjX6laWBvXJh27x6lZG3sEfyrpw21A6NuK2UIjqJ6aS1Oi0TlzK7ICpLBPsskIwoO%2B8t6hHpeFJj7yVXixsc7vyF5NLm8SfC1mCZnLFkKQtOrjg7tadRuvebFNz0vUtnITbOFo7XH1Ht0fBVMcsIcEpSDw5uQPV9AJ0AK42xSEEo4maSVs4pHGnbBeKqO2%2BFLHl%2F&X-Amz-Signature=da94aec70d4be3f94c866df2bc3c7348bce14f8bba81c7a5e344a41c8fc7bcd6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SU2ME4C4%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232521Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHYENDSsx2EgPS1DCnI6pu%2FU7nnhtYygI7KOR7N7SFAWAiEA9jNlaSlWZL0XnTYGEnH0D40ZVG%2BUpex0zX8npM5dNlMqiAQIoP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOmp7HM5Dkw8QDxFhircA0iYdnpOAeq9YRSt%2BZXHzMbN7MeE83vFDN4ZGrt4WntVYNM95iduYl3YNAKRb7dGERXJitFIOi%2FgP2kMY1rCMIqwt7%2FuB85YSANG6r01nz6QWnpK3WMXld91FySwluDsyYHXTee3FWnVzw7z1iEYGYOYP4rG66jO17tzIEkvhU4z2eggnhexZz5NKro02LSkwtO9lIDf1pqhVDCBnmzaLoD4DT3Ix9GYtS05bGWK9hDBzNkE3ufSx1rtfPsT9ZmWqD8m4h1VuUPkmmhw8iYuRjNDK%2Btg7QUkhW0Ax2ZX3vLrt66mXDi7iMKgtN8SVNtlolY3N0bZpryc4xTFuB6oNu2U%2BfS0wQomYGmg5pU8HmmSQoS6YX4JP%2FalqbX7Z1WxkrfFwg9XhOTWlc4oPk1RZs80OUCILkMvbPTwJiaF6DTsiCzz8%2BXIIjGMU2yH9tfzK1McE9MSUCeh8ZAvXPrueLxRxxevm0g4WoMJ0V%2BmLkvw7oNILMh8oAUf2Wjej0uhXN6AtwWx8AIFeGDLDPk6xfbRlEknxCtsuebWzySLOf7WWuOETPddr7MbxfLeGQrnJXCv8upJQTHo2AyexDIL4CIy6oPPuivgymKVs%2FouLEETOCpPS2RCFT%2BK%2FxK%2BMIiRtc8GOqUB3xUfeCoVmR5mN%2B8V%2F%2BrdduF110Hff%2BpqnJQqbtx%2FSUqHfG1G4ohjSJpX4ww6ThtSI6TO5mTExPCKcHSan40t3PzpW67u93ePDf%2FmOdpOqcqBqSB5zWyd8WZWxi%2FXZTTWmtlP93w%2FjUAmH0C%2BF8RFRN%2BC6DhWfBwqWTcOS3rb1gnEYzfBhhkdPfHXUDcAUIvHzxL%2FNh3OFqfAjOOP3ECd0%2FzgSOHN&X-Amz-Signature=210bf0db3760ba94285c3b0febd4dbd3c3ca697c40fccfc98e3f6dd5c6a1f4ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6MLJTJS%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpHFW2ux4Gdcy5Q6KGvvVKq8AJktfGgCVDCJNvlHG4vAIhALjGGQEj69xKGDzgQ8O1HikDwrmqeQ1IuQg0rsKOuowzKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIjq2uhdl%2BKEqY%2BWwq3APUMhKYFuMQFtme7NxEGfRRYIMDw4PGGADzCQ%2FRisQxwTrxBIDUibcH%2B03o5yNfGCPFKWi3KjH2q1p%2BY8mMASuKXKC1FPAE4uQTtz6xHCc4JjBDqokeyzKcJ3pTyxIqr1WYnS%2FlXygsUXRmgrBzHT1i96jXH71gj9%2B7F1fabxuf1ujhkqbfEEF3WVSPQ5XIdptRyST5kOw%2BqPime%2FNZrAa96ZMf9Hw11Yyt%2Bi1rhictD1rWSfPtAP0CYFS6AuJo2yJLqyrdDrq5OlAoAmg0N5RzRTarHHzRdkKo0aJfIuMDK9Qv%2BGGIbgFEXi0KuTnL3XvfbBnyT1Joo114buOSrtcrHUET9LobFzNPPFmxylpJMqsv7mG6%2FE0xGYg%2FTAokjl9%2F6c3auBZnyHAl0LszIQ9wXf1O02N45L7qSH8hjCUjKUodPNi1KixKHHy%2Fiho8qpdmVisxXa1NZc4ypKPjq8ULa9A5C86SMLwtlbsRm1XVQmjU7AXIs1RGVn68Rw5PRhAs5Q%2FB2E%2BBuWqot0gMYdPHl9Uvh1tP34MfS%2FpkoEhQQaPDKlKY2mycMSg9p6uB6%2BZs2lBN1DhZwKFwJvnvL%2Fw4sKhP6Aq18%2BgIjqmdcwSQAUzwUJRk6CRPmNG4YTDtkLXPBjqkAeOfDdLGUTFsv6giN0iurpkUoLOhENRa3zQvKVVOMYe%2FkTH62%2B%2FsIdieOqTVIm1YUjVvcuxglOAdOpAUAvAyVVXoVzuf4hIh8m1%2FcdArKI43fnqHukyJ%2FOgC0JC0m71INdVBUG%2FAG60wOOGHK9UZmb3kEXl68vNHWMf%2BLnf%2BSNgcNvBOzaFZa0MPdvChM0CKsoyrHHVVM6WxHPGOvQGwrwcPAA%2F4&X-Amz-Signature=47b497ffa64419f8f3b47d55720fac8a88b92c35af15cafefb8243551a87fc8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6MLJTJS%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpHFW2ux4Gdcy5Q6KGvvVKq8AJktfGgCVDCJNvlHG4vAIhALjGGQEj69xKGDzgQ8O1HikDwrmqeQ1IuQg0rsKOuowzKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIjq2uhdl%2BKEqY%2BWwq3APUMhKYFuMQFtme7NxEGfRRYIMDw4PGGADzCQ%2FRisQxwTrxBIDUibcH%2B03o5yNfGCPFKWi3KjH2q1p%2BY8mMASuKXKC1FPAE4uQTtz6xHCc4JjBDqokeyzKcJ3pTyxIqr1WYnS%2FlXygsUXRmgrBzHT1i96jXH71gj9%2B7F1fabxuf1ujhkqbfEEF3WVSPQ5XIdptRyST5kOw%2BqPime%2FNZrAa96ZMf9Hw11Yyt%2Bi1rhictD1rWSfPtAP0CYFS6AuJo2yJLqyrdDrq5OlAoAmg0N5RzRTarHHzRdkKo0aJfIuMDK9Qv%2BGGIbgFEXi0KuTnL3XvfbBnyT1Joo114buOSrtcrHUET9LobFzNPPFmxylpJMqsv7mG6%2FE0xGYg%2FTAokjl9%2F6c3auBZnyHAl0LszIQ9wXf1O02N45L7qSH8hjCUjKUodPNi1KixKHHy%2Fiho8qpdmVisxXa1NZc4ypKPjq8ULa9A5C86SMLwtlbsRm1XVQmjU7AXIs1RGVn68Rw5PRhAs5Q%2FB2E%2BBuWqot0gMYdPHl9Uvh1tP34MfS%2FpkoEhQQaPDKlKY2mycMSg9p6uB6%2BZs2lBN1DhZwKFwJvnvL%2Fw4sKhP6Aq18%2BgIjqmdcwSQAUzwUJRk6CRPmNG4YTDtkLXPBjqkAeOfDdLGUTFsv6giN0iurpkUoLOhENRa3zQvKVVOMYe%2FkTH62%2B%2FsIdieOqTVIm1YUjVvcuxglOAdOpAUAvAyVVXoVzuf4hIh8m1%2FcdArKI43fnqHukyJ%2FOgC0JC0m71INdVBUG%2FAG60wOOGHK9UZmb3kEXl68vNHWMf%2BLnf%2BSNgcNvBOzaFZa0MPdvChM0CKsoyrHHVVM6WxHPGOvQGwrwcPAA%2F4&X-Amz-Signature=47b497ffa64419f8f3b47d55720fac8a88b92c35af15cafefb8243551a87fc8b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUB5O4VS%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T232531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0oRUsNTDn4u6kAwNJ36txf9opwq5c2Vxooun1Fre8YwIhAO0PaqWFgE2BXvafxI0sswb2iggOSenOn%2Ba7aoVxiuuVKogECKD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzCXHoY7QFGofv4MAkq3AMytacazsOPniLSv8YWpU%2BYY28o9fQmjpE%2BrMVYwJhY2ggx1y7yZmvDvXYYl7TLZE%2Fcjfn68KxViWglXVy6jlQfNoZ0gK9VRcVpMe%2BIthkXuIsNmCDw7iXjs4k3fhAPaQSi98YcBxy7ZSvBcjFIFLblqx6qUAn24YwrNUtEge75sJcJV4wQzS4xWyCprSbAU4ARa3uwzurJaLp0a%2F7EtB01aW8OQqMAd3jRzqXPiftSo%2FTQnp0G7LT%2BuzaE9lmVv3RHKEDfVsdUicc1OYWY7yTfeepggEUztwuCnpVa62ypUSveWL1qYgJ32aqHK5AbOOaqZfctpeIXVIML%2BphYVF6Cf%2B7pYV0EmPp9I5uKWprEjodphV2j9o%2FW6UFIeobND3WbEfIPk0C8Q1ePylnMIf1Rs2dhjvM8p6NFXY5WiKK3EGh9Bvh4FhoW2md1szMGPhtpsvvDPHcVgK8E%2FzrJrSgNb3XMNLo1IsOBMjgtpLI9hfe4icWxvbKI5b5jM7dLA7m8eeFBfxxM%2Bc6X6%2FYA7JShOnykY5c3Wd4yzW73ovUomRRHTU6ygDxocI0T5Lg5taSfZZZX2ozYQ9M1X4fmkx7vlt6MJWqtKPLoMJFn%2BEqaQHV3R6v9JZaVpnr6MDDokrXPBjqkASnXNueWTK8eW4qAt6UbiQ2PBOOLQYllqK0Sc57oei4MZ0NeFZ%2FgFyPIA5ovWBHr1VA1pfvCYmBcWSoox0ul0J9liJ0nfWiOBEQxMzrI%2BMIlQ7ryfdw5muhTS2kYJ0O4SWMAbLTskqqvYvYiqfFDYtzZH%2BGqVgXVxyJ0fSJ9vhWENrNfLqrQN3TGfEcU5Bdx2JjuG3d0AN5nu2xLLCnT0NQfTNRd&X-Amz-Signature=9bc913000b8073a1cb43a9748b1091e95295a2774877619a14263c9bf4c4ab65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

