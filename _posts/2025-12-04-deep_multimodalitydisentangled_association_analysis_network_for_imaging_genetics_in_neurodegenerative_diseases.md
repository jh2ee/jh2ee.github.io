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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3MCWTEG%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIHwI137P18AF%2FZRbVMnzmLUyfACZyAvPRVnMlJhB4MjgAiEAo0%2Bj1TMiCCbBxl94fyo3xW44mnxmeAlfc9Mudl9pZUgqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE7nFXnh1wbmljL%2FMyrcA99R6CKXAT9SbzNG8Ft3sygb3tWV%2Bu%2FhHSHITXPzekpGx6gqe5z0o5toqzMbkjL7Z3vS08xvx%2BUyiY1c7ZUAWAPoGxBnZqnK5lQHRXPD4ZjO1tCvAogKF5hKSfGb9D3akGpYKe0TsSEeLu9O0INedjVUMGY34iZw0HndMgnDXM1pKz951ja3GYAdjgoAo12bYZapBvxdsHUr3XHOCNBw81AZrkhCtmxfV0Zh4wOPr8H9DcLbT4LwVO2EK7%2BEew6q307CbP3yeQXx1EuwPxqMJCTwUoMykLxNDizcqlmEcXhv65nKr9e0hNtcNZlQbXieEO%2FWz%2BYaCtGSYNR3oEgd7YI%2FF7aIxWnJ3B5WG1yrqfulrojT2rvka4GREX469%2FDkPjBPDs02xCksQXGO%2Fcn4a4fRxN3HuWj1JGGePKOJbkXpZAaHYwsrHwbg2DrcJsGIZ3VHrHgzbdUVmXWQjPelIGyi9rf2YsYjZ%2B%2BZq8rVW2GK5AU2EuwI%2BcSGgB8fcn0WN5UskNzwNrwjuPJAkI19VozDAdvTmaU%2B7fIa1pB%2F1hhyZgCXRaYuahfi8rBhU26gF%2FN0e8RnHJcXVcW2HNRhOQrIo5zIEr464HMqfSgdZZ0uqb4cMVo9%2Bc7FXE7MML2yj8sGOqUB%2FzctHAyg0x9%2FZ1t1ha9aIYhSyE2SO7zPE5OjJwuJdopPyUTqJEDhs3O8BIzY4rSstwJ3Lmi%2FcOCwwBC7NHU6OfeYcW8VtcuLQIalwI51G0fjS4MJ5kYJUmLmnMJkJp3HWerodFXpWaFPQAh7N7%2B7vxtkBkQl4UNq61UmbsY%2B0gctoM0UmSm23zVv%2BW4w2Hgbu7%2FeKa5BWJiHLZ9LpuHrvdj16cBn&X-Amz-Signature=50ed4524365a8cfd67acf40c1c016ce44a1c1aa41f42135bedc935d27d9fda7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R3MCWTEG%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJHMEUCIHwI137P18AF%2FZRbVMnzmLUyfACZyAvPRVnMlJhB4MjgAiEAo0%2Bj1TMiCCbBxl94fyo3xW44mnxmeAlfc9Mudl9pZUgqiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE7nFXnh1wbmljL%2FMyrcA99R6CKXAT9SbzNG8Ft3sygb3tWV%2Bu%2FhHSHITXPzekpGx6gqe5z0o5toqzMbkjL7Z3vS08xvx%2BUyiY1c7ZUAWAPoGxBnZqnK5lQHRXPD4ZjO1tCvAogKF5hKSfGb9D3akGpYKe0TsSEeLu9O0INedjVUMGY34iZw0HndMgnDXM1pKz951ja3GYAdjgoAo12bYZapBvxdsHUr3XHOCNBw81AZrkhCtmxfV0Zh4wOPr8H9DcLbT4LwVO2EK7%2BEew6q307CbP3yeQXx1EuwPxqMJCTwUoMykLxNDizcqlmEcXhv65nKr9e0hNtcNZlQbXieEO%2FWz%2BYaCtGSYNR3oEgd7YI%2FF7aIxWnJ3B5WG1yrqfulrojT2rvka4GREX469%2FDkPjBPDs02xCksQXGO%2Fcn4a4fRxN3HuWj1JGGePKOJbkXpZAaHYwsrHwbg2DrcJsGIZ3VHrHgzbdUVmXWQjPelIGyi9rf2YsYjZ%2B%2BZq8rVW2GK5AU2EuwI%2BcSGgB8fcn0WN5UskNzwNrwjuPJAkI19VozDAdvTmaU%2B7fIa1pB%2F1hhyZgCXRaYuahfi8rBhU26gF%2FN0e8RnHJcXVcW2HNRhOQrIo5zIEr464HMqfSgdZZ0uqb4cMVo9%2Bc7FXE7MML2yj8sGOqUB%2FzctHAyg0x9%2FZ1t1ha9aIYhSyE2SO7zPE5OjJwuJdopPyUTqJEDhs3O8BIzY4rSstwJ3Lmi%2FcOCwwBC7NHU6OfeYcW8VtcuLQIalwI51G0fjS4MJ5kYJUmLmnMJkJp3HWerodFXpWaFPQAh7N7%2B7vxtkBkQl4UNq61UmbsY%2B0gctoM0UmSm23zVv%2BW4w2Hgbu7%2FeKa5BWJiHLZ9LpuHrvdj16cBn&X-Amz-Signature=50ed4524365a8cfd67acf40c1c016ce44a1c1aa41f42135bedc935d27d9fda7a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7FENT2W%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180104Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIA5a4YJ1BqYnMNanQ%2B8ckCSm7K%2FHpt23%2FQYPMwVaWiq8AiASrZHfH99ofZsWX3VHE2HUffx2PSLvuMU0%2FNcd2z7jCiqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMbNxWFYG%2BQC%2BlTJqgKtwDCSpeM7FDhL2lngZvaFxruosCFzW3CjwmKBTFdJk5nTuMFA164Uvpf8Jgc0a3VMLkZJpkhk6atlGCnvAjjyfinUBjjWWfF%2BIppSVA5mckEddbkf2yTEkGqxdwuZ0L9go0%2Bz3hTEfXVsTn%2Frq3nFryZPk%2Ft1Cu95yCey2ZiWoxD2XfDZw6%2B%2FoMd7TCPqUyhYQFcNUdJ4RHdlYgNjG3RPC9xw%2FSN8NvbaVHQ6PWOW%2BCQmDbcU5MX6dTu1w2PMe8zCy3deYw6QW1exULgIXibDgPq9ExiiKinhWkc4jsx%2BKimTbwdbxjnq0Crk47eyv%2FR%2FWrdEr%2BQjheAcJoDtFWEcotfZSiwNGJFMomXWZXfOhcAY79NrTBePDeb8O0o3QgWzV0kq%2B%2BopohVy%2B6kAWxaWmKsFaPsqaSTgFyPHkpgZnl1bu2a5zINnxJ%2B7BE%2BCnFGUraRsI9UXY92CRSCvanxS33jDGggZ82JltaQY8UTo5Jm7Kt9R8Ins4l5LshZ4KzabgmipZAJsiLEG4lR%2FFklRgE%2BkzIzn55Oj7IvphL3%2FZxlYLRBnIP5v15fkT8DRxmubW41x9E54txA6%2F9817m7oJxqvEr9giXtEVwLTDgvevsgiX3zl14rz0pzfXyNdUwr8KPywY6pgHyBPzOhhbzXQrj1gc8gaK1aKpItT4X6gE2KjFxkGl8gleASzY2%2BKF3ZFkGUcG5OlokCMY5eC7xPiBoX%2BlsEPmuCOeOJ4QgrPA2OHnirl2s0yjugnouJ7mv6i32pXCpgcQbC7otF5F818Vc9LxeXgXea3HomqTAF7AH7dTKZP%2B6nDfr7hmSB5PPBvIfE02BqjFWHdHvTjD8K0pfpsc7ckxsBf3U3Xzw&X-Amz-Signature=3564177417bb1d8a72bcac25978d3d5e2f645fff7db63020db406749a0593033&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663M4LZAL4%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCMF0CjWyWlAo%2Fiw7pRiK9n0idBYaYOe6tiFNO%2FSVTGBwIgV06Ld9y40vjE3lZWkVSFyTp5IZt5s6DEBW2xpOgLMN8qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDRvL7UNmIAyri6OlCrcAzjAty2LZ5nIkRc72tk6aVUERnUJMWp1sFuTK3ZKCIQGnbkAV9WL4e9u2Joi1iW4YakJLLqKNm6kQbJoMi9UzyPW2gaKQrQh%2F9FGGuim2BYn1dRILYP%2FsgRCs4A6AY38kAEvPf6KEcBolpf9NJNcfLFs1vgZQ41PTj3jpHHXM5N5epLeUSCT%2FjIYKPc0TaRXnXBSji2JLRD7JWXspcbDNVQEBeI5CcSuodtiG%2F7kH5mtewDqzjPEDnknaZ57mbE0NNTkjSnTbJnX%2FzSh9KvytSHkQ0meK4JyAy%2FPovOsefssLte3fJDpb8X%2BeTUK0DEAWoLWQTlG7V9SoIM4oWqjq1YLHV4sUjviAMKU8ziekF2EfGQHH4HSGA3ccLp2qbrGwztkGe6fYfdKbFa2YiBtforaUjBwslAsuIS%2BJ9FUwBDG9a%2FtdPUwrefFVj5m50EPZRvHa%2Bu9STSqKubcse%2BnSg%2BJVN396vOv%2FrADFlM2Xft58IzjnSIEMExgdFZMpEiVpLaizqMo5kNQjylhVGvoUYQPAm9ujzpfVZ75%2BCyhXfLXx4fX76TmpKRhWZv0XZd%2BNOU6dYcRBWDPDHsMc53nVUwJoyoKOCnfdp9yyVHj6FzL45P%2BIGV1tjqYWfFdMJK4j8sGOqUBJshBwhzDMoBabjKlI16Z4DSmkCXU094jG8sMxcqxXX4mNwWcitP7%2F8hNChiDpt4Yi5oWM6kWfzgRXbE%2FprFFv2rDwUKNNvwg8GKT47XaLG3dtat5lvqwQlAzu1xZ9g5o9kzMuga5nMsjqnNCYVDepaD0IDZqxQiESq6zTzHm2mGIAn%2FM4tkoUu61o7e934FMB%2B8qnI0raA666z8c5%2BlJSC2xmJDh&X-Amz-Signature=29982947f66200275f1412e05df3942f39163c116ac629225c4f95d7800eb4b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663M4LZAL4%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCMF0CjWyWlAo%2Fiw7pRiK9n0idBYaYOe6tiFNO%2FSVTGBwIgV06Ld9y40vjE3lZWkVSFyTp5IZt5s6DEBW2xpOgLMN8qiAQI2v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDRvL7UNmIAyri6OlCrcAzjAty2LZ5nIkRc72tk6aVUERnUJMWp1sFuTK3ZKCIQGnbkAV9WL4e9u2Joi1iW4YakJLLqKNm6kQbJoMi9UzyPW2gaKQrQh%2F9FGGuim2BYn1dRILYP%2FsgRCs4A6AY38kAEvPf6KEcBolpf9NJNcfLFs1vgZQ41PTj3jpHHXM5N5epLeUSCT%2FjIYKPc0TaRXnXBSji2JLRD7JWXspcbDNVQEBeI5CcSuodtiG%2F7kH5mtewDqzjPEDnknaZ57mbE0NNTkjSnTbJnX%2FzSh9KvytSHkQ0meK4JyAy%2FPovOsefssLte3fJDpb8X%2BeTUK0DEAWoLWQTlG7V9SoIM4oWqjq1YLHV4sUjviAMKU8ziekF2EfGQHH4HSGA3ccLp2qbrGwztkGe6fYfdKbFa2YiBtforaUjBwslAsuIS%2BJ9FUwBDG9a%2FtdPUwrefFVj5m50EPZRvHa%2Bu9STSqKubcse%2BnSg%2BJVN396vOv%2FrADFlM2Xft58IzjnSIEMExgdFZMpEiVpLaizqMo5kNQjylhVGvoUYQPAm9ujzpfVZ75%2BCyhXfLXx4fX76TmpKRhWZv0XZd%2BNOU6dYcRBWDPDHsMc53nVUwJoyoKOCnfdp9yyVHj6FzL45P%2BIGV1tjqYWfFdMJK4j8sGOqUBJshBwhzDMoBabjKlI16Z4DSmkCXU094jG8sMxcqxXX4mNwWcitP7%2F8hNChiDpt4Yi5oWM6kWfzgRXbE%2FprFFv2rDwUKNNvwg8GKT47XaLG3dtat5lvqwQlAzu1xZ9g5o9kzMuga5nMsjqnNCYVDepaD0IDZqxQiESq6zTzHm2mGIAn%2FM4tkoUu61o7e934FMB%2B8qnI0raA666z8c5%2BlJSC2xmJDh&X-Amz-Signature=e302e5ce22655ed7b4be101390089ec75258c0b62b8ba2f90341efcca3205bd5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664TI5WLOV%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBEaCXVzLXdlc3QtMiJIMEYCIQDkTI00Cw1AjpPnJpaDVYup7RiPAZrMXTzCksnaYc2%2FAgIhALKELqnj%2BRpjZM%2Bu3%2B4vKMDKLTgI6bAQ42EbMS6TV6r9KogECNr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igzf0FHArhfGU2ebrasq3APbfuM1hY77KODvh4K2umHX8nHqa1pFQ%2BFqUdH%2FK135YpFb6XcENZLUCnbsgm780Hq%2B3tgWJOiu0LEvIQe9XWtN3ONefUoa4uyD0dlvv6GO2%2BGDiuVtvLmQga4Adw3r%2FWotuK9Y5p7cW4hRRiVJ8TNaxWqRlyweoejcTJp28OZ1wgOIAN7a%2FcKglFRQQ77xi6u0oDK0eQ4lzau0n0IKZecsLfuDMKOw19sVGDoh%2BY1guU%2BUhlkj2w4Md4gteWRAlmP%2Fw%2BRg7fbwGYAyV864gH5m9JwjL3iTe38S7z0kZ%2FtPImCCDDOKLY%2FflHyhnu3Tkgssmi0TviWy946Gj3ku7t7AFkN0sEaCFlILtrnc5zepQ2Ml9AkGXd3TmaWyAGj7yyMII16xIAesFEHffrPBOe7UuiWoh%2BKs90ntvwRj%2FPytn6ChqnA2MXCURuHRLqj2bdYso1ANi%2BrSpU0cv8CZR4cyYaXRchYJfHKbLpqOQhbHnqYblY0MtsrJnOxv%2BH5ZuMXvipRiiAdOQSM5Bj5NWFdIyH2V3CfL9J%2BzCJ%2FdpmK3%2BOPGXxebTNwTIPJo6SlFOfjxq1BvHwBPxGx4XMs43Wlgghm4VZJI4amc%2BjwMnJK5hNvxy78cP%2FhQ0vTRyTD8tY%2FLBjqkAQHrhJpVhG1Mgz0UbtZodA004L1mv0SYa2enAx4QECE2zfgBW2BxqmcN4rdAyRb1Y9U6aPnLG8OerqDBLZMw3Ti0s3iJANgkwcC2nIjIjOtb9JcGQXdHzkl4dv64%2Fx%2F8dxd4anZR7C0xRfAl3IIYAxTk7SUfG2oM%2FTkLlLanlWhLSG%2FgrAe%2BY%2FsLBUXkgJD%2BLAmuBcpsD0rsx1JwtctTGVE%2FSMyv&X-Amz-Signature=303be6a53d273a967027956570fd0d0878f6038360d94e762217ea3d4791caaa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH62MYZB%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180108Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQDJ1eB6h4KIS%2BFjOAWHZjbETj8R%2FcQJJtXd0jLBq0HGeAIgWWLifKTwXs5vT7UyK8ZB2FdXy2B3vbY3YNC8xhz%2FeZwqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGUJtDtfllNcXQrpTyrcA70nGlkCB3TRg2gnIcomPytskoHe674mF5H%2BRMJCRw1Qax4pB7CR7F8fa9yU8e7HzTUUA6jS96EB4cmDH5NcIx%2BSWkqXQtlUPpYg86CJB9jmavDSPBlDOOmn2Liy%2B1Kpt9DDvqLqhiG%2Fi%2B9l8xnsfI3DytJQTfhOR8%2FbT8IEC4ATXKXN3LXZ8eLdQIndXOHplX1E%2B7zVvLQpkiqWdmQvfH%2B6nz2FUVW3BQ1vZj79ktRS1VhtQ3qscPWw%2F7smGc%2B0qCKMCTLv2UBkAUpfaKKUtsJczfxeSEVis9SQe3uH4156%2BraQbtioKfuitpl3gvOASdv7woeAGfgFdNUzIUavXB7eSSV64jhV%2BYi1JhN7GB954aSWiNuCgkTuI6OJLeHzo%2FRhVaKqpbaHDZISiOfczOsLVc1G%2BDRtrAZduF%2Fb%2Fa%2Fjmgxgz1T9FXnrJ84bDY%2FjjYMe63kdAtvECeVG1TQmyncJyOFCcFIazQa9KM7Z61yhAHekJw8CmrRMlLLjUOM75aU4Px0oyw8YcNp07aXp71nty9%2Fk4i2OeRxPrNCACpHNZO3Sv3wM13eD%2BpkMxCbZ6eJ4Aw8nSbR0wQNbm%2FHAvW4Ik16CqXcQ19SB8v80StQ2cx%2B9sChsyANTE%2B5cMLHCj8sGOqUBLn92B8Ah51iNzs45PFIXl20sAbrX%2Bsq7fi1QhQdtEoGnAW8RJPF1Gk1eXGPBR9TKZRPzOEnGad4GzNi7Lm6nLVjguD7z7%2B3XpOYUqmsJhhncf%2FkOWm4eECQeaVi%2BBKfpCZm1CQkSaizyAA5l8POnuZACKIVHFQ%2BX1YCYdi2wVwbqYwKZpTFXV15U8CW7QNvwqHyPce81KwB4CvB75AJZRuGXUjbx&X-Amz-Signature=1e96b7067d9fc1219dee61dcb05805d26648f76300c671888385bb75aaac097f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOYJA4EM%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEA4aCXVzLXdlc3QtMiJHMEUCIFeBn9PxL0fNAGgtEtUBTLiinIHztOZ2R3F428BwmJdkAiEAwuzjt3BFpp%2BsLyo7ziKx8BWFZibIVPjuEaCP7w%2FdulMqiAQI1%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHfggFl4PBGEfkM7HyrcAxRoIaJsaxIxTppONQL8DbrCbSpkJJa%2F7C%2FsCy%2FwmExBrPiDZVxqUoxTCB8Qkxibb5aYxyp56TP96flJ0kud1m6mH8Ug5I%2Bi9pKJPHTu%2Bmhln%2F0o%2BYTirHZGXHFb8kjZPDhqd5prSnNOR%2Fjh9uZtHAOGtXVM%2FyQ%2FD%2FRJm%2Fii4pkkwvpe2%2BGZ6F5TMjODVrwRVi7z%2BUrePmOzj%2BII0OOSXqXW9vGldYaMIhZ90IKdiww8g5daAA9q%2FMRISX2%2FnFuVenNKdy0XeeP2wK5xqMthTgicMjQgqU325t6GKSqJUeL8c%2FJIzx0toQTCgW5GGOfL%2FVah4FLcB272uEdZImP9gY%2BnLiVQou6poMIZfDu4xbYGd%2F8j%2BYBb2ZI1Sd5gdFy3rXktzN3lhXk%2FpKqaz%2FjPjZX9jYFzEjMjgyX7ExeIda5A4rwhCi3foHWoQv0h9UOppTtaAQCZhVx6yEpCkzLnD6x9K2%2Fwu1DsECkIljdMZv%2BQhTWbZVKqqbO9kq8KIxa8t0SWBPg6uNE174oojZqM9vxzCxKZj8hItXpUDRKxcEQyXdDuNeDfgFU%2B5bVZtom3bY%2F2enJjL1dh0oW9dWsVPiRgL74TyMNZnU%2BSgVOmVVaBt67rvWO8Kw9H%2FR3cMPvhjssGOqUBlrTSYafV8I5YBSKMiqGneH3i%2Byc1O5R2T0Ixp7Ha5dohyjtZtovwghqW1UOfYWnOvPNcUJ61AkYUALlBx%2FwiqTiQCn%2BTyd6rgzrrRVUDvU2lcOqYULES1cNqOhcwbfKxXlrMJZ0kHH%2FShDI4sALZNvp0EO6URK3KEZkVnk7lluNiWqiHBFpzVvM2BL8TbtUhqGGK6EEO%2Fi1izSjcIj9QnQ7XnQ1m&X-Amz-Signature=26093e48da4ddd93f7a5d3507f38516a4c4dd39e2dc21d1263a52ad6ea480b5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXLIINRO%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIE5RdTbil%2Fv9xz4SKneJDX8syLKeaNLlf2lfMhSBXdcDAiEAhyX6aXiQ4UAdwUkpIF1NGga0Mvdo7Y6iQ0EPJdnSRh8qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ2XAT%2Fn4hTenup6LircA5rJ6lIROCr1GYP0G59mxJ2mMFkmzKOpOQ0tEhEKQCyMNtsGYZ3DxoH2cQSa9JOPk4WhHp7yuoU4Hcp22lYFNF8nI08LRSk8je%2F6Ck2Uw97UrA4SEorExFnBk7fsz5oR1kaANJ3GoYEu%2B6C6JijGc2w3mjCWasKy%2B5a06Vm9VXf%2FEAgVSV31d1HmeGqsAykNGc2W6EhoCrZ6NReThG7tpZjgG2wf511cyfo%2B9BzbyO38Z107iGXgrACw4s17f323HJ%2FGOGi8N03J7yzaHwmGaOvqPebL0QFhgULVraEtMD0xIQYOW7YvCCV7GhXBxgb2x1VoS%2F%2BDL7AEuC88W1MxL725315lUKcK9Rx4pUoWVWFihmzjsAMCtfdqs0TyEGjw8mCf9gDxJSLxSOMujIrh3q6qhCAFhdkLDYHDTNTB8Vk4zNNvSZRmDK8lo3xGUnppgsTwoPO40i5R%2FeFY6IItG5ZHjDEdVUcrBLiMkCluSm9D12p93RqH4LYKNqze4PRGgzebtGpqz5RMOEaULQ2CzysMAqnTuQGv0TNh7FMhMdmYbySMhOnmu8gagdb%2B5q6Z1j9HeGX8L4W0BC2F2Q8sMtG%2BEiPCYGkz6VCcPw734DX0RoajCL4aXPEmiyMNMP%2FCj8sGOqUB%2BgrUJwD55e%2B3kz9SvAjczmcM34jf3SY6kW9TVOC1eAiRM1%2B4%2BXComZc2H29cVxtSWyjyf%2Bx%2F5ggxCPQA2nt0dohmPWL6pmdFTsqOoR78%2FtoQyrL6BbzK4e1Bdxhkcz1zAdDbJnS1fMMLcc%2Bd%2F9bIVKdClvhDVY2v1lRBFuEx4rA66cX4QWNn3TgLCORRrzKCePh3C6klUuazrt7jDTbkSO%2BFBypJ&X-Amz-Signature=ce2e0aa1f262acd5a37cd1afdc2361dc9785f6fbf835a7a68065b716b704b219&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXLIINRO%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180115Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIE5RdTbil%2Fv9xz4SKneJDX8syLKeaNLlf2lfMhSBXdcDAiEAhyX6aXiQ4UAdwUkpIF1NGga0Mvdo7Y6iQ0EPJdnSRh8qiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ2XAT%2Fn4hTenup6LircA5rJ6lIROCr1GYP0G59mxJ2mMFkmzKOpOQ0tEhEKQCyMNtsGYZ3DxoH2cQSa9JOPk4WhHp7yuoU4Hcp22lYFNF8nI08LRSk8je%2F6Ck2Uw97UrA4SEorExFnBk7fsz5oR1kaANJ3GoYEu%2B6C6JijGc2w3mjCWasKy%2B5a06Vm9VXf%2FEAgVSV31d1HmeGqsAykNGc2W6EhoCrZ6NReThG7tpZjgG2wf511cyfo%2B9BzbyO38Z107iGXgrACw4s17f323HJ%2FGOGi8N03J7yzaHwmGaOvqPebL0QFhgULVraEtMD0xIQYOW7YvCCV7GhXBxgb2x1VoS%2F%2BDL7AEuC88W1MxL725315lUKcK9Rx4pUoWVWFihmzjsAMCtfdqs0TyEGjw8mCf9gDxJSLxSOMujIrh3q6qhCAFhdkLDYHDTNTB8Vk4zNNvSZRmDK8lo3xGUnppgsTwoPO40i5R%2FeFY6IItG5ZHjDEdVUcrBLiMkCluSm9D12p93RqH4LYKNqze4PRGgzebtGpqz5RMOEaULQ2CzysMAqnTuQGv0TNh7FMhMdmYbySMhOnmu8gagdb%2B5q6Z1j9HeGX8L4W0BC2F2Q8sMtG%2BEiPCYGkz6VCcPw734DX0RoajCL4aXPEmiyMNMP%2FCj8sGOqUB%2BgrUJwD55e%2B3kz9SvAjczmcM34jf3SY6kW9TVOC1eAiRM1%2B4%2BXComZc2H29cVxtSWyjyf%2Bx%2F5ggxCPQA2nt0dohmPWL6pmdFTsqOoR78%2FtoQyrL6BbzK4e1Bdxhkcz1zAdDbJnS1fMMLcc%2Bd%2F9bIVKdClvhDVY2v1lRBFuEx4rA66cX4QWNn3TgLCORRrzKCePh3C6klUuazrt7jDTbkSO%2BFBypJ&X-Amz-Signature=2f39b698773fc5d6c69ca843e812c3bf4a47c7c43eaa52c3a8c15ff001ba7463&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EHDJ3XV%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJGMEQCIAwBbjphgCxskWQI53EJn4adV9AnIN%2FBILMw1bssxIsWAiAK6djRZskyOT%2FB%2B4544eNjAIJ2rhU098x7ceoV6xhVhyqIBAjb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMurO5th6CEmHrwGEHKtwDq4FAfZw8t5%2B34DJ05cVEpfyGlrdE2JLU93T7GFOGgJsb%2FiwLiZ8tlHIU6l%2FEPBQO8PPjsBiuubtKtHVHDyuTZa5kubd0gomAOpGqERq1n%2FrdtPJ0nO74mYGd4sP8sGxP3g7tx0LQaDw0ix1%2Faw7K%2FuWo1c4KYg%2Bl9gAL%2F7n7I2LdFYE2Hz9z03%2Bm2spZB6%2B%2FrpIKj0CdiunhFg%2FiHB32mHO%2Bb27SUhCGz5u1P5XKZxoWQh%2BgoeYzBs%2FvRsS9K1NYho6ahg3cPEoXM%2FA%2BnSriKXGe850Z2aIQs18TPnaWGTKaoUtVtj6p8jUizemuoL3p%2F3ALfGNcrraw%2FJ2fFmS1lYU2H6hDERFkwb%2BdoWWCzm8bxzkJ9thB1d3p7H%2FwCUBVM3KNkmn6GFxYech521oWXPFUxhGKc9awr%2Fx9n22MKx56x1sp%2B%2B6UocNjDmMxMuBH06dfzPEwh7hhd0ry8Zgp6%2FjOMYbBtTwPzDytWR4wlNTyA4Li7EVYyZdJ4FFPURbu3%2BYjLhLv6UNOJQ3MbKP9ebuBzcbUlO34i9if872aP43giT41RHOUaMXI95B5iaphpA4la9BMAwX5hYyBmEZlsCoxpa7Oo3NTFgevnXPQdrFfsL26ZEoaCjSv43Uw1rqPywY6pgFWlrQ7ds0ZCPEkvbUcQpJ%2Ba6QxqrMgldGCXGE8aBaeUKg4%2FC%2F0%2FQJrd4fU1d5rKB757%2Bt73EnneyXpQYLWMQRbHuJRWrNeHqMokInPIYhDfucE7rtCCVUxH567sUAcy1nlZEqsnRDMfww7uTU87UeJ%2BYuj9aWTymcV8GQajK2v%2B79VAjcdHoQel8IeBMtEa04PODPW7Dt%2BG6iuq%2FcTOnk1RsIRoNa8&X-Amz-Signature=ab1f287c8e3379d3f7a5cf7df122d9a5f24d2b37908cc8b2989bb3e669abea2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJRZTQ5B%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCbybRLBMzfGFXNLdstEZBrL7G%2BTjvkmPIdPMd3sU%2B9BQIgCk9umF%2FS60eJLFQF2UFnFkx4x%2BgDQTM5Y%2FyO%2F2N3jpQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3Ibd45nV%2F4SFP5PyrcA4XTIHjt5RT8uI9VeklqFPDI%2FIx7a%2BM3lRkFudr4IkT77GxS6JqFFooUig2yj3TcgBX2MwhcktPiAAaga%2FGTwfnFsmEFi8eLsXrXjT0FdbFUWRLuLHB5kwoJ3swfY9l44zc4Zg8DMwaGbFO3KdukEuX0zmb9pBR0koAgD9Ayf3xc4GkPIArC6v3OgKnpJy%2FhEjSu8NVZ4xxoHddr4rCPo%2FKcmGhu%2FDvioh0nHKdr8i1RKvgF%2B8o2D9QrUpGBC0aI%2FvLN6LEwILJJ6sRRDRXzi%2BZUDo4a0v7VGBo6mh%2BGgnDRQ4odjB2scs03lmXpk2b1oX6mUWtDpmdvFEhNPoEooH4C%2Fm3xiESav%2F7CV%2FBYe0UvXlRWaDiXJkhFmBYbf3lprJ2h3t7P5xewC9%2FWxyPNeee3S%2BLJdmMknpbIE%2FxEn%2BGbK8dTJ6TgknA6Z%2BFvSSstwrF%2BRsw0YmesHcJ4ZTS%2FTeXX6YEKjou8pd%2BqOAn4twK47CXOjcqtcEZVcMkG2YadAwR74XRpXkct1vdsNXvhTDLFB3nss7KpFCFcOecwbpO3jr3X8iKeRtwxk437SV4q7ORrijSQggwaMuqeg8iQbIn5VOKXS8NssJMOlq0Sn32NLjlhA4nSiNH2t6RGMJq7j8sGOqUBbKiGaPNTfC32SPi9iuVL6KnTPUB2Kz3in87FLZfI8MoxX8LZPFtgQx9xN5ahpdJdm4UAEqbfmosG6vVN7mcvWM8u8cBH1vjru%2B73NjiwWVgn9kOs6%2FbrwL%2BfPZDdjivWG5uHF4U4%2BmtPbF3ChlQvML9CyOvU1Of8BDf5Ilp%2BymZG2A9PKJsVdpCbX7XLVal3Y9TYjZT4CBu8KKcUx9MwI362UFRr&X-Amz-Signature=3a46fb4380862477fc37b7c81d6b65c4b239e335af295d68ce21ebf2d8d1f092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJRZTQ5B%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCbybRLBMzfGFXNLdstEZBrL7G%2BTjvkmPIdPMd3sU%2B9BQIgCk9umF%2FS60eJLFQF2UFnFkx4x%2BgDQTM5Y%2FyO%2F2N3jpQqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF3Ibd45nV%2F4SFP5PyrcA4XTIHjt5RT8uI9VeklqFPDI%2FIx7a%2BM3lRkFudr4IkT77GxS6JqFFooUig2yj3TcgBX2MwhcktPiAAaga%2FGTwfnFsmEFi8eLsXrXjT0FdbFUWRLuLHB5kwoJ3swfY9l44zc4Zg8DMwaGbFO3KdukEuX0zmb9pBR0koAgD9Ayf3xc4GkPIArC6v3OgKnpJy%2FhEjSu8NVZ4xxoHddr4rCPo%2FKcmGhu%2FDvioh0nHKdr8i1RKvgF%2B8o2D9QrUpGBC0aI%2FvLN6LEwILJJ6sRRDRXzi%2BZUDo4a0v7VGBo6mh%2BGgnDRQ4odjB2scs03lmXpk2b1oX6mUWtDpmdvFEhNPoEooH4C%2Fm3xiESav%2F7CV%2FBYe0UvXlRWaDiXJkhFmBYbf3lprJ2h3t7P5xewC9%2FWxyPNeee3S%2BLJdmMknpbIE%2FxEn%2BGbK8dTJ6TgknA6Z%2BFvSSstwrF%2BRsw0YmesHcJ4ZTS%2FTeXX6YEKjou8pd%2BqOAn4twK47CXOjcqtcEZVcMkG2YadAwR74XRpXkct1vdsNXvhTDLFB3nss7KpFCFcOecwbpO3jr3X8iKeRtwxk437SV4q7ORrijSQggwaMuqeg8iQbIn5VOKXS8NssJMOlq0Sn32NLjlhA4nSiNH2t6RGMJq7j8sGOqUBbKiGaPNTfC32SPi9iuVL6KnTPUB2Kz3in87FLZfI8MoxX8LZPFtgQx9xN5ahpdJdm4UAEqbfmosG6vVN7mcvWM8u8cBH1vjru%2B73NjiwWVgn9kOs6%2FbrwL%2BfPZDdjivWG5uHF4U4%2BmtPbF3ChlQvML9CyOvU1Of8BDf5Ilp%2BymZG2A9PKJsVdpCbX7XLVal3Y9TYjZT4CBu8KKcUx9MwI362UFRr&X-Amz-Signature=3a46fb4380862477fc37b7c81d6b65c4b239e335af295d68ce21ebf2d8d1f092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667XJOSG5N%2F20260111%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260111T180117Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBIaCXVzLXdlc3QtMiJHMEUCIQCbfdlS%2FEenX0bO6vWOyFNsiirN1hnyYfQoq6dbXfFDAgIgJqeOZrPUQNni2gfyJIdGigSqP9CUxLqP5Z5Lkyog8YYqiAQI2%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGnzE80loluZ67UAdircA2ItbqH8Ync%2BbsJpBZjfRKMt9MxJ0LkDGwNkvAWD7wMFxRJNUDBn3WdNbVgdwsdsGcYV98fU7M33bNU9WeRRyD61Z1ENKwH%2FSGJnzjeNLaMFZPXNsyf0yX9OyYKr94ycTV0vvHa5lSynosdfwfd6wbzgck5%2Fyx5Y4FrGH3ZiI6s2aeNAVc2wiNoEyrZOiQIJ%2BkcOhX6bTsYOtV%2FWz3a%2FZGFknL2xPTMBHqFNTzDOQuPbtKLdCpN7nd9qy0xuNVSNv48VUNgoEphE3tClgcNy3nSYkH6c%2BD64Uq5QvT0J4aUlONxoK9XMHOmhcmI7%2BJrUO8J259zkHjUfGjKtIutS6sRFn3x0u5fdjphD3V73cdDOSGuRtzbyG34oW3GU837XqMVeqeQQWjgfOuWKLOxm8%2Ba5DOnvncY6dKOfAfCPS8ZATbpsLQotTpbzROo%2FvKZ3pc0WKyhtl0JGLmyg8Jx%2FR4vWQYI3rkGkNF9qvIeQ0lifdn5Sh0Khp0VFVxrnifoHlp8Il8d9tAqDdKPQnQOkbNEcKy3aUfCiH4Z6ZoO23T%2FFhrGn6t8zQl4Oyv6TmikP9vux0EUZ3L21QoyZi5BhutC%2BG%2BPTJz7BJ3QZsAAHePl25jwe%2BEs1R8jTX3rJMPrBj8sGOqUBzrZNTuqWtfM8aAinB1QU%2B%2BX6NS1TAwmwvW4PRbypM%2B%2FudeSrPuK6Vn1XM6HribWjO%2Ftsdk2AYsx7HIGUIhNywJZQ32e1PPrxD6OHaqc%2BUEXRhMY6ANckogtWq9pWQoIvoQce1ATfPOSKz%2B329IrW8McX6fgo8YlK5RqGIGcQBzjTcoDsuWLUGy9yEeaLkOVAS7OqdRIPrmT74xXJ7SY5jY2wXAEn&X-Amz-Signature=8244f2747c720aaf88b12c9a679e1fad9994584e763c03129e566ce76405ece4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

