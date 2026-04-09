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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS2TAI2G%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQC3CgdCp5T8nfSVkSqnlJHtJTenP4Gw1lgGIMf4rHBHawIhAPMTkLMkFyiBLXzYpLRnBaA8eT6etzuu40ZlaHguoYETKv8DCAsQABoMNjM3NDIzMTgzODA1IgxDM7HPxuNihBtxRYQq3AP8ac7Tqhm9WRv7%2FuPQW3k4Ixx4Qm4FKz9DArZs5D19py%2BdtUBIVd0lrrOwnEUewKFwj5lvLIV12WaTLZsx%2BM4BfcD25EbBHOsKhxXu9XDrsDzhpm%2BXnAh0VcaBn73z8p4tOChC%2BeARBWlhg%2FozzHEsKi8Xyt2%2FBRoluvR5nitXoxNXcsmKhKIagrNbsjkqOR01d0mRzE9wqFBjj1VXb984nn%2BBZ88CK0Upyny4kdIm2IHv9k%2FDKUGh9M2zFtlYF5%2B2YFLbzCbrTOB7DwzxZRdE0EgBXqsTdjIoMmGGdev4GtfiZqdgc%2FlCgpdHpg2UScjbnsQL2UhN80wmQaDd0r%2BR5f87K20MHHExEo2OK0S1%2Bna7HGbJtM40VXx5TR1chpYnSApctoa45WvYvcEQVR7sT0tqrOgKTO6Xlwiyo3YbugsQkQJ1EUTcQ5PaC5IK7Xyj79vNOwycYzF%2FP39zC721SEy1OxTqyAr63eweCPCLWHwmuw5UB2To1T0HSpqQRq3PYR5y4bFzW63y8OlCEUT7KXvJWp3lgNI9eC8k0Z2ZSbIatBTMEj20mvhylpd8O1FlHSAHXsz1n370RGYRv1GlwyPeGCylXjHNOq1VTOXHGuYvuB9bvsx81pxUFTChmNzOBjqkAbuuk8mZbxpYz61JNC4LsGlqCsaOAQPKW58b8oUDGLxbgOM2MGuKo9iqEWtUxAG8mZFpAdNQ1BbPnV1S2Bp1QbRONQrdDZWwvU9ImptN8o5iWox6yQPpDdseMZvunzlp0d0qYU9JO2y7lo5L7QltNbNKD3bsPBy6jALH6%2BtO8r50nSXE0jW1qSKEFrAze%2B29d1pg70xeqH%2FgjdWbhm6cdaDSvbR9&X-Amz-Signature=52c3cf7ba2be918c8c5dd2a1be42b993f34a4962603a326d4b9838bc9e66d468&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XS2TAI2G%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQC3CgdCp5T8nfSVkSqnlJHtJTenP4Gw1lgGIMf4rHBHawIhAPMTkLMkFyiBLXzYpLRnBaA8eT6etzuu40ZlaHguoYETKv8DCAsQABoMNjM3NDIzMTgzODA1IgxDM7HPxuNihBtxRYQq3AP8ac7Tqhm9WRv7%2FuPQW3k4Ixx4Qm4FKz9DArZs5D19py%2BdtUBIVd0lrrOwnEUewKFwj5lvLIV12WaTLZsx%2BM4BfcD25EbBHOsKhxXu9XDrsDzhpm%2BXnAh0VcaBn73z8p4tOChC%2BeARBWlhg%2FozzHEsKi8Xyt2%2FBRoluvR5nitXoxNXcsmKhKIagrNbsjkqOR01d0mRzE9wqFBjj1VXb984nn%2BBZ88CK0Upyny4kdIm2IHv9k%2FDKUGh9M2zFtlYF5%2B2YFLbzCbrTOB7DwzxZRdE0EgBXqsTdjIoMmGGdev4GtfiZqdgc%2FlCgpdHpg2UScjbnsQL2UhN80wmQaDd0r%2BR5f87K20MHHExEo2OK0S1%2Bna7HGbJtM40VXx5TR1chpYnSApctoa45WvYvcEQVR7sT0tqrOgKTO6Xlwiyo3YbugsQkQJ1EUTcQ5PaC5IK7Xyj79vNOwycYzF%2FP39zC721SEy1OxTqyAr63eweCPCLWHwmuw5UB2To1T0HSpqQRq3PYR5y4bFzW63y8OlCEUT7KXvJWp3lgNI9eC8k0Z2ZSbIatBTMEj20mvhylpd8O1FlHSAHXsz1n370RGYRv1GlwyPeGCylXjHNOq1VTOXHGuYvuB9bvsx81pxUFTChmNzOBjqkAbuuk8mZbxpYz61JNC4LsGlqCsaOAQPKW58b8oUDGLxbgOM2MGuKo9iqEWtUxAG8mZFpAdNQ1BbPnV1S2Bp1QbRONQrdDZWwvU9ImptN8o5iWox6yQPpDdseMZvunzlp0d0qYU9JO2y7lo5L7QltNbNKD3bsPBy6jALH6%2BtO8r50nSXE0jW1qSKEFrAze%2B29d1pg70xeqH%2FgjdWbhm6cdaDSvbR9&X-Amz-Signature=52c3cf7ba2be918c8c5dd2a1be42b993f34a4962603a326d4b9838bc9e66d468&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466THSKCIDW%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDAunDavOli7P7%2BYGDKa3Q5m1HkKcbCf52PZlVEtCGs2gIhANNQoWj0jjPTnCCzQg9DSbmDEd0TyfYAqHbk%2Bznrnb34Kv8DCAsQABoMNjM3NDIzMTgzODA1IgyukxRaLR7uOYvuAN4q3AMke%2FUK3Vm3vSDpHWUUE4Dmz3J9QmDRiSuc6q5TJAOM%2Bh7NRmcHBfIgoxM2hhU8WzzBBH2GROKpQvHxYOUR81nVgkCzLGl8iV6QRXbGBaZpFwn4868oEVXaIZ%2B5DXoIoLcrwd0ae%2B%2F%2F8a%2BXM0mOb1z4ZIBDSkeigE7gYvl6IrjtP13XI4QAvt1j%2F17WDOZ2%2FMXh1InCIb%2BicH7M9yLQj1a3qFQTF7072Uhrq66AhKz4G9WNIwQ%2F2ZdtrWkIl2cdAsXtXR1FpvmDXKFu%2FTkXvFihhqI8ht891hj199HEG8rqSTKCIBwK%2BmWKVwFaxZ%2BbQ5I7kF7HgDz2vyR0CY6Q6%2BTEKPiM%2FEp0CJQQh1%2BZFXj0aH3ajhIB%2FXcQGHyNfRd99HnmVlXOIL9sN2%2BVY3HKvd56IqMZ3CQcjxdC5tMsmvLZ6puMEnaL9k4RcyZZOI0GkpmbcQ1UR5spJLBF9HlOzwfOeCqRcxft78kxXMJdq4OJaVst8R5oh5gs75X3me2aCLjxzfDnI2aq%2Bvuk9uo37HNHytcOtB1jpb9rFoK3shv8H5TYUjpZbEgg%2BKkWDJkUQu%2FCl5vKSfR3vwBi1rRLHGHPEkELEjgMs8oiuCTdY7cWYn3okP3dta7CQmY%2FFjDWl9zOBjqkAfdzyoL4M%2BNmGwn%2FJp0ATLtii%2FprxiP7PFsZNRlczQu7nq29k7urAy0ychBofWc20AD%2B10O1G5E0jH5PHq0XqUl9IfuWBH%2BUWcLIrUJr0OlYopcqts7mmQfW48aUa%2Bh6ma8TvSp9dZILsMfI%2B5%2BLfzVEkyxUheuofb9D4Wp6Xhe2Vc0NYM8QMcE2b4AddYtj8VMPczm4NGsGOGI3YKxCFvl0nBJO&X-Amz-Signature=4cecaca00a1a5b1957d27f6648e9d2fa8999ae6ee76b6d99973c222c1f15666d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633BB4SHZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD6f1cT6kmzjEQTfbY6sZERs1C%2FAIfxScSb5P7FnufXywIgP90In4p5%2FqWCbWrkGb7020ArxufDSP%2Fv04lfJFf5R%2Boq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDK%2FjFOoj0V3DUZJaJyrcA7D5R9yUteJuH9vyksb68vHZ%2F2AYZB8ssJ%2FS29Toa4TlrcNia1IZmCHLSbzXmUDmY2QEm3O7%2F6Ky3QNE%2Fptq6c6eKpe8w0wQnOUcQw9qYDKS9hic3ru1RRnrBEo8BW82sifjZVK96S%2BMC2%2FKHlgT%2FFZwnDjQ%2F9iKrZITJSkbNaR1D3%2FpTizDImVb6f%2BAhc9ChxjS3RK4yx3r0VKRrcARXV1MmAMh%2BsWivpG7fpBw3gterezFenJmBCDxSeb4s9pqEJTwTjwPQioOoCp4kq%2FXbv1IdO31sZLZmrLGPq%2FmXs0rqleZL6NnXEcBkoO1DWDI6c4W4gmuiGq%2Bnbe%2FqSeJJbpTWw49j78j6%2FqcMvE0xhUEhcC7tsBlLmKxqzcTmO6mVQF%2Fc2m%2F5qQnO1UBh1LS%2F6Zw14EHgPL6OSm8RTqneLEdybomSIxQj6Lx87g%2Fp%2FGHTYkROJKC%2Fa9aRckDtox3NFnkdhdhx1hNkuxd4OfCGZoGT4fqF85l8C8WNtjgUBjHBWRDgeW6gP%2FId44JDcw4JTYv9f6Fdc%2BwPhg5ZYUKpOsdZxPkV9p%2FYCDfQwqnHt%2Bm4YcpAEZS2z0u8PELDM6qwNOlPlBKrbaWLgJQMwMCfVlTF4ewSrJ7bRDUDwWUMLuY3M4GOqUBZvDmM5Vw1KDHyagDS0oEGY%2FM%2BK9GjIzORLaZSdt6E5jpateLCkQSoSwzRhagyk2F5SwJw2mL5hR9sK9tK4elNgX%2FrU%2BxSa6dw9uebhAjqXoqbh%2F3oDUaSjX1xSv3tYjHLlJYR2I9hl95bj%2FLM8T0gvA10VgyhHFtv98lvCO8tldzXnch%2BianQqSDjVGJ8RDqrqjQBt5cmb5kgpbD4OJLCfnPw0aZ&X-Amz-Signature=78737dce5b85efb3869c8a25173484212944223040bb0f60ec273cd65595ef09&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633BB4SHZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD6f1cT6kmzjEQTfbY6sZERs1C%2FAIfxScSb5P7FnufXywIgP90In4p5%2FqWCbWrkGb7020ArxufDSP%2Fv04lfJFf5R%2Boq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDK%2FjFOoj0V3DUZJaJyrcA7D5R9yUteJuH9vyksb68vHZ%2F2AYZB8ssJ%2FS29Toa4TlrcNia1IZmCHLSbzXmUDmY2QEm3O7%2F6Ky3QNE%2Fptq6c6eKpe8w0wQnOUcQw9qYDKS9hic3ru1RRnrBEo8BW82sifjZVK96S%2BMC2%2FKHlgT%2FFZwnDjQ%2F9iKrZITJSkbNaR1D3%2FpTizDImVb6f%2BAhc9ChxjS3RK4yx3r0VKRrcARXV1MmAMh%2BsWivpG7fpBw3gterezFenJmBCDxSeb4s9pqEJTwTjwPQioOoCp4kq%2FXbv1IdO31sZLZmrLGPq%2FmXs0rqleZL6NnXEcBkoO1DWDI6c4W4gmuiGq%2Bnbe%2FqSeJJbpTWw49j78j6%2FqcMvE0xhUEhcC7tsBlLmKxqzcTmO6mVQF%2Fc2m%2F5qQnO1UBh1LS%2F6Zw14EHgPL6OSm8RTqneLEdybomSIxQj6Lx87g%2Fp%2FGHTYkROJKC%2Fa9aRckDtox3NFnkdhdhx1hNkuxd4OfCGZoGT4fqF85l8C8WNtjgUBjHBWRDgeW6gP%2FId44JDcw4JTYv9f6Fdc%2BwPhg5ZYUKpOsdZxPkV9p%2FYCDfQwqnHt%2Bm4YcpAEZS2z0u8PELDM6qwNOlPlBKrbaWLgJQMwMCfVlTF4ewSrJ7bRDUDwWUMLuY3M4GOqUBZvDmM5Vw1KDHyagDS0oEGY%2FM%2BK9GjIzORLaZSdt6E5jpateLCkQSoSwzRhagyk2F5SwJw2mL5hR9sK9tK4elNgX%2FrU%2BxSa6dw9uebhAjqXoqbh%2F3oDUaSjX1xSv3tYjHLlJYR2I9hl95bj%2FLM8T0gvA10VgyhHFtv98lvCO8tldzXnch%2BianQqSDjVGJ8RDqrqjQBt5cmb5kgpbD4OJLCfnPw0aZ&X-Amz-Signature=489636f8df350f7206eddcedc4291d5eade5d5a48a9be5b96f81bf5e387975db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626QIAD4M%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIGTd3fsnr9n6I7iKS8DZRF8bzdT7uOxY2fGyRFybv5ngAiBuu4vVcicWG682vxXNPdoUGEUD0T930EWzNSWMNBob1yr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM7tAkDH%2Bx04q2zoAzKtwDmDYb2lBp3RK8lxN0wfcjQNL%2FBg394wFEAVkvDGccchIuHf0LlSc2cNaP5Q6vdHey3jWLBrmJLj9iE5dV3CPNQBiOkdQ039ALQZlRh09uOYNHXxAACxiBY8DrtthSBtuNYDOR90KyR1X8CK5y0qoO1AIyIKnXxYPtB1iJ2TVDPfQBxCHeco0BRofnp7rrr8WgjKEEpxNTjHU2rGbq5rf1cfcFUvP8fcA1ljW3Zw45M%2FZscrwxnBSwlCum3TybyzpERRqGznCIRH6dq30JUgbboQLRIiTCgfpQzt4TbpDJdB7j4GQjkV25VR09agg%2FdbFc6FqhfDYQ6JZTr9pM%2FZj3k333AqZoLf9%2B19rv82XDgbMj%2BhDseQMVvjJ4dul4Q5lz9jVF8KGFDXI%2FBRpCGOvARFCzlYAkc8XzH3GpJGGTNUMDJr2HucihTIhrlhar6Z7Hi5swGOq5l3afnlKce1JdDGO4NMXn80B1rRRAKeRsEfpw4tGRD5sIxOBjaZAKKK%2FX6KaJ9x9XB9VR%2F1u1vaQEm2EbW2OUMPa7sk0JnD1i3SJ0TKK%2FCuwYVY870SSXZfaPkuw8IawW7qmq%2FZO6D67nrpycec6Gv586eRd%2FIcrDQIhwxWPWG0Du%2Fb6o0Eww55fczgY6pgE7kDSkOoUhCmub%2F7uSVUAka5XasX6cjrj9Ci9Se4bJ9hRw183t%2FUmxOOWbM7BK3rcXn9M%2FrchHcVvZqQc%2ByIWUeNQH3k9jLtyrjmtnc0pb2S8SYRc427moRW%2FExsNtyQ7i55p6TqBX8mMI5tx8rKei4vxo8QCpBzFATVRxfiQay3VKbg8qro43ALZePc9PvutjJXA5l%2BOtXBeL%2Bjd%2B6AnHTKD3QbVu&X-Amz-Signature=869c98be0225dd55ba702ecefa5b62e816d0bb73667289947365c8028ec7dfbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DUNRHPA%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJHMEUCICp7tSXN%2Bq2ou2voF6qcDwPYF6RVerzORyqav%2BKfT9sIAiEAhEl68e2W7lzC%2BVKiaQn6KG4tHMYeI6AelNqXKwH%2F9xUq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDIfn8nyWCwUMQmGyRircAwkyPYcfJc9kVJwIj767to5Une1%2FT2rFQmZ4d9XKJb5pQamnOUAulJjDrzatMaw6PjNk3ARle1cWHiyMfMHZC28ULc7qtecLhHU7wtRRERFNkPbA%2BLIjZL9zWapS2MbxXnAQw1Zol37HeHlmKachZQv0t%2FbxEBQrTP73xLULEiiUMaI5fkVEQl1SOWMvZPMQDDM1NVEhyrwU3C1fADlJAZtj4YgtvPcnSRlaFPIcLr5nhSsKEmZcuBZuI5q8h%2Bu0gYlwKOLGBXNU7t1xwESH%2FZzl1MZd1Kmv3CjtyipWcZTCHXUwFKMS2wkMQXXJVltue31j637jA2SfkttV53FBAIS8MyQg1jAQsdqAeGOGzX4g8IRtASjUImthB3BEmhd3BebnqHLbXL61KmuBl07XOlz325H8w1DsOA7a3Mql80MJBEDPgwFv1GXmz%2F2RvrJ%2Fw01%2FBrB20cBZHZ29EyI5Rn2K9Y1DEKwu%2FfQnZ9F6g%2ByW8mz%2Fm%2Fj53RoSb0UkGcclPQX4kWxX%2BVeNvCsL%2Fe0oHVCJ8sKWitR99fpYTTmQeFw8EXBR4qfyGhWZMP4KaZOah3DsM9htSFZkhzdPzdMDLrPQALd2jG3XRmieubjHaMhZVAGaOBDkXYE%2BB3ELMOaZ3M4GOqUBJhfu1AP06KXGF53XW%2FcIZ5ORbB347Jp0DqhahkjW63ciz89e2LeL0rhkKieB%2Ffmk%2BrTwtKmb8qhMFtm%2BWDDUnTs%2FI7UdDJzcLsfiS2IrsGwZKJlDPc0Mlz8KsL8MkzkWS3DCOBejiZuXU6v6Ib2j8hkXhDfJ6zmWC3yp%2B0wN43FmIvkVsdmFJdQJwB8OAKTrQ92i6GqZqpC8nQ2RX8CGik2fx5X5&X-Amz-Signature=85712491bfb8a750eddcb240f688e93463f6cd00de9336dcb2a22f01f6ee43e1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSAPV7QO%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEMaCXVzLXdlc3QtMiJGMEQCIBJJ4VtpHVUAQY4L1oJixBROifEkr%2FplBNpF7orNVBJeAiA852t6um3ASPUwM9StsXpASOaGL9pGTcHKgV7WDNz12Sr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIMMKYNwPYdnfOH1aiMKtwDSm8id7Jm7YkVv3jusUHHPupSfNzY%2FEwwSTA4vQDILSS0HiMcg9EtrhoGp8P%2FUYljs%2F9v3iQPt5TcStNzEV237HATjuHMvw8uQQH9m3OKa4KDn8dH5H%2FiPwq%2FlMnZZwBsKQphdUCBSA%2BcvHM963%2FBjcIA7V3EmFnEgL4dZzq78SofbIdx5iTSmUcWlgWOND3v3Th3ujlEFIhCcw7QdrpDHiEyhRNMZNj8FPbTcAsHWJfSqaW%2F%2BZG%2BKhCy4MaWF7rMkYRv7aT0MEoqaIela01v6XkTnrsu%2FhP5iTrm1JU7laHlmTlRqf5Xnn%2BHtIemEByewKG4ipiNWoKPIqO97L5RbIqcCoP0pyRO338Z1ClbZriE0yPLPwS9zN3CvyIzLjqFW7VRheaYfFrMjcMJ3ar4VTPk4Y7JL8J6aQxJ8vCuBRd03pLc6bKEr9T2tZNIfLXMwpxaa7v9%2BmaZrZ9isgKGsP9fWZuwr3YxPPQDQI4JtWH6oGf4jWyJ71NDDGHz0EWLsfGH6Z%2B0mRAXmuhCpA2kVx6jeoTV0L4YGx8CZvIi77srFB9R4Hgd6AiowkQvqJZ21uNyBOEcgtxA4LWgaj7ZNLVSSKzyobkh%2BqBaGg67ES%2BBL9oC7rBtR3xFrXIwgZnczgY6pgHoDJoLOG9aZwPQxMqdS0UMNJj9IWYNJ6mboU6esYTlLlUMXvEWPgEzS8a2zkfs%2FOP%2BPWUb7Bxjq%2FB48OxEa2yCjnssjsnUEdudqyJBKe9fpXIEzr%2FWh9hLHY%2BTlpw2Wtn39%2F2NmF4JputSCPEzBHcqdvlbjPd%2BBE5YyE643hf41zgwkJdV3C5PgC5XU9SnduIdVO0TT9KmGrvr3Fr75GmkHBz8L65%2F&X-Amz-Signature=114ffdce84ff253d23169e1534dc7db32723a39988bdda441080b98a12231eda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3WXELTZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDrQFR04d%2BR%2BXfShz1oPRHtjVej2CQKYxExALmiIqoFJwIgcjgB36DnIR3K0s%2BgxZn0V1A6%2Bm%2BSPaYGfk5fAsfECQ4q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDIRPY7lNz%2BJfdushrCrcAxcxaoIgz4OOWAxFFlH6QWH%2FSI54AIS%2Fddm5dNMO2V3j9hGLPw%2F%2BK87ouhnZr1yRs9rWYYU%2BgLKikP2JnM8D8GaW%2BakUcAwgeX%2FVO2V%2FdFofbRKcKI7oL46WZxeMGgWILxOkL1OT151TLOms5eXyprxnlXTg%2BJ8DakSAlcW9Nr9KPdzv92R6oT4b4XDreylw202VL%2BT%2BTMoXB0r9BM46Fj3slPIilrBEamHX%2BM%2BqMyWsY6kaYMLGlDOOqg4zzHfjZtnQtoP7qWSNFisl6lj8RXI26sjzErckfmg5Ja6gSUQOm0yf3DA4r46EOJBgbv9mD6AVPWiIZCUfT0vTBUaSVIwnoDT0CSQsjz2L6CKdacBEVYz26YJ7DyRcbjOwdQ1vPpGsS4D952JD0o5bKvnSn7N3NT%2BBjiZ3xzLsJWiaZMjJ7sBHpybV0XrFlokOLpbN7YXnXSOB17fIpqUPU7pJp4W736tnC4VLnuAVLUIxd%2FNYv3p3unYlzZgVkqTK9Y94gMZxvpLf5X6VPyWPrfl4zuVqyIKQcu6Y5rZddMZ75YOQ8PJgXtug3b0lXAQq2QWEVqUQDYL7q1WJPlKR6YKd5Uxcw9fIrg8S42HdTKzUS%2BteMoM21o%2FaB3uN3FklMLyY3M4GOqUBRiA3ale5TiwzAFWRTUwhdBMF6kN6x9om1kM2YzEKC3EpeZIHDz51Qqv10MCZIN%2BquhN%2BNZTbbgqa486bldm7Vu1uXn0hS8qhNMuVZRcA8yI1%2BbAuZXBXtCcyDZYm6a9cnwKIkmo6jRoQnGVTN99lVbU5cOeNIlJGxJzsKLpOcVuFjHz7hsTLweQzZIrDuSNWjFw3xVA29bdysXXotjGTbLpZa67W&X-Amz-Signature=2c4997383898d097cb8e2bd96bd9c79273cd56e7e990238dc29644c6bf9aadb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3WXELTZ%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDrQFR04d%2BR%2BXfShz1oPRHtjVej2CQKYxExALmiIqoFJwIgcjgB36DnIR3K0s%2BgxZn0V1A6%2Bm%2BSPaYGfk5fAsfECQ4q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDIRPY7lNz%2BJfdushrCrcAxcxaoIgz4OOWAxFFlH6QWH%2FSI54AIS%2Fddm5dNMO2V3j9hGLPw%2F%2BK87ouhnZr1yRs9rWYYU%2BgLKikP2JnM8D8GaW%2BakUcAwgeX%2FVO2V%2FdFofbRKcKI7oL46WZxeMGgWILxOkL1OT151TLOms5eXyprxnlXTg%2BJ8DakSAlcW9Nr9KPdzv92R6oT4b4XDreylw202VL%2BT%2BTMoXB0r9BM46Fj3slPIilrBEamHX%2BM%2BqMyWsY6kaYMLGlDOOqg4zzHfjZtnQtoP7qWSNFisl6lj8RXI26sjzErckfmg5Ja6gSUQOm0yf3DA4r46EOJBgbv9mD6AVPWiIZCUfT0vTBUaSVIwnoDT0CSQsjz2L6CKdacBEVYz26YJ7DyRcbjOwdQ1vPpGsS4D952JD0o5bKvnSn7N3NT%2BBjiZ3xzLsJWiaZMjJ7sBHpybV0XrFlokOLpbN7YXnXSOB17fIpqUPU7pJp4W736tnC4VLnuAVLUIxd%2FNYv3p3unYlzZgVkqTK9Y94gMZxvpLf5X6VPyWPrfl4zuVqyIKQcu6Y5rZddMZ75YOQ8PJgXtug3b0lXAQq2QWEVqUQDYL7q1WJPlKR6YKd5Uxcw9fIrg8S42HdTKzUS%2BteMoM21o%2FaB3uN3FklMLyY3M4GOqUBRiA3ale5TiwzAFWRTUwhdBMF6kN6x9om1kM2YzEKC3EpeZIHDz51Qqv10MCZIN%2BquhN%2BNZTbbgqa486bldm7Vu1uXn0hS8qhNMuVZRcA8yI1%2BbAuZXBXtCcyDZYm6a9cnwKIkmo6jRoQnGVTN99lVbU5cOeNIlJGxJzsKLpOcVuFjHz7hsTLweQzZIrDuSNWjFw3xVA29bdysXXotjGTbLpZa67W&X-Amz-Signature=f693f2328c03cd4df2ce5fa4af8ba0955f73963831b8370fb740e30b4812e8e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QY5D6EKP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDhsLZedJ8Sd7gkwsNXhcbt9nCKf3vLggsUy5%2BXVCLHxAIgSvn5%2Fzds4ZN8TICsJQtSptatn0C7Vd67xvEKnV1IDrsq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDIRbMICHV4YeLhIg2yrcA6ZlKJOktLL7%2F56C8DZY%2F1P1jy8jM7GTVwDONXKTFUqjsQtQjCVfZlejy4a%2BxS3bwhX3S6n3rohLSlxS3P6HYfBnnsxb47MkaAjnE%2F85x9FYG6p%2BqdtjJRPg1nfl1HP%2BQQRZ1gGuLJUWd65tz%2FBu5JrY9lR%2FvTXFpOjNvDcHh7BeeeIKw%2FOQyDVylGtAWk7K58uciH9o1JWwluB4%2BHqgfzVg7hJNFRCmeRo%2BE37eocX%2BV2b8hmLM9ZH3BSdMTeIwHAsW9Kw4XvZH53pTl7SVmzxm1RFmjwxWwCU8CiVFlJjGDcqKivbMHiLV1khFKXSS0K2sl8g7emKaJS7op9Z1IkW3qrxct%2BPUrqNiV2s36lKaEfEse4jrj5gPx%2Fl9snm0Ad8hmhOTtuIZ%2Bw8aCvPPwrvFLdSyMY0G74tbgQEkd536Rh9mYzovdOcTLeMCZYu2EFxpt8juonaQxzu5iJ47bof0SkHhv4Cwo8FTZ%2F8bz678tAHD0198V7LRXNHQ%2FsmKSlLYQh0Hq0fU3CJbMFenWw21F%2BaFFelBxl7cxlQDr4RsPtTVaYicGZRtjNbCXQq6gUtGqhZ28TBND2sgi0EcILyZeKLpApyQ%2BbqpCfOsIRFx1vBRD0DkEq35hgDxMJmX3M4GOqUB1OWlO5fPLcWe3lV7ntzItdGAl9OtkDF8Z8YOXTf1jkZys%2FvgDJylbJ3YTsC6nw845Wt6FiOIeQAhC3BxjYFT0ZU5fgZDlm09G67WHOBLsrxPLfVc59JKtfJNU0jgecY18U4hUYHSTNRlwizmxvE8H0HGUvAM1A3CpzsUG7NSw%2B9PYkECZy7IUh50pK3Cn%2BhkRuho36V0nJsqjHnyhXDqezz%2BrNzt&X-Amz-Signature=99aa4742bf5d53b628ca271d23922597fc948a09a1feeb5bc57b96d08ffdf0af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656ZWPQLP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD%2FRnDj8elSZ7%2BXOTNzlYyhXFOo8TJBn0FHbclsdAjJxQIgJUr1e0F3J%2F1YKxW3EqASIlM1PF5G%2Bq9%2FGdGZZzcahiAq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDGHwKnHd193%2BXPyzmyrcA84oUtY4CUu8L5wHaWvGTt45LhslNSs4SE6%2FtFQUY%2BOlb3riHCFD0oDDgjcMMjXLhpmsxjlzzGCw3P7tJGQrBnKQrAAzGntq%2FQRF8WceWyJ3dTNZresF1RI%2Bg6BH%2FoboQ93eBcVkwEimJFUyRZ6mvzKTl1qKLIq6YZNUJ2TRGP%2FhgQYT8eIIoFJOdK%2Bn9h8s0ZR8kHVw3nhbyntPk0EIUmFuLETayZp5FgcKu%2BwwlIK7KVWdEsBSwL5%2FmtMw%2Fc6DdjWdEuebEg6vAMXNmD3e0326VgwRBErBsP2DNNaBfOSvTn9zzPynafnlNRM9ljLo%2BNw42VsSQBRVVd0rXg5TrMdBzXbsLVsXf8wKbYi5ggFcevUIHnVqCqw8Z65vscIx%2BXj8QZl7CAKNEXUKakxsW3GxZ3%2FZ4rRtXj7y9QaJPeLMCChG%2BYRlmYohysaIl6%2Bfd3daNyG2t4z%2Bmkh6yUbRIXtSCl4c48FtDZ%2FnZcNMIMc4XQsZ1n5NwegsVj4eoZSlEd954k0Wm2sMjEE%2B8QEq9%2Fe%2FBO%2BjTalDRxFBOKrT3IYgVbs7w5Se6h11%2BtsgPLHO8p5Z%2BtBMkh%2BicGEEuUXLzln4qFJYJd4dbueoWDIJTvypgPO5zz1SzDUtXBzxMPuX3M4GOqUBE5o1R1DCoFy52cROW56LbdVi%2F8pYm9Ze5yzKp0HPsSA7p8W7HVNIrwWSNR%2BEXOct7xiKEWagCRi0m9E2KN5vgyj9i4PJRzIzerlmEkk5i6DJqjeoHWqxpY29TePFSmac91f2QWMbUmDxGpiI9n4ZodqApTgDgJWFPs7jdQAs5zRA12S2OAcAF67Eote5egI8dT6DocbQ0FRJqMrXilNqiPRMcofy&X-Amz-Signature=b975791dc3ca2d9d286019fe0a43d7004525dac794d62e409283b054369b59dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656ZWPQLP%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD%2FRnDj8elSZ7%2BXOTNzlYyhXFOo8TJBn0FHbclsdAjJxQIgJUr1e0F3J%2F1YKxW3EqASIlM1PF5G%2Bq9%2FGdGZZzcahiAq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDGHwKnHd193%2BXPyzmyrcA84oUtY4CUu8L5wHaWvGTt45LhslNSs4SE6%2FtFQUY%2BOlb3riHCFD0oDDgjcMMjXLhpmsxjlzzGCw3P7tJGQrBnKQrAAzGntq%2FQRF8WceWyJ3dTNZresF1RI%2Bg6BH%2FoboQ93eBcVkwEimJFUyRZ6mvzKTl1qKLIq6YZNUJ2TRGP%2FhgQYT8eIIoFJOdK%2Bn9h8s0ZR8kHVw3nhbyntPk0EIUmFuLETayZp5FgcKu%2BwwlIK7KVWdEsBSwL5%2FmtMw%2Fc6DdjWdEuebEg6vAMXNmD3e0326VgwRBErBsP2DNNaBfOSvTn9zzPynafnlNRM9ljLo%2BNw42VsSQBRVVd0rXg5TrMdBzXbsLVsXf8wKbYi5ggFcevUIHnVqCqw8Z65vscIx%2BXj8QZl7CAKNEXUKakxsW3GxZ3%2FZ4rRtXj7y9QaJPeLMCChG%2BYRlmYohysaIl6%2Bfd3daNyG2t4z%2Bmkh6yUbRIXtSCl4c48FtDZ%2FnZcNMIMc4XQsZ1n5NwegsVj4eoZSlEd954k0Wm2sMjEE%2B8QEq9%2Fe%2FBO%2BjTalDRxFBOKrT3IYgVbs7w5Se6h11%2BtsgPLHO8p5Z%2BtBMkh%2BicGEEuUXLzln4qFJYJd4dbueoWDIJTvypgPO5zz1SzDUtXBzxMPuX3M4GOqUBE5o1R1DCoFy52cROW56LbdVi%2F8pYm9Ze5yzKp0HPsSA7p8W7HVNIrwWSNR%2BEXOct7xiKEWagCRi0m9E2KN5vgyj9i4PJRzIzerlmEkk5i6DJqjeoHWqxpY29TePFSmac91f2QWMbUmDxGpiI9n4ZodqApTgDgJWFPs7jdQAs5zRA12S2OAcAF67Eote5egI8dT6DocbQ0FRJqMrXilNqiPRMcofy&X-Amz-Signature=b975791dc3ca2d9d286019fe0a43d7004525dac794d62e409283b054369b59dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC3ZZCCI%2F20260409%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260409T034246Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJGMEQCIH6acKo2aUlKIoJEN%2BnLmOGlUh4B6UmzK9c5Z9ygoBU3AiAZO2fTWdwjFoJiZuJXjFlLvi4JV3ZDJkx1pwnvb90BrSr%2FAwgLEAAaDDYzNzQyMzE4MzgwNSIM85XI3cr1nvfXeDsxKtwDNH44sOx6n3KFrWeZodBqrrq%2F2x5zIpbuHxWZ1l%2ByMhy54B3ke2NY%2FqAGgrhzdJKgAsniS4kYpaUyRTMv8gOBCzMih4F0z7DbmxCWl7vvGNTVIyk47%2Bllb%2B6Z8cdIuxYXcgEppXojHWjuY8dPkt7WtWAmH241h5oNCdUId9aWK59uZW0eqrGy4wKgM46DpBIHUsFlRDL7bTJJGaDZ4lCPDjqEtRoeZgYk7IHf9sBl%2F2YUt3ZLM99Ple0Gh8xJ3R5KaQ8fgJVkevWGxUNN9OV92uYzLI5L7D%2Bf87KdHLgMNCVUQUbWDaCMIejkmfHubfb6jxMinae0wFXsLB2mJAfiLCnr%2BC%2FCcURA8t1LQHard4XjJWjgA9S4Ns%2FMfXIMGnGMUHINVeCxGpGrJiG1NvLuVVvx9WNOFqiifXHe%2BmsquhtvQjO5uaG043TgCsyK%2FCVkFG%2BxyuH8a9TrDwB9xxeUyQh569uAvCdpV6YNhSDV%2Bi9sHAUodYaqj0ZgNJ3lLstMW6eEoJxAJn8xa7FZD1Ew09irDrC4K5vZjiWMK2wV6qq9fujqXOSfgzRcmhKVL7KuLIVS%2FmfGSuhVtzQWIC%2FGVywjSxyW300f3pYt2qBuERnKhG%2B%2BoZ2Ymhk5w%2F4wjZfczgY6pgHgc%2BBSgGH8BKXCWcLxKbVW5mkkIwVq6CGNu%2BCaFGf%2BZ7PX7RhsNW8eBZSeK9UPDF9zW%2FaoC8%2BiDT3G6eCKDQA%2F28P3gzyu1hi5cE1NGodE6vKzk4uijvcmLVR9avDZP9yJx8BS4%2BmAIDRhZvZjpyC1s7TpIj4QbT52hXyf7iOQ2GEw6yiAoRISHz7wHtTMhYWE9U8KCyxeSi9ujnu6r9bWbLQ7GQEd&X-Amz-Signature=a83e7cea7aaa74a4d12b99755e8b2e21e0b9199dca98b1dd7dec295a8a235739&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

