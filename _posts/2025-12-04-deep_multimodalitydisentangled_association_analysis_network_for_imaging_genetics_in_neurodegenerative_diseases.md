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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBLZ7KSG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDPF8dilQJ%2BfXBhMQvfjc2NkHl5vGngYKBR4FTQdZbzJAiEAy%2FvqNRG%2BqAn7yWI9c%2BQMcZFPx03java1lOHBPsoiFnwqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAivZPx2yOjO6EBn7SrcAyaDf3EtinGKm51BaF7Uw%2BZYMjK%2BOiMTTfNvq93easekiKfDhDgqba%2FKK5WljevMBbtmy7%2B7NNQdqcq4nm5VifiLuFF1lqRMxsYEXX8BaAeaSiB05iW3VPRDXdQvJE17PpcHnQynGNrSYIl5HVz0z%2BhJKRws808NEA1RS57BIyMt%2F18d%2Bzkuuu%2BS4WuShb6N9%2Fz1Ut0%2BV9usqrrX9dq2iuY1e5aW1Aqzlj5wOskHpswDUj0GDVnoMhjOM6%2BRgmAYt0VlTjnTW49OFwxlTub8GkcSH8WnjPxfBk8SJERRgR3YI6XUzOWm3y5A6kHbTKPn0SOo%2B1eQv8jKiAfeCZlSH0eY57hGfPPx7jlqXBQOYt5S%2FzCbb%2FjNaEzHU71vZmzvvyHcED9M%2Fy2DtyCBZgzRZkt48iZjXhCSdDq9BB4ABmWnZIgW0nGGMs2f94%2FEVKa9RQynwqUeGKJOLE1uVzawtgFU6y%2Fh6gGE529kKP1T2EzzbOx2ju5LVlA9uD7L2Ohgn1VQTsJqa1b6ZM5yGCuVgJo%2FxwT2Fvy%2Fi8SN%2Fwi5BgmmT%2FNsAdUmWUiiI71ho69xCIysDOelYH%2FPxmD89DfDIK6xiNfBreA3NmLjUByva5HZAu2wRKk1s3aSL45kML2RwM4GOqUBDPhGKp5WITlOOfjD1Fhe2PK%2FhEplZrm7D41vSNIpMBfn1CWOGL20I3hKMRXpnfA2BOXZnJ0bJ0%2FTqChaDbtCvbieWPc5rxBskVNpz1vywh2Rr1HT8XapkdIapxz1fALGlgzV1Q3dfhhzXXag4zSL9E1GpbwDuHzcijVSykwO69AOorB7KKyBXe%2Fs%2BAaVXKxxIddm%2BecJNI9GaahTG%2FxIR9Ix0%2F3m&X-Amz-Signature=199f8f46102c221d738d7d7d6f0e1559e66bb5e14119bb9c3f3da92912060148&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBLZ7KSG%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDPF8dilQJ%2BfXBhMQvfjc2NkHl5vGngYKBR4FTQdZbzJAiEAy%2FvqNRG%2BqAn7yWI9c%2BQMcZFPx03java1lOHBPsoiFnwqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAivZPx2yOjO6EBn7SrcAyaDf3EtinGKm51BaF7Uw%2BZYMjK%2BOiMTTfNvq93easekiKfDhDgqba%2FKK5WljevMBbtmy7%2B7NNQdqcq4nm5VifiLuFF1lqRMxsYEXX8BaAeaSiB05iW3VPRDXdQvJE17PpcHnQynGNrSYIl5HVz0z%2BhJKRws808NEA1RS57BIyMt%2F18d%2Bzkuuu%2BS4WuShb6N9%2Fz1Ut0%2BV9usqrrX9dq2iuY1e5aW1Aqzlj5wOskHpswDUj0GDVnoMhjOM6%2BRgmAYt0VlTjnTW49OFwxlTub8GkcSH8WnjPxfBk8SJERRgR3YI6XUzOWm3y5A6kHbTKPn0SOo%2B1eQv8jKiAfeCZlSH0eY57hGfPPx7jlqXBQOYt5S%2FzCbb%2FjNaEzHU71vZmzvvyHcED9M%2Fy2DtyCBZgzRZkt48iZjXhCSdDq9BB4ABmWnZIgW0nGGMs2f94%2FEVKa9RQynwqUeGKJOLE1uVzawtgFU6y%2Fh6gGE529kKP1T2EzzbOx2ju5LVlA9uD7L2Ohgn1VQTsJqa1b6ZM5yGCuVgJo%2FxwT2Fvy%2Fi8SN%2Fwi5BgmmT%2FNsAdUmWUiiI71ho69xCIysDOelYH%2FPxmD89DfDIK6xiNfBreA3NmLjUByva5HZAu2wRKk1s3aSL45kML2RwM4GOqUBDPhGKp5WITlOOfjD1Fhe2PK%2FhEplZrm7D41vSNIpMBfn1CWOGL20I3hKMRXpnfA2BOXZnJ0bJ0%2FTqChaDbtCvbieWPc5rxBskVNpz1vywh2Rr1HT8XapkdIapxz1fALGlgzV1Q3dfhhzXXag4zSL9E1GpbwDuHzcijVSykwO69AOorB7KKyBXe%2Fs%2BAaVXKxxIddm%2BecJNI9GaahTG%2FxIR9Ix0%2F3m&X-Amz-Signature=199f8f46102c221d738d7d7d6f0e1559e66bb5e14119bb9c3f3da92912060148&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662J3IJGAE%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221832Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC7u1wq%2B6UoAbuw%2B3dFLYnONuwa6sg9f96D7xtzN0ZStwIgXWIqJyCxbI%2BCIezz7CsiXzjFACtaLTaRaA0%2FLx2Tj50qiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDN0D%2BbkzokhMxi2SdSrcAwn8kW%2FHHaANv1kzHXKjmUEPZd0osApn2mm4wub782N%2FQVfHmvoIex14GclZOCz0blqzN0fK0IGW8RnizvM4f4M60p%2Bqh%2BvIV29Ew%2F68apeCdHGYXiabUwDugQpmi%2F9FUsiE1TZ8CbDuwCvAG10QLZPe1oxigmnLbna30mshOP%2BftyPBbCQ4IeeZcyAhau%2BE8vNgaqMj6sP4N6gydzIqkjuzOrplJute0OrlRJ4pQhs%2F3zx2M3FAL61dyW4a6u2Z5O67LJ%2BmdRcYqsJF1O4Qu8bt0%2B5LqLs1KvqI0gWIR7tCWf7orezowOD1mpC6Uv9RmICEu%2F35voAkOy4orkco1LLgIkl3zFvfQYnKeet4oQ88SSxK8dR9lOdDMK02sYPALTk2N9kInCN3jXLMQTfBUd%2B%2FzNLk%2FKoocfjeQQS%2BxCtb%2FhF8SohsY8QberQvs8pRIKj%2B%2FbGiV84qL7dxhMab5xK0%2BZRS8agY9ALHHaUWZWQ2ibNy2AoXBwpb9e75gCGBJ1RBPADvmZtkxIiNULuK%2FnVC1%2BRVvqpDdRaYmZA7g%2BMuPezL9e2bLZYs%2FDfGxYE3NGhzjIBm2315rBImXsox34EsAtwIVDH5Jpf6lmCIHzVtrFA6oqNbRSLdwxxRMNGQwM4GOqUBbW%2BDQiWAb0QqgFMm9S68WZeFYTA3txThFJpyIqNeSKD2WGH5vehr2KDFN%2BY0cYe%2FJUrBDeLZuQm4IZ4BuH2QplI7Tvm4HdgWuL%2Fgvsj2vDPmKGRoMscSOGub2iSJAiFIHSi7q9XiwftZRyzW2GJ%2FFvGJemYfmK8f4KClcDHHEmCrfHARZzQVJ%2B%2FZq7E%2BbqaSeTaVhS8Sln5WN2Pb55NvY23xtIL4&X-Amz-Signature=a5a140bc3c28da323d2123c60c4d081299a74813b989001b2f2f46a49dfbbeff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TT4ZJXMJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAeE9hCN4zvMJE4goiswpvwyXvP65NBpPysqQz8WAmu2AiAyC9aluiERlCkgNCx0GMpu%2FE3VPPwr0bikHx7hIpKQ4CqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMizFjuQIcsGpyZnnWKtwDHN0tPo%2Fj%2FnStN6hy%2Bk67OChSh8JNRCtRG5k%2B4SZw3RrmatGaUUFqZeYekexexlz%2FpohNaLXsFTNcDj096%2BUSv2DCSZajMilrMrhXEh3LVlSI9kIaY7aSS2T%2FqKjG5xWxR71m8sHTzgAnJgfQvDR3EJT1lCwUtcD7wdXhWeXOvtZ3oOy4bzX%2FlEIi1mSkfALfSXbQBO%2FILTdwFJtVXV0IBWWMXCgkp9AgEnwbe8%2B7cYOl%2FfQ%2BTQz1jyLOIaBnF1a9Dc4YTrsn1IkCL6IlSAkFNn%2FeVPhx9MqREEQn%2FXmaDtIhXDlOSADKqgnrSuTDPl8CWhDKc%2FesqphN%2F4Iscq72fp%2B7L6pHPW0QCE%2BFNZgjOc%2BXR7sLE3CTlwqZVsFhUgrOcPLBo0XZOUzyDD330a7xdS%2FnJQq44LJ38ck2N2FjiWCbruotpB9fp7SqwmL8lWnQBEPEs5Q3P%2F%2B0N2zDqEOugpXtvMG2YRm2rkWCxjONzMyUwe%2BxAtauKF70oWBmv9g4sEx3yBMxc1Fc8Yt9X3eM8cxdBVmwixTrtNspgVw21qnCg3zXHGC9yhXqkJS%2FC7a8IN0qeOBfTnVbYMqIn5Xg87%2FfbzShsELxOs%2BxS847wCU9mMRqSdD0FvLq1JgwhZLAzgY6pgE1w25tV4fPYVmMDS4lRCFPkL6dRp8xAFDDdAnDAtcU3y%2BjlJHPQ6NzQIfNoXu8lG%2BysD4r0im8wcmD6wFqOCw9T0G3WCVlTGzwlqCoV23GIeaAk0YOrAnPOsIU%2BvGCDRZb7UjEZhIb3jSWsboK4QaXp4kUsrmQ3mMTpLYn1ekfV8VfS8rvwtyhzEOUtvirUCs76DvfvxFE7Y5yMkbGU2bokPy4UG%2BI&X-Amz-Signature=b68a57e369f74806eb1896e6a9e7fdc2a7a5b381c0e4c26a4c8c4258ab8093cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TT4ZJXMJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221835Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAeE9hCN4zvMJE4goiswpvwyXvP65NBpPysqQz8WAmu2AiAyC9aluiERlCkgNCx0GMpu%2FE3VPPwr0bikHx7hIpKQ4CqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMizFjuQIcsGpyZnnWKtwDHN0tPo%2Fj%2FnStN6hy%2Bk67OChSh8JNRCtRG5k%2B4SZw3RrmatGaUUFqZeYekexexlz%2FpohNaLXsFTNcDj096%2BUSv2DCSZajMilrMrhXEh3LVlSI9kIaY7aSS2T%2FqKjG5xWxR71m8sHTzgAnJgfQvDR3EJT1lCwUtcD7wdXhWeXOvtZ3oOy4bzX%2FlEIi1mSkfALfSXbQBO%2FILTdwFJtVXV0IBWWMXCgkp9AgEnwbe8%2B7cYOl%2FfQ%2BTQz1jyLOIaBnF1a9Dc4YTrsn1IkCL6IlSAkFNn%2FeVPhx9MqREEQn%2FXmaDtIhXDlOSADKqgnrSuTDPl8CWhDKc%2FesqphN%2F4Iscq72fp%2B7L6pHPW0QCE%2BFNZgjOc%2BXR7sLE3CTlwqZVsFhUgrOcPLBo0XZOUzyDD330a7xdS%2FnJQq44LJ38ck2N2FjiWCbruotpB9fp7SqwmL8lWnQBEPEs5Q3P%2F%2B0N2zDqEOugpXtvMG2YRm2rkWCxjONzMyUwe%2BxAtauKF70oWBmv9g4sEx3yBMxc1Fc8Yt9X3eM8cxdBVmwixTrtNspgVw21qnCg3zXHGC9yhXqkJS%2FC7a8IN0qeOBfTnVbYMqIn5Xg87%2FfbzShsELxOs%2BxS847wCU9mMRqSdD0FvLq1JgwhZLAzgY6pgE1w25tV4fPYVmMDS4lRCFPkL6dRp8xAFDDdAnDAtcU3y%2BjlJHPQ6NzQIfNoXu8lG%2BysD4r0im8wcmD6wFqOCw9T0G3WCVlTGzwlqCoV23GIeaAk0YOrAnPOsIU%2BvGCDRZb7UjEZhIb3jSWsboK4QaXp4kUsrmQ3mMTpLYn1ekfV8VfS8rvwtyhzEOUtvirUCs76DvfvxFE7Y5yMkbGU2bokPy4UG%2BI&X-Amz-Signature=4deaa414d3e956682e7711978fb7caff497bbf4e347e440168edbfbdf9e95eef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TISZS6IO%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGQOm99oG8ouZtKE6j40DTQlBsnzDmTnScaAHfaDWJYuAiAZsHsNVsoCk%2B%2FYjIlRvokGKqAMzqKMm1NsywZJO1pHpyqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMg899%2FOxiV6Oqx4oEKtwDQLv2rh%2BXC6z5CGwkGMN8DObSJNcoIj%2BgX3YfnsAov3pCJQV8Maniz53Zhp1iZqSGbdsreRqoU92ja1ytk%2FUhst9MhEwl1eswsARm9neFo95MYdnQkdLJvmElisembbMg2Zm9f65zHAcNSgLAgVA%2FDPmMjSaGBe%2Fjnwi%2FIAeEMOfX73HjJ%2BcIvR9NgeQu46UbZwVqP5b2DgndSStFEBfQOh%2FmdXwrTj2Xx7vraUX7NI1dSnTCyn9oSsCY7NyHY9f%2BvQ%2F47eV87w3Q7SiIevpQsMS7ygu5EbZx%2BDbJGz1mkk4kFkc%2BHjhAyffdEWJxVHzPpsczrNPH3nmpRNGMNzzDf8NpWSCh5znbzkKoIbkQw0A%2B3ZdDHw8G26kVQcgg1s3Al%2FobS4QYcs9%2Fswh5kxa6xd7wadYcGjJikK2Hak%2BGkNM7kv%2BLhPZIe7nqysMsfmP7Rt82wyqzUM%2FN%2Bd%2BUA4NQvGs%2BwtskqwsLLG17v5BXaGX4xdRJvgWPhi%2FMonTs8P1BdW72cPGk3KPEtmtzNvKj4%2B%2BbVNPunWjW1VCLr1Phy0f8Nfc5E4F0GxSVgwuf9AA4%2BjgkP5wdMr6S0FiDJIlVaFTvpqbeoUNtpECd%2FPnRPh%2BL5cbcHcoejkWsPJcw75HAzgY6pgHqrgjCe460RPsBx0lkF%2Bo4vpbsv1MjdkQPZTOWs38BA47qKE0zlBJ5jXfpK41CPYhuDmrfCxlJ7I8Xzuwwde3%2FtwW9j9fRqb%2BLvft4nywJ740PGf0oHRFaGR7oQkB1DWHeX2j9f95ez6uDVeUz08TEoTgyWQIju0zdQw9lQr%2BKsNRkzf2TXJBLPo2J6WyiqboYWGetwEBbBOOxKfcs%2BDl9%2FRoRC3rc&X-Amz-Signature=ca9f2daa18aefb37b48d710fa4a07c541347f1944a9fb54c660ba4788fd18d63&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URHLZY22%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221837Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCwPPyKnmNaUEpspbF9j%2BLeQ87G66ciMzRjNKkdoL3BvQIgCFiEMbGFKH0mawV918qnVOUi7p5ZTVADG3gmvgbehv8qiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNTLf0UnWelrAyAc%2BSrcA5NzJYsgMdgECmHPVpPLl0z7ip%2FD2zuf62IofhQzeB43HXPNdr6t40M5kEq32mzMud1lbBPYQ6FW5tEbHP%2BBPmwAz%2ByoKNl38UoJ8V3O29NH2m59HHhuD9ibjwL9Gm1JucSIwGDjF5aUoat%2FTtMIKNfo4SWgzYX67DCgd1LdUWrP4r%2Bt3W15WAiyBXTGQivjtAkuXhIaWoW6hxrf7b%2FEqJEhKhuJYKC3baQ9VDospflDSS4tVaZA1I1kgj6HuDhWGfuvRgVHnykxKCqlLR2MrWtUAHemGofquRkEFqkhfEvG1jLg5LwWiJkHdhsanTdBN7o2vYiXZDk%2BmOhTe0H0NNNjesp2vx3az1nqLzgrDQXIY6khyHbXcF1wy%2FtxEIbZPMJNOUw7vaw7%2BeFvHlP14wgntqYhZHO6X2HsgGi6CxQqTNqTI%2FLrA0Db7o05bJGVMopn3lvwpVdgccVEU6YzMvcCbd%2BT4OCl2YcJfYj3MZs3VXbMiYfmOS3F6RjGvi%2FjpnzEbhcIPrqHnP9m5Ve7OqzDtKozvZhb1R7nod9xyC2xL13dr1q8yRvQqQTAJuqXQE0qZpYdXiQmhdMa4oXOKwzsEFIztMXhIzYtp2gb3sJH%2BfAvSWzpSIYdgOeJMNuTwM4GOqUB1ZTbtLVbjc1rWNPPHPpHPTOeDOkz1InXYahnlj90xqWliS6CrJofuILBI6z278Ytw3Np27G0QuB5t%2FA1hxfPsa4vURHk9Ejo2rqRB31GU4OFsTOer6YCjrhfRouR%2Fz9mTkuyRgw%2B2BfedSy3mCvXvevCfnGx%2FXmujBnlfi%2Buns96XoZ7XBcEyYpfVX9cSE%2B%2BFYhA%2Fz6L0A29uJowx8cJ%2BperGK8%2F&X-Amz-Signature=9c74b0a0eae0f943df07987c96aa8de58bdc3108b1af845aa57600df7d9efab5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NMJZANB%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGBhhdkxZnL0gKTxmbEIz3%2BrDUM%2Fi7c2N2CBOVcR2KYHAiBBFohKegtk5p4OB1KqTE3qsx6X6TMZInXlJGtfs%2BK3IyqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FuDtebmX7QXz0M7hKtwDIYonL4CM%2FcX1I6ByVUunyIYqh1raSHTO0wRGiTFGp9hSR8fxJtfLaaG2H2gMh3wzwW0MoSNNknr6iEPODDIFhJ0i6h17VfoX%2BMomDIvppa8iCH1NC7nrLhaIjua2eufWC4wrBul%2FdTtZ2xLZkyr1IjLX9fqoy4642UUXXr1tVkXInMUn4zV7pHcpaFCTmN%2F0OCaYWJeB4FqubYL5lCLnu2aP9JV55tfc5G%2FJqcE7p%2FQffJL6WBszeWUBEP1JED45DCU8QilVGlUdRyI4d1CQm6lj1nzMeWw64nZHttOdht4mpYIHuXP0V9HmAXRmhmIQBF7Ni1qCT27PJakWfjuArJkWOrSdrSPDF9c%2FxUrKBodSR9FblLX2ucXOS7OlfAEnMY4PbmzOf4algv2KtLeMxBT20bF04FSvqrETRX%2B2WpCsbX9KxvQH04LVdr8bSKe4s2d4%2FDEMw8yZZ%2FnoOruuMh4QKwEzhHyESVXrUOzFHjzr4UMN9U80WCJu2wrY1bz7myv01cqkvC40%2BWfORLGWwPpTYB9%2BoLYZy0o7VD2WQ6dMb0M%2B%2ByiHC0alZZEqW5WDxvJjiEGtOg5JoEt4ZKIoOhHn4j5pJSYNjg8RQL7bXphJA%2B%2FPrbTf62n06XMwq5LAzgY6pgEPId%2FouNz37dfkEH%2Bi4oGuE8BI4HbSIc3qK6hM5GfU1kQr2L%2F9Q7bpwjEQ4tG85LJdjPwS9uVS62E9vmAKGkieNTMbsg5AIsZtNweFa27PZYIDGIITf%2FZ7I%2FGKR00KQpN80PakG03fmkG8YHH8kNwP%2F1zoBkXTvgKhtRAamEaqf6O3n3F3AivWY2aC6ZD9NDSOphjyZwaRr%2FdGRpPLMCp5WfpgZK9y&X-Amz-Signature=eb117d53789fa204e2dc367e783538d77432e26e564062974d72a761fd65708d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBD6F6IH%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGu5n881BV1%2Bip3nBqCQvBYyCmmsZ29IXeqqlJocxo0BAiEA7mWTbTD1RLkycYEQfhlf0fknZhNA%2F9tqo%2FzQpliF%2FvkqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLk90BvraKgBE2hICircAzluvmpTrMUXb4Td5rCXJ%2Bx0s1GpMSqw9%2Fgn70UDVj58%2ByCSxVaKHH7SuXvsVpQvheyq4bWZ%2FlyW39vF9k0%2BHltU1u267qeqmwCL4WBGNtbH33WU25N6wZg%2B9X8YzIB0f8h1b8avpd7trETG3e%2BWQjvalbfjxEQlQ2w1X%2BqU65zWEppcX66u%2F5ZkLxStUCzdb%2BMmnIozSZzfMk4rqmuQGOZ1zJIoDHbDEbaWAjAszqbUDjp2MbOAoWyPlCDYip28PwW9flo4%2BAg%2Fonzz9GOQivCQCuUhKFfL3Q3yu7Q9GwR%2Fjm0afKpur7crKmsBOOJvkR595yWgFbC4vkcFr7XAhekMerSYg5rwJXzu%2BGDetILnrfj9hi9%2BvEnne1dJXIUTOCf6l0UZ6gL72jty%2Fb12Hs%2FNGmR%2F%2F19oTGBairNF%2BmCmyLrfLEZOI6zCemhfBftAe2oIztS8jyHawsjw8QWPzaVT%2BCyzej5wCOtvM%2F3kuqyoAn77gwjPoq%2BM7865oQ6yKA%2Bix5pHvT%2Bcd8F3R5IN41YUOLZarLR9jp2cAtkAujINmKXUosCjJbo6wBBVnJwPIN8K8uQJH8lz0PCcmvU%2Bc2iqlWwQ0GO%2BvHP9reBeBnQ9VH76oN8CWNtnv3TIMIeUwM4GOqUBV%2FTuCWMpdPeSXSejFb5LVvfElcielEbWrXk2N4hq6YdhCHePkwEds3BN3RHgHRdIoVb6Vw6wWbr4ypuy06CHU4gBGJdHpcoSKq%2Bu58TTCMxVQbbN7Uxy%2FphLFDr7aATvAc52e28EaVnn7AFSjZZ%2BA86kUgNAfSQVztKqQ3vUPK3x42Dmi0lHOSO5y%2B%2F1wFCqtHHxOekEQ5EIZCwFGpm1CiPq3eaJ&X-Amz-Signature=39bfbe465d9cac481d0984508ddc6fb2289223a17f67dd37664bd4b9f3d81af0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBD6F6IH%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221844Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGu5n881BV1%2Bip3nBqCQvBYyCmmsZ29IXeqqlJocxo0BAiEA7mWTbTD1RLkycYEQfhlf0fknZhNA%2F9tqo%2FzQpliF%2FvkqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLk90BvraKgBE2hICircAzluvmpTrMUXb4Td5rCXJ%2Bx0s1GpMSqw9%2Fgn70UDVj58%2ByCSxVaKHH7SuXvsVpQvheyq4bWZ%2FlyW39vF9k0%2BHltU1u267qeqmwCL4WBGNtbH33WU25N6wZg%2B9X8YzIB0f8h1b8avpd7trETG3e%2BWQjvalbfjxEQlQ2w1X%2BqU65zWEppcX66u%2F5ZkLxStUCzdb%2BMmnIozSZzfMk4rqmuQGOZ1zJIoDHbDEbaWAjAszqbUDjp2MbOAoWyPlCDYip28PwW9flo4%2BAg%2Fonzz9GOQivCQCuUhKFfL3Q3yu7Q9GwR%2Fjm0afKpur7crKmsBOOJvkR595yWgFbC4vkcFr7XAhekMerSYg5rwJXzu%2BGDetILnrfj9hi9%2BvEnne1dJXIUTOCf6l0UZ6gL72jty%2Fb12Hs%2FNGmR%2F%2F19oTGBairNF%2BmCmyLrfLEZOI6zCemhfBftAe2oIztS8jyHawsjw8QWPzaVT%2BCyzej5wCOtvM%2F3kuqyoAn77gwjPoq%2BM7865oQ6yKA%2Bix5pHvT%2Bcd8F3R5IN41YUOLZarLR9jp2cAtkAujINmKXUosCjJbo6wBBVnJwPIN8K8uQJH8lz0PCcmvU%2Bc2iqlWwQ0GO%2BvHP9reBeBnQ9VH76oN8CWNtnv3TIMIeUwM4GOqUBV%2FTuCWMpdPeSXSejFb5LVvfElcielEbWrXk2N4hq6YdhCHePkwEds3BN3RHgHRdIoVb6Vw6wWbr4ypuy06CHU4gBGJdHpcoSKq%2Bu58TTCMxVQbbN7Uxy%2FphLFDr7aATvAc52e28EaVnn7AFSjZZ%2BA86kUgNAfSQVztKqQ3vUPK3x42Dmi0lHOSO5y%2B%2F1wFCqtHHxOekEQ5EIZCwFGpm1CiPq3eaJ&X-Amz-Signature=9b2645db5c9ed0f627e41e9fb3998222f1999486a461c7e75cf441cf3a505f1d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ISIK3BD%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221830Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFPKqsTz876Hj5yugHd13MslOXm%2B9h1g4AilscsWtMFVAiATnVGdLlTR48oCy9zfBkZDHPNTduSwvewGElQdrcPIXCqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpAhL9KUYILboeE3GKtwDORfJQUJmdkXppAWWRcFtkLFgX55pXXWdJH2cpzXQFI8Se6Fe%2FbMSYMM%2B3Brjwx%2FLWzzQgCaSFNkHukwxhMUBguJ5s3QlqNym6oaVOGW4HH5K7lyBhkhlzpmJWg2i0LY%2F8Tut3yI3guWGN9qrFASfSro1ZJudW%2F25rbwzS2yWTo8SdbgkRIxi36szWVpvmWi0HtVYZM8ZvCPBIBusA%2BFU%2Fp%2By0%2BJbPOqm10irmprk%2B%2B60Y4ToY2mzXRDSbQpKEp6nGetDmVyzuPeBbNt%2B15x6dquMXNWQGDF%2BZYtrLY2mA0pv5AHp%2BZ4jHBYJFfrC%2Fx73paVl84yUTwmTuPtoH8ClkVILO5g%2FNpVZV7ddRgaGoQ0vQWTsWdOASeV5kzFZssl1yC4sLGxq3Yc518SQAnbMIHxRIJPSS24vht6HptMU2UB%2Bh1gI4wkxfbUWMWDzmDmf6c0cLaFcJmYPHBs87CuCNEgODlsckxaWXiZljPvu2Y7XR2iCVRsuOaAXgB492ah7MigQx9eVtudOAck3eFZfO1nduj7roQNYiliuXrvfTpPmIVcBmIJJbmC7pZbPBshGmvl1IE1WYqlnhBDxj9IhrmDED0Rx%2BfgNVNXkZvhulMqPwe2zHX5h9HC%2BiHwwjpHAzgY6pgFVP%2BP1NXxZNgGaIhwlPJ8Bglc4Sxt8l58AhdElnIeCH3i17PoENGCEzB5NwOdH6WqGRooEpI%2BGFsTWMS2s8ZMOu16CWi9uFXH7AIJuemMdOEp3T42JOsD3AumWFHt1GwB%2B04DThr4%2BcOH8QD56EJTWCqO%2BXSyY2Ol8wtznH%2FWHl0Ezje2JZ8h8fsB8AN4YV8AV85SOQhmG7RwM%2B2SReSS6iUak3o1W&X-Amz-Signature=aaf540fa6cdec81d7b14b5282b3bf165028f6203cac769f99c724b644398b49f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P5SQQHL%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICCWCfBaeUOhDX2ankSlD8Hds0hqQ8o8ERnq2qxzZjjMAiBANZYusS1Xl%2Bj8hXfuoYBL%2BrgfqXXre9yf0XUPID2TCiqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMv4AOimpn%2FIFKXwvTKtwDGc9uX0E9lQo1iI0jForj69U1H620RkvjxTmZqBAR9jqBPjjJLBSxZnnaMFMu8EtPdsw7Eh5sLSnyzWjeIHmiMJdpsVI2gQMKlK%2BMqugPWLW6Q%2BZIDpshs0o76i8Jk3ywbGf4MVMAl07sKW2kezNc6DPWADjXcR7uxXFlaE0bft97WTdaE4fkexTxRwzJ6VB23VnwSzAqqcCrcbij9v9vhfhw3qRVMKVh5eO2Imb852Xuz7dYY8v90xja2qBzhBdHtqm7U0jRPS8kYmd0ZTFgZfMTNY0jG5hy7CAHwTOX7pIYD2j26tC5zbDMNWjRSdCui7ogGK4XMn30C8ExjKzHk1nmjmepiLiJj0VdFQ%2BXolNjKPaDpSyER98uY8EmCiPlg8Ts7VMD7zEwF3r5daqAhj9%2BdKOxUciq25hgEyzCSoZPaY2yiG6C6xklFG20%2FZI2yV8bNGxQDqc2yTLv%2Bu78l93Stt3LBC%2B3uNo%2B4pdoxBWy41JP2WrYLx1OCZFLpdcSbfKX973Zevalcww05tRWRsXYKsKaS2PvAGUjkQhB8nrJf51ITkMLYuNOSkaPPN2H%2FmcPjtgeOUy7mVzcVk5qze%2FQp8vWnDVDo5akA8Ytv0SiIkWcSqUEPShceMIw5ZHAzgY6pgEtc4FRBsZ3T7JYBGhHubEGD5LnjwlqKUa2sjkJjHWa%2FlG%2FkDgZgh3nTebijY7PsLN%2FBocqmXrtAp5vukrywYMO2iTwqBuHCxR3bxP%2FQsEpYxExBYTb5H%2FFTTwSMlxtFYcUOU7ZoXPxEvxJIRLexcaxUKPMoC2am13rPURv2SN2OuMGi%2FWHKmHVl3JiG977KlegHeF8seQZskfz32QfAuqNI4Habp0E&X-Amz-Signature=4a1f599e54c329cfe365c444306f75087b14e502e23060398d46431a1e21ca47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664P5SQQHL%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICCWCfBaeUOhDX2ankSlD8Hds0hqQ8o8ERnq2qxzZjjMAiBANZYusS1Xl%2Bj8hXfuoYBL%2BrgfqXXre9yf0XUPID2TCiqIBAiM%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMv4AOimpn%2FIFKXwvTKtwDGc9uX0E9lQo1iI0jForj69U1H620RkvjxTmZqBAR9jqBPjjJLBSxZnnaMFMu8EtPdsw7Eh5sLSnyzWjeIHmiMJdpsVI2gQMKlK%2BMqugPWLW6Q%2BZIDpshs0o76i8Jk3ywbGf4MVMAl07sKW2kezNc6DPWADjXcR7uxXFlaE0bft97WTdaE4fkexTxRwzJ6VB23VnwSzAqqcCrcbij9v9vhfhw3qRVMKVh5eO2Imb852Xuz7dYY8v90xja2qBzhBdHtqm7U0jRPS8kYmd0ZTFgZfMTNY0jG5hy7CAHwTOX7pIYD2j26tC5zbDMNWjRSdCui7ogGK4XMn30C8ExjKzHk1nmjmepiLiJj0VdFQ%2BXolNjKPaDpSyER98uY8EmCiPlg8Ts7VMD7zEwF3r5daqAhj9%2BdKOxUciq25hgEyzCSoZPaY2yiG6C6xklFG20%2FZI2yV8bNGxQDqc2yTLv%2Bu78l93Stt3LBC%2B3uNo%2B4pdoxBWy41JP2WrYLx1OCZFLpdcSbfKX973Zevalcww05tRWRsXYKsKaS2PvAGUjkQhB8nrJf51ITkMLYuNOSkaPPN2H%2FmcPjtgeOUy7mVzcVk5qze%2FQp8vWnDVDo5akA8Ytv0SiIkWcSqUEPShceMIw5ZHAzgY6pgEtc4FRBsZ3T7JYBGhHubEGD5LnjwlqKUa2sjkJjHWa%2FlG%2FkDgZgh3nTebijY7PsLN%2FBocqmXrtAp5vukrywYMO2iTwqBuHCxR3bxP%2FQsEpYxExBYTb5H%2FFTTwSMlxtFYcUOU7ZoXPxEvxJIRLexcaxUKPMoC2am13rPURv2SN2OuMGi%2FWHKmHVl3JiG977KlegHeF8seQZskfz32QfAuqNI4Habp0E&X-Amz-Signature=4a1f599e54c329cfe365c444306f75087b14e502e23060398d46431a1e21ca47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TOXYVZXF%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T221846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDcnwlSDd%2B7U%2FhHZyaYsmYqTiasWRdo9a0s61VA5NGOlgIgTuM18P84g2SkutCWBZ48Aier1dgEsBMPTER7WOeI%2FzAqiAQIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKlOUtA%2FBN010OjaOyrcA7Y86%2BT5b7EVasd%2FR1ZyHyBgXKlIvp5cmQPaat4VonXDlODMBxzvXpfLF%2FB1yX9jufPS16YDj7lVVsgR0gKuIt91Fb2ZXGmfoN3d8vIeDxTKXlg25DL0fnIwaJiOhFkhfzNmM6G6IBHu6rs%2FPGRZpKBVdf1ZCHPQ4%2FUThZKzitDesjRjGrfc538799XHL9PeTpcMqM7c3srcfTNQ8ihoL6mAgIR3rQVmUPpanGaFcPSeGnYaMb1hd5TwDRd3kJ4qL9kspogUZjm2FY%2Bdaw1MYpeu7pf27kYpMFiwQEh2sG4rkftvxx50eTQ830wfnTMNsHJjGZaFvH5Pff44tZ1xnLoEPDnQgt1xM0Ph81K%2B8d%2Bb%2FBnLowMooQlerjYx7ORyuBKSineFDqx6vejcfEz%2FEYTLcMOAxX2JxW2WYcEOln30HL%2F77LEJ19NjCtnzKCYNzav%2FOUTUbU%2FlKasq31gFYyBdlZJ%2BQr7ZMbOVDiVuXVrh2UnIEOmoeB2h6UpQAe8g5qKgXsqiFF7u87xgkAWzJeL7AMolR%2Bb4FoHUtZGW8SFqaPidZxqvaonUSoRcLC4w%2F3Lp8%2Bcqgn2C2%2BeQyU10tWEOmgCd8nfyRG7O7yhiIlpbIvFQYWKHYOrPcFpAMP%2BSwM4GOqUB9IqGEhZGe0ar07edTrb6uqOQu9zsimOUHjBL6yd6fJTD5ilYP7zmE0Gwqdi1T4vgPvGOmHM5aBWXh7E5hrcQT8E%2FfajAn9d6NpmGOtnupzlNJ1u2fNvJa3HHPP1KGnR48%2B%2F6tzMC9eeSsmsYSVUeDYCxi993Ef5xvMfkVVZV9%2Fbe6ejRwGiwnlA41YvuLVPheV8a2snIRfKcCTBx0qWLZD6w5mdm&X-Amz-Signature=2807fc600a4954729d86fb06ed43536c5c404580560bba759f4bc9d6186bf89f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

