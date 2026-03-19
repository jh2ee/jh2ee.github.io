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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVPCJ4RI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIG697YgQHAf%2B7pmcXjvOT9%2BIwPTBjLPB0SQwvhphtqK2AiAM%2BkEH3xynWKqBnLOuvxjVVvusTvE%2F%2BTTmR54B17kMICr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMN9gvaPVCS0nwDkWmKtwD1puJSeaCnzebtWxy%2B5rogZA1SEiq%2FCkmRjIuw63S02h8zMNSd8omnj3VkwnkLMgUbOgapv0AOvoNlJqavP4fuiYPMwej%2BNrkHML5UCjRxzQm8jFxDREO5hCQAftN3fW29JhQyJokCV2Tz0XzRGhqL4J7EcmcHPr3Mn2oJqOKlZvoplWIihBJHCk1f3xzzoCMKfViDUdKB0NRMR2B922tDPSomhWQYdAm0OsA%2BK%2FF%2BNnwN6soXAaZX9BGDJUCOjm72LH2f%2Fo0VWB9AAjsv0IajNUGOwKCJu%2BCfb3dyuEUla3uxW7K4M8xNeviRZZuLn9qHzGQ0wVNW0uVxURyfraOcm8MoMESJ8rq8Df2HSQzYJe9aGwcE5RrkTQuKmuxb7YAmhJsV6QgkR21aX8X16NeOCN77WSOFziMjd3w3%2BRcwi8qKdUeZWcMcBDhWTwpvmHRhwgvmjN5jUaFh2RQUpujIzcgHgOoM4yE1ipyyza8X%2Fni1l2dT8%2FED3SGHL3YxfXllTzketgv5LfqkNn7xvBCx%2FPhrZUSq7NlQSzBab9F2wvF8FZVIewnr3qlCGG%2BgoXhL8CQgNlbkElQZxCxaXmgtsaucduSwVDiQ0DjheujC1ybFc8ieS8jl3keF8cwy%2FnwzQY6pgF6YToVT7V0UuoOLba85%2BweBxmL9TTU8QVSbi653HNmLgII1p8Uwego2rH2Oc2sHf2zSnaaHNHAfM%2FZvfMLo1YqSH%2F8BA74t9UYJjWlSjYJCHz6Miq1sXqIVMHxHa4VbnrQCFDT6IyICBPou0%2FTz3TN8JHeexwHX9DJlbo%2BtUabkaKqptvHIiy%2FeL2RnhltxN6byxB%2BnvKGRWaSUjpzycl%2FJBXGR78%2F&X-Amz-Signature=65a826145712367583099e62cd7cb39b4c066742a9d107c72cf885a406ad9b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVPCJ4RI%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCIG697YgQHAf%2B7pmcXjvOT9%2BIwPTBjLPB0SQwvhphtqK2AiAM%2BkEH3xynWKqBnLOuvxjVVvusTvE%2F%2BTTmR54B17kMICr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMN9gvaPVCS0nwDkWmKtwD1puJSeaCnzebtWxy%2B5rogZA1SEiq%2FCkmRjIuw63S02h8zMNSd8omnj3VkwnkLMgUbOgapv0AOvoNlJqavP4fuiYPMwej%2BNrkHML5UCjRxzQm8jFxDREO5hCQAftN3fW29JhQyJokCV2Tz0XzRGhqL4J7EcmcHPr3Mn2oJqOKlZvoplWIihBJHCk1f3xzzoCMKfViDUdKB0NRMR2B922tDPSomhWQYdAm0OsA%2BK%2FF%2BNnwN6soXAaZX9BGDJUCOjm72LH2f%2Fo0VWB9AAjsv0IajNUGOwKCJu%2BCfb3dyuEUla3uxW7K4M8xNeviRZZuLn9qHzGQ0wVNW0uVxURyfraOcm8MoMESJ8rq8Df2HSQzYJe9aGwcE5RrkTQuKmuxb7YAmhJsV6QgkR21aX8X16NeOCN77WSOFziMjd3w3%2BRcwi8qKdUeZWcMcBDhWTwpvmHRhwgvmjN5jUaFh2RQUpujIzcgHgOoM4yE1ipyyza8X%2Fni1l2dT8%2FED3SGHL3YxfXllTzketgv5LfqkNn7xvBCx%2FPhrZUSq7NlQSzBab9F2wvF8FZVIewnr3qlCGG%2BgoXhL8CQgNlbkElQZxCxaXmgtsaucduSwVDiQ0DjheujC1ybFc8ieS8jl3keF8cwy%2FnwzQY6pgF6YToVT7V0UuoOLba85%2BweBxmL9TTU8QVSbi653HNmLgII1p8Uwego2rH2Oc2sHf2zSnaaHNHAfM%2FZvfMLo1YqSH%2F8BA74t9UYJjWlSjYJCHz6Miq1sXqIVMHxHa4VbnrQCFDT6IyICBPou0%2FTz3TN8JHeexwHX9DJlbo%2BtUabkaKqptvHIiy%2FeL2RnhltxN6byxB%2BnvKGRWaSUjpzycl%2FJBXGR78%2F&X-Amz-Signature=65a826145712367583099e62cd7cb39b4c066742a9d107c72cf885a406ad9b7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IWAFSDT%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIFOgMDAIhpr7Qm%2Fr7EJH1McKZfJ%2Bl9iFpJFUyGjXkCZXAiEAj8GiL9m3sNwVWtFodDc8wDlqjX5OmQ9qilbELq6Q28wq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDNtKVIGSXTfGFKC%2BdSrcA5DbaPbxyz4cojq4LF65e52F4mViuPOSDbwVqOcKZNCCTBn6gO8GJ54VjxYGO8ZHtDZgclGMs2FBIGV9RGAZo13wVxoZR73wFd9FwI36Yn4YhKWSxBJYr0yM596yNFy6LsFpLp%2BwEOoc3%2BF1PqBMdD4hUti%2FzPvYXNWBP1XlkkjV2AI1IlYxyRW3a0Iv7TEXLZO%2B5dEvoinwkl7A2yDzVL8os0kFX4uBZebO5gbrdXlNl40ws5fG5KkKC71IDZmtbn5AkZU4WMyTMfCtz2UPTGIEWWrnrXWlcxFjoHIM0PIvafU1nb1z31OdXYac%2BmEDx1k7N7zZsk6ODMved6E5qxeJEIUIlrwZjDjbsi5VC0mIhgbHX3LpAL9gh5S3f5PV3sZGyoVKfdUb2I4QXKdU5OYNsVvoxoI%2B9n4QGqQFsybM%2FA35tC40xZig%2Bxg%2BdnL7e%2FKsNEt5OkM2dI3KTcnxEPmXAI6lgRgU7%2FCrdmzVovGGc0pxsSZgyJ0Eyp2Ni%2BoAjmOswHmS7eEGzaIiQuqyZ6vzmNGb3Y1bDwknr1xNuAGwNi5AQV4wLNgxljgTxNK004%2FAJqIByv3vvaIdrmTBko2uVA8biySchv6QvjQiKdOuTr5wefzAsZhPCZ7fMLf98M0GOqUBUroUesbOomuNfaNcjyDPyfUJ8QhyakVYX8MAfWe19Q9aCNwB71%2FxyWESb6nkRp6Kq1BV2FoSHXLp68GMLoNz%2F71G2WI4OFsSumMM2URTWWAOxRy82TDMpnS9qAA4XNpHocYPExvEgKLHVEd2r7dHY%2FR1aRUYR1CA6hnsGHAkXSujt5sbj7tYP5UlS6WXlMrOwzJOP6O8Zr%2BScjmvLYwgEx9KRf48&X-Amz-Signature=7da6aaeabfbf00f962a8f4756ce4de9c5280835ac6e63c8c53e622cba373cec3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CZJSH6I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCzaHDLiOChBvDyC6YTnhjMGUSHEJLWeoN07RccCzEBfQIgXDNw%2FYFZH3qP%2BnLv1%2FlTBIyqt4miCi%2FwbemX%2BOvqr0Iq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDA9vp7CXbAykCnF%2BPSrcA%2FXV8s08Zx7IRB2yCnCdEy5VoRXzCTW%2FjntIsOOkM9c99nmqYNXau7ZZbkwR5x1s0Np6MaWIJ60LLYU3SiE957Sjko5v4h69lB7q09RfS3WLir2gWFJCiSP6QKy1sP5OzaDzgwEvWH72AUO1WktpBDxAK3YRTRIilxti4lVd2ke8MD%2FDV0sublz%2Ff%2BnaV7G7LpOwK4IkpUH%2BX5QNjyMwejGZhv%2B2swctlLb7KzIPGOEfMf9VA5Q3pWZoex%2BSpBex%2BJt%2BrDnAf7Mluy2qrVU0CKidP2tfUKjeTc55%2FrffinWnCZieokfH76%2B7YcV52Nu2KtvhVV31EPzeXBOZYSuXoAA2705NLiUFSsDcyOJ2GIVVFr%2BHnM%2FFzwPGRf9Zh%2FIVxTiPuavIvybuC70YypQ124nSro3oEX8aUfhr%2FMXSEJPFdD6cEXDfz0uzYdmUx8QrvuKSRZUdHIzenZvj%2BiZdNKIil0OaaidCnVuvqGIyRPPdZfYgrTCxSx8icdZlfFH76kHKk4uPQI%2B3pgXwOuY9nfCwLNaAcdlT8fTGBfUzqjr58gtvHQVKzWNg05QvhLNwCfdCi%2F6oGvQMh6OK3lYEu1fqYx6veFZzWDcMyWs3I190KXPUnxySa9Bg%2Fy8OMOP38M0GOqUBZ%2B6%2FH26u2yFXHgqZB9x9LC46J%2FzAuE8G4HPaRxHCYG1vk5nt3cKsnOpDWZ3UP0%2FJp9QjforvYsXABc%2BviDgOqMtaPfUbugYE4AaKOebudMAawOYxKSaY9gJEKj4%2FkvaW0pU75vm4NDD%2BP4LGCHcJCvWmBB5V%2FyF4rGoDZk01OgahiIPdJ7%2BRgFKGwQo0gD2aIAj0F0DxoY2ibf%2B3HDKDoxFt5sLY&X-Amz-Signature=14a6ac77459c30d71989531b3a6af74684851a56610dc057f7f8156c5bc6d7c8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666CZJSH6I%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQCzaHDLiOChBvDyC6YTnhjMGUSHEJLWeoN07RccCzEBfQIgXDNw%2FYFZH3qP%2BnLv1%2FlTBIyqt4miCi%2FwbemX%2BOvqr0Iq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDA9vp7CXbAykCnF%2BPSrcA%2FXV8s08Zx7IRB2yCnCdEy5VoRXzCTW%2FjntIsOOkM9c99nmqYNXau7ZZbkwR5x1s0Np6MaWIJ60LLYU3SiE957Sjko5v4h69lB7q09RfS3WLir2gWFJCiSP6QKy1sP5OzaDzgwEvWH72AUO1WktpBDxAK3YRTRIilxti4lVd2ke8MD%2FDV0sublz%2Ff%2BnaV7G7LpOwK4IkpUH%2BX5QNjyMwejGZhv%2B2swctlLb7KzIPGOEfMf9VA5Q3pWZoex%2BSpBex%2BJt%2BrDnAf7Mluy2qrVU0CKidP2tfUKjeTc55%2FrffinWnCZieokfH76%2B7YcV52Nu2KtvhVV31EPzeXBOZYSuXoAA2705NLiUFSsDcyOJ2GIVVFr%2BHnM%2FFzwPGRf9Zh%2FIVxTiPuavIvybuC70YypQ124nSro3oEX8aUfhr%2FMXSEJPFdD6cEXDfz0uzYdmUx8QrvuKSRZUdHIzenZvj%2BiZdNKIil0OaaidCnVuvqGIyRPPdZfYgrTCxSx8icdZlfFH76kHKk4uPQI%2B3pgXwOuY9nfCwLNaAcdlT8fTGBfUzqjr58gtvHQVKzWNg05QvhLNwCfdCi%2F6oGvQMh6OK3lYEu1fqYx6veFZzWDcMyWs3I190KXPUnxySa9Bg%2Fy8OMOP38M0GOqUBZ%2B6%2FH26u2yFXHgqZB9x9LC46J%2FzAuE8G4HPaRxHCYG1vk5nt3cKsnOpDWZ3UP0%2FJp9QjforvYsXABc%2BviDgOqMtaPfUbugYE4AaKOebudMAawOYxKSaY9gJEKj4%2FkvaW0pU75vm4NDD%2BP4LGCHcJCvWmBB5V%2FyF4rGoDZk01OgahiIPdJ7%2BRgFKGwQo0gD2aIAj0F0DxoY2ibf%2B3HDKDoxFt5sLY&X-Amz-Signature=566b572548fedabf6490f399c1c6bb96f46e5e5ba3d82ee73c22adc43f51552a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYPRZZZ5%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCICyGHnjHE2WdafYevMKrTxaIk8MQ1W06J0DE1e%2F6No8uAiEA3J53nFs10AZ4VapZ5AojyZitxf2oZgMS03ZQ8aEtukgq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDH21Gby34QlmFKjvJCrcA21xamO0zPrUs4xh9SSdBXwbRn50LoRU9FW4qYVk1HsQHG7Dk3uoqx1KrA6fs5v6ObTugrraHCqZEosodmIgndz05Xhkad24369Nax6oQ2EcIpvYAuBv8jSE%2BlYmbzgzmKws4%2FuAysTluICZ70ENf30IGxvImdkYToX3pOnTefar54XuxSyTzW3c2G2O%2FBvDGqHPp96csC7SZ0mpxqbqWqZbQEErmKSXHcOWYGUNkEVJhDrXF5lRxcfjnOo5x3LnebyDgX4%2F6kILbvHvUc2uTEkVOr%2FeJyVmdLfxztFTxPlQ2xloxS%2F79gly95hr%2FMVdhPjT9PSsBNC%2B0OCFnooQ0X%2B8UG46ogtKL%2FxIfw%2B%2Bt5IukdLJ0WDh4NMVRRaeIClxFU8L4Ls3BIFNgqN1wbbA33UTBfrPEcRw0s%2Farz4WxvwVdPNXHhhh1hmaYYwdBNJlQvCxEO%2Bl7c%2BGJlcRtZ5b1DR4mXsJksXJ2wPxOkczAWrpckISOLOkLzHIWFjgX8JCcmbCQjTw7OOMqy%2Bu7yvP%2FMchKTZLQ8lvfh92d04U%2Fkc9IQWqKK6dujEswy3jv85gBY2%2B1nCi5bHZEqyPZIQ4N1HqLWuK8pu%2F9NkBDQIEi%2F4WyRywx1PU1PKtclvDMPP88M0GOqUBRk61M5xaDNeuIVIlfASVd%2B4fGar1FlOYP6lOENtssljyXHt9CVx9qcHjS%2FS0D6gl6vAc3Cvf%2BSVr4rBHIh0l%2BqjQKI7h0YxGnAhFm6UnkSUG0n4hNCuEzPIPZ4tz3fOmJr2SK756BPU%2FvP5PwdwSuOcQasziJyMyQO%2FlDfUvX6qB6ZJBOvKUeIUeq8WpYZO5%2BEvQyBSFQfPb2v3pwe6iv7oYSRND&X-Amz-Signature=9e094bcdd5c3b29a7e4214ca96318a1a32f35dd69517ead85456c2fd4110f2f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6Q6YC25%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJHMEUCIQD8Q2kokX5YaThrZMxVoG8XroU9hLLLWEAp0ahO1mnOGAIgaqtY6lR1KxbhQQ%2F64Y%2Fopi7c5VDnooQ6NEVL%2BfZPVY8q%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDKOP7zZLf5nXg1bFKSrcA5aTIfyQ2%2BOjsyjRtJlGmcdaHUUxme1zh%2FgXKqPP2sOx2RCz1aI6GDZ16RI0EZXFYogs5eeX0EC8QsaUV%2FA%2Bn4qcT3ebjyAC2RNHotvFVfts6jqX%2BK8xFc5fdiO%2BQrCSkPUKuB%2BhL9jvK3E4IjKJ3ziQtQgXK6gL8dZaCXVZdmdwZluH%2Fvg0mZDLM19tNI7YLl4aHzAqB0e9ghvVOQQ%2Bx2EdsH6z9Kq04zWQnVZHwnvD7x0ionmjbY6Q0Ggnq8DpsIn07alkTOVPuMQ8cCRd6YyhwxESdEjXKaQJ5VrlODgvWe9rmNBZba%2Fvy00Ribrh0UWkCU3l9xpOsTkxhxMTbHdyllkQEjrjt7ifgeTVtVKPRuapqjodIMo1kr0ryiaBbAUBAhSJVXg9WrULb1OUS1eOJwobozzcIvl%2FjZfHc5OfLQY%2FvpNP3FAXldgi1y4ODnZ1mZGnB9J7D8oRp18Q7F2dyfypslRfrPiqqJyJnEkRcPJx8dfbTPZhFaUhWw4KA2zu0An8JMehzZkhaKdtRcX9ZqssbAXJ%2BjmZtEyUuwgwFw4lrkOEvgSOz1oPPC8nZovY7RJt2DlT9uK27DbooXB%2BL33sEFFcExJFJnvj3j3U%2B44ITCEI7ahvHuyqMJ778M0GOqUBcYcOTkVTFob%2FkWA%2FePY8ioZjTGEm5aW9A8DCUzg06syetuaEcwKW%2BQ1vWOxW4AkCE%2FaVjxs%2BpSNcCgdORfUBUF7jtH02ENFpd%2BUgRqaFarIQBdpHNs1amET0zAXJ8OSmahpMRidkkK2fAJTuCl491EcXwL9CT%2BuQYextA3dKmDSmiR203THNHoazqBPElOyG50aEjJSI5p722Pxqo6xKhXQqlUPg&X-Amz-Signature=ab8cc49d86f4b1e97742f67cf69ca4eb7b19d537e3d6c0f2d63cede66a2e14fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VY2CQHY%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183718Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQC%2FshicrUOQzvZMlUhGI1n6JjRPp3e8%2FKjJ0GxCguujvwIgbz1tFIJvoL%2Bd%2BvcO1mEEPPIHJiQ5s4H4aLK%2BBV0wSOMq%2FwMIIxAAGgw2Mzc0MjMxODM4MDUiDN2hzytj0uUNJ6K8VCrcA21y7pRNwt8XIGb4hvcKVAVCatUNC6LDkUyYpvNF%2F98dlTyryf904K%2Fi%2F6mSFuFSIM%2FTQ7hhvvseYmGX6Yql9qSe1jFsR6IJhdi9yOn6B8JxCdK5bEnclzuSC66lPXDIt2R3DvAoobkv04dhSwm44TBEdbKPigeEKcqnHq0o5JkBKVmQyZV592r8FNEP0xDwTEqoO9EEwFt4w1J4muyThkKHZJzMnof6hda4SEFVVQ%2FM66L6X%2BM9abl3JeXbCbYzUUIq9cIMsslBuWSjFCVUOdoSMAfaG3yHorfI2hGgkRJbmtKJrGAKc0eDOo1KfADfcbPz6pRUbd1ZqJbSvOj%2FXfQEALW%2Ft1V%2FTVIg%2By5sEZw6hfoLuxiHN5PYW%2BhB8ChusR9uj%2FFXmjcUKmZtDUCdSqDtOTFyV%2BDO9O%2Fy8jyGXwJxHbSroSRW6rRv3TOokEOlaQC0g4XyYy%2BIE9w6zfy%2FSzrdduGBAtc0jjfvwFI9hzS7EGuhgsPkPZHC649sV34uE%2BiDf3PHBW85MmUPemWRi8N%2B8FVuXaWNuOTx4wCbkk4amjdXAmZUlPbDpOyZQmJ2XjYdM1yM3pbfbqNpcrMVFWqnZVMEbf3myjmwUR0J0ZqIjPhXzz6n4ir391tqMKD98M0GOqUBG9%2B9sz1WoK9TflWug7PMjP59KN1ZOIHshWKLDGfvPdosTqd0%2FWvU%2FJ29cSZu03i130kLf%2FLC%2B3DS%2FBhC7zgc72MuKOtB8pOGuCd9tqpoCYYYTQ9GTKwo3OkR%2FuOV%2BOyZiIFQxeEZORYJF3Imta9ZQObWGGQboCz7bPFqirmmma%2BvwiZgbVBpPl0VH6GU8fyXGYUKXaRrgADU510lI4sRLpP8H2mN&X-Amz-Signature=1477e932b0687d52b0eadcc07dedd2075a9fbe807a3d8796133b7bd90a2737e0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYWK2UHG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICUm9A%2BCCghzGJHh%2FphkA3LnqYm5ywIqVU5U6PwKhlW%2BAiAyofuByk61ECVjfX3%2BIdUuVA6nEDgMqVZOgYj7zD3qtyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMw%2BHw7HQSfSyNSe%2BXKtwDem04D0CH7qOlC85vF8g3wKsccs%2B%2Fl%2BQo62gIIvMeIy4Uv05CoCukCiT2FmQuIXnJ2yrBgKCXD0qM0Ovq2Sx1trF5CDMPJvkv2hEJLsx%2F6TW0PXN9cTdQwgqyTf8y90x0uFgcY3fCLVACCR5DlT%2BOTJOqOiLQrU%2FfAgATz6wkjKGMVOTmuhMrtv1YH%2FV1J6y9ihl5kp9ANshly4a4QzRADJNy1DThm1AOdoe7uXB9uJa0B0ohsJ2d9k3ujJTFcKz7nFXHYrra9mTNgZI6ECgCBa2FAA2Gex7d8cyKG7XZATact2LNzYeu1h2tSP%2FjKB438aMJFhlRhnOx7jlZjZk77YxhsEuPxjFWQ3tFQ8PIRZQaKMZ5V7oQzsncSwz49hvigXSWUxHFJAqzZzJ7yO%2FeEqyHybOf%2BkWEK%2B%2FgOmp65vK35mZqfg%2Fxy8uxiD5SY0Imm1q3NjOQIMYwxvT42CwhHAYeLqFCwhCPf9Ar1xfzNZUvoiiGoJ6kJxSAvUR8jFh7F7BQaAzxm5FTsUI%2BdaYTwe2NdpoqCYGp%2BP4WUYJgpMfthSVtOazGVGEFGjIecZawJ00httxfzTr%2FbGi4CH2AO%2FT%2F9Qtb67YoCVAcb4LuTS0XMUvqCXpvAyESziAwjvfwzQY6pgGB6ng7s3CoffIjm0YNh9IB26zb9RbRRhf6W0%2BZ6Aep%2Bw0gZ6gJ%2FzObT5KJeDcoe2xO3198vnyr9kzLYk6z%2FNOVPaz6PTbDlcbfc5Vi9bXcYwjoexeTXEqKLn9VMzfS5kHddRx4XWkdS6Z8w78KhxKftgD2PLh%2FzmdWUvfz5DWxBMQ93g%2FIk7i8QH8brBZIdc%2Bm3Cm9Lqw34BCmwkbNDI3YZsUCQIYP&X-Amz-Signature=0d27e0940e343156987c8f1dde5d0fda000d74da8dd18b74f7744871aaded900&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VYWK2UHG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJGMEQCICUm9A%2BCCghzGJHh%2FphkA3LnqYm5ywIqVU5U6PwKhlW%2BAiAyofuByk61ECVjfX3%2BIdUuVA6nEDgMqVZOgYj7zD3qtyr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIMw%2BHw7HQSfSyNSe%2BXKtwDem04D0CH7qOlC85vF8g3wKsccs%2B%2Fl%2BQo62gIIvMeIy4Uv05CoCukCiT2FmQuIXnJ2yrBgKCXD0qM0Ovq2Sx1trF5CDMPJvkv2hEJLsx%2F6TW0PXN9cTdQwgqyTf8y90x0uFgcY3fCLVACCR5DlT%2BOTJOqOiLQrU%2FfAgATz6wkjKGMVOTmuhMrtv1YH%2FV1J6y9ihl5kp9ANshly4a4QzRADJNy1DThm1AOdoe7uXB9uJa0B0ohsJ2d9k3ujJTFcKz7nFXHYrra9mTNgZI6ECgCBa2FAA2Gex7d8cyKG7XZATact2LNzYeu1h2tSP%2FjKB438aMJFhlRhnOx7jlZjZk77YxhsEuPxjFWQ3tFQ8PIRZQaKMZ5V7oQzsncSwz49hvigXSWUxHFJAqzZzJ7yO%2FeEqyHybOf%2BkWEK%2B%2FgOmp65vK35mZqfg%2Fxy8uxiD5SY0Imm1q3NjOQIMYwxvT42CwhHAYeLqFCwhCPf9Ar1xfzNZUvoiiGoJ6kJxSAvUR8jFh7F7BQaAzxm5FTsUI%2BdaYTwe2NdpoqCYGp%2BP4WUYJgpMfthSVtOazGVGEFGjIecZawJ00httxfzTr%2FbGi4CH2AO%2FT%2F9Qtb67YoCVAcb4LuTS0XMUvqCXpvAyESziAwjvfwzQY6pgGB6ng7s3CoffIjm0YNh9IB26zb9RbRRhf6W0%2BZ6Aep%2Bw0gZ6gJ%2FzObT5KJeDcoe2xO3198vnyr9kzLYk6z%2FNOVPaz6PTbDlcbfc5Vi9bXcYwjoexeTXEqKLn9VMzfS5kHddRx4XWkdS6Z8w78KhxKftgD2PLh%2FzmdWUvfz5DWxBMQ93g%2FIk7i8QH8brBZIdc%2Bm3Cm9Lqw34BCmwkbNDI3YZsUCQIYP&X-Amz-Signature=59bc2e7fc47f8133302aedbdc47cbaa2b36a8e67ac9c5f56d4f7ffe681bf3a39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655I4OARD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQD5DCg8yP%2F5E1HWLJcx3O5vnwCRWy%2FvUl7lt0Ql2FwbXwIhAKJtTWCoLElQ3VWA2pq67u9vQshxwSdl5a75QmSiq2ITKv8DCCMQABoMNjM3NDIzMTgzODA1IgzVpb93HnEZrkpeUPwq3AMha6l%2FUDN0pXIM0eKbPM6kyZ5alIng9trSXQtjJm0lZLm9Jq1ix%2B6F81%2BvXAv0yFlTiHY8Wg6PXcsLx%2FCw%2F%2BGtxbC7dsEEa%2BrV7x7u3HmSi9sEI0mp9hZUh1ITPCpszX%2F150gKu2SwohBd%2FYsQcPH5OMQamwNqf%2BdQhok%2B%2FsgOGFGtkCWKCpO%2BGGpOizsi13xalVHo%2F41gVgu%2B2rBmMBMM3vd6cO7KzI83JxSBoGUZ%2FJh8KNdw0yFkDEj%2BigFRbYQXFczWhbPBqVcFO4pgyho2CLGSjMAoW3nmfe2pmHoBiX9swrTqYVqM0ujHOoj8Nr51a5nlLd5EXkKeJJoAGtlkpS1KM1FtiAuzEMc5dTYaZbzuTpWRqBJa%2BIBt0DlPNayG769OwJlChmztnjTGx0JGOCM7dOZ%2BQ2MBQdDz3oWDrwKLlUTtbE30UxqFm0fa6waQ1Bpl8PhlSpznnrTrK5Gzz0HeuX7tr9E%2BCN9qrScWC2u%2BxH5C4Z%2B9zWHAVH%2BJS1Uv30ylp5FGCSKzdRI8q%2FVH2kYHjzHhR9W%2BMmECGLHb7b7r7tHu4yWxj93DuwT9JgI57oegxa2Y5y9ZGjRFZDDHWSgWnrj6GkHnZfq3Ux03yYAW1D5juC0e%2B%2FT46TCz%2FPDNBjqkARS9FuREkJk1J%2BovdghcJnaFFOZTyUqDxzMfiTaNPrxSwQ4tgqhEq60mCedCabmpWJusoFLHQvE1RRIDDSCsjYAm18FiTRRyhP%2Be0BahC%2F3fmecSAPlsjYtpGasc4dy4WXB3nOY%2B85wZtJoz%2FNkDFe%2BZ4IV0GnSQ9UeA8GsJcJ4TfwDqiL%2BGDnCYknrtJcjvdNoYW2sAPaKtsDMpoZz2TK2mpauG&X-Amz-Signature=55066955768fa375740adfe8fe7b598344ddf0b7f46f242850ccb5ae9240c10a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FA4MAOM%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDlIiRtIFTrvw%2Fk4IVJ5%2BAqa1AMZpX2uDx1k8z%2FB6lASQIhAKZV22FL1lwdlYvE43rkr5F3lt2rsx1J6NItSvjOaS8RKv8DCCMQABoMNjM3NDIzMTgzODA1IgxqTc7M2mPEBablQQ8q3AMqnu73O78eTezHiHJWsNvYz8mXqSiWQcbsyunOLSj%2F3ak67qgpeD37MvtRwAvkQNLfuRLJqOfdbHBz22fnoi5w9mlT6cCBesOphOjYpLSLO2JlaQ0MkeB3YdMFtAkQvSR6D0Bvd1pqk9IRSnP5BescoDNYGEqgKicFZdeFzR8g8%2B2af68THvNb9LC7R2WKeQnwxLFdgpji6ClMcCHSnbVIfSASi0ZCpOPMgVwonCRhn23VbqMnZ5Mwt85dkGIuLwWqW3V1QUw9zQVZZkQpw4ubkBlPpl5cr%2BzyP2%2Bmvs%2BraJeZnEvluKl5LyFu3aJOqSKoYvGkNr9IGsr1rPPxsx5WuJLKc%2F%2BRpsUv0AhzZsOPUZLglYfZsdq%2Bu0Kl9CK7nDqS1KlTslNCmLVU4gcr5JcVTwoYkcklfSFBFN6hyZ2yfogBgbRu2wu8776hTjNJ9GIQubASN%2BPS1EcwVN1nOrozEQYcmbNrsL8WB%2FmFlmIZn4VcLKEn3Qj0rvR6X%2B%2B6Oaak%2BUvBgIuM6OG2amDs5qidKE0KWbGurv2HefONFfJ2SygG6dfQCoPyJjEl89dS3cQmmGsDwlQCROvmTHThcRpbIHK7oKTjdIFpt0yd9tLGBQITVbWshrrlP4dxHTC3%2BPDNBjqkAVQbqlThk8r4Yto%2F%2BfkIv%2B51Xs%2FyDd8UjvEh8JMVvNNDh1glXV%2Bc3Cf2Rz7JNt2fRaxy2bmhkAi9WohXhhk9pFhGLd9K%2FExtLTmMc%2FAq401tNhgn48kAIBy0a6VCWuV%2B58Fbfa4nKqcPDX5y4hmWSrEN6L%2Bo%2BT3kZ9KLl%2BvUtBBHyohGd3ohtkUoiHkEGW%2F3s%2BuQgH2XQCL3Is4o9ZeyRK9OWAXy&X-Amz-Signature=2ccadf7de6cdcd468c1a2ac2072fd15e2b260917a8041393b61b551257391064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FA4MAOM%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFoaCXVzLXdlc3QtMiJIMEYCIQDlIiRtIFTrvw%2Fk4IVJ5%2BAqa1AMZpX2uDx1k8z%2FB6lASQIhAKZV22FL1lwdlYvE43rkr5F3lt2rsx1J6NItSvjOaS8RKv8DCCMQABoMNjM3NDIzMTgzODA1IgxqTc7M2mPEBablQQ8q3AMqnu73O78eTezHiHJWsNvYz8mXqSiWQcbsyunOLSj%2F3ak67qgpeD37MvtRwAvkQNLfuRLJqOfdbHBz22fnoi5w9mlT6cCBesOphOjYpLSLO2JlaQ0MkeB3YdMFtAkQvSR6D0Bvd1pqk9IRSnP5BescoDNYGEqgKicFZdeFzR8g8%2B2af68THvNb9LC7R2WKeQnwxLFdgpji6ClMcCHSnbVIfSASi0ZCpOPMgVwonCRhn23VbqMnZ5Mwt85dkGIuLwWqW3V1QUw9zQVZZkQpw4ubkBlPpl5cr%2BzyP2%2Bmvs%2BraJeZnEvluKl5LyFu3aJOqSKoYvGkNr9IGsr1rPPxsx5WuJLKc%2F%2BRpsUv0AhzZsOPUZLglYfZsdq%2Bu0Kl9CK7nDqS1KlTslNCmLVU4gcr5JcVTwoYkcklfSFBFN6hyZ2yfogBgbRu2wu8776hTjNJ9GIQubASN%2BPS1EcwVN1nOrozEQYcmbNrsL8WB%2FmFlmIZn4VcLKEn3Qj0rvR6X%2B%2B6Oaak%2BUvBgIuM6OG2amDs5qidKE0KWbGurv2HefONFfJ2SygG6dfQCoPyJjEl89dS3cQmmGsDwlQCROvmTHThcRpbIHK7oKTjdIFpt0yd9tLGBQITVbWshrrlP4dxHTC3%2BPDNBjqkAVQbqlThk8r4Yto%2F%2BfkIv%2B51Xs%2FyDd8UjvEh8JMVvNNDh1glXV%2Bc3Cf2Rz7JNt2fRaxy2bmhkAi9WohXhhk9pFhGLd9K%2FExtLTmMc%2FAq401tNhgn48kAIBy0a6VCWuV%2B58Fbfa4nKqcPDX5y4hmWSrEN6L%2Bo%2BT3kZ9KLl%2BvUtBBHyohGd3ohtkUoiHkEGW%2F3s%2BuQgH2XQCL3Is4o9ZeyRK9OWAXy&X-Amz-Signature=2ccadf7de6cdcd468c1a2ac2072fd15e2b260917a8041393b61b551257391064&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DZPA6B7%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T183722Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIC6KtKzBCd2AOZ%2BBELvr7Rx4K5tCd8unwXpQ6z5jKrDfAiAuNeskQn87VViNKqmWDPZMSEr6a%2FmzrPoKpfXvRahJYCr%2FAwgjEAAaDDYzNzQyMzE4MzgwNSIM1KbB%2FYTydzHW3Ha%2FKtwDah1l3qcP%2FQFZ4Oucs3uQUMYOA9k6TAOYnKbMBc55X9TlhlHd6yJORxmZ2UcvYeesk3tq%2BeqzY1qzmTNbAeJFzj%2FNrpLLzTyVg7fvSpCLlJHZSIcoMtExPMlL1fNrI%2FLl9VGzIRw9ARA1VKVk596c6CW7UsfLLC1MdD5wh8wtWTNacGVLO04LM1tePuqqOgWvgqVLPPcSt7Z393GEcifAmn8XoNUO7R6zq%2BxgzKqWbj8UnCtPFTsJI1nAFs%2BHso5%2B87J5HO3KHU29XwuHQUeurIvIhIk4VRBnFnaWiMKSTQsv9X%2Be8G0q7yGqhoFYwzuKFoRB2VjFJJiNxGNkMpIqwbfwigpg3cVXzHxMxl1FgHIfQYOqzikMR2dujLE8UVOnUNj0MZM7%2BoordPIcBt34yHNshgFvxJvvXB3Deu1OuxOGgia82j5R7q%2F2jzfVuzSz8x6chDWPJ0gWcu2P9LMZzbJ8Frgbs3XMtyRuSiHGahTTy5Byly%2B4%2Bois%2Fgr2A%2By8O8TJDUG99GfZqyfq4q4pMG2sVl4pIq3q3u%2BIaU3YuGwP6irvDCQkfrzYBxV%2Fpsicu9XInM%2FCS%2B6EPsdgw0GJwrzFRqv5bCzJCtB6l7uwikb1Xx%2Bnmg2AdOsstsUwtPzwzQY6pgGhhGAxFcR5h9%2F6jqXD9hKxmNqYaQDPBulkUg3Ulne0e%2FxIjGzscwUVY7Wr3fQIYKpAquH0n9X8OaPYFU3S6lCRUd6g4HHQkGQKFGOKpa4nDthnwu4Xp%2BNKjAG3%2FZgvLQcpPjyy1awAJTIKs0ZRfCag%2FciFY%2BUE0Cq3BnEFMzs76KQHqlLutZ5gNDqdsv69e6QX%2BnD5qQvosk9HvaSvEpJvkCju86qA&X-Amz-Signature=7a300a52db825ca2498ace8382a1da0e6ae7edd88d29ec35192cffc1dd9d9b30&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

