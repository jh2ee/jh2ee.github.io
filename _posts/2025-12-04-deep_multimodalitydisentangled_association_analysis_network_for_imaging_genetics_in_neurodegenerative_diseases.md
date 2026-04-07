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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627IHG6O6%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQCKmfc5uGUsajVZCGvDfv3I9trIJf3vva0NkIk6wKNbaQIgOld7q7PFB4x9TW4jxA7Ab4YhrekSvgyJza9ZLR3vZL4qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIvTN1hsw8P%2BKc8v3yrcA7zCbOUzu0dYG1Wxagrs6O6KJDKLh%2BJnW6EFlcAlzI8gtr%2FwL%2Frj5Sg3C2HofvAK%2FfB4PM2VI1xSs1v%2B9mLUlq6wsHO4ZWrozGZelMSVjnXnp3Jnx8sE3oqmY4NkgNms8twXLj6ZN0ZnnZgV%2F%2BHrfVpizU6cN81Go%2BMe3EJIKb6PqzGBuPGBH0emY6WThj2asQql0B0IzRtI4Qqxt0557u8Y7RnvbUbWVOfZKUqHo4wgifSGnifoXsaAzl9fiaeXRi6mrDGbETGR6H21HAbXfW75VimS4wG2tszzGYmb1MHMtNfy%2FyEWoBZnR4jp11%2Fe%2BwY0LtJIRSsSXOOdcK7Z4iItciLuqUc102wnBPk%2FYmRdXtDHIpn%2FxERpAjBQ1uzISQA3FYkmKvviao1uzExxmmQKiIDZV6c2xbQNUC407ccvnJQUnbZk%2F2wnk80lNnhc5pjhBkFP4Vkj5b4%2BHPwIvRgcV4d2yXG3L8VDb5PaAQuOXggphz7egXpm2T%2FqE3vflUOpmKrQP3Bq8H2weXQtC4f8DpNwHmlKaiI82zm3g8dfvxu3QoaEe8YtyHcn2TySuzOrZURUEFcQsh%2Buc2fUjfxVqPD751o2VrYKgGUgvVPAaAA%2F4eeoM9SyzMubMKqs1M4GOqUBmH5YyzgXPPHGYGV0uZA43IZuVOBdUqTHFRuwdIWud8CEomc8BhFznIy%2BHyA%2BV30mXewfQHy%2BgU%2B7z0xUNE%2B9ssTBrXcEzqWaS5JpoGCQ%2FMeNENecR76pbS4SUxx5w%2FRp8U%2BkkBFBFQDF4CUI84wPMW2qpn6noMewNdKK3t8E0HgMnrwcJUXxvwmB3rvdSfvvpOv1Plg3WqkOQTObWyIEDPWUPZmh&X-Amz-Signature=df64557d21c1d713004fe45b78c5c78eecf3d4d7e8ffe4e8547bca11bd7583c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46627IHG6O6%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB8aCXVzLXdlc3QtMiJHMEUCIQCKmfc5uGUsajVZCGvDfv3I9trIJf3vva0NkIk6wKNbaQIgOld7q7PFB4x9TW4jxA7Ab4YhrekSvgyJza9ZLR3vZL4qiAQI6P%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIvTN1hsw8P%2BKc8v3yrcA7zCbOUzu0dYG1Wxagrs6O6KJDKLh%2BJnW6EFlcAlzI8gtr%2FwL%2Frj5Sg3C2HofvAK%2FfB4PM2VI1xSs1v%2B9mLUlq6wsHO4ZWrozGZelMSVjnXnp3Jnx8sE3oqmY4NkgNms8twXLj6ZN0ZnnZgV%2F%2BHrfVpizU6cN81Go%2BMe3EJIKb6PqzGBuPGBH0emY6WThj2asQql0B0IzRtI4Qqxt0557u8Y7RnvbUbWVOfZKUqHo4wgifSGnifoXsaAzl9fiaeXRi6mrDGbETGR6H21HAbXfW75VimS4wG2tszzGYmb1MHMtNfy%2FyEWoBZnR4jp11%2Fe%2BwY0LtJIRSsSXOOdcK7Z4iItciLuqUc102wnBPk%2FYmRdXtDHIpn%2FxERpAjBQ1uzISQA3FYkmKvviao1uzExxmmQKiIDZV6c2xbQNUC407ccvnJQUnbZk%2F2wnk80lNnhc5pjhBkFP4Vkj5b4%2BHPwIvRgcV4d2yXG3L8VDb5PaAQuOXggphz7egXpm2T%2FqE3vflUOpmKrQP3Bq8H2weXQtC4f8DpNwHmlKaiI82zm3g8dfvxu3QoaEe8YtyHcn2TySuzOrZURUEFcQsh%2Buc2fUjfxVqPD751o2VrYKgGUgvVPAaAA%2F4eeoM9SyzMubMKqs1M4GOqUBmH5YyzgXPPHGYGV0uZA43IZuVOBdUqTHFRuwdIWud8CEomc8BhFznIy%2BHyA%2BV30mXewfQHy%2BgU%2B7z0xUNE%2B9ssTBrXcEzqWaS5JpoGCQ%2FMeNENecR76pbS4SUxx5w%2FRp8U%2BkkBFBFQDF4CUI84wPMW2qpn6noMewNdKK3t8E0HgMnrwcJUXxvwmB3rvdSfvvpOv1Plg3WqkOQTObWyIEDPWUPZmh&X-Amz-Signature=df64557d21c1d713004fe45b78c5c78eecf3d4d7e8ffe4e8547bca11bd7583c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNG7QZOV%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160120Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDh%2FIPQacp41W7oArBaFbn8IV5Puj8IyVeJCEUO%2BBU0HQIhAOTEwb5XF5cL%2BGj9VCR5wH6UKC57elOjKHq3tAR0fQf6KogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzIAdmh%2FHREzUjI2Hkq3ANfQos2%2FaMtSgULMXgkmURfiIHUXTkYIpmF9S%2FR%2Ffi%2FYlvjqtnqASLITT0BLU3ibAZObNk2b4aa1Wf22ceb%2FTUktsYyp4d2AsqPqgVKTv6XzRh6sBSuEschttJ%2BXj3tn8x9SwYUYklyRpN1WrL8UAL5lASr4%2FBA95wXAT8oGclt7NLTkWKdt%2BEEirvggzVJ%2FQYAoCs11BUefN04O%2FC39u5aPOjLTDjkRdVk0mL0tLgLVTtP6gTq4nEoztR2wWxdg4kkmtN9%2Fq%2FLPEZQjTfMbE8hekUjrjl8WSYOFZuXfVkhROfn7lxaN3jRw2lFvDRUKBCAeNz34ZKIUpBx2NhbqdLefnha44s%2BIj5LXmpK7Dv%2FwjkzGn8vuaut3xSe1qH78aTGi6yEmevrBbBN%2FDuquDl2a0SX%2F%2FaBisucK8YK2gHiiiVVTlrZky0Ra9EGiFFgHr9mxC02ARjKntMTlBiDYN6lT61TlP3nPxUU9CGVQ2DcIpB8p0TmdRGNq0PQ4Cvp9PaLFkVHuxsQfgkYpn63%2BakZ2SFLZBEuRsqEwsBiQhHNNugAMBC1UgM0povalbltMKEdQeR6IyE3CGXb%2F6hPyh4SzraXosp%2BZXqwEXXU4AnsD7CMlUQ9YGbNmbptRTCHj9TOBjqkAWnlZNOjMhUk7ZyJx%2BLtBfBCB8HwhPHFsnQ%2BTp9vE%2FQ0u7r5XjB6Q6vdVuwebgPF5Z3o8OmuaLIyizphTDWrdpcdvQhQNEMM0MyYZss1ewG76jlRCgGKmgY%2BZSH9vq91wyRdP3%2BzIpXGELTO5G2uZg8YvV4%2B1xEWvHmJN%2FC1x%2Bv4DgYsdQFPlVfVRyhPKkp6GEHAn58097HpKvquf7%2FnkS9F9aOj&X-Amz-Signature=b98a8ed44a803238bad05921f4be1604afc64165bd3e906e811a59cd59319697&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4H3IX22%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIF0ubtkdZMspIrluvCDewJvhEefqtiXJCBfkq3fp%2FLHYAiEAxmNN4tatHjSeF2SFnO84xrpIx6klEtvO3KnRQCVoIesqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK64ZfZOwCtxCsDCPircA1iP4RV1cpmn3syhQlnKPunsAlbwKN%2B%2B6aUo0SZVHu3qKEPXFnMoDEKvlml4C8xNPqEFSXLWIDAF79wQ6StweNurG0rHuf00FA%2FQ6a5F8%2FSysaxbn9armn8KivyIZJ7vRkSbwSD3WL6ZkG%2FLjf6ZwVimF%2FQVHNWneQTwQpDuJX4XNmBNVLz4brXBi5V8G4CsA02DLgBRXf24eKl%2FU9iJvFM7AxVViBHbGVG6XSRB2IBDQnQ5L1SdhA1i1VXx5Zb3NtWRVr1V08TAcp6U3wAXYT1sDE25pp79KzCPh99cw%2FfFGO7smsN62EHg8UKokg3oIM7g6G99Csuyk7M63%2FpVnTVIJ5xwFJHYXoxCC9hAgeKSqATEmodJuYDVtjl2s6pcDeTiuNJDzotioSFisUBwtV6jYDaXRvkXvTV7U3p%2BwHG9Yr9cYQ97Z4MSsiIzOD%2BU%2F0Ic981I5OX6OGThjlQ7Qi3mF9E%2FG800g%2FhDhftcfiINmsI9l8oex2N4Ag1wcRDxcAO5hjGXuYrRs5ZmDiX2gj69HpoKMcVoTg4JeQrVZRBCbuvQPHRq%2FfkaP5yOzCKkZbI01qNSBH4ZHi7BYYA3Q2LQdqpTr7E%2B%2FRCQKZUQaYHxtQFWfVINuQtJF2HCMNiL1M4GOqUBNw9wERWfJ3G7COiKt2%2Fx0hBGAwwmnyCwI0M5n6eNnHxQen0VQp0%2BgPa4lhVWZMTBMjyluSfR7cEZK%2BhCjDXAHWU5HKr6%2FWW6acgTFFIdhkfwOW7Fu1PY70x%2BdArbZ4jAA5FfZhGQStzCDtFRD5Pv0opp6jV2vUAIgBS1f%2BwKfMFexanhUMmf1QuwOs%2B9gAJ70wYgEWyV0%2B5jWAOG3CkYYiEncJmy&X-Amz-Signature=42c81c48a89c687b873451bb1d0d4c05e7f8c6a77e8be8b9ee42d58cb80c429c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q4H3IX22%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIF0ubtkdZMspIrluvCDewJvhEefqtiXJCBfkq3fp%2FLHYAiEAxmNN4tatHjSeF2SFnO84xrpIx6klEtvO3KnRQCVoIesqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK64ZfZOwCtxCsDCPircA1iP4RV1cpmn3syhQlnKPunsAlbwKN%2B%2B6aUo0SZVHu3qKEPXFnMoDEKvlml4C8xNPqEFSXLWIDAF79wQ6StweNurG0rHuf00FA%2FQ6a5F8%2FSysaxbn9armn8KivyIZJ7vRkSbwSD3WL6ZkG%2FLjf6ZwVimF%2FQVHNWneQTwQpDuJX4XNmBNVLz4brXBi5V8G4CsA02DLgBRXf24eKl%2FU9iJvFM7AxVViBHbGVG6XSRB2IBDQnQ5L1SdhA1i1VXx5Zb3NtWRVr1V08TAcp6U3wAXYT1sDE25pp79KzCPh99cw%2FfFGO7smsN62EHg8UKokg3oIM7g6G99Csuyk7M63%2FpVnTVIJ5xwFJHYXoxCC9hAgeKSqATEmodJuYDVtjl2s6pcDeTiuNJDzotioSFisUBwtV6jYDaXRvkXvTV7U3p%2BwHG9Yr9cYQ97Z4MSsiIzOD%2BU%2F0Ic981I5OX6OGThjlQ7Qi3mF9E%2FG800g%2FhDhftcfiINmsI9l8oex2N4Ag1wcRDxcAO5hjGXuYrRs5ZmDiX2gj69HpoKMcVoTg4JeQrVZRBCbuvQPHRq%2FfkaP5yOzCKkZbI01qNSBH4ZHi7BYYA3Q2LQdqpTr7E%2B%2FRCQKZUQaYHxtQFWfVINuQtJF2HCMNiL1M4GOqUBNw9wERWfJ3G7COiKt2%2Fx0hBGAwwmnyCwI0M5n6eNnHxQen0VQp0%2BgPa4lhVWZMTBMjyluSfR7cEZK%2BhCjDXAHWU5HKr6%2FWW6acgTFFIdhkfwOW7Fu1PY70x%2BdArbZ4jAA5FfZhGQStzCDtFRD5Pv0opp6jV2vUAIgBS1f%2BwKfMFexanhUMmf1QuwOs%2B9gAJ70wYgEWyV0%2B5jWAOG3CkYYiEncJmy&X-Amz-Signature=be2a18a893032b0edaa134a1da251389c41027bc554ca5dd526dd0177ec93aff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46636MP3NPN%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQCZlf6zmKQ1b0YFGZXPCKfpGxYbut8kjmpGVQ7dR%2BoICwIhAIlAkfkVgFbpVwUcHcVb8V7wPAAEib5x05awJkA%2Bk6QmKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx4lWA6TT5wEfOAw4Aq3AMR9bXhiEYVisDEybHm1NjkSt0Bmpkv2wOVO4D4CWW0h6s1Y7BLQ5IBTW08LaTk506nGAR6pYNWDXio2xXXW3lJz0LDrCHI%2F%2FR2EI%2FQq28tGnBBWyzPHLyL1JyhuLpLNbJY4aDQ92T86XXPprS9ZQ6vuO5lgAM4hZ4FMG08JoeQZM8rU06iRq8rec7gYLKJ6z%2FX3RzNDSrQwX%2FTPTS70U%2BNc5tmxuFwMo7zjF3AX8KCVKTFciMwdU6v9remuVh73XbOqXu9DMRmZ%2FM7eejv97ZdZtfAcOiCAWQATDo6SKfYZsyBSezRjY9YOhXT5DSqAwKNpLSg%2FP8S3xhunemU1jrTHtX13AsaPO88rrjH%2F3saigw80rvjlplfKoo23Y4J20DFk4kFLTgw15gkX5x6weRuiEG3p7NLhPQ5fjMnEfZ70HXyrZTjKtk%2F5qJT0ATd48KErDOEhx36JmSlg6IyYI3p%2FaUEQdpjrNfDauvqqVDsBAFFUpGR0HbVqYDAAfpv0AEBuOdWRYTy53hmmSkv5e7Qmvf7jqE52IFak9dabj7I%2F%2BZ5s1H1H0TY1mnrQH5TZcvfHCfhEWeUh08Y%2FNaVBAaV1GjtWI%2FeiVeyfLOZnONMmHRAYacvJQBCzdNF0TDWjtTOBjqkAatqtmL4eXIFzi3T9lSc%2Fhd%2By7FtPLjXqdghddm40uzApG8oez3EtNmy3xG2iRM%2FK6oI27D%2FN1DFMXXDdY%2Bz6kKHQEbp2dMAGUyH4uNLe6JdT2B7L5itW8mperff76r2GQWOdLcr2swTKQi7Dr0gDUhmbLkz7mXQReBsF2pxntkwVGyjZuLzQfBiMW%2FNS92Ef5BVHU7L3YqhrWGfNCw8eBI9YOGR&X-Amz-Signature=5cb3ca8ffd7b2c4765d5985be11f11bae0c0fdd2dcf764ccbd7729a3f021c875&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YFOTNDBV%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160122Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDQFotDCd0dcJLuX4u9f0WgBBZuSk8SXOu1eqZ5HBIMhgIgcTYYdRMLSv%2Bhg4pmQiTVKMHFQbf3A5Gt%2FW8KhHla%2F0EqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOMXH74allSc%2BcXNvCrcA0IjtjHRfxafuAAGfnclmFu6FsLHZ%2BIioqoEyBCKcrMzea26wgSeztoVFM2Bf03jYukFybN1NrpYfQ7TJjlfsDxCgPrsG6dLpLvID54GxrynA43n9%2FY0vGAAW%2BnDfRVXl7v%2FQKulqZ2n%2FFMuBt6H%2FBiqELYtvTyCfGHEsIvfSfMHD%2Bm3a7C4BRhqilQzHAxqioFaVNmCGSz5r%2BTPOaX0U6CpduJ%2F7dhVia35lIssaqI%2BYCy8Y9tNGqatG6R%2FMN0gk%2BQltseRpwtGmWHRtAWLhYvN%2B1qacoHIzPKDGuXjitck%2B9RNp5cTYHhemGWi2t1wH0cqj2ihw3WL8%2FZ5kNQC8Jx%2B6GyzE4mNrpdnhG3f1fs3SOWAs9y3IsJYTDTs%2F0YgxwX1toJMlIKUwbVZr8E4DuCeNCbE23BQPjs3pJjD42Dp1ZX2O6DuJX2XgkqWiO70T4o8hWC4lA1aWl40ICW2LNezmtwZl%2BVKmMC0VF4%2FJVr%2FPfU1ceCbGla1VQmS66aWnrl8s7TRViw8akjlJXP0SbywvY2nau1jjtUvnoAwOftuuflMa2mdJm9ytZRXAdd9Z9XyIhAr4eSsdUJiHUGv6vW5Vnbuz%2BChjhZAAS00%2FGevC96WbYmgRheOzAmgMImP1M4GOqUB1%2Bgj%2BfdWEpcPZUmTNfimBRhDSTm82YNyRxBigRr%2BJLooOb%2Fuq4PaKZX%2FPQjKVQ1pHcNF63z3lnJJt133enIekF7%2BV3Mp4I5nEuPQjaNhjtN6cMHkyLP49Ws7Dlf0W%2FfJP1fxAUw7kRuVybJeUtUCLWhscRd%2BEkmHWQw%2Byzb8V%2FXPbKDu5AvoZ9DTAoLPKVSZMm5XVOiLE4HUsIUOINQPljuN7GmI&X-Amz-Signature=1456e4c0150285e4923a3ae34be4358a915f5b812bb559639eec0d2cdc65e175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XZHCFQT3%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQC5y8y7alPesp%2B44kAI8gv%2FcaEHSj%2B3hIFsO3V1g5YsegIgZoqna9JYiZR3cPxEHbPH0cbmZo9RHGqtJAuaChA%2BpOAqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGor9kD71c4vMys50CrcA4Rfc4brUsNRlz%2F097PcmYvRt7bhKQYGgwVdYQt7DluZqN9O1%2BDoJ7HvrT%2FzuEAkC5iqVos5Cur%2BSw22qmy2DnvZoNHlc1xZ66Obs6vqmsugGiFwW3mv292OcP9FnPZpfbr5rD%2BzH6Odkh4nVOyFENH9uZBF95pdGmwI0d0LrB68g3EtoOk90Na0lXs704pEYApGFcJEsmqBHFvit8rnki00CjEFRNb6F%2BLYkOqXZVmJvSiEgVwWRuR0Tzf9bSTSS7D%2FBZsGFL%2BGUPQ5xQllv7A5mAFH1iHhjfa7G%2BaXH%2B4BVMHgO4aQIu7gE%2Btzm4lHd8TpwnM%2FXS6ZiMZW5W8NvdhTj2b9ypIpmMi8rDlb8z4aIh%2FTYMR1faxRbu%2FV%2B5FMmf3YebF4JS3xnwKRyNyofrD%2BMcqGqeCJyP4QmXNpAQ68dYTvAZZYbuNAvsO4QcjLa06ezzopJ0U9UaI7Ik%2FOIb%2ByR9ZA%2FQf9Iqhfr0LHRUu6gdtzYXfQCemBD9AsnEx12%2FzNlNi9peqm1rTsU0uixafNQOL5nW2RvQ9FSH4S35KaH50jKQM84PtDauzWPuQz4KInC1PJNgEfNS1GuknI%2ByUk2JpxnNO5TIiORv9O01VtLM%2BF75h5%2BdSOkwTxMIeP1M4GOqUBL%2Bs7yrfBD3PU41gZddQtjJn7pw7Cw9kKB9PXMcBUmPSo9o8fEFvC7L%2FcvnlooteA4j4gCvlJVJo%2FlIfqlJ6my4BT9eIGGmPsLqtTfmtDTrwxJcOpdV3%2BfLMqGaIuV9d7wpQwnTa1ZtKTrX4wyDjohjhb0enRWIZyDJkdxGrYXrm9%2FiS7V%2BBK6mJWe4jV1kOTUzXHrKEaVLS9gxlecva3gctVbBfr&X-Amz-Signature=7979513e28227a280e8e64f2f5229a31297602c6ff4dfaacf398842a29792d39&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HKF2KIC%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIG06zz6Fo6teq%2B4C%2FIgrHy%2FZGgFDTwKAo6pO3%2BXJM6o7AiEA5ISiUYFjYdPu0DSJghIKtxz24EjN8PyhZN3EL%2FEE1ZkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMara7Pt8jyN0%2FgtcCrcA1PPHQBWF8ctwSEv1Eq6gBGZL7D0RzVW%2Fdjq%2FcZFlWd9AZqn9B5uJzUAQv23%2FeWg154xkwPZt%2FJxVWh3Nq6bWn9U81wa3YfWLyylOFmO2D3J6lpMj3xFJeg7%2BvI0yqhfIXQymnJrQ8y%2B6K7KvF0VcmitGym1C4nnDfYx4FWqRRTv5oS57VlGdYiN1uRvZFWNZi0eyxpNqkA60KYJBIUWD4irS0lRhXOT%2FEjCNG%2Bdy4imNmTzFb%2B8TTaevajuoyUZLGnKTPJCCqvAB57V42pjgpTGztxn6jktyXcSRA6PEw5M86fmkhpz3pWaZanBUJSMLtyGgoCbFvTX9Rj5glHerMCPYKmGItPk6kYf9BY8AA70DX2qMHaUp4RXQd52mflK8z4F120TmmnvlAeqjCffdh5qDyYVJqzIcJ4BQiql8GCRwvkKqL%2FkrKs0NLB%2FYrUSh47mtxFnehiPlrE7LkZ2t4XOQOGG84YusaF4niu66ITvhopfw%2Fx9%2FGAvmvJRpakfDuivS8lTBkrTalJo6y%2BMmSWheYuJQe7Yc4wb2tJHTtNJle5NXhCwG9udFtvMCvJbmWBEsppUy0J1B32PEQjBYX4uMrMGFPg9NOiQAKtKnVmXyKTDZ05xC58CJAi0MOeL1M4GOqUBBrAZjlXiyk9DxDf4X6VBdiACRoI%2Br%2F9voISq9ouQdMpnrFCWC%2FzSCrsI%2B7nrrklKsB01T034L%2BtgT6uAKktyTbUqRVByKjk2EGC8HbBkrbyJlrp9tR6ArwFd9W4sPORW4OCeypgWYHWWnj976mgQiCZZFEBGKPSLWbLd5ILGIa4IlDvz%2FuZE54B2lsd8DeUUe5lRRk61kC5fdFpqjZo2mDNemruf&X-Amz-Signature=98ccedbf20ed690a60b0f9df79beafc587a350cdba3386c5301574ba2baa2aa5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665HKF2KIC%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160126Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIG06zz6Fo6teq%2B4C%2FIgrHy%2FZGgFDTwKAo6pO3%2BXJM6o7AiEA5ISiUYFjYdPu0DSJghIKtxz24EjN8PyhZN3EL%2FEE1ZkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMara7Pt8jyN0%2FgtcCrcA1PPHQBWF8ctwSEv1Eq6gBGZL7D0RzVW%2Fdjq%2FcZFlWd9AZqn9B5uJzUAQv23%2FeWg154xkwPZt%2FJxVWh3Nq6bWn9U81wa3YfWLyylOFmO2D3J6lpMj3xFJeg7%2BvI0yqhfIXQymnJrQ8y%2B6K7KvF0VcmitGym1C4nnDfYx4FWqRRTv5oS57VlGdYiN1uRvZFWNZi0eyxpNqkA60KYJBIUWD4irS0lRhXOT%2FEjCNG%2Bdy4imNmTzFb%2B8TTaevajuoyUZLGnKTPJCCqvAB57V42pjgpTGztxn6jktyXcSRA6PEw5M86fmkhpz3pWaZanBUJSMLtyGgoCbFvTX9Rj5glHerMCPYKmGItPk6kYf9BY8AA70DX2qMHaUp4RXQd52mflK8z4F120TmmnvlAeqjCffdh5qDyYVJqzIcJ4BQiql8GCRwvkKqL%2FkrKs0NLB%2FYrUSh47mtxFnehiPlrE7LkZ2t4XOQOGG84YusaF4niu66ITvhopfw%2Fx9%2FGAvmvJRpakfDuivS8lTBkrTalJo6y%2BMmSWheYuJQe7Yc4wb2tJHTtNJle5NXhCwG9udFtvMCvJbmWBEsppUy0J1B32PEQjBYX4uMrMGFPg9NOiQAKtKnVmXyKTDZ05xC58CJAi0MOeL1M4GOqUBBrAZjlXiyk9DxDf4X6VBdiACRoI%2Br%2F9voISq9ouQdMpnrFCWC%2FzSCrsI%2B7nrrklKsB01T034L%2BtgT6uAKktyTbUqRVByKjk2EGC8HbBkrbyJlrp9tR6ArwFd9W4sPORW4OCeypgWYHWWnj976mgQiCZZFEBGKPSLWbLd5ILGIa4IlDvz%2FuZE54B2lsd8DeUUe5lRRk61kC5fdFpqjZo2mDNemruf&X-Amz-Signature=76a51eae106639827612079d5718474f12131fdc85de52ad3cec5f051a4b03a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJQSPJVO%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160109Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEPPk8%2FMw6VP7W3lKmK2SpIlkjYczSzfc29NrHK8lTMKAiB%2BYix3b68PUa9pz0nH4iMfOK4kdkcJkRB3EDoJNlRjiSqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYiur944cesD87e%2BiKtwDfiuQTcEF9mANxbak7nBsUt1CvGh7meymqMVu%2BrdmB4FxGNLv3%2Ft66u9qEtNPZJvNF3h%2BmTOQV3WlFqkzq6rrcOBAoeV8hV0Oz1129jRgnpKlsemv%2F%2Bj%2Fu45rB0kzMDBXZx%2BS4W2PBiYLNIcukByI5Q9i7zUiZhdL2SAiZjXdzoO2PgI1WKh1N7ZXCZl6aIUaZ2TDwIGhIxmEoqOnSu923Dfwh5gKVMtI9CN9eF1QsSp37e3UJFBjaTcItL1Qbnces2t3cS43uZibsHbl1M%2BQ58VpzWHbbK4s%2BhlSpmmytv%2BF8UbgDJlRltap3H0rH9jOaZzea92L%2F3vEGzZzvvSUuTacBxJBiDBm%2Fxjd3dQvTG5bQ0Xl6t6GQV%2F7aF4gF3pgJnyTFZ0Ddt02JlMf7BeGE38%2Fd%2FWxDYwlZG4oX3VcPcjvgXECofCrAQmCelB1RDJzI%2B5YwWI3NoC4BpUREB5zBQukKsQ3P7oBqBIA9760ddCoQRRc17C1wD0%2FfhLjmPW%2BumJEnTCA88KcU%2FMJkOC5HHfsIpfnI2K2ciUaaDwaYcqSeR0QIBjBUK4q3I5Pgl68jSqEpm5%2FOZw%2BB46KGuj8Vi%2F%2BEH2ENXu5kl65EaXZHNiA531%2FSz5k%2Ba2BLtAw54zUzgY6pgFNiot54o0ufR8FSx6lE%2BOZ%2FUvMtGtPaeJLJA9AKobUVOHp9PYNQSkp4FYPLsm2g2HqvGBu0tA08PpgZm%2Fxb0aANVVvYhkmUQSuclCPhWoMfLWYwuyhLV5D7ZW0fO5jtncJkYJ3wLQdfNGV%2BxPuG%2F1xGoO5vo4KOCguzhB7jD95aWMtM8BmCWNZy4jnF5zRee9LcNg2qGx8zJ5b11Xuqr694m8VYyAt&X-Amz-Signature=355eefc79b0fe29a8daae6fea6d5fa003e27bd7ec3fde8bb201446671ce4792f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBCZUWLR%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCWjpMQ5IbaM9kK1f17PmRW232LDzPp03zVs%2Ffgix3c6AIgZo9gp%2BY7MgPF9DszfTVdO8fTXYtX54Z0yjdEICdBJhkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK6AfcV0akNnEF9jDyrcA%2BN7ZJjl%2FxqW54FnVodz%2FPGtuSp1N40Y28796Au5ChPlAqH9ec89oPzJ5VZxQ5Q0O1cpY4Pqe2dpYj34ZwyErm7Q2ApAJYQIdeZZ6iplyMW96%2Bvt6eD4bjebXZu0HLNLfRM9NiiQp%2B%2BN1s527NE8ySc0Axh7iHbrfd%2Bf%2FZpea7cHw64oBxJjeoO%2FS3W0PBz0IiW57xUDpSrITLaFe4PLRM9cbn7z5cpACv3DFG%2BJmUe0TxhxQtJQkEgA%2BbBU4Eqj4Yx5gRU07%2FW8NeN09HJ6YzlEJHw0CdLW9NTxvCRy%2BJjXve9ncIjZ8HtolcfblgAqCtetBToY%2BGOjvgFgGh%2BJq5%2FHzW8JlCsWjKNilfj6fZ4%2Bex5vjCX39ApaZSqoQ83G3KF1uhHt1z2oDsP5JggaKRwqG1m95FkvvLdv9KQe5eeRnEtGGZQNqL3fYIqevHOK40%2FIhxqbcf1zRZ7KHvndeKVAV%2F6lc0cH8p%2FSvN1vF74OQstTGOmFzbSDIQmz1q2dgXP9bHF6gr4saQe0VmsUpnoNpgb%2BBmMO3roV1J8kVl4e2Wv6ftTzN8vxDz4HZ4Uht0IqLkdygI0rhxo0%2BW0nJTkh6eQLUOBk6wKgYxyY9JJyOa6bUToYhmE9erSAMIiO1M4GOqUBZI%2Fs5mPuW1wRFAocTio7174GMfZavHey5bOYGuLwW4Ofzcn16RJlEQsGN6tsxySwB25Nu0wiZ6LlAkJwcmGzq0D0szqxEan3LbLV0AwlR%2BoyZiJfMDHz5I2RdyllYp4%2Fserx6oJvF7Gm6xTNsjewmxnBX4LqxUOeneFHz%2BmLK4l4dxHBe3HkwA5VX3mhyyFWYCDzDrWm66dDAodZZ4BcvCC7ySSc&X-Amz-Signature=58a1b19e80deea047e91b5ecc9bee8fa30abddddc4472e82d05f6eb2a07c35ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZBCZUWLR%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQCWjpMQ5IbaM9kK1f17PmRW232LDzPp03zVs%2Ffgix3c6AIgZo9gp%2BY7MgPF9DszfTVdO8fTXYtX54Z0yjdEICdBJhkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDK6AfcV0akNnEF9jDyrcA%2BN7ZJjl%2FxqW54FnVodz%2FPGtuSp1N40Y28796Au5ChPlAqH9ec89oPzJ5VZxQ5Q0O1cpY4Pqe2dpYj34ZwyErm7Q2ApAJYQIdeZZ6iplyMW96%2Bvt6eD4bjebXZu0HLNLfRM9NiiQp%2B%2BN1s527NE8ySc0Axh7iHbrfd%2Bf%2FZpea7cHw64oBxJjeoO%2FS3W0PBz0IiW57xUDpSrITLaFe4PLRM9cbn7z5cpACv3DFG%2BJmUe0TxhxQtJQkEgA%2BbBU4Eqj4Yx5gRU07%2FW8NeN09HJ6YzlEJHw0CdLW9NTxvCRy%2BJjXve9ncIjZ8HtolcfblgAqCtetBToY%2BGOjvgFgGh%2BJq5%2FHzW8JlCsWjKNilfj6fZ4%2Bex5vjCX39ApaZSqoQ83G3KF1uhHt1z2oDsP5JggaKRwqG1m95FkvvLdv9KQe5eeRnEtGGZQNqL3fYIqevHOK40%2FIhxqbcf1zRZ7KHvndeKVAV%2F6lc0cH8p%2FSvN1vF74OQstTGOmFzbSDIQmz1q2dgXP9bHF6gr4saQe0VmsUpnoNpgb%2BBmMO3roV1J8kVl4e2Wv6ftTzN8vxDz4HZ4Uht0IqLkdygI0rhxo0%2BW0nJTkh6eQLUOBk6wKgYxyY9JJyOa6bUToYhmE9erSAMIiO1M4GOqUBZI%2Fs5mPuW1wRFAocTio7174GMfZavHey5bOYGuLwW4Ofzcn16RJlEQsGN6tsxySwB25Nu0wiZ6LlAkJwcmGzq0D0szqxEan3LbLV0AwlR%2BoyZiJfMDHz5I2RdyllYp4%2Fserx6oJvF7Gm6xTNsjewmxnBX4LqxUOeneFHz%2BmLK4l4dxHBe3HkwA5VX3mhyyFWYCDzDrWm66dDAodZZ4BcvCC7ySSc&X-Amz-Signature=58a1b19e80deea047e91b5ecc9bee8fa30abddddc4472e82d05f6eb2a07c35ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W23TZ5ME%2F20260407%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260407T160132Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQC0f1aNly%2FMHKXpiuKkBZgDPuPSnrfvEcwz8xvmITv5xQIhAKC3%2ByyUV928DSgUMYGJth44wQ2YUUSOUm9XdHPikhmEKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyNRdBSBlV4AqMhzakq3AND0yMLHJYLlUo595agshdRSJ%2BnBfP5QHTDSI1d2Wd0YPKwyG2DqRA66PyN9FN8tuQnyO9IZjN6M3jaydGE%2BIvhz1rIcTFqfWpXImUJrWQRw8ztu8TKNJ4cHcAM00%2FyIf%2B9awHKPmiy0Bz2r0u4f2UE2nkroi5eUpK1i31Cxw1dks9nPKn%2F24uRTHdtbLc%2FhcCfaslEubsNsdMeVas5rypf0%2BASBkpyrIZtLdbfnZNdD68cZ2xx7cJICol4%2BI6rZt9qgNIPjoRTIc4R08y%2Fo0DYD29KV7srHbYEy3y9IAX4oZ3v8tiQeSqfSViiDd%2FLiRrSLAb%2BLKddVEaqXLqAWuD6gHl5oDTq4z7H9ITBr%2BorzRCfXdLfGz2ayzZB3qZQ8PQUvdp77h%2FhQ4GFd0Ag79hwO2eI8%2BwPuJkKPGF4Tvfon6WYIMLnwCaX2NkK%2BsqmgKITryQ2gyvSKdLRbetpB5A4%2B8AeWL1DvyVSXj11fU1F7HizJVB4osdFSwRIutXAWHB6L95bT0BszU9e%2BBjG%2FyvqUm4P5coRr9yxDSBpLrLDqSZeHtLwynz9rBRORK7Z1eAZPPiXOPHjuWVgq7IpWhkhAhbJdJFZS2aQSW%2B03ZeO7iuRViRDwfaVpY5WzjDCjdTOBjqkASlCgxE7hDdwpEDzm1bdWZwLh4h7TS6boGg%2FmE0gBDYRZ0RzEy1KBXw5zReV9gWkGh8%2BfJo4RtTQ9EAGKEAosmDDFTzCEFLddZ%2FxAnBRL5AWe0Z4ZI5qRvAfJDcJQHknx6RNOXi%2Fqp8%2FKAJRZTvSpLnA9zGXyNj23q5vo%2FqwbwSJ0Zx%2F01W5MAmcT983FpMIeMaOBzP4UAB7Li0HwASe1hpUYZiH&X-Amz-Signature=ea2b8b5f097efaea865bc3bfcdb2fefad574b44e3f866ce8f3f670bbd111a656&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

