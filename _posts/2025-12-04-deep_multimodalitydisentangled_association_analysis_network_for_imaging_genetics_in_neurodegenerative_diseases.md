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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TT5VVML%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC30%2FLn62rrxuDCZYk27n%2BttmUKaOF78tPzGEMhRDI2XwIhALqZPX4R25h3ow58DQkVgcq3CRlcsxmqCH%2Fkz39PG9dKKv8DCGEQABoMNjM3NDIzMTgzODA1IgwVHK0MgCnCtR27Al8q3AOqWcfBHSEYN%2Fta%2B%2BoQBgZdH9elG3KufK77dq2uNVpXsIHgU8sAUlmDVqXRrMdyLo90h%2FttGPsI6U9ARywY%2BR%2Bbp%2BVUdmyzLGuK8XjMc9G2A3A%2Fi3llYYZo%2B305yFECkYIQhsejZRu9mLjFLEC4GAgIfrxgAvDAe5RD9FRwSkjvBbBDGp7oR7eolof4q7JvcXCzyU6bsUZAySAek3vHE%2Fj3huwdgZTjedQOagJC49wF7g0ZMXoeff8JK1hbiaFbJ2ZsJCVkuB60Z3Cy0YN3qPqDkx3hfrY%2FlyUD%2BPdCZDH5658X45qw5Jbmi8xqdkS%2F71Kkrl90PF8RZH1wzkdKXnKgmo9CtJ1V8h8pdGm1SrLspOart2w6xeXIf05nk8XcyVqPcdQ5yna%2F%2BhhEXQCZlqJ23a%2BuXLKWu%2Fyj%2Fnb9T9s%2FQ8xg1u7JCQnENhhnts9JSzV%2BHZbZnSsGJaXUSHGwFWDmzOIylhwOr9NGyXnb31BZ%2FkaqatpyfPLRM3Ki6K1kYttXLsj9HCrhI2jMVdlz0mowA2UTrD5oSrqXJ9YLqLLt38R6PqqhLWcqsZlfHkXaQ3v0i1WMVCrYurcIvPMKrsiGwhPl7HJ7a6hDwSMhg2Xeea0jP15qv4E3T2VUUjCv%2Bu7OBjqkAcya2thia%2FKqW2g1Gg5MVn7QnLbtWxmHbRuNBKGrZTe91tm5iFunY4xbjUgbHc5Sn6wbXAa4tQLXeTpQjnwxD5OB0aJSwzENQQTlZr%2BraL2CsI2n%2F9oUhFhc%2BcxPJw%2F78Si4gguvMUw5DQwTUWJYSkapnF2VY7MNHuPmULax85zAA1g5f%2BOP3%2B2E1RLXDGJozEEadMz84ZfPqcrVOPggjwdNmxAx&X-Amz-Signature=7b269910270dcc374f4faead3ecb2a782ddb10ebfa9d997464136ec1cd7eeece&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663TT5VVML%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC30%2FLn62rrxuDCZYk27n%2BttmUKaOF78tPzGEMhRDI2XwIhALqZPX4R25h3ow58DQkVgcq3CRlcsxmqCH%2Fkz39PG9dKKv8DCGEQABoMNjM3NDIzMTgzODA1IgwVHK0MgCnCtR27Al8q3AOqWcfBHSEYN%2Fta%2B%2BoQBgZdH9elG3KufK77dq2uNVpXsIHgU8sAUlmDVqXRrMdyLo90h%2FttGPsI6U9ARywY%2BR%2Bbp%2BVUdmyzLGuK8XjMc9G2A3A%2Fi3llYYZo%2B305yFECkYIQhsejZRu9mLjFLEC4GAgIfrxgAvDAe5RD9FRwSkjvBbBDGp7oR7eolof4q7JvcXCzyU6bsUZAySAek3vHE%2Fj3huwdgZTjedQOagJC49wF7g0ZMXoeff8JK1hbiaFbJ2ZsJCVkuB60Z3Cy0YN3qPqDkx3hfrY%2FlyUD%2BPdCZDH5658X45qw5Jbmi8xqdkS%2F71Kkrl90PF8RZH1wzkdKXnKgmo9CtJ1V8h8pdGm1SrLspOart2w6xeXIf05nk8XcyVqPcdQ5yna%2F%2BhhEXQCZlqJ23a%2BuXLKWu%2Fyj%2Fnb9T9s%2FQ8xg1u7JCQnENhhnts9JSzV%2BHZbZnSsGJaXUSHGwFWDmzOIylhwOr9NGyXnb31BZ%2FkaqatpyfPLRM3Ki6K1kYttXLsj9HCrhI2jMVdlz0mowA2UTrD5oSrqXJ9YLqLLt38R6PqqhLWcqsZlfHkXaQ3v0i1WMVCrYurcIvPMKrsiGwhPl7HJ7a6hDwSMhg2Xeea0jP15qv4E3T2VUUjCv%2Bu7OBjqkAcya2thia%2FKqW2g1Gg5MVn7QnLbtWxmHbRuNBKGrZTe91tm5iFunY4xbjUgbHc5Sn6wbXAa4tQLXeTpQjnwxD5OB0aJSwzENQQTlZr%2BraL2CsI2n%2F9oUhFhc%2BcxPJw%2F78Si4gguvMUw5DQwTUWJYSkapnF2VY7MNHuPmULax85zAA1g5f%2BOP3%2B2E1RLXDGJozEEadMz84ZfPqcrVOPggjwdNmxAx&X-Amz-Signature=7b269910270dcc374f4faead3ecb2a782ddb10ebfa9d997464136ec1cd7eeece&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4F2XQHY%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162236Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFom%2FHVxwW2rGKmVFo0m0pL10rP9K78KK78J8TeXo4T3AiBIip8zZr5vyEjNb2rMLD3D4KhQNEP5D7OFfOoTDJ4X4yr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMnFRlpetqda3FkbIFKtwDQbKr0nTB%2F2e1kgpOzGjoBcwsRHR5EeqCzB4oGY5aYQCSntwiBwyxwxBqSDAaRWbaCULMzFTZlXGUhLbUz765WPUhpWzgT5hLR0yY3Cta2jznB9tdOlc1T%2Fr8KzS%2FvmqDw42YwyfN%2FjV0iuHFTv8iAgzOLPDIHf07yfzoqC10HSzKVJLWdV%2F%2BdNP515bWOZ6MCOQImB%2F7Ddmi5uJLvB6zafPtcrgBRy1W1H1eyGdTghqqdAK5kai5zvIrqSgWm%2BG07rdyHklbYsCtNVpLyEoVxwnuqpVAdJmi10BV5LVn1ixLEqI8%2FL9WULB0eRzaDncC5xRsXJs1fIJwpHF1xFPuAlah3uAKmkdfNrcxSpaSZlUOd3Px26n9zmLawlm7hNVW3m7n8g9vj7zttsFvxwxuPWcYs26kMspZWFx0RpVfuBEe0%2FZ20wnSy6khOywj9JKLZ6vqCUTLpDIzbAWHBf22VBCUHPwiWkB7hX70ChBwiNRU%2FWU0FIPRvBKMknsgvSj0%2BoMQnCO%2FZPO9aJc7Lq%2BB%2BHVUmiy0JodYrwehUcc%2BcRbunQ5gTRzjfVzPSJDmpUcVIYs2Sm3ogk616y%2BaKJI%2FyHEPaebekyShaxWi3EQUWxAGoRB3SsAq5PUrpO0w0vnuzgY6pgFjw3B1WRVK0iwoqxTUr%2FeX7XEYsyx45IGzxv%2BwMoe%2F0kgqn6Ako4o1ll18ZiBZnOmFAByIorqsVsh3zSPAkKYmmN5ckxNoKkLyD4NaVwMyMX5VZm1oPpW%2Fo2yYyxAl1zJYEFDXLpCat4g1OxSHlUA3bul2OW%2B5p7vOLAADgcfoG8lh%2Bic9E0VE3%2BBi5zsCXSBL%2BQwLM4YNbM5K6yquRYZwNBrrHbkk&X-Amz-Signature=80a664f27154b842c203d76b6f2dfb7b7d46986de4f93711d6f54d03d0837734&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IRIGZKR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBAR5wpWBvyyAEcuLCQuQdPvMbpJIBFEW96STw%2FcIXQZAiBvQHxZIkNiIMilsIyskARd0dX6MlUKFreRG4QYXSm7%2BCr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIM%2FBCdIYAnXDBQOJcIKtwDUQP12aV7i1HXIObBUa8F5D%2FzTRuGBVzODTgJfRvPPt25cCvmeGplQVIu9Cagi%2B8s6mKs3bUPESWOdPRRDt4%2Bso%2BXBn0wpeBbEk2A7NW9E6xih%2Bue3hWBGNvgIzqdhNeeK6YJhyI08O03kNQwYHbUfueDwMtL7zBo3MT51WTK0xAZExNv6Mgjc3tngzJvy02cMxAhbtqz27fKaCrqWZQE1YgzZQIaGKO%2B5b6UmKabKjqDUzdBdHNVnczdAeB1MwB1Oz8yjmkUGCtqEgN2TMxIcsncqQKrLR%2F70a8qqBuP3EiwCqvyTHMmq8AAZch0IBk2PAaX%2FhAKXuYUdTJ8q7%2B3nt9mr7QofepEn%2FWAsyIAlRnAGgVRCgywdkPL9o1Tn6a4nivXhs0j03EIcjdMaYg8vLpcos%2FNerJUPdclMJTgf89Biwz8MEhtcLm%2FDpUETXzk%2B8m%2B7pPDmkCU0YxSwCGpne6f3os9qzRoVCiADo9fE2X3IUDHspgbUjh07XMasayjAbXmpG19V26EEPm5mPWbUkPGkqF5K1p6jRVi3G%2Fh7Wq1sJCLOe7SDEJgVbAxm16tLg5yJ7dOV6J%2BmqJ7MXWGd8HWaoV0yFzy75WprT4U3J%2FyWWMvkTtIXV5qxXcwn%2FnuzgY6pgHK4W0AFMJUjRKRLIXiVa0r5ixvy6flzsyPJTmqRX%2FWqn4uv5DXfq1f%2Fiy1p9EpBVTvyBp%2FN2BPHLr%2F8fx%2B2w9Dv3r0Vo6sSS9KsXKgEM6DWzV9SnidDbrCsJ2O6%2FgAqt11iS4oFcaMAe7CEm6xaxxWM2T2sign280ZLPdprsVmcS%2Bc0b2veX2t25Atc996zXZaoBxVdN%2FeA5ycm989KgxoswHWSXXW&X-Amz-Signature=9e3b452e7eda04261a69a05bb5481483f2c56cf0f9a227170c341b5b9f2cd95d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IRIGZKR%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBAR5wpWBvyyAEcuLCQuQdPvMbpJIBFEW96STw%2FcIXQZAiBvQHxZIkNiIMilsIyskARd0dX6MlUKFreRG4QYXSm7%2BCr%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIM%2FBCdIYAnXDBQOJcIKtwDUQP12aV7i1HXIObBUa8F5D%2FzTRuGBVzODTgJfRvPPt25cCvmeGplQVIu9Cagi%2B8s6mKs3bUPESWOdPRRDt4%2Bso%2BXBn0wpeBbEk2A7NW9E6xih%2Bue3hWBGNvgIzqdhNeeK6YJhyI08O03kNQwYHbUfueDwMtL7zBo3MT51WTK0xAZExNv6Mgjc3tngzJvy02cMxAhbtqz27fKaCrqWZQE1YgzZQIaGKO%2B5b6UmKabKjqDUzdBdHNVnczdAeB1MwB1Oz8yjmkUGCtqEgN2TMxIcsncqQKrLR%2F70a8qqBuP3EiwCqvyTHMmq8AAZch0IBk2PAaX%2FhAKXuYUdTJ8q7%2B3nt9mr7QofepEn%2FWAsyIAlRnAGgVRCgywdkPL9o1Tn6a4nivXhs0j03EIcjdMaYg8vLpcos%2FNerJUPdclMJTgf89Biwz8MEhtcLm%2FDpUETXzk%2B8m%2B7pPDmkCU0YxSwCGpne6f3os9qzRoVCiADo9fE2X3IUDHspgbUjh07XMasayjAbXmpG19V26EEPm5mPWbUkPGkqF5K1p6jRVi3G%2Fh7Wq1sJCLOe7SDEJgVbAxm16tLg5yJ7dOV6J%2BmqJ7MXWGd8HWaoV0yFzy75WprT4U3J%2FyWWMvkTtIXV5qxXcwn%2FnuzgY6pgHK4W0AFMJUjRKRLIXiVa0r5ixvy6flzsyPJTmqRX%2FWqn4uv5DXfq1f%2Fiy1p9EpBVTvyBp%2FN2BPHLr%2F8fx%2B2w9Dv3r0Vo6sSS9KsXKgEM6DWzV9SnidDbrCsJ2O6%2FgAqt11iS4oFcaMAe7CEm6xaxxWM2T2sign280ZLPdprsVmcS%2Bc0b2veX2t25Atc996zXZaoBxVdN%2FeA5ycm989KgxoswHWSXXW&X-Amz-Signature=85b88e4af70246eed5941c2000e3911d250332dc33dc5047c9f5f89bcdb7f51d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYL2BOUQ%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHCfcMQY%2F3p5x2OXnIulm0uMHdmfa2oiIfkWW55w%2Ft1QAiAvXL42pYfMabhEiQC%2BuzTTabiwGF6z4VD1yEczzeXM6ir%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMYXRHhtHBJxrd1y%2FjKtwDd3PLZwwpy4Xzw2wZUGLk%2F5w4M1Q1hRCrynn2vtIipKWfTZbp4kXYlaiBLrPu%2B0ehtS1DHMx1%2FVPSiErlzhXTJ6LO5ZayFifRjt3AzBMVsXkstc2HJ%2FDizPn5MXRRuUEZgEltQEs7J3TLIGozjUHHYcwDueNYN3OhANHIOSR6wpw7uyRJZ3X980wzAfbdpZeD6UD6PYIms0jNQdb0O5zZtjSoOVWrmGPOa5RfgKt3HM9vJlLVE7KhBTIvwg9fvq%2BWl4rr0zRCtzJ96OKv9c6sIc6OM9pqALRMxyfPjbAdnO6eu7z%2BxvS1t81tJ8%2BYZHe3tYWBMxsPc8fLTHT6coBbng0m67v%2FeqhC8meF7%2FvdVVL3Z07IYjIMFYVf5DimeF7D5hRrMyU7hfnZeOP2KEYAM55cKCnCfJ0VHP%2FOmXqjD4r5qOqtTp0DIOOiWIg3dZVEKDgYRYG%2FOpreeiv4OaczLRT8y8pCgR7gAunBtbIcQy96AjxLY18yF315tKhumPZKMg5Qe1metlJRyAxc7PvvNVrc5U%2F2lPlimXhBkSnREynlck3bbIoEqIoz4tZEzDqFUtYkLe6P2axWP2DcFpL4KLV8x9mwO8hDGMXFWo9Vz%2BHWO4Kwj1LWkjXsVJUwlPnuzgY6pgF0Xk17CgK0EqPS8it8aJLyu%2B6TAM0qNPfUb5cv7l5KBZXzEg9mOAD8JDk2hrVRM0ydQ4Ca4BaaWlV8r4ajvncipX4CcYKyLO9CAPUCs49jpgEn%2B9F6e7HfYSx%2BiifI3i5m1FCsJ7KbXA010WgiBDezvayGhE%2FzL9H70VX2D8inhMy8fmMRL%2F3nHesc%2BtBl0zXnTa2ZJhs8tKxgxdEM6dVKMA4yarJW&X-Amz-Signature=01e325de014e0f84c875df319f8ed32247c2bfa8bde3a75e606fee83780aabe8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBZ4BUYS%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC6LXSEWGkhkdRRohVrzm858AicDgeshV%2FiJvlho7C6TQIhAJPZdBOvt7HC5H1Fr4oJQIOyqvzvvJWJ0H07MIT6%2FgN3Kv8DCGEQABoMNjM3NDIzMTgzODA1Igz8t8zmKjP7FxD%2FcAUq3AOImGD8XcDfN29ATqgDdmkeTFHvii%2FmFfb83QFUEgOO47MBYIEL0lt2VvfO4xiZd0GrpIgw93ib4Ajw3PKrz4XN4jnb9X1S0N2dvipxbNJiLZjJGaepYkXQTnBP8VmVH25bpFaX%2Fcmi%2F%2BGEnxPMb4qSnbC83yafv96TCCOXIbzL1wK8EaoY09yhEe5YJ5TGIYeBLa3Th3S7BblH%2BU8NBQt28V2BUA52PzWFF2BjMeOWtrLuhjQOy7cMSomxGz%2FbkqlmrzGOrve1N9PjZY3Qc8IETN13o%2BhiWchwn%2Bn12SJBe3%2BdbRSo6tb8p%2B9KrVkT8C0Jly75EAFcRHQDdLgaGSpGkhz5Ms9PeBA1iK3sd%2By%2F9DYkHYWpkOlwljRC85G0xEJQHEOj9KwYX%2BazxAbnHzvU%2BJ6URr%2BYnVxAZnRREWer31yRs3wZTGzDG6irItTeQ8B9iLDpdwS9F33ax%2FqrOJqxaTnTvz49mi8iJo7VJGXnwOwHBtyNLL%2F%2BYDOzPJibh3TQFzC%2B5F1UUwqRO9BfkUH%2Fl0ehLw7yxQmy7tbNfGLkKQBed6btVqpR5OFvwz3aAhDFfgbcwvsqmRi6iqVWkeNGDL5qj8%2FA0oJ5icnaqnkn%2FGtnWV8f%2F0mYDA4hrDDc%2Bu7OBjqkAZWhTtXMye6nkxiNimsAgywqR5zLkWcr%2BqeH5MYIPSk9VSRLL0WYX6WsmhQdyXiLM7j0kJJOlTEvfDkA2u7J3izhmpIcNSBBRM97NJ2tIKYPCWeLwbRiE4SOH0d4l1KiA6w7BEjJYiU9XlVveMLxgh6b8YTk6WAX63U0UP3TEK%2BsFJOG2kH7H6bMTw4SQWqDJQ2zYtwsrQDc2N9C7WYyCrT%2BcDp2&X-Amz-Signature=71288309fbbc25c97c668d2ced42f0aeacc269ea767be609ba2046b7c83db102&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VOWVFNOI%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFjHlGRyOsm%2Fs6Y21%2BC5wv9IJ%2FQDb%2B3SMiWkPuApT8qOAiBalm5F%2Fzk3cuNy2sVWRM7Hc9j%2FaybQNU8knf2yyiLYJir%2FAwhhEAAaDDYzNzQyMzE4MzgwNSIMXB%2FAUVNtm4HkBUFYKtwDkFi%2BusOlNQz89CLSqeUAJHxlq%2Fk0J4Fu%2FBN1ZPDLvWO5o51hQSXaLrRsIKTY1DDT71EPlEDMqwNuaJuHL%2BFoDakBQMZn0%2FfMu3SsPbaZ9jp3Rir3TXoKniMsrqWBc6YMu7tS6oEN28dmUOwdw6OBnP4Dj%2BN5GpymxadJXdZ4QYx7qFkcF8ihUqNUcIRo5%2B2Vg681BuCbE5OEXLMBA9q%2BYguYYLmMXDmw2qZQhT%2F70ox%2FxiQ5UejN3%2FMgrf1UrQvK1vzMQK27LwYXKXLnGuevf5nMkR5yaMRPq7p0WOlft3CqHyTnnBkEhkOmyr9CVW%2F5VUHB5wBB2IZSLU%2Fa%2FQ8oXmANSJh3%2FILq6%2FlhJPdsw9MxXOmxgznEB2bRIuOfCTRZyCJaMn%2BahC30VOGP%2Bkkcli%2BuxQvCFesNm2U9zvGWU521j5ZGWm%2BBephcpqsNrvtRAaDHWO8Zi3GtK%2BXJeJAl8%2BIwxRJd110vvYJVUPVZRFyCtt3fi4LVLWmW9vmRQAbU6YMCcWHOVASzfyeK2hp87IKehBJDr4jW6nZxGHJs6YzAz57D7gR9mbg6ioYMb9S6%2BziUKnB3qvt9f60egrjI4VFgzKIRMapygTo4AgLsFlm3z3orDn6PuH8VRWEwsfruzgY6pgHcUxsQ4U5z3p%2B2Z4MJYZ4YPgiy1DFNaRT4iU10thcdv1kBkwZz7Jv3oQvEzQN5lCg0PIdGh8v7om1pvSfnavRzvhWA96hBQB5%2FzrxBYCcRNdT1YEzxFUQMObznZKiQO992hcpkNr0vk83lYa4PwNXSAf4Oyifib6xQBSZjZ2xcYdJgR7yojWvDTg9ORJQDaSZriAcymY7UfPVCLgMyeDnnKSA%2BWdV%2B&X-Amz-Signature=ff2ed3b714bf889dcdc18bcdd0bcb64f6c2152977062802d86b0eaa9fabfd955&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAQ7UOON%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC39eXNx0umhsWo4QdIiwos6PetYizhlNjaX%2BzyOc6pvQIhAOiKmUmPWZLsyg%2B8t9%2BnRiWSfZWwqi%2BiI9DP2f76SqWDKv8DCGEQABoMNjM3NDIzMTgzODA1Igz1tGWS9JEPNjZE4z0q3AMFBylXSUBJigivM0lahEmw1bpvpH5cZczTURw%2BWd%2FyK8b0mahHK2tRNccVt30L7Vg6%2B3YMEfG2MmwxWDjY7b3Pv4pmk34JW2pT%2FK5f6QHnKf%2FwMjBekXq0lhr5loZSE%2Br5azO65ZNS3czdrXdKv%2BtLVwMujrJX1QjyY2VHIfFSYytT53FQkNmkbKlaelatKoLRq8H1p6p4QUKrjCNJ9MmZOyApPyflwJDzSwlifRNd66S4wGcjWxQ%2BqLoaKGsTHnflw%2Bts4ev54%2FwMFwCBt84tMFPu1m8gstQHty69aGQnWt9gIkGPiZOCuAW5RVl%2BPL90IS%2FDr6yhEcRgiRxwxBdwRdK3%2Fbbz59kAK5MrDwI5EnVYa7eN4mkeN8b027K9jOSgsgW2Tnkf%2B0ZoiFxCXV%2BCIXUhOJmqOBNZMrXg8afP%2BqVX%2BSirYzKh%2Fd1zVrT5XXP9DFeOp%2Foa%2Br5JNX9V1iS6HIfwcpO3YblG%2F7%2B13fo2IdBuiNw8kXWup%2BUCdBUNa5Mf8u%2FNWFwWC3mRFQh7QrjEQ0AHi%2FRQldcOh9aYb2FN9KBxvzMrTGqd48Z%2FSberVXlas7eahMYkHEa5uhWCJeSUQx4wcmGnIU2zBUL4dXS4Rul1VBcLVkG2XHKDMjCb%2B%2B7OBjqkAWRNFOMiFmmxZ4A14PENJnN443y2T3eEML91GqX7fAZR9oW1gsjGIuxHurxm3KEZ%2B6jc6yfIAJSb4mPp4z3iu9XthZBJRbaEbmVGJFtx%2BRNgEzwtvGq1jea990ZtWbPzJ9zDna58gKuy%2BcL5alEKgMDGb81o3z%2BV9Odiin9inCgC7lncjtsNu2abBYYstnnr7bozFdKxdadeNCaqI9Q5OM%2F7i%2FDA&X-Amz-Signature=655bd5df6846e80c75806e03f708bec8e5e8c1b78b3cc12c1213b24bcc7e092a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZAQ7UOON%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC39eXNx0umhsWo4QdIiwos6PetYizhlNjaX%2BzyOc6pvQIhAOiKmUmPWZLsyg%2B8t9%2BnRiWSfZWwqi%2BiI9DP2f76SqWDKv8DCGEQABoMNjM3NDIzMTgzODA1Igz1tGWS9JEPNjZE4z0q3AMFBylXSUBJigivM0lahEmw1bpvpH5cZczTURw%2BWd%2FyK8b0mahHK2tRNccVt30L7Vg6%2B3YMEfG2MmwxWDjY7b3Pv4pmk34JW2pT%2FK5f6QHnKf%2FwMjBekXq0lhr5loZSE%2Br5azO65ZNS3czdrXdKv%2BtLVwMujrJX1QjyY2VHIfFSYytT53FQkNmkbKlaelatKoLRq8H1p6p4QUKrjCNJ9MmZOyApPyflwJDzSwlifRNd66S4wGcjWxQ%2BqLoaKGsTHnflw%2Bts4ev54%2FwMFwCBt84tMFPu1m8gstQHty69aGQnWt9gIkGPiZOCuAW5RVl%2BPL90IS%2FDr6yhEcRgiRxwxBdwRdK3%2Fbbz59kAK5MrDwI5EnVYa7eN4mkeN8b027K9jOSgsgW2Tnkf%2B0ZoiFxCXV%2BCIXUhOJmqOBNZMrXg8afP%2BqVX%2BSirYzKh%2Fd1zVrT5XXP9DFeOp%2Foa%2Br5JNX9V1iS6HIfwcpO3YblG%2F7%2B13fo2IdBuiNw8kXWup%2BUCdBUNa5Mf8u%2FNWFwWC3mRFQh7QrjEQ0AHi%2FRQldcOh9aYb2FN9KBxvzMrTGqd48Z%2FSberVXlas7eahMYkHEa5uhWCJeSUQx4wcmGnIU2zBUL4dXS4Rul1VBcLVkG2XHKDMjCb%2B%2B7OBjqkAWRNFOMiFmmxZ4A14PENJnN443y2T3eEML91GqX7fAZR9oW1gsjGIuxHurxm3KEZ%2B6jc6yfIAJSb4mPp4z3iu9XthZBJRbaEbmVGJFtx%2BRNgEzwtvGq1jea990ZtWbPzJ9zDna58gKuy%2BcL5alEKgMDGb81o3z%2BV9Odiin9inCgC7lncjtsNu2abBYYstnnr7bozFdKxdadeNCaqI9Q5OM%2F7i%2FDA&X-Amz-Signature=7fa3614bb103b06e1a705ffd02dbf826398bf46e120e93d2a48ce4ed532411bb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLEDJ37A%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162233Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpE8agq4Ca683FDve4KYU9iQPPll5%2FFlBSIK%2Fn1VruVAIhAJJZC0Js5Rqz4tN8R4bJSRU03FzUtTtGka0NI94bWWb%2BKv8DCGEQABoMNjM3NDIzMTgzODA1IgxqfwhHC9M6peijGGQq3AN8vLA3%2BBLiD1X8f9RzXD9Yuoo0ap7wGggzLtoPQimpbkWv5IBVOwGRX6o7D9wXcLObL9XwOYLU%2BHob%2BmT0MPCvk%2Biv27oWdyJ3Eq2m6YHBdFdd7BQeJnuRA6uxH2rdDycKLgdUuz7iqT8EwCok6vB9fjvCTGCKYMWrZ2XBBFb7DPJY3qojKcBAJOBBQ8kvmbjPSdsBK8drcUCGD5%2FMgZhKevKnSrJinEB1mM8h1jE%2BLrJNiCKPq3IVDvvu5eLU5l1NqPFDOfU%2Bt9%2BMSqtESNfmKDticHZlsTPtshtPIgEoS6%2BMkGZnn%2FesdArSlr9%2FbYFTiB7nQDeCz6r8DI73taVi7XtB4pMQQd6InScWU%2Bgk6MxTIQ8p2SG32nqYbnde7thKsU30Dkh6Yp8xCQIz7Hw6dXE1npPLX%2BBR2XhTzAk576aRYRg8M51IcV5uQEfJ2uqLpNfo9XLp2xMb2P2APiLUw9bZ41FF4E%2FdJy8ZttSfC%2BVnt0tIHwS%2FW%2Fr9aH7Im4vIrHyngsKCLLl0Y6I0jh%2F3QU6naYNcQaRXzmxB%2FF4kam7seEsAObEnxNq7Utz9nDbfrTttw%2F80n3kv7sMqe%2BpXO3SlfWCmwsByVjlAFPrj9dMlCS8LqMgCVKhfvzDt%2BO7OBjqkAdV5GoIlxbv1275Y6NhhxI0jMygPCFdsjmDqiGGxr5NSoS9w6l2QK0oLwwTPPXg20rNM9sKLM9JdVBFfClRehwGK9SB3UIoypKUbOZgK41UFDmRIeOqMd7ZWOO5g3%2BKA0LT%2BldNc%2FDAL0j%2BT7w6tDHVn5y1BCprMvNZZ9a6nIP%2BYzWCoIntc6mTPEhKGciBLU8b9wcOR3aCPT%2Ft6LweRLwTj0qM1&X-Amz-Signature=1161523a195514732167cd5f9689a7af25b4c7336903ddf9da060616e928cf9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PATFRXF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFyPbss0guoXkod2NW2Vidi89JcdKy4sPxlUPEKUWHDTAiEA8sMal9cQnAOfhvHenjWU34iUPvQ47R7R9MDPkkcfv7Iq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDMkHg0pN8eGOpQnFjircAzYJzoKAcNxP21YXVlCvJVkTiU95bwuuorIiYTi7npWPi4oeD7XA34dQN4chyiWP66l2yYn5I%2BA%2BrssGVm3eRTcU8aFnqjmiyc1r2ANUJdHMNk%2F%2B6oH3Wv%2BlH6sjosSxGZiLNHPdfg8E%2BaimUdtk%2FG23EM2BYtU7C75dBnc58iy%2BM7HoQ7kHf6C8NNqjYRFIQzebCD%2F8rOjT4KI7mDpBdm2SQrnAVK9yq1ql4vHuqCMi6I7kZrx3oHN%2FziU0nwNQ%2B8NgdLFY1dg7kZoKeR6rGJz358EKx9vhFoxPzxepwIhwTGFThzbrhzyX9UIXcIFmVnBi%2BUUyZtZ%2FWIPXxFS0KA1umG51MRRfbVlitaKurVDOcuHy0yL%2F0aWSItwSIxIgmkp6dw9OoHdFnsmSt1TNmc6hienuG3W4OQBZ2B3NMENkCBhi3lZI9MY6wTwxw5eyYLBN%2F0KlE%2BYYRfq5qNOwC8lWX62aHiUDrmHpsSFX%2BPmoJ%2FPdyulj4tc32uGm%2BBTtrI2UnLHeLV2Qa1Pi19RUM1P7QfA7dO2cgjaSHbStqCrWjESOTeiIv1gtRB9YBF0y0hpt8cYMCv7oS32KY5DwL7XZF%2FZHSxjhyzn0jhfeuksxVGV2giSH5HPXCRjlMLT57s4GOqUBbtZ0YDlOHyDlupbACjVjAdR9w%2BV5BgkhNa%2F8QyCyukr%2Bgg4WdgmnhNfiuUqu0n6ZZsnZBeYWeq8in2f%2BGlHoqdab%2Fwxu9IbXGBgHiCxh09UrDTCInx3SGSeCXrh3%2BtZ6Cd0RMYpxQW%2FvRQ31BGk4YVJw7e2Lx19o5FQLhr%2By4xR5dyendKeoWQlNIQNHJr8mr8MWix%2BDsU8R9Tt90GDCQ%2FqUyAjk&X-Amz-Signature=01689124316f7da8e062fedf3ada6ea98162a992e654f60a9370bc1f4e92c094&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667PATFRXF%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFyPbss0guoXkod2NW2Vidi89JcdKy4sPxlUPEKUWHDTAiEA8sMal9cQnAOfhvHenjWU34iUPvQ47R7R9MDPkkcfv7Iq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDMkHg0pN8eGOpQnFjircAzYJzoKAcNxP21YXVlCvJVkTiU95bwuuorIiYTi7npWPi4oeD7XA34dQN4chyiWP66l2yYn5I%2BA%2BrssGVm3eRTcU8aFnqjmiyc1r2ANUJdHMNk%2F%2B6oH3Wv%2BlH6sjosSxGZiLNHPdfg8E%2BaimUdtk%2FG23EM2BYtU7C75dBnc58iy%2BM7HoQ7kHf6C8NNqjYRFIQzebCD%2F8rOjT4KI7mDpBdm2SQrnAVK9yq1ql4vHuqCMi6I7kZrx3oHN%2FziU0nwNQ%2B8NgdLFY1dg7kZoKeR6rGJz358EKx9vhFoxPzxepwIhwTGFThzbrhzyX9UIXcIFmVnBi%2BUUyZtZ%2FWIPXxFS0KA1umG51MRRfbVlitaKurVDOcuHy0yL%2F0aWSItwSIxIgmkp6dw9OoHdFnsmSt1TNmc6hienuG3W4OQBZ2B3NMENkCBhi3lZI9MY6wTwxw5eyYLBN%2F0KlE%2BYYRfq5qNOwC8lWX62aHiUDrmHpsSFX%2BPmoJ%2FPdyulj4tc32uGm%2BBTtrI2UnLHeLV2Qa1Pi19RUM1P7QfA7dO2cgjaSHbStqCrWjESOTeiIv1gtRB9YBF0y0hpt8cYMCv7oS32KY5DwL7XZF%2FZHSxjhyzn0jhfeuksxVGV2giSH5HPXCRjlMLT57s4GOqUBbtZ0YDlOHyDlupbACjVjAdR9w%2BV5BgkhNa%2F8QyCyukr%2Bgg4WdgmnhNfiuUqu0n6ZZsnZBeYWeq8in2f%2BGlHoqdab%2Fwxu9IbXGBgHiCxh09UrDTCInx3SGSeCXrh3%2BtZ6Cd0RMYpxQW%2FvRQ31BGk4YVJw7e2Lx19o5FQLhr%2By4xR5dyendKeoWQlNIQNHJr8mr8MWix%2BDsU8R9Tt90GDCQ%2FqUyAjk&X-Amz-Signature=01689124316f7da8e062fedf3ada6ea98162a992e654f60a9370bc1f4e92c094&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCXY7NMD%2F20260412%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260412T162243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAvEQ%2BHKdm%2BPNeHuUNAKN4WcamCDfcOL7xRhMdh5epQMAiEAm%2FiVIbZjNxZpcnBpqngbHxTFJ2q7YKqfVwDvLBEZZeMq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDClm6EliboZGFOPBXyrcAzaIxFyIPTMeQgmBrDcZB3qCQXaavjajyyob4gMpT6CBAb343fus8g0g51D745mh1%2FUKFPLA5fuutKOlrXNAM5cdqML8g4mBRC5%2BctZnwe4xAI5kNCLXW2dGN2%2F3habflGNxaFExetWSVAbpx2BDlVqu6nZu6o5aj6Mg%2F9mbRM%2B8mtM2SB4ciplRrDtVLOe4iXQzSi7Rj4OAIdQ0heMPnH30PYf6DL4lJgVVBkCGRhMhQd8AmN2Z9QcHXcACbLnEWyx1XIxxXtcdomm03DP0lsN%2BX8K16CwGWAoHh%2FqlaD5ox4gF4arSKVm5ZPTT0OV%2FvWNVbCT8Xq%2FYS8DTUtm%2BFvtZrdTcnvM%2B%2BnoHksadh29TC%2FDjvneAK%2FnPuc%2BobjRxdWAVxpojQ52yZwuCIx%2BCzccOeNO5x61MYC9cMFxOQuxC2JpsX0k6fRxwG33Tvqkw0aISyc%2BwGgoiekdL%2B4p8OVD9YlVZUCCCJCtZzDoHCWn4IyJ%2FyeFxlkUrg3WB0gxTWZru0oQ7yXecdmSW6o15xWtkBrOsxsvjXRg1AzNKH5FbF2Rk2rrl9pSTEebgs5Cx7G8hOy8lzhO3wfNYKKyz2H5KeIbaY2Rgzc0044WuUr0mjo2Iy%2FHEsmisBgppMKH67s4GOqUBtWCfK44X1J80SHrfTAfQxem8diL3H%2Fzfg%2F5o%2B%2FFHV5Eb4m%2FBUqYimQkzQpczAN2Rrntwc%2BJLmbhaLmpQQKNV%2BFgPwdWBL3vE8ez5i1batO2daJz%2FCg7B7XwCxPUInZ8CqXNcr8%2Bbqa%2FpnM1a%2Bso%2BCmFRYiJzJc3qcvWKg7ifE%2FQ2VZgJzSlCOloj9E%2FQ9Fn7cubGDh%2FS5Fu9yxOEOmlyc2aTCVAi&X-Amz-Signature=771db8979b16c06ce233b25dd0e8f4f1c5edbf72d6155596f5dab45889fbc830&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

