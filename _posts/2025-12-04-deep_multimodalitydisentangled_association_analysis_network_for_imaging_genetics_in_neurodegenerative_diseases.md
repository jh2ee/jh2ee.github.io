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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL5CYTOR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCAmO7%2BRPlmhO6hxAJTO23AqqBTLOcnXNUUNfn8DyDaLwIgU8cH%2FEbJJHLdsG5BzJrKaFmvUcm02kvE9HTqV9V9bSkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDLVhfUbvnt7iAPFNVCrcAxzs%2BZxCXLem4T4EGxo%2BA92q6s75HNLNnDfiyqv%2BlLHJmXh4RWjNwqGGrUPgBjLAOr0KlNQ5KM0By86JJB1wZFqcEqh8P9SpXVPOQFXJWZojr2hDFqe81l6qRW7x9HOmFRy4v73J0EmATyPqUjBOuuvYx9sm6gTwaPj8Jn8FYr8lE0N%2FCzfPCFaOecwgH3rhw7QvuwQVjvpOvT8KfluY%2Bh5f2oBTaRZz8cOgDXuItncsFckpRCUhmD544QuYVUimr8KX5dHlaYyBuT4%2F9OVQ1k8pF6YQ30f6ZoEhnmCb8KPDd4r6qdFHstcrCbHX6aNfI7NTEPG5etdpPQmRvoqOybGpZg9iyryF1%2Fzpuj5MnCfonTvsfWtUdZCsXo37Bw2wE4d2v24WI8cRJOn%2BJnKr2Wg9uG6nvNM%2BaNfjrJanV%2FXS5rqCdw%2BpC6IRlTMZHSqSyA6OxfR6erPYUnmRVokCJzo2atnLLS8Mf2iJrjG5g6E8HtBAU2lEFYoTzsohMjHLAV0OiEjfTI2bqrPKF0119PVyXUEJWOF%2BkkGiP3WOBImcvJJYDwicwrBQMREM1zyvwLFmxa55c1qVr6rYIYfjdaoWphdAq3G7beISFkfPcxPPXRL6Izi1begWWL9%2BMOPt%2B8wGOqUBsfSjbWBaubHPwcd3jntHi1HLQu7p%2FjyqeAnZup5TvntgyDAPZSs%2BBTNGK1%2BmOXNEaSkHl2Rdta%2FQYkDsumyDtAiUkqoswlBQLj8ijKoYH%2Fts2pQgvlOMGkgyqX837M9myjX8a%2BoH9S2HCApFDs99EK2xQZIKGsrPNBPEC0dMGqshE13GK2CMV0A5D5loXEBvP2aglNbBcLqN9syrHxgKNl0fqawL&X-Amz-Signature=a7d692aba61c3b424283d8a58df07794b2ab30d33ee8366481e8a3252c3a2749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WL5CYTOR%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIQCAmO7%2BRPlmhO6hxAJTO23AqqBTLOcnXNUUNfn8DyDaLwIgU8cH%2FEbJJHLdsG5BzJrKaFmvUcm02kvE9HTqV9V9bSkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDLVhfUbvnt7iAPFNVCrcAxzs%2BZxCXLem4T4EGxo%2BA92q6s75HNLNnDfiyqv%2BlLHJmXh4RWjNwqGGrUPgBjLAOr0KlNQ5KM0By86JJB1wZFqcEqh8P9SpXVPOQFXJWZojr2hDFqe81l6qRW7x9HOmFRy4v73J0EmATyPqUjBOuuvYx9sm6gTwaPj8Jn8FYr8lE0N%2FCzfPCFaOecwgH3rhw7QvuwQVjvpOvT8KfluY%2Bh5f2oBTaRZz8cOgDXuItncsFckpRCUhmD544QuYVUimr8KX5dHlaYyBuT4%2F9OVQ1k8pF6YQ30f6ZoEhnmCb8KPDd4r6qdFHstcrCbHX6aNfI7NTEPG5etdpPQmRvoqOybGpZg9iyryF1%2Fzpuj5MnCfonTvsfWtUdZCsXo37Bw2wE4d2v24WI8cRJOn%2BJnKr2Wg9uG6nvNM%2BaNfjrJanV%2FXS5rqCdw%2BpC6IRlTMZHSqSyA6OxfR6erPYUnmRVokCJzo2atnLLS8Mf2iJrjG5g6E8HtBAU2lEFYoTzsohMjHLAV0OiEjfTI2bqrPKF0119PVyXUEJWOF%2BkkGiP3WOBImcvJJYDwicwrBQMREM1zyvwLFmxa55c1qVr6rYIYfjdaoWphdAq3G7beISFkfPcxPPXRL6Izi1begWWL9%2BMOPt%2B8wGOqUBsfSjbWBaubHPwcd3jntHi1HLQu7p%2FjyqeAnZup5TvntgyDAPZSs%2BBTNGK1%2BmOXNEaSkHl2Rdta%2FQYkDsumyDtAiUkqoswlBQLj8ijKoYH%2Fts2pQgvlOMGkgyqX837M9myjX8a%2BoH9S2HCApFDs99EK2xQZIKGsrPNBPEC0dMGqshE13GK2CMV0A5D5loXEBvP2aglNbBcLqN9syrHxgKNl0fqawL&X-Amz-Signature=a7d692aba61c3b424283d8a58df07794b2ab30d33ee8366481e8a3252c3a2749&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SE4BIKYL%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIB%2BZmnf8UeMKm06Pdp%2FwE0g6Hrb9%2BueoVd20guBJAKbeAiEAoXI%2FhUCVJJxPo3jYMfrEPyHFBVXpXMiw%2FXUZ%2BLIscxkq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDBot0seisP7cv6PvrCrcA5UYnj3IArQ9BO%2F2Oua3fFs2H7GY7ZtlEbVvOd1zGB7vCZQm1RJEn4bGapLoC%2FBxIKYm6OQMg%2BJjONBFEnN8wrbw%2BSM0kjY5PRGUoscaipHRN3raWsCYYjvVVIR9E9ddrTDL2Yn1NnOKqAiX4pqJqyfPDCqVT2WtoLMZmQ5G9X7121vRpCEGAkgfTULYJrUtBlx00gFYa%2FlsLjVAlD3aAs2ZGFwtjza92ubkd6QV8p5UmGdxWYNpLxbjYhU%2FhLqCCVww1JZSseh77x0GfGLYlywobIxmZgqO17r98GhyPjBFN5z%2BB1sSDIHAamLaVOHKAj%2FiZBjGz1m1Um8C02KIEnNGA%2FgNEkNwKsuSkOir7z8YxkOZcplORhRAeq2tv%2BqjOmuzFRmeaYOkKPv06sl%2BsUDqV6pSiugH9%2Feilo1kKDwd%2Btgs%2BIbJGu7Fmunmo3nymVJDQB5NSmgekIPGPiQzVO5n34c9xSo5lyCfOVTs5BqOGiQ5dXpRnpNBkoOLfh6G2CMhbzTEgk6oUshUqkP8fZ%2Bun1TUJwp8nT2MwIcrRU5aKGLW2uuO2iZFGEX4Gf8g%2FHi1KTP6onJ5Ch1RH9lSGzRcLf4kr1HI5xHSyjVw48knYGw6cyWwXNV2QayKMIfu%2B8wGOqUB0waHZGUAxnBbEmo99coLqz4ULnnBEzFF8ZJI3VrhOiw0SjhX0K8OClFKKpykwXdEGOTycB%2BJdSbO5DJ%2BXYl6%2BMeCNIRdFU7%2FeYp2AaqTRfhcK5n1mK616%2B60p6n4hTbDeB2DI1qD6TFnOBzItQtAh%2BWqyRrSYzkBWTtp7Gj4qrqu1ElvCb08G7EjRUpxz3rHUDyQv2aiW%2FleJqlH54okqVkrd4dc&X-Amz-Signature=25420a91b5b55f379cfbed0f169227e2c8a56a077237b7f5d66e3addd4fbbc98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOKJA4TA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCbIkSLHAS%2Bxnvl5crbst7AnvXqxC7mZy8g0pspAZp2bwIhANoFUuVdTcpB8ZUAFKdGzG8ZP%2BmLqqTLUcK3E%2FCgnR9sKv8DCA4QABoMNjM3NDIzMTgzODA1IgxY7pTRKLaEMLwailcq3AMcEXTr1HS%2Fi8WIgNZHGVK2t%2BT2karLwZl2CCPJKJQ94q%2Fnv5y1WIL20ahHCOv89MT6f%2Ffxp9X4uKvJq7d66Ln3sGbP%2Fz%2FA6NG40qLj8zFkNPc8qH%2BLP%2FQTs7YzALj%2BMxYgaYuWI3SAojsCTXRd1klNEBoir1L53YoZ4RV6nvq4RYZX1%2Flas%2BVoeXebW6FtzSTkcIu5PagfZJq7ojPUFd39QLDKVBo8xFWWlDG8KyUuvQdMHYxoOZys457o1v4eNuXPOQbjyT09vcPHjlG8zV6mKBrIUBSAsHsKt5isq8CpG58vDuuuNbBFm8AmHqpAa0Ki%2BppjBhOZ2ihbJovlJX8mUudk1LcLB1%2BanztFYKF9HqoaJSy6ozzTm7pBV1M%2BvxFPFJ3lS19Cc1XmPjLLMEwbpJ7Shnm5isuWG2Qd0%2FHUHKt4%2FuQOdY6aXSn%2BuMaONrEMxvRdcQpnLzmN9h4m8jnOJMGrmZhcscGhx44O6PTUDLvDu7HbPA%2BqaHdwaUrleIVh2GsIpNrWXCdS5xC2YU0U0ob0YGKsDRWrTGGhjiOnaoTaX3OWtoPrdYYTx8R2EDz3ARv6evnLJhEmG9m%2Bf1f%2FgolNNqSIMVN65SBnj65ip9ifHC0rdcnnwhFM1DDj7fvMBjqkAcN8c7kt6raWAC9RkuM%2FuNBbHap8PJ44lEDEDfV8jfOccjn7PNQlOlfWRnTEUbpKCB6ySc3UkC29pw4gT5pdrHynSQJTnAZ1bNyzZNTrJ1xgSV80Z3Fu1KqU8CqLoQXaKvaYstLmyzAU0b3nNHmrlgD4sCzgDWnF%2BWAVFEM0D2zAXR1ADb3y%2BqvnBWt1yCNO1ztMrrTAMWHFVAeCvbqqHyirw2do&X-Amz-Signature=3ad56c7b216c6e3cfc730cdb257c0669423762f0a5f9c0b36c566bf057ee8ce1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOKJA4TA%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCbIkSLHAS%2Bxnvl5crbst7AnvXqxC7mZy8g0pspAZp2bwIhANoFUuVdTcpB8ZUAFKdGzG8ZP%2BmLqqTLUcK3E%2FCgnR9sKv8DCA4QABoMNjM3NDIzMTgzODA1IgxY7pTRKLaEMLwailcq3AMcEXTr1HS%2Fi8WIgNZHGVK2t%2BT2karLwZl2CCPJKJQ94q%2Fnv5y1WIL20ahHCOv89MT6f%2Ffxp9X4uKvJq7d66Ln3sGbP%2Fz%2FA6NG40qLj8zFkNPc8qH%2BLP%2FQTs7YzALj%2BMxYgaYuWI3SAojsCTXRd1klNEBoir1L53YoZ4RV6nvq4RYZX1%2Flas%2BVoeXebW6FtzSTkcIu5PagfZJq7ojPUFd39QLDKVBo8xFWWlDG8KyUuvQdMHYxoOZys457o1v4eNuXPOQbjyT09vcPHjlG8zV6mKBrIUBSAsHsKt5isq8CpG58vDuuuNbBFm8AmHqpAa0Ki%2BppjBhOZ2ihbJovlJX8mUudk1LcLB1%2BanztFYKF9HqoaJSy6ozzTm7pBV1M%2BvxFPFJ3lS19Cc1XmPjLLMEwbpJ7Shnm5isuWG2Qd0%2FHUHKt4%2FuQOdY6aXSn%2BuMaONrEMxvRdcQpnLzmN9h4m8jnOJMGrmZhcscGhx44O6PTUDLvDu7HbPA%2BqaHdwaUrleIVh2GsIpNrWXCdS5xC2YU0U0ob0YGKsDRWrTGGhjiOnaoTaX3OWtoPrdYYTx8R2EDz3ARv6evnLJhEmG9m%2Bf1f%2FgolNNqSIMVN65SBnj65ip9ifHC0rdcnnwhFM1DDj7fvMBjqkAcN8c7kt6raWAC9RkuM%2FuNBbHap8PJ44lEDEDfV8jfOccjn7PNQlOlfWRnTEUbpKCB6ySc3UkC29pw4gT5pdrHynSQJTnAZ1bNyzZNTrJ1xgSV80Z3Fu1KqU8CqLoQXaKvaYstLmyzAU0b3nNHmrlgD4sCzgDWnF%2BWAVFEM0D2zAXR1ADb3y%2BqvnBWt1yCNO1ztMrrTAMWHFVAeCvbqqHyirw2do&X-Amz-Signature=abf02af3ff42add88c44e3550f580c3b0210d735d7fcb04f736d84b31b01269e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRXVHNW3%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIDFtrJVUofkwBr6iYpJ%2BPGxUXKKqHP5unWb7Y1WJ8KKfAiAFRm8qE8jortRvCmo24lGn68SAYDqBy3163UGbmH0doyr%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMzypXlC1fW5fcocxLKtwDSXWRWIvbdpPLjOyUJxHhfGQB3rtVLvrKPQzT0sciddJPl9WWzHb55J7KDiuhNmwMVcF8Yokp83cTASvZy1HZgE1faVhqeKUZBMlrw1wP9pxo5xxN6tCGUlP2NVcvjnk6J%2FY1aUR1UVFj%2Frn8pXVoG%2F77FdGzkBSVKnEsFIgVaGyQP47n83EJXTIMg80uFyvzrTKZImJI2WUJDuKGMsszLh65DYaJnmKaTAgAhC8UgXoFrXwyQLdsaU3NMJ5n0wH1SR4nyeXt%2FWoTL1RFqpVSFSnndKqdHmn5qYbxH7CwmD2jzVHRk1w2QaSwdLpw%2B067rgXojzwWMjDRVM3TexlD9TTJFvMIq%2Fc17PnqEyWVtMt62qzAPsEQfRW20zX7OWnu0hsJ8P4ouYl1yxmhsxwGsLvtdc2MrOxzzyK0tW9PQecCWudMODe0xdau%2BWE4oesf3z7TBcSIvvqFEcjNh%2BgmksJAytiGwoFuLCRbTZTNa57TWJZJUcm2zN12Z0lmbAqSKUhAwN%2BCfCMvK6X6NRt7%2FFAv06h23zVWh3YRsuuwwHqq77Ovgq8n%2F3Y1uXPq5Y6X95crygn%2BzItG4V4gaoxiOkmaLTAPuymOWcz8JdBGOi%2Fuq6TzC9poJWEheIowwu37zAY6pgHCEGFke%2Fj0OMSnfcptiIpvK03OEF7h6QeBZ91XI3bw%2Bpxz8yGAHd0OKJhsJsyfGohoRFtYzATx3XI30rVt%2FX%2F81AJdbtFAVHErjUdjV8wbPNYE0ni47ZscW3OKI8a6mIevpTUHugE4fShPa6nJH5YwVs19%2BjHcYejBrhHSKbe%2BPAJTcaHmYzZ1%2FfyoRCnI09WakXhI5pxpEoJ%2BRjIQcN%2BNfXolZyu6&X-Amz-Signature=28629b590f7789300bc1335e86fe94d65a1122cd13a79d662da46dc48ee9fe5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WOZDXYD%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIALyTbBjsmrvLZZ%2BvoL%2FwJaQdgI31yf3Js9K8YX8ktLaAiEAgDdotQazws4O43PXpiP8B%2Bt%2F9sNhLk71PmcVzPhUQ0Iq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDPOx4xVdV3h5GgC4cSrcAzG3UPyGsiJf1U6uMT3%2BLpuJ779S0GekTPR%2BBn%2Fg%2F0%2Bll70kopVFVKc8zovCeeI9zLPh9bO7Fwk9HkFhruDsN4ZClv%2BqMD31at5z32uaO%2FNvj05WdcEn4VCsamq6ALY9%2B9PlM1mPsbAkz3M9bJGyDoAA17S3G33sMgj%2BQtxjXaQPmrZ9FYCXx9UXp42cxP1Lqwing4lI1FTSsQVmVhunNb%2F1GSLsMFfCGhb%2FMmK5ruy69RnyWEcWzrnckbNOm2G7JR%2FakkZtH29pknMsuSLUGEQ%2FvQDdTEfwQg5wC%2BdsZqHwQ2Q2aQ%2BVzlp2acXDeL2RwsLwpsamQ6lDtB2LAFbzbtUMDQKC2wIEyWW86apBYtXO%2Bq0s2ABHg%2FAs3Un%2FXqD9ZO2npKH6XAD20U4MKs5wyvLt6sXu9APIzzlJA18%2BBg8fBRmE%2FaJR6D7JHF5KalKHFMiit86gaZI%2FORT3l1ZA3Rph18lo60xwDFyyzoRzQkAMxfBFmBytptCJdN%2Fdgjg0d0ry0uMWTHdUujt5Q3BZ9XB6K6wo1nsx0swp%2BoMPlVEMAeCyVpvNqVjfHWKFqKuE4gctipkN9t0aW6lgQ5QQeHHYLnBRjhRR8DZ7yzfFJuh9DQQYouU3YWO9WsuiMKPu%2B8wGOqUB4k08O2Hn9mAt%2FbTU%2FgOmVhXszg6tyYqpVgPefho6IBOLb%2B08Rf7bhmLALKAH22J3qTxxk8aOmeQ16oID7cAlbTp%2BbM5eeE4u0CwDO14S78PKF59KdZ7ZSmX7ifnOydHuiU5DtLzYG8u0EqpLIuvy92r2wIevCfMBerzqGJKaQcMd10jwmtxJrkbM7jH4j9GQRv%2BcQWlHjiJpjSVRvZmEfVLVGf%2B5&X-Amz-Signature=f592cec67bc4917deea436a1ae9a8694c44d368b6e00bf60d6ccc08756e8c92e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YXCOMMQ%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJGMEQCIDL09YC8R%2BV3TRUKXamNG4l%2BdsWMNf2u2gYOSCz7kdkLAiA9X4hZrVfG8yfb15aUv1KlZ2W81tCzOXAx0GN9zB0h8ir%2FAwgOEAAaDDYzNzQyMzE4MzgwNSIMTYkk0lycSJbcyvU%2BKtwDegvntC6pYzP5KTI6VUaoOfM6dToy%2FGaoF5DiAM3CNHohJP%2BzXHyVz6Zbf8yZjfWGP%2Fy3oiloMGeoW948Rk1o3hUdrUPYhRvNrkw6sdvcEDchC%2FVt0Q1qC2BNzdlan9j%2BoE5cFGjpgJg12Iy%2BgEKfAiVWehWrQRhYKlmuBePwUXcc%2F774SBaqFcP9L9vV9ACAiB1RqIVpvHbdaBVamudtPXSBwgaWjbs1TT5df4HZ83NmAT0mGBy4ejzx3TeOlK0ky9u%2FHdQuqmqqgtNo6NE%2BWF0Gt9UhYeDkUfouxd04sTbGpRtExAxqjtZPLJJIsj%2B0vUhHdwpdaGANUI%2FsYFbZqYXNeLlVxr4hNL5lcXUmyxgYwxbDVvS84ZBDKjTEdLfZEf%2F%2Bub83PYOryzbcf6i7s7lRsE4bQylZAE%2BPe8AmYFfDuZqu7w4Cvs7RfUEkiV6UWZ4TxK46YXWSG%2Bo3Fr1Ia5iU6cRvdpMwFzUzfZEuz%2FMxBks5vyXYG5vq7i5KrHzBP2OK1shULuhV%2BtIk4FVDoFmZL%2BzaRCkKcyfMRjpEkC7AoRsjT7HmvUdzUWbkqgg60WjtsEi0P8noeFmdue1L%2BPVmzS4HXiZutQnPq8T%2B86GZpHoP19Cs1m72gVIwhu77zAY6pgEKUHRRE3j%2BBHxnNnK%2FkSq7fFJtY8w%2FE%2FAiNoztXeUNRkyQGL9Qzwq69VhPSutW5VBsD76x4jebjRB0PdEeOaZ%2BUCi7lxW4Cz3U2f7zGMXIuVeI6DWtTabiuccfcIAHfk5h7kNvERxKOEteQ7IOcarG1kMQogDiBIbHm12kyxOktWCnaI1kmkd6e8P5nXpj0ObBkfqRGq91IJqc8AUwifA%2Bx1GhO18I&X-Amz-Signature=4f0c0e1b2ed5c3fd4ae0ebc7b47d96300e1cc46a7a33bc82ab2193f1ad0fbd6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXCGZSD5%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIEhjep7SUbWv5W%2BmrPgIhEO3gsx2Gz8%2B8Ov6eSHsown%2BAiEAuPecOnH28DmCqIuVtHqBFDipTZZPvEXSF8Y1vKYkmtcq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKS4oHDk4q736tG5fircA6q2bl1cqXLUPadaqaY4Bo1OXZc%2FCrBPbMMeuDQQCJEP8LOorwVOXWVvypbr0Ffk%2BEoOdqbSRHf0sMy9GpKOE5y6FmWTzC7c5RZqlSbIkC5%2B4MaCuuXpIuUpexcEO2u7e5K36nxp3%2FUH8joFaB4VNOgJnHctvvA39rv66ljbYK7U6iDjlF9Pqx1KEBq9%2BufHKyUJ7bh6Xfq%2Bk04HU%2FG5UHchQHXMXs%2F7AdLAXtRtYyH7%2FmPfpujRgQhrB%2FWByv%2FF6CQCv2yfVQcmmdcMb4tJ7VEqY3148wVTxzZTPIgXlmfaUuPyfuioyFr9BVRb94zsuHd2MdpTf0uEAOWDaymhf9YqIzWjLxM%2Fus3Ikn6i3DpSJ0ectZaDDn4bs1tVdIFmZ9j8tq6b3nPRZjgU%2BBwaA9R%2Bx7p6nPpylgB5mYnNzRNfGFVRiotB9xaZd0GaiNaRGBTXRh1%2BSIVDwqa6ub8g7Io3lvc%2FYJJ9EeCwMDnEbbg9VqQOEtFhUK9k4vy7E8s4QlzUR4EDX8LAL2Ij5sLRCHVOl4HxsjHKC2EQcwr5hxuxy5CY5W34ytY79tvUeM5pKSE5m35YpsAiMVNSaT9ZDX6pOFuf2KfDQcfhfDBCIg6ZMKwGyDDrnS%2BaIAWvMKzu%2B8wGOqUB9ngfRTquuTm8Zwd2x4MBwSUtX5s75ozO3GQTejDRlsJHgZPastbGGtnq968MI05xjrcpzIa0NGPbxJO9oPEIfUPR9w9nnngpSga74wqE9KKQ9ZgfuVfHkf6gBWbKIESFS%2FMQ3UBVtGV210hWY48PrYxwm3AYCAXkcReN6EEIRfV7XYBpE8hdsnZlGjBN5KCja7xla5ohHDWeS%2FYm%2BWNMY33VdStn&X-Amz-Signature=d5c1ce5e45ce23c9f0c0c0ec39c2d31d66ae260c4cc3b997a2db9980f89b0a01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXCGZSD5%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140020Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIEhjep7SUbWv5W%2BmrPgIhEO3gsx2Gz8%2B8Ov6eSHsown%2BAiEAuPecOnH28DmCqIuVtHqBFDipTZZPvEXSF8Y1vKYkmtcq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKS4oHDk4q736tG5fircA6q2bl1cqXLUPadaqaY4Bo1OXZc%2FCrBPbMMeuDQQCJEP8LOorwVOXWVvypbr0Ffk%2BEoOdqbSRHf0sMy9GpKOE5y6FmWTzC7c5RZqlSbIkC5%2B4MaCuuXpIuUpexcEO2u7e5K36nxp3%2FUH8joFaB4VNOgJnHctvvA39rv66ljbYK7U6iDjlF9Pqx1KEBq9%2BufHKyUJ7bh6Xfq%2Bk04HU%2FG5UHchQHXMXs%2F7AdLAXtRtYyH7%2FmPfpujRgQhrB%2FWByv%2FF6CQCv2yfVQcmmdcMb4tJ7VEqY3148wVTxzZTPIgXlmfaUuPyfuioyFr9BVRb94zsuHd2MdpTf0uEAOWDaymhf9YqIzWjLxM%2Fus3Ikn6i3DpSJ0ectZaDDn4bs1tVdIFmZ9j8tq6b3nPRZjgU%2BBwaA9R%2Bx7p6nPpylgB5mYnNzRNfGFVRiotB9xaZd0GaiNaRGBTXRh1%2BSIVDwqa6ub8g7Io3lvc%2FYJJ9EeCwMDnEbbg9VqQOEtFhUK9k4vy7E8s4QlzUR4EDX8LAL2Ij5sLRCHVOl4HxsjHKC2EQcwr5hxuxy5CY5W34ytY79tvUeM5pKSE5m35YpsAiMVNSaT9ZDX6pOFuf2KfDQcfhfDBCIg6ZMKwGyDDrnS%2BaIAWvMKzu%2B8wGOqUB9ngfRTquuTm8Zwd2x4MBwSUtX5s75ozO3GQTejDRlsJHgZPastbGGtnq968MI05xjrcpzIa0NGPbxJO9oPEIfUPR9w9nnngpSga74wqE9KKQ9ZgfuVfHkf6gBWbKIESFS%2FMQ3UBVtGV210hWY48PrYxwm3AYCAXkcReN6EEIRfV7XYBpE8hdsnZlGjBN5KCja7xla5ohHDWeS%2FYm%2BWNMY33VdStn&X-Amz-Signature=113bd54feb7a845a237b24a65e13555bd63a00e4c5439868151c4187df405580&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666JWPXZDD%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQD0PitGAaFkRtgmf2JSCwXjxO3h3gvDGIpbLiOm6Klx2AIhANm0kB7Y37B1UQ%2BbhWEGFL3d8ovslTVbV16sEctCyj6BKv8DCA4QABoMNjM3NDIzMTgzODA1IgyHGWkWdVknzZDhrn8q3APcqAz0uktuoY2iIuMLuLQxAOL0D1SsJLx0q4E3jwRz2huvhBcq9a6N%2FauaGisFEUuzXAp6OEGUiPVdKjohiazSYlYnwuYAfgshGv7926fzuWugZ%2Bc6T4Jaf5Fzn0wetDG7dKyhfh8H3SqReghp5qBSEIl2vAOOf03SpDtG%2Fdcu%2B4mj5Q287viWYyrnkQKiQh0ReFNQ9qEydk72q4V59bGEE8U9bUNUM%2BBh%2BCFEZvZklswzUZCipBODfnA3E4N%2F5RnMrlIRXDDQ76doSBnE7lr4yRm%2FE5UGuAUylohqj1QRmmLl2RcrCdOuGeoPZ3O3JNhhM4RTLYpxMsGO1%2BRhx0QeUN37ZJRFQXL053tWqfEXwhSHYw9MgOn6FSGvlDtYO6DcNeGD21a9ouYEVkOtxRwI6yn5y8ofgyp9u0iBzbEm8OFWJa%2FhMyTdujLm%2BwnmBLB8BK9eboiu77AtGNhLvPshR9N1JbrKSP8fWaciBsnADCc%2BQqnVarColkTc6bMje9GURiD6lgsSvtRZTO037yBAUJL39r7paPzA%2BWjIMZi63wM7xruRZuAGCeD0RCun2neDoweJAL4LesCaqFKmazzZi3LP3TXdoxPojA5cpfYUWBUSWdp%2BjnXGwJpoZDDa7fvMBjqkAQO1wIUXZ1ZG5wZqwCen8dW%2BOqrsKLnTPnL6pftpwk%2Ff9sVdc%2BRTI7wrO2ALtyQIzYfdm8Ac7vf3z7Dk1US%2FfelFq6qe8Oe5OiF%2F08X2cb2h69u447yNlJ8Uxu27kI%2FYyE%2F4uNFp5IuvhNYRmfp3u0SoHxZL9FLagZikKCMkwtYg6jTVTueKS30GFlwNDi0ryhpk3ii3IcIqCPq6zIuDt8YYMULz&X-Amz-Signature=6782a5214f963b70160738bd9cf2b45b41ce64caa4e3f7c0038a8e0912979fbd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMKTEWY7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIEtjCsdpKrVF2fnY5xxPPng5Q8Utnp6astxpT44IxCJpAiEA4NqZmIEhBmwOTaj4NOpr1QdE60aKijBnJJjOtKCvIXgq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKgzWfq2Zd62hIkfMCrcA3hMFKGrrvw2weTIJQabCxiHCIDJKBRTG7SpnqtV%2F%2B%2FL8rTGwUXIkssQmMoyZ5OgxednVsTtoIYaZ9OrF4VE9W7ce0fYBSj0VmbVzeKBpYDuxxI%2BmtMCMkPcSG8G13tXgASqyRltT99V2EHuYlHONnTenOpXV2gh7U%2B0BKZn9HWDoSd8Jr0sfMzSi4ulEJwX%2FmmeqYBM5TEk32zcVHOSRaJwaGXIeMSx5NsMrs7nqJVKOPeuaAMd%2FyG3NzWsTPhlMTzJTx1JNwr9q%2By9o4Mn5OkX7B9kw%2F3Q1SHz8clz3MzF2ZnwP4aj1yHbtAULS52jR1PSJtn5xxIQpxSJcPiBtHQZu4EDj6Ji0qfaVIpXprPE4G9nt3XRNY8p6Mosp2WTqxvALVQc570a7BO02oyuP9q8nveItpD9kkXib4aFdm%2BoQO1wMMJol7u6T1lrG463FVuLZazCw%2FCTT9YiGoUI9%2BfTBET8gWJ%2BMQnrjGhIuUalDzOqdYJICe5Vi1%2FjuMyQ6xasTD5YL%2F2TYRBwvruVcBpYaLs0MBPJTIwKN4cOAMVYUdOJxuqhVT2VEQ94r3UYGsgWmDNh3RoTqyWe6mgEE3OcZGwAcMj2OMxMsSWzs74kAFeZsGrpvCLlWr%2B3MJzu%2B8wGOqUB9anllmLkgbOKDcipQhw9jKsZERDqybVkUsdIUxu%2BD2ad0XFiXvoplfOmXV20x52vh961O4IUbd9LIsHfT53BiFbJd%2BUbKd9F1ULDJCctYSkmnYWxMQqLiOdpEsNILToY83BfhbQ7qWCZe8LRvBKZmzmQABkv0QwjnLIcknYe43pR42BQBdLysuXCr21Oz%2BEUyQ2xhJP6J1igKwNlEaM%2FVDhx3Fcc&X-Amz-Signature=7545b0646bf65639645695143a637cb839b86767a973265bd670a19cd9e28d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMKTEWY7%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140024Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJHMEUCIEtjCsdpKrVF2fnY5xxPPng5Q8Utnp6astxpT44IxCJpAiEA4NqZmIEhBmwOTaj4NOpr1QdE60aKijBnJJjOtKCvIXgq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKgzWfq2Zd62hIkfMCrcA3hMFKGrrvw2weTIJQabCxiHCIDJKBRTG7SpnqtV%2F%2B%2FL8rTGwUXIkssQmMoyZ5OgxednVsTtoIYaZ9OrF4VE9W7ce0fYBSj0VmbVzeKBpYDuxxI%2BmtMCMkPcSG8G13tXgASqyRltT99V2EHuYlHONnTenOpXV2gh7U%2B0BKZn9HWDoSd8Jr0sfMzSi4ulEJwX%2FmmeqYBM5TEk32zcVHOSRaJwaGXIeMSx5NsMrs7nqJVKOPeuaAMd%2FyG3NzWsTPhlMTzJTx1JNwr9q%2By9o4Mn5OkX7B9kw%2F3Q1SHz8clz3MzF2ZnwP4aj1yHbtAULS52jR1PSJtn5xxIQpxSJcPiBtHQZu4EDj6Ji0qfaVIpXprPE4G9nt3XRNY8p6Mosp2WTqxvALVQc570a7BO02oyuP9q8nveItpD9kkXib4aFdm%2BoQO1wMMJol7u6T1lrG463FVuLZazCw%2FCTT9YiGoUI9%2BfTBET8gWJ%2BMQnrjGhIuUalDzOqdYJICe5Vi1%2FjuMyQ6xasTD5YL%2F2TYRBwvruVcBpYaLs0MBPJTIwKN4cOAMVYUdOJxuqhVT2VEQ94r3UYGsgWmDNh3RoTqyWe6mgEE3OcZGwAcMj2OMxMsSWzs74kAFeZsGrpvCLlWr%2B3MJzu%2B8wGOqUB9anllmLkgbOKDcipQhw9jKsZERDqybVkUsdIUxu%2BD2ad0XFiXvoplfOmXV20x52vh961O4IUbd9LIsHfT53BiFbJd%2BUbKd9F1ULDJCctYSkmnYWxMQqLiOdpEsNILToY83BfhbQ7qWCZe8LRvBKZmzmQABkv0QwjnLIcknYe43pR42BQBdLysuXCr21Oz%2BEUyQ2xhJP6J1igKwNlEaM%2FVDhx3Fcc&X-Amz-Signature=7545b0646bf65639645695143a637cb839b86767a973265bd670a19cd9e28d40&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QKCLM36P%2F20260225%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260225T140028Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEYaCXVzLXdlc3QtMiJIMEYCIQCwgAwI4cpPnhw6AzLmzWRfNi8BZOSkB%2FiLXF9aZxPlggIhAI%2FGnC6HcHx300f7SZKAopSTB%2FOBrpP3SfGEfCe0YIjmKv8DCA4QABoMNjM3NDIzMTgzODA1IgyHB589Ue6971SsU6Aq3AOLbJevg4q%2BKSbrD2nZBqNXf%2F9unulCeLKvpgz8k6NeXmV7FO9R3yDyL3DoHxLyD9qhA7fQ7u8CsV8GLSzOJ3cWX2llwvZziu8xcEM%2BVV0YhIc3BLjeA4QYtY9BDxI7mHJmeT4jkSP8XfAm6liQfucnbQSNJWjdh8mZPB5Q0tBBIgbpx3f8meeGGoE%2FQvC86hEqWgIDy3iKp0IH3DCRpJQN1QGPTJJBhBANCCeu7Khm9NdLarwtogFBLLJAZ65Pc%2BDqRh1IAk7aIbBXw6l3I2cSQlTcAza3S8MJeyLlO4tVtYxiY8QRrCx57v59IN2MAuGcTusP8yHhGljynViPVG%2BQItYGBpy1mqtY2%2BDRCJAwl7AvGHRLQ37BXI3rUgkJqxIxbosjtcgPoN9nvozZGhhrtXKFOHVzkvcKas%2BxEaLUO7BFyD2qbHyI4GihkkPvxHlZUogbL7IxY%2B0CTPxIkbSGJpMSWs4fYNwYjHjlnxkr6yCTiaFLnfquaDIXZcOilhRjJA6OW1bSb4hsnhUukx78YARPf1BTlfwwO5KcsWr9TsMNCZHw9gzNDCY9DdsYITApXat5EQCO7Jcw%2BTFJce6c77usXSrCRUwBjuItq%2FbHrtz0OVRrLuf9S1dW%2FDCa7vvMBjqkAQfbxt%2F%2FRc3qBKVFtd9zewPCKwxhUJoSTMjH62lxk5Fh%2FzmC%2FmE461Vhl6eUkNROwGkqW4i%2F0fZIR261kcMer79Rs5O%2F5bcwMDgpXU44Agt6dnM7pGQnzJVevClI3nYzQ0jDe8HXJSFgMV6cSiBukKXhQfK%2F7HlvQXzrdJy0b63h6B9l3Uw%2FWXhJeO0lGadzI1QmEN57zJFnASSel5iTqBFD%2BN3V&X-Amz-Signature=139b694869a7a9abdf7ee2039699f470e06419f59760c98f893940b5b236b1ae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

