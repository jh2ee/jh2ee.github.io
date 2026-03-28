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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5CZKXLH%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCWPYifKNgWSYrLbpGwdpHrjUhY8FIUH5hM5nNzaUSRMAIhAMWKGCWI%2BUB7OR3wR0a7SpINLM7NFPYz0gK06Oq1DMCzKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz7khPHTGmNWOjKWWgq3AP2vgGmwerOIk3lFeZ1%2BikhT72GGrqxVBcl80phmUFyFpbB11TmpQ%2F6Ab4hYb%2F61C2YhgNw6Srj6N5QuSbVbRLwxr2QRvXV3%2FHgh%2ByBc1aZhZeyxcKEj1wwqVtdaaHn3RFioQGybGZwZPv4FX6HenzU9%2Bz53dqnxikF2mUXEy%2FES8483lTvfvsV%2FEeOI2fplDgt9Ukee0DjR%2F7qHMHYmuGuqBd2mASghXDij4t7m%2BUSMuASdphGzKLPe3r2SPRFug9V0mYWIqY94FWp1qKnBL1vhQQlDLgqN5KGLAfA29qZh0GkENnSYuqVrTY4%2F3BQq%2BOmqEY65h6lFNE5E6%2FBMOEzED2Z%2Bd9RASOdltksT7kL%2FMIfNdbKWxAq1NHIU1KDTtODvuYNcU3W0Orl%2Bz1%2BE30yOo4GpOu1jucmZUONslxxC5U%2BXF67WiIhn7SEJ5yZTP1tDuEtucH7BdzCMbvv%2FvansHqX0%2FzgqFxzhjic0W8s4M%2FsCVUvHVcoU5jwxrw6o9lKX8FSG%2BthRcPd04VRIyi2sr0DdN2mHxZlAee57PgLtKdvC7UQ%2BmXHs7wC3u68p3dKsokj1G6dJdpvsQViquvR3WCfaMRTTqCgHHv1z%2FL7BitZ1RKM6XkbWTa0mjCvs53OBjqkAaIXtEoZ0hJKpYQK3gSRRjR6C5d7HsrRQeuSf05Nigexrun9%2BYhhQ58dEuT8%2FqxnXv9mdO85kBi7dj5tCbqx91yeSzCVn7lfBXh0i16TBO4dFLxJNrWYBgdS8qV9e4rbHeSppBoYc74X1DrSQG6wKQcj6idES34TcQkyItN0XeLXKwUS%2BuCp4EmCvzuVcX8sDirhy0SiWn9tzdRWvLK7iQYSoByi&X-Amz-Signature=bda5504811d8ec4299a57300168487f8ed9ace894dab5d35a006510c19e70b1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5CZKXLH%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQCWPYifKNgWSYrLbpGwdpHrjUhY8FIUH5hM5nNzaUSRMAIhAMWKGCWI%2BUB7OR3wR0a7SpINLM7NFPYz0gK06Oq1DMCzKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz7khPHTGmNWOjKWWgq3AP2vgGmwerOIk3lFeZ1%2BikhT72GGrqxVBcl80phmUFyFpbB11TmpQ%2F6Ab4hYb%2F61C2YhgNw6Srj6N5QuSbVbRLwxr2QRvXV3%2FHgh%2ByBc1aZhZeyxcKEj1wwqVtdaaHn3RFioQGybGZwZPv4FX6HenzU9%2Bz53dqnxikF2mUXEy%2FES8483lTvfvsV%2FEeOI2fplDgt9Ukee0DjR%2F7qHMHYmuGuqBd2mASghXDij4t7m%2BUSMuASdphGzKLPe3r2SPRFug9V0mYWIqY94FWp1qKnBL1vhQQlDLgqN5KGLAfA29qZh0GkENnSYuqVrTY4%2F3BQq%2BOmqEY65h6lFNE5E6%2FBMOEzED2Z%2Bd9RASOdltksT7kL%2FMIfNdbKWxAq1NHIU1KDTtODvuYNcU3W0Orl%2Bz1%2BE30yOo4GpOu1jucmZUONslxxC5U%2BXF67WiIhn7SEJ5yZTP1tDuEtucH7BdzCMbvv%2FvansHqX0%2FzgqFxzhjic0W8s4M%2FsCVUvHVcoU5jwxrw6o9lKX8FSG%2BthRcPd04VRIyi2sr0DdN2mHxZlAee57PgLtKdvC7UQ%2BmXHs7wC3u68p3dKsokj1G6dJdpvsQViquvR3WCfaMRTTqCgHHv1z%2FL7BitZ1RKM6XkbWTa0mjCvs53OBjqkAaIXtEoZ0hJKpYQK3gSRRjR6C5d7HsrRQeuSf05Nigexrun9%2BYhhQ58dEuT8%2FqxnXv9mdO85kBi7dj5tCbqx91yeSzCVn7lfBXh0i16TBO4dFLxJNrWYBgdS8qV9e4rbHeSppBoYc74X1DrSQG6wKQcj6idES34TcQkyItN0XeLXKwUS%2BuCp4EmCvzuVcX8sDirhy0SiWn9tzdRWvLK7iQYSoByi&X-Amz-Signature=bda5504811d8ec4299a57300168487f8ed9ace894dab5d35a006510c19e70b1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D54PEOJ%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQCw4zxBHXcsxmbWTlY3DSWoHddG9wF7paV9Uqoq7Q3ijAIgY8Io9rCOfwOZP26IH452b%2BjcKg05hSJnN9h%2FKFKLWsQqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLtBdKbcFxs6XqYjvSrcA1mMRxlSUVVhRG%2BRfR4q02E716TI4TRJUI7%2FE30a1akClRHcVTW%2B3%2FY37HlJBUABoTDFcTm%2BnlVfEbhDJZVS8aDaHDJiBW65qKv6PJleBDuElKuOSzzxJPYkYNUKJsIyQlcBhCzmgbFKAguWwhLErtIglC1QgrSP5XGpUT6ewXl7bCjmjfdUgUAvDH37dVwI8m61s7%2Bt9qPaVYPtl7xqlqKTvxwks5741FzmywPoW4t058DclyOZj598GnWpQLHPFkou6KGCm5TMagnh3l36CnnLipEQc09%2Bo3Ansdliecf6kn45LHFUeGPiKIDyBxMscOvc45KIgiIuXgDEUIW7bZsZuvvmkf%2FG7%2FyMFe90odhXBSR8zbM3MPlcyA4C6ilVoQ%2FDkHL2JAyJSVe1QuuK1s4CON1%2FQloH8MYqL7u73Q5R2aj11sip8aH3rBctp%2BME6U4kr2gMPfEqAgrlQzL61qSmRACNlHbOg2SQvOwJHMROyZjlqEYGc%2BL6l8wOoaJ1iEF5aVnpMnALbCTQlJGvLJsfvz%2BLBH7leZ8rAr8GalOqHU9wFLW1%2BS%2FfrVXYlgeK77ufHS2uUfWZ%2Bz9%2Fyd047f76z7KHfu8jhqh1QZFqxcuCJmm85PasPZSWWD%2BKML6znc4GOqUBkRZ0QSrQsutTkgcC3iI%2BWQFq6%2FMDviBkH4%2FfkWaLRvt0S6vMWBDWN0hULUQsIiAg46Q3KcWM9bPcqfSih7cJMNnDL9o63pq%2BsT6WRoJ6m%2BzWLhQb4s%2B0F%2FeJcBR9IC%2B%2BBtWFZlPPiYkTNkCg2ktfnu8UOuJ9wfIgeFSVKJznqNwz6%2BdAw%2Fj%2BZeY4WyFi4MWXHkYaLA77her5C6m2laSKm0guZngy&X-Amz-Signature=0aaa1697e00a1f7ca9139a1e7e2e8ed3e41f32bd33ce858cc89ae0ae2f78f8e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBNBRIFX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIDkUihe5G0jtfUgTTOciQYM%2B9inVV7jgZAeGJIy3Bh0XAiEAq7K%2BxyB3kYr1gwGnb6aJM5V2Zv5eUlEgympGk43z%2BPEqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKVjdA2I8SEHGckqircA%2BEihwCsrTgBTsFs37Cs7azFOgjRoBHsbzRUjmaDTkpRrdJIQnPB0yk0pVmpy2Cn85GtEljsjkknhfzby1iFJiaVrclexloWyU51Q3AX3r0bSXnSoHZKPqGTQAfk3javcvJUwl%2BApIq33A5LnJDf0oazyzQ32KC5RyAkDZTOPMH9EQ6bEq2RV3De9XRzOxk%2FKWuN0samIb%2FHF52K4GAHbAtn4Gi6oppvum2J7GV0c5o1ySEiOpvfgWvJ%2FXrDO07zBLR4RH1RWThc7a3jr49NN%2B61Q1w6rJGxH43i8g9HWhtInSIHFO56D2LKC4DM8kizJXD%2FrB4qVub7zR2z%2FEaoIi5RkF7FUGY4tNQclwFFipGWNL1I%2B5LEF5u%2Fjc7H%2Bwqu6P%2BeGZqoVCKYPI%2FhEo%2BHdk%2F3tBORYCE3evhbd2uG2bpEelnu2ruFjhTPl3mn7f5kl6WZP4JEuTDqG4FN5jf3EFJFQUgZqZfC2OipSf7znPWcAeUj%2BIPhdlrDM7%2B9W27xb%2BrDfZkBBpbya4p6RsCiHcQVBgiCtliG8ktoLvPy1YLtflb6FjsC%2FOL2Gkm152%2FSUOrDLYmZQ2XGexF9uKSw8lWj4f3EhBFULrQTslxyxbqfQ3PUIfdNhZXYTCKKMIyznc4GOqUB7gnnZQIyccfWPHwA4C2Uu1nM5GjKSe4ODYLO4gQjHr5QPCJicdaJNa3Vh5pw42R48X7t2BDiaLfwHTJTHPq4OZ8%2FnHO8lgVuHGXo%2F1KIneQfbZRFJ%2FEumZEFr1NpQYhEujFLlofYS35GBbvKny5PWUAlnTp5WpY7duCPcC%2FsQ6LqcsNgiUl6EfUuR1sJyeX8qLKMFvxWK%2FOJ9sV5yDOHqH3lQwLZ&X-Amz-Signature=8231dc45e425159067f7811f699300225001b9faacafd2abcf39839641cc9834&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBNBRIFX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIDkUihe5G0jtfUgTTOciQYM%2B9inVV7jgZAeGJIy3Bh0XAiEAq7K%2BxyB3kYr1gwGnb6aJM5V2Zv5eUlEgympGk43z%2BPEqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCKVjdA2I8SEHGckqircA%2BEihwCsrTgBTsFs37Cs7azFOgjRoBHsbzRUjmaDTkpRrdJIQnPB0yk0pVmpy2Cn85GtEljsjkknhfzby1iFJiaVrclexloWyU51Q3AX3r0bSXnSoHZKPqGTQAfk3javcvJUwl%2BApIq33A5LnJDf0oazyzQ32KC5RyAkDZTOPMH9EQ6bEq2RV3De9XRzOxk%2FKWuN0samIb%2FHF52K4GAHbAtn4Gi6oppvum2J7GV0c5o1ySEiOpvfgWvJ%2FXrDO07zBLR4RH1RWThc7a3jr49NN%2B61Q1w6rJGxH43i8g9HWhtInSIHFO56D2LKC4DM8kizJXD%2FrB4qVub7zR2z%2FEaoIi5RkF7FUGY4tNQclwFFipGWNL1I%2B5LEF5u%2Fjc7H%2Bwqu6P%2BeGZqoVCKYPI%2FhEo%2BHdk%2F3tBORYCE3evhbd2uG2bpEelnu2ruFjhTPl3mn7f5kl6WZP4JEuTDqG4FN5jf3EFJFQUgZqZfC2OipSf7znPWcAeUj%2BIPhdlrDM7%2B9W27xb%2BrDfZkBBpbya4p6RsCiHcQVBgiCtliG8ktoLvPy1YLtflb6FjsC%2FOL2Gkm152%2FSUOrDLYmZQ2XGexF9uKSw8lWj4f3EhBFULrQTslxyxbqfQ3PUIfdNhZXYTCKKMIyznc4GOqUB7gnnZQIyccfWPHwA4C2Uu1nM5GjKSe4ODYLO4gQjHr5QPCJicdaJNa3Vh5pw42R48X7t2BDiaLfwHTJTHPq4OZ8%2FnHO8lgVuHGXo%2F1KIneQfbZRFJ%2FEumZEFr1NpQYhEujFLlofYS35GBbvKny5PWUAlnTp5WpY7duCPcC%2FsQ6LqcsNgiUl6EfUuR1sJyeX8qLKMFvxWK%2FOJ9sV5yDOHqH3lQwLZ&X-Amz-Signature=38ecd88fcfbc402ac210a7ed5b3e36ebc198fbb7c648c3bd23b8800c9865ac9a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664VNJPGYX%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIFGAEmudQluU4XVqWenbhyHutTShS9Mp9DeM5OlNu1phAiEAy6Tx4EqJAG%2FoN5NF3KK0q6JZWjfYJSLCKJ52yBcDJ%2FAqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNKxgSuWzhTEoEn%2FIyrcAxqOkUCjcxj0RsLS6TuYIW%2FTChIFf19R2rYj0YsBH9PzDcLQFiHHlhLdje0U%2Fuf7ZZ7iK%2B41bEobJSmQngo3W2ZDYviKo34Q6cIelbMW0XvVRljorCnJtOi1QPG0qLM%2FgCFCfKh%2Botqi8JllV%2FPxgkMUpVDugpPCdzS91W87P89JbQs6bWvdrRHfU6xGkeXfKMJTsda%2BU1Mbf6ig2KAMbaPRo%2FNfiy1vKxnobuUugS7NkogN4ISI0Niub%2F5B9zsRk5RFmWWwZTmfF4ojiBmd6Gyv2%2BDPDVLzwP9EW9FqQD0IFgBM0fZ0VyMgdecocsXQvjQ4lfknQJzwLP4WXC6TdM07CQk1dPRXGAyU%2FEyNy52z661D6t3q9JWJxmDNNwCo2j4nqaQM9KAwlXkC6FyYi31vPtbywYCfpCZqAEpnlG%2FE7mY1lCC%2FdXl3xKenLJJrJlk11fccbI%2B0LI%2FNIi%2FYbTTWiUGD9wuf9mwe17UHlCwoadIu%2FaI%2FCKDZkb%2BtYZF6eQPwJInrWNyG2qoduHy%2BOlw9I%2FLLtB%2FUJf8a5bMuhZyyaiUZ%2FhPqjdDXMcXKfVOMzSLBnFAC%2BZ2sR4m%2B9BAD3DVP0Q7dx67%2BsFgXdKnCCnry37ukv6R3YtoyYogKMN2ync4GOqUByMI%2Bo%2BnqMqrhPQGfkLLSCTAL8sKosGROkKzAXd7NAIgrsHA8ZO%2FPROlPlXroHDKSbax8ww8q4LITTvE4hPWhfIsBThNNb%2FVsiDGwvc20EA5%2FHWTIPiQn7xx72E72gV3X29qugb7QmERTsnpS4IzR8rmgeaBCdwWZNU7SJys39WrneFoSwMu3OTRkur5DWW5L7PV56pN%2FD4qV6ErJC%2FTjvfgjEKdp&X-Amz-Signature=8f659764e0847aafba5c3dce15e62188249654184cf6aa78e9ff8450d4ec2cee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ES63ANS%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIC0n2EPN7hT8XUtRFssfPv1UOrU1i4Gsi6%2FjMQkicJ41AiEA3P7MRMQ5xhoKnaMY7Mi6x9KIVPFq9v86NCa9XMILNjIqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJKiaB8u2wVusvGAircA9BdLK9ZbZ54V%2FnBYCLgXPNG7qHdB8jRLgQIirMUAC0XCyEdgp5bteZ%2FVXDOaPdwTfAzqqg5v41W6071XD%2FAdFwIf384ftEtKcteWnQK6RDsoWvVfWvwnpETtnObjNyYYcvvh4m6KEynP7uJp3NGpIPnbWVb48Ieibe2FzwP8Eyatvozu%2BQWkL5sNxh%2B3L2B7t3YDxveQeQNhDC0pi%2Btzfs0fu7eAae1NM4RUbAJm%2FxRXL2fxAlMIQa%2Fcu%2B28jnVYxkhmkfSU7XTbYixSNn5YXRRDDgUms6r4Qv2aglBP86DFIOF0ZT4rvWR%2FaRzKxUlxB4rHZp4f8D8nTZ%2Fbwaef9wyyeFrWyJwh88DV%2BMi1nlBBwTCp8PAtqIn%2FDSfedToHIjIH1uZvYxj7XBmFt3h%2Bv5YbxdpLvgR%2Bz5%2B5l4eI3PbNZH7MLrNVrDKdOjKTmZfeT%2FrmGsnl4NJiN0MkeAUfgpLmV8RVq%2FHOqNpBsAFVa0fpIpNhhtvorus45giJO8BDcCdcuOXANnb%2BAGz7rNvTk2KGCBJUjdpnYi%2FDJQB%2FhEYjvZv6TN%2Bm1B6h157hymv5pWsTFsKvAVxZ87juOUR53KyfR4Gr5wQcD3%2FyVge7zCqP6g9F3sOSXnjGGuTMNOznc4GOqUBZ5AbS0joP220UhUl7X%2BMZa7M95VYsFSHCAKt8n7%2FZEU3RebnI9IVAN4Ll2gSWri3U%2BbU%2BlL5NDIzl%2BtzgHPD%2BFs3G4LT31LfMCsQLc2P0ag1DQx0PWhL2t%2FCFp1wymwp0aiq0KR9PApUtTnyL7iYdRphzHvehDL57Mn29j1g0A%2FrYOahGDA8I%2FMpfFijVwChxU10tEysuiiDey2XoyyngoWSJOzr&X-Amz-Signature=238a2ed5477bc4d8de6a01be04f24e0d7030c7717b988e6241c27f1a5955190d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RZFSL7JY%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051605Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJIMEYCIQDbQs%2B%2F%2FTPaCEv9PRAjaFi39FMicH%2BUF%2BNps4M4AMfgBQIhAJ%2ByBf8t7M1jlGigptMynCG3v78pLYdEVlLsX75hmwJIKogECO7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwrWR9BsYDlWVzXDd4q3AMC%2BKn00NibYqzyAiAwDTrD6a3DLtZFxoZ6iIAuAeMvos%2BlDiHosM2S4xQiLmGZMnfFbc1dEATOCGhFScgw8879proXvQ8HBM5hTXHhphbsoJ5rLI6Ao%2B6pDS6AzTDudY44f%2FVw%2BXcVrk87jQsZzYEi5chl8no2ueLxHBk7DKtrqDw4gRMHmxghVm82R6%2FdpO8eM170mkZKAmHB120M3%2FKcuQDMEoGb3kuZNgIzBQMu0pZy1rfP68sSlpfC%2F73yf869sD7yoTQsZs1IysVl2QTyU2yx2n7wq0%2FsFB4tHEoVkF3uB3cZbkM9zJ3mrvJUTEAvr2HyHWMBXr%2BNKz23AgbESbtdrOeivS%2B%2B9KNAqrSIAaeh08sM2yMEsYPnUGihXpjK44%2FtIwn8YjJOyHwDJzJVKWZn7R4Ca9kfdK5lyf43xOh4ciyJHjfJg%2FoNGjNvrDOf8fvLd9%2F3VkeYZLci2uJBgGZSfLs4TxPgN%2FldSZ%2BMxpo6T5y%2FWwNZw9G2CsJSU6tDjwL%2BQIFOdexq%2BhNjOSnRWyMhs8XvI6Z8vnVPQwe861fvvMGDIeHXBhabxjBtWS9LcDufNPhR%2BNT9h65a2NHCQ6U0oyAi%2FOw8Ztb5hZS6ZAyMeKlr%2FALwU49rrDChs53OBjqkAR42IhGlJTEKI%2BO3Uzo8lViE9hiOZ39Qxpy9z3NjZvQsy5rcpa3MpF%2FodvNelYO%2FAOLcydy41Mdb6r6VuOnLit7YSmnBrXym%2BO3y31SduJ4ItqFLnlySVkIMDdjr0lQGHTDVoDbC2EE3S%2FVPHd30k9XCU3K7PrtFx5KKia6rp784ERKSWVVMJolBnXeJlHjf0oNEL9fBlNHeWVR5v%2FrjAariOCcm&X-Amz-Signature=c13371f665f25a19353d3cb0ffa87771b0145a4f9515a1ad3e74e1af032a4377&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOHYVCV5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIAxot6Cmvl0mW1OEOMVleXYGgfUlDmza1Ld4nxFj4LIuAiAREmHDqqWY04fQsIprGwl4uWodV9JMDSW6%2F0pREgBO2iqIBAju%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpVUmdddgUF0LTEpHKtwDPzSnRcTlDulra48d1s0QQeDuQIhvmPCfaLbkXOMz8wJnTDyOUWVodMkImB3O5Z7YqBRRFrZQfsd1nJLmL9p9oq0vgbYeFmd2dSchaiFD%2BK9I9h%2FS4cQ85Y5YQmDnWn8CDAkUiuptOW6yhZ%2Fg5ZGNZHf9aSvePPX0AytPQO77U1GSqSBc%2BVVIZxWclPsuJrwRhx8SDI12CkBJyl5VKyTF%2BslozOzplEhr2vm2ogcoBk6UTHuO4zjQXrBqKEstC3REVpO9dvaEzvJnO5Wq8YyOJQwcytB2bm93EGUx1nj574Z2AweDa7%2BYEqXtEkzwO7XABBIfvFm9K8HraIVBUZiDxCTLXpFUlq%2F1ZSBlLO%2BZQIoUuFADICrmXdqQ22iZl51zGFM8BC75ncW%2FGWFfQXPzlCv0l3SZe7Sno5w4W2DpZf%2F550I455HhYZ81SzGlRAlsNwPLpoCOlVNH%2FkqougxThwx4l%2BfFK9ngMzy5%2Bq7zS9l8hCRpUgrd8LsCcJbM76DU0F7t6GXiU5S8LtXrDmXK%2BodXPh6fXD7kYREjFnJKyZgWzRyPoydoXeiOJJTtx2OACeWJwPcLzg7%2FhknYARzv6prHoO67n5hXvCmWfVvp90lHztkTGOyaSIuHDzUwkbOdzgY6pgFCDjjX%2F7IfSlhgHNXGzF%2Bgv7G0TfiA2XBRKUKrPxfaVJbNOiq6ZhOznk5KOGEYC6ebpSdK8OWlCI0v2suHpJEGXsQ7DDTwlFWxzV4hlzqin8sJsxCXqA3Ek6nPeG5S5UWCqdUCW8Og0cVxX%2FUCVPjrhUzWwZjazrWAu9d4nAfzySJoqrtjCM1T7vAUqdWWN1TAUG7dQ0xjgDoL8xg5REJPC%2F8ZdF6S&X-Amz-Signature=d4e280e91c4c1b0173ee8cf9d5c7a9636a9336fd08705a1448f2ba600e966c1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOHYVCV5%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIAxot6Cmvl0mW1OEOMVleXYGgfUlDmza1Ld4nxFj4LIuAiAREmHDqqWY04fQsIprGwl4uWodV9JMDSW6%2F0pREgBO2iqIBAju%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpVUmdddgUF0LTEpHKtwDPzSnRcTlDulra48d1s0QQeDuQIhvmPCfaLbkXOMz8wJnTDyOUWVodMkImB3O5Z7YqBRRFrZQfsd1nJLmL9p9oq0vgbYeFmd2dSchaiFD%2BK9I9h%2FS4cQ85Y5YQmDnWn8CDAkUiuptOW6yhZ%2Fg5ZGNZHf9aSvePPX0AytPQO77U1GSqSBc%2BVVIZxWclPsuJrwRhx8SDI12CkBJyl5VKyTF%2BslozOzplEhr2vm2ogcoBk6UTHuO4zjQXrBqKEstC3REVpO9dvaEzvJnO5Wq8YyOJQwcytB2bm93EGUx1nj574Z2AweDa7%2BYEqXtEkzwO7XABBIfvFm9K8HraIVBUZiDxCTLXpFUlq%2F1ZSBlLO%2BZQIoUuFADICrmXdqQ22iZl51zGFM8BC75ncW%2FGWFfQXPzlCv0l3SZe7Sno5w4W2DpZf%2F550I455HhYZ81SzGlRAlsNwPLpoCOlVNH%2FkqougxThwx4l%2BfFK9ngMzy5%2Bq7zS9l8hCRpUgrd8LsCcJbM76DU0F7t6GXiU5S8LtXrDmXK%2BodXPh6fXD7kYREjFnJKyZgWzRyPoydoXeiOJJTtx2OACeWJwPcLzg7%2FhknYARzv6prHoO67n5hXvCmWfVvp90lHztkTGOyaSIuHDzUwkbOdzgY6pgFCDjjX%2F7IfSlhgHNXGzF%2Bgv7G0TfiA2XBRKUKrPxfaVJbNOiq6ZhOznk5KOGEYC6ebpSdK8OWlCI0v2suHpJEGXsQ7DDTwlFWxzV4hlzqin8sJsxCXqA3Ek6nPeG5S5UWCqdUCW8Og0cVxX%2FUCVPjrhUzWwZjazrWAu9d4nAfzySJoqrtjCM1T7vAUqdWWN1TAUG7dQ0xjgDoL8xg5REJPC%2F8ZdF6S&X-Amz-Signature=fe7a27111a000bbd7f79435a324e70666b4165586bc209c03b5a5e326433ed3c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUFI5ZZE%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051557Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJGMEQCIFw6C%2BoK4wym4nhCTtyWgGU4ZanbJXgIE2xprmDzmjFeAiAXD%2B%2B7%2Be9wKwtB804ET5p09G2xBNqRFXPNFj862jyitiqIBAju%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXGquBVPnFWVZr%2FoGKtwDEqda3WDmvWUvQzFUs%2BZglyMvoRHOEx42%2BC5m8ZN5xcucnkMOR9Ah6P859s7tOZUAitmQIsnXCR%2FoPLl%2BWvcPcTiYiyVrKHWEuBy3DTBffqeYN%2FFAXEED7B88bFlFFzivBaYDYMDbo0zrKEPyGJ%2FKfJhBflr2iSnY4VOhOK2k0zMOD3dh3TYaED67GTU%2FaKxAcA%2FTrKv%2BvnlHMG2dBsKTaHNvWimQbLdTWf0nxcdeIz7f4mKEcJkpUU3ZzC9zissCRq5wwEcqpuZ2olrl44DJy7MaLHnsJ2%2BGvmRfdcZ5hvCQnV6kxrOTeXuYxcp0egaUmpK49%2BnAOXjzDb%2FCpcs%2FcLwH%2BsL2i%2B2NxqHl5%2FvsxKTbQGL3xWIDMv%2Fy%2FLwtdnLktSoAr46ZVagwki0VTQ88D6jhTPrCnchuN8KYNeTcAjKkX7g1xpa%2F%2FY%2F88JZWxbxkp49BDlcb1aDY3XwShuJRu6jgmGqdoMh58TjOeUjlrf%2Bws%2BCQ56SXWRJSieU%2Bj01YsKK3dSLZX3UtzN3nG8yqf6EzcpH9ycUZA6ot611CcbdiYp3EYijF6e9d%2Bo0VBjNPo6YXJn4kf4tfXpPfE%2B9dx3S9ogGMh%2FnKEjywDW0GqAXl83kQeHkgclsW2WUw0bKdzgY6pgGLLwbtfUq6bZW94HNR4PytJc6ehcJurxMr%2FknMaXDO9f3OZwtepbeLxYTWQaHlcSOeyyxmM5PGbdKTJiJVrwdJimWnJ2a%2FvCGRvpdhvClgtz9mRT9bqDFMc5ppqwy45jtzEZA4hJc92kW%2FXgiaDv%2B4okabBmmbteKN3SPcoMcBM67EnCraJub7UhHwYhGxsNCKC4or7qqF4DDriEowPE07Q1An3GWU&X-Amz-Signature=8c417ea888401fc30bfec7bfcd8a7e4bf3449ead1c0cceb3d94edc73eb554e97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXLAH3Y6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC7hrZmbBLOALeSFLbQsD9mX5aoVZgpd0znmdd5fmdgWAIgIFLchTj9wvxsx9O0rkXYvWIGSePZZOLpc3BGrLd37HgqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLC9eWFbRPaE8535vCrcA1bxMxOF4NqTeTh%2BWydmS%2FvaCbqbzV7yOWQqCkOa88OiyiL3n89TSkGAbtiC6ZZFNPnO4HeXZdrSInVoRdU3QZuPttjSBPcbtZ7NVehl%2BMq3c1q%2BXnx672LrYnDe1pFYXWwTZwPWbzN%2Fg0Etklnsq%2BMpFpwv8FPnDyv8Kv6shuo36mC2Z8dXThK30xrThCIjAGk6l%2FvN36h76xZ1Lh2QpWTlL25kb1i5HswpyJQT%2BfhLHrf60QdnbcKFTr0emGmbEsxbdzbVdQdNmnK2OkrN9pgqunZWIohws5y6czuwmhN7K27M%2Fx8AkxfzUfinRyH5oxnclXApNbNxIv4FVFiGxKeym3OMgjLKGVF%2FbPlpH9ztIigTzkKwi4zhXhIqM1al1lcfVLb%2BEdFrxgHs5%2Ft8Xtq7qikIrJVGcjBVd%2Fa2QXVHhJSFpR5q3Hz8qQNy3yO%2B7CkwefS4cA3LnI4ltIQd7XY6oK91EfAacv9ZqAWxH9gSI7dg4N9qFDWrc4IyULJ2ai9Z8BHnQeyrXMXYVz5ym8gWHuowqQLysNesmMeV3P7%2FrYaIWvIj52cerro1qkuPd9iLqv4QniQZhTCfgSF94%2BFqBKhk9%2FVRv9nJ4NQtRNnzC3edksVrrWNt2mt2MKKznc4GOqUBoL64cpUy0n%2BctTsW8MYr1SxyJCG4VW6icRxctXAiW55hWlzdRdd7o0fA2cP39%2FaSSudvOZcsUUA7nIak9tjlGnT5OdFXTeN9hP62OtUCGRdQmsZWfttlikoJhkaj5XhBW0QS5te%2BYQBefoXz9I2AN7HMoQvP89Sp37MfmaL1V%2B9xNfxryTKcVzOFNJ4vH2cgK7WP9Zdjnn2xj9v2usnuijrhmJuQ&X-Amz-Signature=b169a83ed1278ebbe08dde7fa262c67734a51bd080d518b09df617473bf5f161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXLAH3Y6%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQC7hrZmbBLOALeSFLbQsD9mX5aoVZgpd0znmdd5fmdgWAIgIFLchTj9wvxsx9O0rkXYvWIGSePZZOLpc3BGrLd37HgqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLC9eWFbRPaE8535vCrcA1bxMxOF4NqTeTh%2BWydmS%2FvaCbqbzV7yOWQqCkOa88OiyiL3n89TSkGAbtiC6ZZFNPnO4HeXZdrSInVoRdU3QZuPttjSBPcbtZ7NVehl%2BMq3c1q%2BXnx672LrYnDe1pFYXWwTZwPWbzN%2Fg0Etklnsq%2BMpFpwv8FPnDyv8Kv6shuo36mC2Z8dXThK30xrThCIjAGk6l%2FvN36h76xZ1Lh2QpWTlL25kb1i5HswpyJQT%2BfhLHrf60QdnbcKFTr0emGmbEsxbdzbVdQdNmnK2OkrN9pgqunZWIohws5y6czuwmhN7K27M%2Fx8AkxfzUfinRyH5oxnclXApNbNxIv4FVFiGxKeym3OMgjLKGVF%2FbPlpH9ztIigTzkKwi4zhXhIqM1al1lcfVLb%2BEdFrxgHs5%2Ft8Xtq7qikIrJVGcjBVd%2Fa2QXVHhJSFpR5q3Hz8qQNy3yO%2B7CkwefS4cA3LnI4ltIQd7XY6oK91EfAacv9ZqAWxH9gSI7dg4N9qFDWrc4IyULJ2ai9Z8BHnQeyrXMXYVz5ym8gWHuowqQLysNesmMeV3P7%2FrYaIWvIj52cerro1qkuPd9iLqv4QniQZhTCfgSF94%2BFqBKhk9%2FVRv9nJ4NQtRNnzC3edksVrrWNt2mt2MKKznc4GOqUBoL64cpUy0n%2BctTsW8MYr1SxyJCG4VW6icRxctXAiW55hWlzdRdd7o0fA2cP39%2FaSSudvOZcsUUA7nIak9tjlGnT5OdFXTeN9hP62OtUCGRdQmsZWfttlikoJhkaj5XhBW0QS5te%2BYQBefoXz9I2AN7HMoQvP89Sp37MfmaL1V%2B9xNfxryTKcVzOFNJ4vH2cgK7WP9Zdjnn2xj9v2usnuijrhmJuQ&X-Amz-Signature=b169a83ed1278ebbe08dde7fa262c67734a51bd080d518b09df617473bf5f161&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46646QEECUF%2F20260328%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260328T051609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECUaCXVzLXdlc3QtMiJHMEUCIQDhNI7DinYUW3RXb%2FI4cLpmv2s7icljfG23IDVDv%2FCPFwIgSA6lWMsJ7Z0lNTWxEkmYWkxQ%2BUyllMvEjifzdlbtedkqiAQI7v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM1G%2FzS8804jJZHZqCrcAywwhfjY1L39VnMM70ePZuBASDYfIqfF2m3AYaxKxqbJ4tghepm6cF6ae0IXRQoIiAICTHQ7o8wCpcGgJ%2FDAgGExkMJ94MTQfCc8fc4r6A%2FzGkcpyk6n%2FMoVEcZxUorwalmguIzgxHUI7omW5eK1%2F4EgybROSIWaGHN0ARPNW3CuELNGWVaXmSGONlt0Gll87Dno3dQh51VNdZB76zlw%2Bbt3KY9GvFb%2Fh4Tdlm%2FewL%2BEbfxh4pSw7fzGupBpnB6SFrJWgYr86yTSi7nSUrs3nz2EKsFetKgAgMBgPryY%2Ft6YVar%2FLHnwTTDGexgPArlqclsWxhkkmVkHk4%2BCSnuqyeEd9V9lNkX8FfCd%2FVYA1cgJpqRS1NXOX22tuWYUpGhfxP6nLRJHQg%2Bfw%2FEHUs63iVFQ8GKWi96nFqOEhUIQmFj7h%2Bwl2XMVRaQP279%2BiECc4AwD21Ssmt8kabx5LYZZC8IQ9K8olp572mrr1bzPBPvtqd9pU%2BVqgVDUtvVaOWbxaRm81l1PlWO3t1hWPbb4m2OZ%2BbMHd3zCUWhsYGLOTquPNIgKX559l5kv4vUvU%2Bgx1bUzHMzg2OoPc6L%2BB0i4qvl22Ed7DKG1lDxNQq2XOcgGgvrrFI6M9KqRr%2B7eMIGznc4GOqUB5tOEE%2FiPjzXCe5otf51xZSo1pn1urcOFJnvLQd9ySga3rZ53L9bEWBKO%2Bzt0dMPZhvN%2BaLqzGiX%2BqLRfPKEruEXmJ4kKSlP266Q%2BwpycHO9Nx0BrRKNiBM5kYc0RkpHFZL2UGrkgGXNgdjc4e8WtL10gdsUkbmCrH7ARfTGkmbHg8O1QCj3T0BRW6lfaIfKnNAGHB0m8z%2Fe2PHbJVslSEWP95xJ8&X-Amz-Signature=f0e8f20c8cd9d43acdcee6724a166a8ea9952162ea019aedefa79af83b4812c0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

