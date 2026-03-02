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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZD36OMH%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCftkYE%2BTk899fJFyk2i5blA%2F4Za%2FagIlHRvg5T3%2FucEwIhAIk5RqgMgziY9gFpWaK168SkFKTCG%2FRaPcjCDhLwPc8mKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywXVWpTJzPrNOAJVcq3AOZd5I3JJaRKMCRqC%2BuiSCe%2B648RfwVSS1HyJcQi8RqU%2FC8UHB6DeUugLT8sifIqwqXX7f66sVcNQ6%2ByYXL3Btecq2geX3ugrA%2B4JzjTc%2BlFNvTjz2RZRfFT3gKb1TJyHuHWDk3bTBdRbDUlTUx50YxjHwqlKAe7%2F5r9XtHRB9IJ5R%2BQ2qCITcqZGGv6%2BLU1sgG%2BmTZv34H%2B%2BLOE%2FiHHU7ljeBUMJtvGeWP0nP5KS%2FHwgGIB01MOetuxh35Goie6u1pzzpbgA6E90gLCZeAwa1WSo6lQQN21zCDXrmHpZ%2FTMXHYARcEfO2AbhxrRihii7nQhjKvY0Rf5k%2FchV0lmJ%2F8WsYTD6WQ6rcGkLamafC%2BmR3CWqFiZxCoeNtb3ngnjx0cew5NwSRvXIQUG%2FSdMhGNSrOhK07PJb2EmQVKUv7aLhMd1cuHMHYVoLY15JQ9Qy8L3skQ8%2B%2FudfcI0ZyDRVfsJ1ic7GBvSs4CeniNbTtJeBv3LAdHhXv5S663UoM9DvrS5QMH5Xr3Om%2F9OCwtDRHaI%2BqHEQj0hzomqBUHB2rdVA6pUEOqjJhLSrHzS%2B1O0AwhuuBLz%2FjiIqDwX48X35h596ZmaFLvwVoRXUkMY0cqr9SHegOMpv7yI0FGEzCvuJbNBjqkAVbK%2FR0UzeNG%2FU0zhTuZrpuY7ExZtQrvR7dixWAPTI1ZhGekN7NEQScivTVqi7GBxeZpGQ7K3rDy6kIoOCS8wLpUWT4NZ083E%2FsBbUA2fUfZlxuF6SNRgMsH6kZfOQXAy5iy5%2FcZZSbiKdyaUYlOkKwoJ5Z6IzysokNAvBybAMrdQPw80ZmN6Tmo9AFy%2B3LbGGcLnfmj2x%2B80LlSdNhHW40jb%2B9e&X-Amz-Signature=846bda92ba06205c01f07f65981ccace8d7000b0ed7c2db713b83dcc0576fffc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZD36OMH%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCftkYE%2BTk899fJFyk2i5blA%2F4Za%2FagIlHRvg5T3%2FucEwIhAIk5RqgMgziY9gFpWaK168SkFKTCG%2FRaPcjCDhLwPc8mKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgywXVWpTJzPrNOAJVcq3AOZd5I3JJaRKMCRqC%2BuiSCe%2B648RfwVSS1HyJcQi8RqU%2FC8UHB6DeUugLT8sifIqwqXX7f66sVcNQ6%2ByYXL3Btecq2geX3ugrA%2B4JzjTc%2BlFNvTjz2RZRfFT3gKb1TJyHuHWDk3bTBdRbDUlTUx50YxjHwqlKAe7%2F5r9XtHRB9IJ5R%2BQ2qCITcqZGGv6%2BLU1sgG%2BmTZv34H%2B%2BLOE%2FiHHU7ljeBUMJtvGeWP0nP5KS%2FHwgGIB01MOetuxh35Goie6u1pzzpbgA6E90gLCZeAwa1WSo6lQQN21zCDXrmHpZ%2FTMXHYARcEfO2AbhxrRihii7nQhjKvY0Rf5k%2FchV0lmJ%2F8WsYTD6WQ6rcGkLamafC%2BmR3CWqFiZxCoeNtb3ngnjx0cew5NwSRvXIQUG%2FSdMhGNSrOhK07PJb2EmQVKUv7aLhMd1cuHMHYVoLY15JQ9Qy8L3skQ8%2B%2FudfcI0ZyDRVfsJ1ic7GBvSs4CeniNbTtJeBv3LAdHhXv5S663UoM9DvrS5QMH5Xr3Om%2F9OCwtDRHaI%2BqHEQj0hzomqBUHB2rdVA6pUEOqjJhLSrHzS%2B1O0AwhuuBLz%2FjiIqDwX48X35h596ZmaFLvwVoRXUkMY0cqr9SHegOMpv7yI0FGEzCvuJbNBjqkAVbK%2FR0UzeNG%2FU0zhTuZrpuY7ExZtQrvR7dixWAPTI1ZhGekN7NEQScivTVqi7GBxeZpGQ7K3rDy6kIoOCS8wLpUWT4NZ083E%2FsBbUA2fUfZlxuF6SNRgMsH6kZfOQXAy5iy5%2FcZZSbiKdyaUYlOkKwoJ5Z6IzysokNAvBybAMrdQPw80ZmN6Tmo9AFy%2B3LbGGcLnfmj2x%2B80LlSdNhHW40jb%2B9e&X-Amz-Signature=846bda92ba06205c01f07f65981ccace8d7000b0ed7c2db713b83dcc0576fffc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665VIPOUDU%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143256Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBt4kHwqpWZBYJyzFnVGJhyWXLsPZkBjr%2BcXo91yXt0RAiBw2vwBq%2FbS982QgW8pW%2BEgx8WSkBFPHvwW9MCtSDvELSqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM0S6qPg75plZFseHlKtwDjT%2FlA9lpcCLioAIF98jKy8kIW%2Fkjhv%2B0buAkW9Q%2FcrxMX5OJOnLUD1bruXT%2FWfXM5feAhowLbZcbOakHc6ZJwbTfhtVdmGTmE0o5jD%2F2TvSoIGKXrjKz2Kth7jjMtDtSj3sBVRSMtu6Ehsu74Rj3t37q33W8fsRQhsnSnXhOLAOmHyG7WKc2sqB6AiX%2FFUA9a%2BmgZQGlzZPoNXmm1DwzWckzIY6SlTIod%2FUIZwTQjMCUS6Csp%2BEoVDuB7R1PSJ1NqSCYZ1YAhmnjfCsbc0z8ZjQn%2Fr9GnOVQEL4BhPlx5N3y9Y2v%2F%2BhiHNWkCsFOUrhpp9heX3ugBKOG6sNi2j74lkfi1Dwhbho5nU2fUscR36nNfQujoA22sqwYEaPRAgfyB3UkTLIriH9GhpKtl3Y8WF7kdmyhMhpm6ndpWWYR7K5CuiGHeGbP%2FwO%2FNHzuhQo6Gb%2FJNRDzmpAzUiKKP%2FZpR0OhTvXi4%2BNJWig1CI8jhhsy0MAp0o4HMtBGHrpc1qdoVmWSve0KGddIlbHOINOaWl5vm5tupFSilfFSrQtf1gT583UnUMb%2BYVQFmVl4g6hBKBr00x9xIdx43q7OZ4UY9hinc12catLbA4d6yWcGr%2BYtvOjOVUbTJM7r71UwuraWzQY6pgFHda%2F4ZYq7hjRKDOxdEmh60T4wy7ELY7qZ%2BjV0cxY%2FXSn8ZGtX30%2BpzybBn50eT%2BdZSGK9TwuofHa039wFV34nVjJDS56Wa5w%2FqbM17cuKAePchkfRjWrvw4mMkDf%2FEAqqPLzbPLulGScPy4bhyxMCwnqIcOpkfeuK5K8CdC8DwONb9Mq%2FcPM5iA60wJvEg22VXAfkrCvp83t2EffYvEUYkNRrwgUu&X-Amz-Signature=c29c91359341cb2420507260c0f5396539feaa9ead015b2e9e380a716225e23a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2HS4F7F%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoTSA3hnjQROWnV5ONRfedgTu5Yj%2BBHXESh%2FQwE1hOPwIgblL73i1R7%2BS%2FC4rMhKFwCz5B%2BxR7NVqHxxo%2FTmOSe4oqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP6JpuU2x2IvfwVdbyrcA7vdSdSV08md63gV9FhGMDhdY2DM7EL4TaUR94%2BBETKaxpl2AEC0J%2F6S%2FiYbNoMrlQl31zfJq%2FfBBCgbq1uHl35ayB9P6aeOu0uI46vA2fRh2eB7kgeHtU0b%2BRlXhV7ADtqkRdB5o0ZYxBf9mivgrGQ8k%2BPq7kaWPcrHgIoS5y1n3L1h38nj%2BadHZC4CusXXo7ZCvWueD3bvI06OYZWjuYEnT7%2FQqfaBixNVB1xJO2GT6%2BFSPPZhzoNoDX5yW4cZOCPigoRSX3xSSwDenWf6NbzRaylU2vIQoGiaaRY07Qdwa%2BC3ZYX7mU4hQshSN9Q%2B%2FyeYWVXqK7a7rP5O8EM%2FgKBgtlVdKIY%2FF60%2BDtCNdknh9Grqyj%2FWh1yA6LFu0YSxWOHYevgQC5b59Z5rEv8nnqEC8QkYNAipgvqkQE2t%2BgRam5Tecb8X7xIG2sAARfr5JW1yszPk8OUGu6t0xUBDw2t4wtgYhBa1jnyFRGqqhPaNXPVRdvVn663f6X%2BfVvuzbQwxEnRVy5EONl%2FovG%2Bigy71dzVlqMYThCacCR44L%2BEI6E7nA22vvPP9ZCtPGmw36WTaBU%2BOg6PRgCrn%2BY7h3ZBCSXWFn1pKuOl%2B8ruYnk5YiU%2FOPI1DGtZPYuzaMJG3ls0GOqUBf5GK6SiXSFV2%2FAZpPR4ev85kGNIGJl3P5KdRsQ0DOFf3BozSUAlulaEV3tBQEctTyZuMTBshdlKnlJcyByV6CoUR%2BEBsVg1NjSpYAiyJnN7KGxImC%2BxsluI8SF9a1gdpPPpjJJrKKgvj1MpSoF4LOBu97OjOggGCzlICZoc4dPwHhkAlxJmQ9720nlR5Bc7PmndADmZz%2FYWhrI%2FtJZv%2Bwp1Ekpkl&X-Amz-Signature=3f7cbb15131178f596d33ca62afc658dea08cd6778cbe0c3f6a48be11e078aaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V2HS4F7F%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143259Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCoTSA3hnjQROWnV5ONRfedgTu5Yj%2BBHXESh%2FQwE1hOPwIgblL73i1R7%2BS%2FC4rMhKFwCz5B%2BxR7NVqHxxo%2FTmOSe4oqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDP6JpuU2x2IvfwVdbyrcA7vdSdSV08md63gV9FhGMDhdY2DM7EL4TaUR94%2BBETKaxpl2AEC0J%2F6S%2FiYbNoMrlQl31zfJq%2FfBBCgbq1uHl35ayB9P6aeOu0uI46vA2fRh2eB7kgeHtU0b%2BRlXhV7ADtqkRdB5o0ZYxBf9mivgrGQ8k%2BPq7kaWPcrHgIoS5y1n3L1h38nj%2BadHZC4CusXXo7ZCvWueD3bvI06OYZWjuYEnT7%2FQqfaBixNVB1xJO2GT6%2BFSPPZhzoNoDX5yW4cZOCPigoRSX3xSSwDenWf6NbzRaylU2vIQoGiaaRY07Qdwa%2BC3ZYX7mU4hQshSN9Q%2B%2FyeYWVXqK7a7rP5O8EM%2FgKBgtlVdKIY%2FF60%2BDtCNdknh9Grqyj%2FWh1yA6LFu0YSxWOHYevgQC5b59Z5rEv8nnqEC8QkYNAipgvqkQE2t%2BgRam5Tecb8X7xIG2sAARfr5JW1yszPk8OUGu6t0xUBDw2t4wtgYhBa1jnyFRGqqhPaNXPVRdvVn663f6X%2BfVvuzbQwxEnRVy5EONl%2FovG%2Bigy71dzVlqMYThCacCR44L%2BEI6E7nA22vvPP9ZCtPGmw36WTaBU%2BOg6PRgCrn%2BY7h3ZBCSXWFn1pKuOl%2B8ruYnk5YiU%2FOPI1DGtZPYuzaMJG3ls0GOqUBf5GK6SiXSFV2%2FAZpPR4ev85kGNIGJl3P5KdRsQ0DOFf3BozSUAlulaEV3tBQEctTyZuMTBshdlKnlJcyByV6CoUR%2BEBsVg1NjSpYAiyJnN7KGxImC%2BxsluI8SF9a1gdpPPpjJJrKKgvj1MpSoF4LOBu97OjOggGCzlICZoc4dPwHhkAlxJmQ9720nlR5Bc7PmndADmZz%2FYWhrI%2FtJZv%2Bwp1Ekpkl&X-Amz-Signature=795f1e36eb246e8608eb9581119483848bc64a297f7aed3857b226d99f8b080a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QPMTB5XM%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143300Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDjtnEeWUS3r4eTg80tq9tL4%2FFdfTglhbeiQgfbLtd3JAiAXnb1Aw69rKyzmefiVWwSF0E9X95pj4gmUAH6TIxPq4iqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYdrkJYC3V3ABgIpCKtwDCH2CW3lDu11sBmYSuIBhu1aDcqol8btwtZvXM%2B3bPs%2Bc6dP66MhTU7MRHL97%2FZeLqqa9C%2Fw%2B8rzPa78jb%2B62wq4rxGs3FjLV8St%2FP0YiItDcUfph6DLXUBpS3YHQkvBqSemHuWERN7U6ma0oxxY84wQ0my7ibJb2gvufBfWazxz%2BEpD7n0MzIzu2M8WU%2Fjnz96ZNmxyZvLCt2YbzF807aONqV3WI4Af7ovCF1iQqkGC2AM%2FkyeJsOKePSedztWu%2F1HjYxeQOuhS%2BqQhpdy2e4vLRnFSI%2B7qSc81vkwTY4sx19uGEQrM3mV9Ceqb2vXs42G%2BuYInlMUrdS3UeNLp5rrBm8H5aQzS5siT6yOrqhWLczJx%2B3Ci1A7cagimi6FbeZFUEL5dexnkMD%2F5IwSRTJtz607qgdsa9tIFYtiYhKYk64IWEglPFwgB9w10eNbp0oRycixvXmi5VPCAKVsu0fSXXcM4NNoCswx3d79UmvDy2BJaQ5csvUNBxR0SQyhq%2FDy5YhvwVU2JEC47REQux9SUzpg4B3W7I%2FNFAgPx5EmDER5rsBi1%2B7nFOuhf%2BpESn1sIt9vd9PzdMVeTAmXi9qlgJFZB9qr1q3nNne8NemTKMuUVXbrvUn4u%2FF%2BEwxLWWzQY6pgHfjPg0p0IQSHpABF%2BUUm%2FeSHHEm6MZ%2FkmXC3N9o%2FD%2BSSd0rmDI%2F%2FIWFm0kB5poxcU4mwJWL4PHwK7RXedrU7wNCZxChRswRYrk9W1KDWqNXyAFJbTkHRcdQcWll6A7NnTufn1gkMpExGt9r%2BJ5gaq0cCqjF%2BevqGOiPlgCTlx%2FmZUv%2FLxhldqJGOwOUXP1n1tuacnKXLSMdil%2FAZMxw6cL%2FX0uktau&X-Amz-Signature=424559d3af784279259f1879020bce65b75304a47f053a05439ace3e473f1cd2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UMSWFWS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143301Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDSOsLTmJGbt%2Fol2mWNJJ2o5I7q6EMtr25rT8a3FVw6mAIhAK6oirD%2F606cDsgSAiGFVE%2FrEZMl45a%2FCA3aEjep%2B2wXKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtERTi%2FHsKtiEj7nsq3AOgGRcTgEHzof%2F%2Fh%2BALEAitll1pzt1lhDaY2uH3QLExezLyuW%2B3uV9v8BMMWMBBDB1ctct7qut8MVE%2F3chIlaWOI1yKAbpiWh15GNtpztU3Drx6O5V97HkAuhy%2Fi7BVbwEJSdxckCZf6jfX1YG7LIBORyipgmQydangs5e2%2F1EsLq%2FdASDPals5D8s86Z2CaVInBQFgueEkfHes0xqdUNzGWqGwC0USd5WupZwbyyxNzx9nJGvbiWWJ2zZLXsmyBAFawTAw5L1jqR%2BSVAJXoLzxQeYObP1SxikqZ4APvfHbdyXgvXTRFTjvSA8P1%2F59koL2ZPvKZUxydDY6Lu2hQIoNPB7SpGLln3vvqvECQb7Ee9Q4%2BfMwErOr7%2F6sQmnZyrDxyiXUD7h0gnMxkS4%2BsxKXlrL4nunjN5KrTC%2BzpIa8%2F4f1MOe7GYyalb8WK%2FUrceUs%2BD%2FilZG%2BuibUBrFyd64BVImJr39zWwTtqxYWc5mIYtSLU0qG%2Fddyi7qDWGDta98L2J63YF1h2Z2b5WJeQAAiHeRQlaB%2FmzvE5rXy4VaacSkJsP%2F42AGExyHhD25PQebkf8tnGwRiAvRM6B5WEw6DJh%2F6F8XbAuAzplcYbPltj2yjDihyTF7XPwfMDDCptZbNBjqkAbzQrR0jteCxIXMTXtB%2FuTMEKnk712N2V1BqQCEvv8dxfmkx67JYtNTzEgfDg%2FI%2BiNGFgqeSF%2FNS%2FV9x08Hb7qgQHM8zrySN7zK1ui8nS6jlFwKlAUOO9NAXpoI%2BvTWRZsNKgsbJiLQt7RnjEkXSgT7%2BPpDRDeG5HTC5ZNHhfnXSNwNpDtUPNPGTK5qfS0%2FNrbakfxwn5fV2rUTpSpzd%2BYXrmDl8&X-Amz-Signature=230485a666dbabcfe88cb0bb3ef731ee9ce55e4ecbeab9abdfb08f25bfe3a89b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667VJ7YW3J%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143302Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHPIPa4JMOL7SK5jlC0eKJGgaTkPay%2F0r2PIBWCWKS18AiEAieLjXMCQc6fiyyO5a%2BJ2CymQ3YalmoOaWoLDpGj7Fk8qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJoOtajlD8ED7CDziyrcA%2B9n7EUTQvyimsPHElc6fzY4Dr5YvcidqNrzGVO%2B65mfuDvwP%2BEY2JAGJYzKMH8aIDjv4ZLalU0CQNLXbXDi%2B7aDeWarbX1saJkcEB4aXAZ313P1dxoe%2FUhuNoFNoJlkLS8CKDgIJat%2FsE1EISsb3iBrS0k5KuaFI638RTBwJgEt79EHBeV1oGBVeYBvxcInsN2eLdwBzDiX8nB0AFJrkfPYhPFH4zfbGccMBIqWUqA4EWkfZK8BvS3Kv%2BXpS0hQGnH78FOso2bZBsZnBY3LhYPH3wXrcigafAWEEId2e0DRtsPXDMKGhwsWNLsjsGCMxEr4i%2FxI97%2Bs%2FL1F2iIVyE0MnX21Pz40o8YMmXUsaSQEpFED35rUo2vPnaUmSpSE6AM6FKzFfUcfYAObnRSyfNDh0KNtEw9aePd8tIS2T1r%2FuAzqofG%2FNDCTMZ7UmRzrnonixh7RO62pJDojYE9E6Gn4X%2BSejSWEgKLQ6LpuVnuuZyjLt%2BSPXx8B1HmgemOW03TnTie2cVmnQZ1GLwjEgwjGmcdhB3OOuDzKQdO2LkILZH8pTnxpHcz2%2BS5nD1Nqj5rHUzb5LQuMLUwUjZQb2%2BquxAopN6QhOm1KM3nbD7gUNcOT8ZRTPccOIUyfMKa2ls0GOqUBbSdbjUs5IGE8S%2BNd5j7XiILUL7145xMdrpXqnbGpVhdxecDBGrIIqu8OmiBHkgkdSXejd9lTHwMlwh9CDiJV0cW%2BgXFYTQJ4SjydXh2BKCqAlYg%2FJ5BJ4sK5nAwsHBNnv5Vzb%2FUApJq7l9XAASCP79Bbv5ctY5MJEMXiHcSaLz%2FS35CALHiKhLGfssA%2Fm%2FJDaNb7IUaOxss5Avt630KC7mrE7y2S&X-Amz-Signature=940ea89b555ea937a24d09dbde8768a167ef5a0f3aba0d23014c2f487872d611&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNJ7VVKS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0AXD8%2BC9HUVLwu08oeJN4sWSTfbN7ZEC4m2dOAW%2Fp2wIgUY%2BgbNUlSAjH5l5SsOT930tVHcy3cmzarLY3d%2FRzUHAqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN7b4qZHz7bx99yOsCrcA%2BHz1886vEkz85TM7YtQcZJzytCJg2hOHuSqfTm7A1jfXKhqWNP0XzUPHdBUS3wyag6o794klnz%2BUNfbEpYcBMVDUg6teSQqvuJqnr5wqrjbSEd2Pux7y%2FP8BSPy51d7V6ZniZ3x%2FYsocVR%2FBOqkyvoo7RmR42Zar%2BbWYmhtG4Z6XMTX7zbj%2BVXZwd18OaLromeCpsDQkiI5sOiHiQZsoB%2Fwouhd%2B6kdRer2Zw4Q0KN5EvHjz3WFcrzorltkhAubJRqVw%2BiqASVhSBVBThqUXshu1eQzdGf7%2FDYAcqdsSIbHuYwCaV3jSePqGix0pF6szKA8BrD1SMLluEVCTAegdaExcA%2BQ7EsT7k7a2zjggunA2ZSR%2F1xEh2C9u3stanDKQ79BN8AQzxYi7eSPG8IUsJNea%2FHPiONntvR8G1VoauOKBCtlIdY%2BsnjADRhMlAu%2FubAvRLttqllukAcM0wpnslJ7paxdXP3kv4PvYi7AOl2Vda0WcenH8%2BZoqeGrfnE0i1h0WCXtv8008986n5%2Fom6S4QXRpt%2B%2F9TYb8Un%2B9oTFkTW5EesQ1G4ChTEWVq5TxTR5%2BOftMJ5gYPm0J0tK4Z9oH7VyOMrGtCpSDsMVWgoaLYENgeAmSKC6ypqr2MIK2ls0GOqUB2ETQg5GTJDRVvyAEJbBddN10RYLWTKIekNNmv7QM7gvIlgjYHFXgb36afZm2LDUQ9sTY2U6Yuj17%2BDQ2uUIKLIUCzW1WCklQq5MZjKT%2F82fvG%2Fo8i08TUw62y8oPufWQcBXF5Q66zI%2BdCR9L2RTf7fFbFx0JDpbPTAqWfntEtyRZyuN4NSNXhWjNZ41Tx%2FvNKJXIy8ozvRd6L6XGH13DZhrk%2Fwx%2B&X-Amz-Signature=ef078ef2ff04d71eac5f641d171201c209e4306dba47f898b6ec12016a01881a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TNJ7VVKS%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143304Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0AXD8%2BC9HUVLwu08oeJN4sWSTfbN7ZEC4m2dOAW%2Fp2wIgUY%2BgbNUlSAjH5l5SsOT930tVHcy3cmzarLY3d%2FRzUHAqiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN7b4qZHz7bx99yOsCrcA%2BHz1886vEkz85TM7YtQcZJzytCJg2hOHuSqfTm7A1jfXKhqWNP0XzUPHdBUS3wyag6o794klnz%2BUNfbEpYcBMVDUg6teSQqvuJqnr5wqrjbSEd2Pux7y%2FP8BSPy51d7V6ZniZ3x%2FYsocVR%2FBOqkyvoo7RmR42Zar%2BbWYmhtG4Z6XMTX7zbj%2BVXZwd18OaLromeCpsDQkiI5sOiHiQZsoB%2Fwouhd%2B6kdRer2Zw4Q0KN5EvHjz3WFcrzorltkhAubJRqVw%2BiqASVhSBVBThqUXshu1eQzdGf7%2FDYAcqdsSIbHuYwCaV3jSePqGix0pF6szKA8BrD1SMLluEVCTAegdaExcA%2BQ7EsT7k7a2zjggunA2ZSR%2F1xEh2C9u3stanDKQ79BN8AQzxYi7eSPG8IUsJNea%2FHPiONntvR8G1VoauOKBCtlIdY%2BsnjADRhMlAu%2FubAvRLttqllukAcM0wpnslJ7paxdXP3kv4PvYi7AOl2Vda0WcenH8%2BZoqeGrfnE0i1h0WCXtv8008986n5%2Fom6S4QXRpt%2B%2F9TYb8Un%2B9oTFkTW5EesQ1G4ChTEWVq5TxTR5%2BOftMJ5gYPm0J0tK4Z9oH7VyOMrGtCpSDsMVWgoaLYENgeAmSKC6ypqr2MIK2ls0GOqUB2ETQg5GTJDRVvyAEJbBddN10RYLWTKIekNNmv7QM7gvIlgjYHFXgb36afZm2LDUQ9sTY2U6Yuj17%2BDQ2uUIKLIUCzW1WCklQq5MZjKT%2F82fvG%2Fo8i08TUw62y8oPufWQcBXF5Q66zI%2BdCR9L2RTf7fFbFx0JDpbPTAqWfntEtyRZyuN4NSNXhWjNZ41Tx%2FvNKJXIy8ozvRd6L6XGH13DZhrk%2Fwx%2B&X-Amz-Signature=d70e53cc6939f3c6b6b6b6a8c97cba702ac4f324937742eb477fdd8ec137c614&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RE2FLQHV%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143252Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDggFLdOU%2FgP1NrCW950KKAu7W7t5xaJHzPWjWGbFtL3QIhAIGI2o6Cjo1Nm949LGFQXgZz3zkAcKK4GJ%2BsNRCEV7DbKogECIf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwbNmBKhYczHWpmnC4q3AOSlGDKlppDcFiA%2FbKr54c%2FWfmocOJEPEKg9x%2Blxbr1%2BVcO28h%2F39fh%2F5SaMZg18NWP1GyTAC9iV82wZBm544JsjmmjWwQTDfsJOYDwN%2B3e8TjAbzF4iFtVT%2BKbXhNM8F%2FbA%2FlQ82tyV67jB5TOTvYcuCC6kzJVJtfcOZw7%2Fxa7tJKZvrOHX09hx5odOpzDXEu%2BucQ0sCjJd%2F45TlqySsE6bwql%2BqgOdad2YmbfoXowdrmdHVMembxVC8aaQmIW27KL9GWa0XHgLZcL5dLkDN1cFN%2BDzMB4nWncmit7io9UkPEpwFpINz4lZA9yFY4X6cbmqKPPdS9omGAXCY%2B4h80qLmA3363HwSN2KRT4PEcjeNRbNRY%2BRof%2BJkjTSVr4jUQ4W0TJGKqQZXNyWbSg9J43nvGcQj3X8%2FcDeJmvCgMhfj0wnn6iEexvaVEQL4R%2BRKKUMXSegZaiLCmQlXryhUyNEOEVlPJs7SDPj0InR7On6woSs7sIUvq4EZM18LlyrQ4nWl8uYTpesu6zGRa00VJ1kGuKum97k9fj2fL6jgE9zwsDultHAY9O2I2x8zZzTjqvjRLebkZcy3AgjNgju%2BbkblAdrwIBhpN6obbghlW5UlyBu%2FMWJv0%2FMsPH%2BzCmtpbNBjqkAaehpNCIGhdxGZfBJT03eiZ0%2Bij6dvhGi9fAI%2B2CWk42Pnjs9I43K7nsbjCbv7mrFksXVm4YMWcCJkARFFDb05BEECH%2FaiORr81VpYcnDj9oBtOQpEf9HDk%2FWPiXXCpO2YuwxWhSf1wzFcCXHEtXHwcb69nWS8XGvN3DDGuCCUfFTU3%2FTzrX%2FEEVEKVcEc1D3STvzxpmgF0W4M1dqvLB5wzghj3d&X-Amz-Signature=88b97ce65f835d4926edd69d07a4e189b58805fdb077bb62d82136d265f3a171&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEY326HL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEhZommRfyBhJfExS5EtThEryQGaybsR9TJA5FSPUTyKAiB3VsPiOBxr3iU5r632wXtfYzxj47XQVQOMUYGE4WdFUyqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNdz%2BjNQEiJ8QWcu8KtwDonD18YSGAm7E0wozbDQnfKi8WKVQc1h%2FZkeMABWlRUFXMP39OPSdoKOnMp4OeI21wtVt3kL0nfC0fjuxseiGp6U3Dtfx0lASM0r24v%2FKRWmhJx65t%2BdWfU%2FegTzQTM3FD4GIMJVYOcK95WyyW9qq5tsEetviWVynyslduZzmTagtoX0O4WWVVasM0aZCooZj%2Fxf%2F8fmp04HtVetTcuZJAhtVrMP5DAb%2BIuTMOKQPom4q8l8GBZgAw3NVRqhI79Z9JBxCULxDAtpP37k3LSpzZvWWp781GKTZIG6jw5MaU31s4OTqhV1XFL6mTNCpDHchkPkEM8Qe2PWZNfv3vhUrm7M2LpsIVQud22ZrAgCvcn35DehhQnay3ZqrbiN5PEjgz%2FcQCop%2BVCgOIZVSXb81VU5RKSteH7ZxC0K7t3qE1NkEzoDpwq8pqpFrQOnJeR4jWU0BLn05FEshan3f31vHu1dJDUO0qIJQ0MbSLE9nBdOKPsGY9Axj%2BsRWZZ7jkLErRD6VuBOgCvzT06OijIbMgFqyCkTR5rW7FZ4JvO9TXQ1reyL6lvquMVp%2BijsAV1vljdvK67LCMksIHerddDooR2XO8MrppohXv3DP%2Bbp%2FU62z79NFMEzX%2FdTVybIwlrWWzQY6pgEPZuwbJgDOfUxEK%2BAbR9RbgPUjhe6%2FnZ6PtgB0nv6h5s7hcRWmkOpBhzJsZ6N3%2Ba3qez4R7OirIJgrMs29jOaOzMHxihS%2BLwxWwW3EXONXf9eWI7Zbv63nMoMcMZA%2B4rPKY%2FcRNgdYPVVNcyB43aNb8ccAFjFfamQGmToLug0NxB3O3P2EWWsehSxprPQS%2BX9c%2FTQZYO7fTonFg98qSQ%2BgTyIPENYU&X-Amz-Signature=10202e8fdd2715e70a6108908b4facea148bb06ae4c95fd42d53664cc6404717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SEY326HL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEhZommRfyBhJfExS5EtThEryQGaybsR9TJA5FSPUTyKAiB3VsPiOBxr3iU5r632wXtfYzxj47XQVQOMUYGE4WdFUyqIBAiH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMNdz%2BjNQEiJ8QWcu8KtwDonD18YSGAm7E0wozbDQnfKi8WKVQc1h%2FZkeMABWlRUFXMP39OPSdoKOnMp4OeI21wtVt3kL0nfC0fjuxseiGp6U3Dtfx0lASM0r24v%2FKRWmhJx65t%2BdWfU%2FegTzQTM3FD4GIMJVYOcK95WyyW9qq5tsEetviWVynyslduZzmTagtoX0O4WWVVasM0aZCooZj%2Fxf%2F8fmp04HtVetTcuZJAhtVrMP5DAb%2BIuTMOKQPom4q8l8GBZgAw3NVRqhI79Z9JBxCULxDAtpP37k3LSpzZvWWp781GKTZIG6jw5MaU31s4OTqhV1XFL6mTNCpDHchkPkEM8Qe2PWZNfv3vhUrm7M2LpsIVQud22ZrAgCvcn35DehhQnay3ZqrbiN5PEjgz%2FcQCop%2BVCgOIZVSXb81VU5RKSteH7ZxC0K7t3qE1NkEzoDpwq8pqpFrQOnJeR4jWU0BLn05FEshan3f31vHu1dJDUO0qIJQ0MbSLE9nBdOKPsGY9Axj%2BsRWZZ7jkLErRD6VuBOgCvzT06OijIbMgFqyCkTR5rW7FZ4JvO9TXQ1reyL6lvquMVp%2BijsAV1vljdvK67LCMksIHerddDooR2XO8MrppohXv3DP%2Bbp%2FU62z79NFMEzX%2FdTVybIwlrWWzQY6pgEPZuwbJgDOfUxEK%2BAbR9RbgPUjhe6%2FnZ6PtgB0nv6h5s7hcRWmkOpBhzJsZ6N3%2Ba3qez4R7OirIJgrMs29jOaOzMHxihS%2BLwxWwW3EXONXf9eWI7Zbv63nMoMcMZA%2B4rPKY%2FcRNgdYPVVNcyB43aNb8ccAFjFfamQGmToLug0NxB3O3P2EWWsehSxprPQS%2BX9c%2FTQZYO7fTonFg98qSQ%2BgTyIPENYU&X-Amz-Signature=10202e8fdd2715e70a6108908b4facea148bb06ae4c95fd42d53664cc6404717&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7A2GBRL%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T143307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCk%2B%2Blnl3VyHji8cpavoQwnQ3FgoounIQjY4NWdLvZFvQIgLH9E7oUuly0ny9DtPepbupeXEn033t6kFo1CtvF3gH8qiAQIh%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK8Ez%2FbKVKCozfzy8yrcA8f68INokdDdGE96GnSUgcAVsDhJLt0CfOq3UFSkZaP4c58ZoBkUXOInZzvsLEHhzNKmpA3iL%2BYWDsXdPnbFxj3qXrt%2F9lz1zoBttdXof6sqExNb%2F7R%2FdO9Pf5TEclMgGoqNmoWZUw22T13xl%2FnasMelYi%2Fh6beN3CfXQIj1Ea%2FeWLJjZXCQMsVSrBXqLDJQXr0r1euffqJaqQGPzHqrzt2mrJnt%2BibtK0K8MACYkx0gsKI1a7lGhTDpeRv%2BCG9113Y039NiQqNOJxayb0Po3LUUyoWHsc7A3h4mZKggxOhzszkieea65wRd1GRFsa8nzDvjtzjEO82O1v49%2FYel98a1uWWbG6LDqf7mt7uAKbH0Eg97o%2B6NlXl7eFiwDcRmgaud%2FuxIRj29ll%2BaKEWplMVPELFUDyyE2hx6rXS%2Bmw%2FGWXDtfRJSXOg6afoMqJ6X7jPloUeWzUVvLU7nBnKraElZ4mmDK4ZUzA2OcXWQoTixNUiEZjNA3PqQD0U60AIErcpWJfXDVaC6lOqa9UVdhF3F1YgKtY0st%2BwV81vM2AfEq6IQyvDt3XJMsCBrFP2yKHDLBJE8eN2eDFQS%2FEUd5eESM12UkFwbfVp04WZaTdFm%2FvnDnohFGqSyjeWCMLS1ls0GOqUB5bvd45l8wCJcbIdje%2FCJIhFhUqo9N%2BQVoo1dPwfwlGrUoN5GWkhUMiYa6PeYB3twVFO%2Fp8bDLEMuhYitgMw14swMyINsf0iauASTDgxW7cLJmvopg5i072NW0gVJSiMbi6BvgYn60tY%2FVgmkw5fyl9ziWlsg6gc6LhLFH%2BXN%2B9eylhlpRbyEDIBWiA2plCWkInVqqnLUpuu338C9TuNOPP8OztmK&X-Amz-Signature=ee6ecfbd4983b574d80e3ec7691fc8bb707520489cdfe2d8b10ab6cd0b9f04d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

