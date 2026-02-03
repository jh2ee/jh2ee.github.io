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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRZXUBR%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQD7BMGpuNObjmPN39iblKiRoelIlpEhZstiOsjRULaGZAIhAOoPG6iXe3YcPKMdNvJjmsi3fGbJFaSGuvSHx9YxMB13KogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwe1yJRhbIfHDRy3qIq3AN4txAxGxRah7OxERaYz%2BcgIfdrOUfImABNBl515AtGEVVrcvSfwe4C0qykCPQ4nWhmZUyYTPKB0C6AN7M6%2Brvxknn8CiYJDDelMgI2nYxL%2FLRIODd4FMGXxHpbC30LNDyKNu4SFGUEbRaF0r96i0K%2BPotiG9s7psauUi0k6sqIHbN%2BgP48UXBLfHThxxFZ6Yh1XebPK%2BY74iMbnKtPSMxf5wEsZFHU8Ya2DxDuBquqFRwftgjan57hUqDvvWROKiIs%2FH7klVsCxo%2FcInMoAUUV9SDe2z0ZfDCCkH4eNq1bgYp1E%2FagrJL%2FzqwIuGKGQNUjfpUSfdid3mOCpxoIKQQfYGcteMN%2BzHI80w3wpX%2Fu9eEYpq63Td6a6pWDUHOEctDE1yzDMsYy8cfu%2BHs2HUIHInOEJjt5k3f2%2FXvuLSh17hLizl62t0FgRWWjJLkXRgMtqi17BpimONBUWUVEzrGmFB4KEXFEcpq1K3NVIBkRpY7oUkyuW8aqQl9V83c1XNpowCg8mRCRx7MrETEiKi3T6YejOrBpaeStdNuZVmagY10fmuQyEXKDm87HSLnPzFjksVaGMIMzPtdqaJMQGdo%2BsjDqJbG7A6jd1bvuxYMkQ8kUKoL7xf9lHhHUhjD9oIfMBjqkAUNPK9DUD%2BYlAF2XtI7Wj7UbwWzPgPnFNY3yun72FUFppYEQTm%2BZjB0N3Me5nULbF0rFQsiIu6Hs8%2FHSL058zBcJ4iV%2BcHctQeXTju71RutLAUSv0gAzBY%2BaOfrnT9568It781aUb%2BXDF%2FBj1LiNsB%2BTKHZq4eOZD6tenfhy6H7KuLeADafZHz26WnG%2Bi%2BfWchDXpG%2BDUukJU51GogUc6em5HRwo&X-Amz-Signature=c0bbab3ef374b860de78b355bbbc7fd181a86e29b115c701aebb8d73a1b5715e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCRZXUBR%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQD7BMGpuNObjmPN39iblKiRoelIlpEhZstiOsjRULaGZAIhAOoPG6iXe3YcPKMdNvJjmsi3fGbJFaSGuvSHx9YxMB13KogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igwe1yJRhbIfHDRy3qIq3AN4txAxGxRah7OxERaYz%2BcgIfdrOUfImABNBl515AtGEVVrcvSfwe4C0qykCPQ4nWhmZUyYTPKB0C6AN7M6%2Brvxknn8CiYJDDelMgI2nYxL%2FLRIODd4FMGXxHpbC30LNDyKNu4SFGUEbRaF0r96i0K%2BPotiG9s7psauUi0k6sqIHbN%2BgP48UXBLfHThxxFZ6Yh1XebPK%2BY74iMbnKtPSMxf5wEsZFHU8Ya2DxDuBquqFRwftgjan57hUqDvvWROKiIs%2FH7klVsCxo%2FcInMoAUUV9SDe2z0ZfDCCkH4eNq1bgYp1E%2FagrJL%2FzqwIuGKGQNUjfpUSfdid3mOCpxoIKQQfYGcteMN%2BzHI80w3wpX%2Fu9eEYpq63Td6a6pWDUHOEctDE1yzDMsYy8cfu%2BHs2HUIHInOEJjt5k3f2%2FXvuLSh17hLizl62t0FgRWWjJLkXRgMtqi17BpimONBUWUVEzrGmFB4KEXFEcpq1K3NVIBkRpY7oUkyuW8aqQl9V83c1XNpowCg8mRCRx7MrETEiKi3T6YejOrBpaeStdNuZVmagY10fmuQyEXKDm87HSLnPzFjksVaGMIMzPtdqaJMQGdo%2BsjDqJbG7A6jd1bvuxYMkQ8kUKoL7xf9lHhHUhjD9oIfMBjqkAUNPK9DUD%2BYlAF2XtI7Wj7UbwWzPgPnFNY3yun72FUFppYEQTm%2BZjB0N3Me5nULbF0rFQsiIu6Hs8%2FHSL058zBcJ4iV%2BcHctQeXTju71RutLAUSv0gAzBY%2BaOfrnT9568It781aUb%2BXDF%2FBj1LiNsB%2BTKHZq4eOZD6tenfhy6H7KuLeADafZHz26WnG%2Bi%2BfWchDXpG%2BDUukJU51GogUc6em5HRwo&X-Amz-Signature=c0bbab3ef374b860de78b355bbbc7fd181a86e29b115c701aebb8d73a1b5715e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3BMZ5I5%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112403Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIGYuGDIofMCrxZbWdpG5egPb2zHvXBBO2dMqVxwCDQj5AiEAzUVokg%2Ff%2BYdgmevUTZdjr99YPHhCOPhQxHdOpSbHyn0qiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOtEqiv95k03DEQKSCrcA%2B5p%2BmAk8qe6XwfCUEE1zJyk88ycv4I%2FrEAzu1LeG4wnN3fRNdgOMzMkXEqQhpUw7Mq5aZ4yAqnc%2FTe%2BduXUduNTvw7CQlYOb5ObgEdUWR%2FcFat9E7jAi5ZQQTxTwc2gfzthtz4NTIEVUZ2KKKKAYho5JytwiScnhrAnmWbT32kiVQTudKdT3kMFMF5PVMwVIc2OK6Jg%2F7cUOluiPithLRWZdHA3QbYEQP5EGeJUcY8rtiE0F2pRblEW0%2FpFUGHl8%2FvvvttK3uJS4Om0Hd%2BeqRFZfo4HJ32KkzwAPXrN7W2kQsG0ac7Q3u9mEopaLwPObTjTPCUu1rpfudMZ6mGVDzK4D6fxXOfpmXi3z38iF3uUp%2FUIuu7Dh5%2FE8Xo%2F6yxZg2XDYu9PtHgb4ZoCrGITKXpRWwETjvwt4WtscRD6O8aM%2FYgU%2BWHNSKu3ppTPx3wBMmR%2Bc1kdjv4WDj1l3TcAawZjbbEgKt2xM%2FlNUmAEP4KK4QMfZ3qEr1mXnj0Z8CcU58AVjWJokw4Zc7iY%2B9r5cNnCZgM7BOYVTHCy5763AqdRRMzRiC8LNA8ns%2FKAe00kfEnqbdha%2BLkKY1y5MI1r0WgQ8FiO8X22ef7oWsBNO1Z0jKa5bR8pJyGrF0ZVMJ6hh8wGOqUB4ItCH9t2cuNHltGAofPjyk92lFPhVQCNh%2FkOousFBGmASbJNvIE7GAGAxonY%2FtcXGGib6nsv4vz8ctF1MVs8HA7DIeC%2BKeyEIDvZOMf5mL%2BypZhykz2BC5NuG7OcAV%2FnoztQpm1nR9v9Fobg%2FX8hSZhLjH3pRcuO%2FF%2BxlDz7iHF%2BZQwiV3EpwJjjBRey2ZhhaHJJfz8pAFUZPCZMJLqhaHgq1D0J&X-Amz-Signature=e12461e19af35d0b17c7e280a5190e778ef05bc5370f19698eb4babb54e84af5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FPAML7M%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCtPyS1MJ9i%2FK52L37xpQSehU78LW7PpgVIBb3MUMGN8gIhAOn%2B05wBuXyzfhDsc94o93xLqwda5QcGh8sgHIGaq8UXKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxzKBM53o4kantddRUq3AO7ncemzvVZE7wsTDbvnQMqkyqkvDRmtNsheWLrtrnzVS8Dydh15w9ThQpS6o3E4eVNF2u8KYlJaf4lBBqxmdZtIHINFYBK2lWrZN4fLohh6yHCnry3R8kmNyf8iR4qT200dsk5smrkSaUXpstUBu44o7is%2B07fjnMFQxKwSchC8clnLRS6DB86oH3dY4xy0BDJoFvtfLMhnU565rCLH8KrXlrySzz%2BBUHPilau%2B4nO5b54gyTjMQ4espl9UwPOOWvxcHjK6lB7S9GKWYutx8rBMbTZoXvgg6A99anLhPX4mzqXs5ole10J0YmjdIygYjKdTtFOabT71fVuc70SbUPsGsCOx4yK9W%2FDJ4%2BZQ1UU4ePEv10BQHNp9BhUz5GuC9eAjdCsMgVkGYhBo2tCdXR3TCJstYraGMFy%2FF3tm4Sr3xicwpFUP2MJSDQUO1SolSJKbm7aydHJ6gSwj4u1imA0MWhoI5HzMs5VTgPb3yO%2BCgsKZP9vYcvTKYu76MxpMM72P%2FOEpKQXwFyTidKJntlaTmMmUDjHJbwazoJ%2B81O8RCGGD27v%2BlTc3sn37TZ9rQ7RBYqHOV1U%2Bt2VIcHdH46J2BI3E1%2FBvlCqAJaUGmY%2B5%2FsfRuqR8Au%2BRPiLxzCGoofMBjqkAQ58%2BaeCLdqAAgiXMU0mqZ5nFMqPSNABzlf%2BLIc4ViCkWdfmRGJ8h5GVFFgEga9z4l%2B9aNo9J17EEdYZTworDn%2BTSA5MLKp6bLfHFs3meUcGYgEF0VKyNoRcGZq3Ij%2BFrlAhqqC82AStsowL0MiIBj1Ez3SIvh0gS4ol6qHREY8lhkuRwTiG1j91QbpPtw7ZZDzmQCT4DIScoG%2FMaBrNQPrGD5HH&X-Amz-Signature=e8824719e00f5039d47c6914dbf3b853f33720150110ecaa590c5da9897da0c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FPAML7M%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQCtPyS1MJ9i%2FK52L37xpQSehU78LW7PpgVIBb3MUMGN8gIhAOn%2B05wBuXyzfhDsc94o93xLqwda5QcGh8sgHIGaq8UXKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxzKBM53o4kantddRUq3AO7ncemzvVZE7wsTDbvnQMqkyqkvDRmtNsheWLrtrnzVS8Dydh15w9ThQpS6o3E4eVNF2u8KYlJaf4lBBqxmdZtIHINFYBK2lWrZN4fLohh6yHCnry3R8kmNyf8iR4qT200dsk5smrkSaUXpstUBu44o7is%2B07fjnMFQxKwSchC8clnLRS6DB86oH3dY4xy0BDJoFvtfLMhnU565rCLH8KrXlrySzz%2BBUHPilau%2B4nO5b54gyTjMQ4espl9UwPOOWvxcHjK6lB7S9GKWYutx8rBMbTZoXvgg6A99anLhPX4mzqXs5ole10J0YmjdIygYjKdTtFOabT71fVuc70SbUPsGsCOx4yK9W%2FDJ4%2BZQ1UU4ePEv10BQHNp9BhUz5GuC9eAjdCsMgVkGYhBo2tCdXR3TCJstYraGMFy%2FF3tm4Sr3xicwpFUP2MJSDQUO1SolSJKbm7aydHJ6gSwj4u1imA0MWhoI5HzMs5VTgPb3yO%2BCgsKZP9vYcvTKYu76MxpMM72P%2FOEpKQXwFyTidKJntlaTmMmUDjHJbwazoJ%2B81O8RCGGD27v%2BlTc3sn37TZ9rQ7RBYqHOV1U%2Bt2VIcHdH46J2BI3E1%2FBvlCqAJaUGmY%2B5%2FsfRuqR8Au%2BRPiLxzCGoofMBjqkAQ58%2BaeCLdqAAgiXMU0mqZ5nFMqPSNABzlf%2BLIc4ViCkWdfmRGJ8h5GVFFgEga9z4l%2B9aNo9J17EEdYZTworDn%2BTSA5MLKp6bLfHFs3meUcGYgEF0VKyNoRcGZq3Ij%2BFrlAhqqC82AStsowL0MiIBj1Ez3SIvh0gS4ol6qHREY8lhkuRwTiG1j91QbpPtw7ZZDzmQCT4DIScoG%2FMaBrNQPrGD5HH&X-Amz-Signature=6670bb6b47bc19e258795d7e9314342e149ccf847555084720acbeb160b388c4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UQDLHTL6%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQC0EQViYY1y6CnGsgsOivQkktlN40rwW0lmdyNWWOKDEAIhANE%2BKh%2Fbtz%2B0msq1C6wXxuMZ%2BY%2BxXrmGuw2yE%2B9EEABVKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwkBbSvnGg6QSvC%2Fskq3AMpctESjJBMSYazISwXr1Thr60c3GoN0nFcqWv606qLZBWvAaCx75kPIrlT47CAdOfVkBGduORfwwMRwpJLyroR6YIyLUCVsGxSMz%2BcG581nlMaImtBY3JZKJKwbcW70fiwPp1lBO6IL4FtUA%2BHP7yzyCDvoDhbBTQnqRfwrnKeE0z7VGpD%2F2MbeHqomov3vXgy5aQllg%2FO%2BM6OnpGhDnKBWV9EXrihqhPcfYgjERIDSPI3uBO9wrfnl0Ca1EDGCVeezz6jGPT9O7btnCvkvZiRKts9axzQ4ubKAnHKVYi2J7%2F%2B6jxU2M0k1KmQ4tSr7JPp2U%2BpLsMBEJar64afarpstVrjUEuSFmfsuJZgROPDW0A0GrhQlexV1jamAAki%2BS%2FiIUACsOcNdQs7K%2BpzRfXsO2HYfX72CQfFJXSBIIhX6rZuo4i57P5lueiqn3OWNOvUdF0WjK%2BaZ%2BYJvK5bsp1ReJpRZIumTCPzNPf4XeiSA5PJSJulblkZKCk8%2BumVjXGcoD8m7DiFcFS3GT0erq9wER40rIraSDFSbJYkU%2FkengUZPAWpxxeb5bze5hQTNnr7Cj873VbgGEh%2FVcYs82qFkvyM7l6pGcIHMZnmIZHtfnEy%2Fyhr4o%2BE%2Fhk51DCcoofMBjqkAXb5o1mYETuI8voisIffAI7PC70s%2Fvl0GyyURKx%2F9JOBVz%2BXvebB368TvbI9QDZKpkg9YbO25bzfXt9GP89JPUy1s4tWoIbclYzrl4yVE6yZVCwbxKb06eGXM%2Fg5Zk%2FqlNAgYfi7ZY4PKYManu3Y6aJ8qOLyF8KCmJpNG5kG7DzhEVBsCgoUDXHhRPBxgICG3%2BngM02N8Dw6VPGo4oFr%2FoYppelb&X-Amz-Signature=8172ff2c754073cc93398a9aef1d636c7760bda285070a786c595b5bd1698016&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VE5C6VBU%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIC%2BGDx2JZNcN8hxoRPGR3mH7za%2BxGLRVVmp67gYOn0JPAiEApMuPGlF%2ButWMafhWcwPtYEH9Oy4m36a%2Fqa2AVsRVT1kqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCf0dBvgO1vmLU4X2ircA35jDisQveVh5GBilK23%2Bpz5PQdVNgCv2V65G5gzBUhZwH9EC9KBtEKRmW5rRKs3HodDZfJi4Pr3KCRBD8DaGL1vyJICEsueL0CyXZ%2B3mfUIW5tioK9zh5%2BIlUVYLznIjljp6FueUyiaLnQDt58eVwYRQ0lL95DadG9q76u8wLpCS36WJCu1H0IZUtEZwzeBZYfzne5C%2FNHBFmcJd6ou4Al4uHhofDHqq%2Br1RbVe400VfmHaXCbi0h2NFgErHeQ1o%2FP%2FGL0WTJM81UsHwWbZyGoGgv58PomZ03O8mBDELaZXD%2FMKCbGVbZBWmA73kU1lxDYcgU3SZyRiY5KmeHc31FU56tPaUm2nOArBSHStgjD24YBc1aE0sQ5DVkNpO1rykGSMtUx08cgQ%2FwHPTe3Wuwrk1FBd1EvfgtW%2BF%2F%2FmBucO%2F6h71%2BB9qOYzwSLUzebRdO1bhPi%2BgIv78ZN7VfdanvBauFEt4Lu0vOI2FyiM73lX9o9Og7uY02iEhfYPqy5e%2BHRxdgNDWniiNET%2Bl9iFdOjQgLviV%2B%2ByiCIi8tTuwKnP%2BdO32vcMq0ifVEJ6pY3%2F2%2FiiI7qfgA8megT9TJJjUfZCu3CjCY0iweyofsM%2Fcixa%2Fj60NJRgTz%2FpZpoSMKOhh8wGOqUB65pGg49XNakXxR%2Bzmirm2yoAAX%2FcU3JJPvE9d2FYZ4KXtlKwvzjj3LSKhGZUAPzcuhg%2FuAZ9mXRxlsTvjNGNxKpmZbc%2BCxxzyFVMN%2BSxc9NA7b2j0NrBCC3Gdbqys4mul3%2Fn9%2BueBftXIdQNvpDOt%2FzxouebmEdrg7MU%2BMsRXsJz34DomHT5c8XESGzkwv%2BDXJQ5jYvcHIEFBXzIot1uzek4XWOH&X-Amz-Signature=d3d3649b2042a306a322aa42233bd97da20e39b747683df045362049c3b05788&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SRUVQGI2%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIQCJArfWBSH10vRb2GVwzhGrXYCdlSxHSvOgSIy9rXeasgIgZU6bVJe5Jmq%2BjwrSImiZr%2Fj%2FUdgZCsOZ2xzdjtdn7DgqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIgFvJryqgCxJgcPFircAzZSxG7NcKcnDQj78OEAhwGNSj20Wlumg8WVLYuBk%2FBSLl%2BY4ejEcbMGLOHM6kqlIw2ZN03KNphgQYBx3UICdqL4mLev0Pf4G0tb5iNhlelnRA2BNlSgkmI4hdgovqnOCS2ZV0hkh8qdA1Wzf1O5LvTaNQJ4mYKmKncg9kyJm4l5pXf4PFtReSN3QDBmZrAZ3teAgnrxz8Zw6p98ZsvQheNKR9vewZB8mstE0%2FivJUtcV9zaLQyyZ6XwYEu2VmF%2FAmS0ZxLkjcdfM3gaJHC4ld8ykWTC9Sis0dZi3nNO7nklj1eaDpNuhwMKLouiLqKTctu0JKGNWqQquhR8aBXKWpFpQQB%2BFS4pisiwsPz%2Ft45ahB0EmCDZSCLct3CMvB%2Bnc9p9ytDVsRnX6%2BmK1zM1Qxz%2F0Ru7BBhJM2NM%2Bs%2F2f6q0SU3F%2F4vsWJcTmPIrl%2FBs5xLsSHdJGVweiXb4D5OuDmK0ilQpx43dz7X2BQ5ia8ybb4C6isiuT6J%2FqZ467b9XQD3vdyDpuUOVclmDR97bSPgat0%2FpO2Y8fn%2FY5eHG0Z896SIKhH5wVgJbLmjqZhPyaJc25PmD1nJ8uWtg3hUslae2v8EPGb09hRHtVGI5QC0glgWuYrZ1djZcD2ixMIiih8wGOqUBPwFMWdYZLmMQm87CAw0POyoRgtntccGtIMOrgzFVEyX5NwskBK630y3K0qo%2BxLOu4DLp0Y0Oau54l3mYdouTFCy1Nuw34kJQT9xd1747dFmnVb%2BqA2PMeyeiXloQ7SNdCktxEJ18iz%2B7Zz9UQbxmNsvLJBAHdbOzG3BGWatEHl074IhCI0FQIs1Cab8QGsxwDmWdYPwo6KHOEv2ZfC9MP3HpnK%2BF&X-Amz-Signature=e8dc36e56fc14d507b454d4a332501adfb9d187bb3e4ca871e9ea05b2df7accc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665E25RYHU%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDhHqCEi6sU%2B9EGowPp2qXJ9VAfpRtrd1rnXUsuYVIO4AiEAptZqBGbsTsKw7Q%2FHo6iEWkuP7i1MAosUMj28WBoiMEwqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAr7fd%2Bt7BzBBZWUTSrcA%2BRme3kSb%2FIL0JrsVNthXJ4064oMi%2FOza07FuhTo2YRYThkTX9AC5gRn1oex88im0DLspxBuVEuqlxa6ViKv3bS2VU%2B4yKN%2FMJate88g8ihsgQB7n4aUikzb%2FrB2udLIphq0avFkOQLvuxRzVd1ypC6m7ooJ8X4qANxgculQURykLjqIKuI59CYlVjHQOtwybOe1XQAsowamQclOM1S7og%2FV7bJtZ88mauUHK4vQa7ekSnE6EM9LrVdP5LOdI18vZg9EKnLBoA8yE2gTjHrrshCAbWjM8Jr38bNQ72n%2Bjx2MEV8MNuGXK8PLSCmucmsP8aF7ivlm7uwzxcKZ6UGABReCUXCYkJVpCeSpkei1O3RGAG3G26FwG1Hl7hzTmpL0Ggqdchw%2FrnzUmsCK9b5Lf3lyjOWrN14Y2QqfJx0s7WnZajxwrXkujFLcFZX42SGi2LvT0eLq8pkDyMFeHMKYtOaUuutoSBtjdqjrPI5fyUmAnS9HDp6VrvEfOEsbCcfwhaWWiT8vZ5wdDVDND3IKvt7m8Yc6cZhurN7HmrHxXB1wKfsGUPSCXYn3fq83A8ha7Bst2mh47GwWV52ttMVEfO9cWgTNQZT26KqQyBZ1mxaEH5Tx4SnW4BTVr6HPMLKhh8wGOqUBTZIpp6zagICcNZ%2FStJ0dZa%2B8vAfFN9%2BZrre2gzFkTueE%2FcZgG3cellp4wJ9KynEV0ck7KPTK%2FP4ceE7u%2FaDylbYtCXLcdcrzITwW8lURLbcWpsuE5BJhs4lft94CTe2oK%2BxB9TyQ0AkHxOBbY5WkqqrEYbQDy6C1TnVUlmE4g4rsk%2BhEfJVpgmKW%2BXZLNM%2FWsXZmSU0cYZ7Jh4wE3bADzCNnqfhK&X-Amz-Signature=b6e4b1f70d7509b50d3e06b500f39da8d87602fd925ccb8f19d6c4ed5a5a03c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665E25RYHU%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112411Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIDhHqCEi6sU%2B9EGowPp2qXJ9VAfpRtrd1rnXUsuYVIO4AiEAptZqBGbsTsKw7Q%2FHo6iEWkuP7i1MAosUMj28WBoiMEwqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAr7fd%2Bt7BzBBZWUTSrcA%2BRme3kSb%2FIL0JrsVNthXJ4064oMi%2FOza07FuhTo2YRYThkTX9AC5gRn1oex88im0DLspxBuVEuqlxa6ViKv3bS2VU%2B4yKN%2FMJate88g8ihsgQB7n4aUikzb%2FrB2udLIphq0avFkOQLvuxRzVd1ypC6m7ooJ8X4qANxgculQURykLjqIKuI59CYlVjHQOtwybOe1XQAsowamQclOM1S7og%2FV7bJtZ88mauUHK4vQa7ekSnE6EM9LrVdP5LOdI18vZg9EKnLBoA8yE2gTjHrrshCAbWjM8Jr38bNQ72n%2Bjx2MEV8MNuGXK8PLSCmucmsP8aF7ivlm7uwzxcKZ6UGABReCUXCYkJVpCeSpkei1O3RGAG3G26FwG1Hl7hzTmpL0Ggqdchw%2FrnzUmsCK9b5Lf3lyjOWrN14Y2QqfJx0s7WnZajxwrXkujFLcFZX42SGi2LvT0eLq8pkDyMFeHMKYtOaUuutoSBtjdqjrPI5fyUmAnS9HDp6VrvEfOEsbCcfwhaWWiT8vZ5wdDVDND3IKvt7m8Yc6cZhurN7HmrHxXB1wKfsGUPSCXYn3fq83A8ha7Bst2mh47GwWV52ttMVEfO9cWgTNQZT26KqQyBZ1mxaEH5Tx4SnW4BTVr6HPMLKhh8wGOqUBTZIpp6zagICcNZ%2FStJ0dZa%2B8vAfFN9%2BZrre2gzFkTueE%2FcZgG3cellp4wJ9KynEV0ck7KPTK%2FP4ceE7u%2FaDylbYtCXLcdcrzITwW8lURLbcWpsuE5BJhs4lft94CTe2oK%2BxB9TyQ0AkHxOBbY5WkqqrEYbQDy6C1TnVUlmE4g4rsk%2BhEfJVpgmKW%2BXZLNM%2FWsXZmSU0cYZ7Jh4wE3bADzCNnqfhK&X-Amz-Signature=d79476ae43bbf546defeac77220050ce5405520c80ddfbf2167ab572bd60a7e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUQQCMCZ%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJHMEUCIBXfregGFauQL%2FOQ5%2Fs89qyHOM3u5UA9Z201X8fiDpMqAiEAuR5HHewTBhZLHx9JzqIOkz2tzsxgvDbipendBNJNqQgqiAQI%2FP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLweEirvrMvZbxqkfSrcA%2BAwPx2pNZ2BSloECfba5wtYzD7K0A3jw6Ugm3p4hlWqUMo9WMg8qxppnr1QDR8pJvAiy8PpPLu4K%2BQHFT6YbrxOVDpFpXwujV8NqDB8Nvx3bEJOw08sRm4RErGjZYfsgCysTNmuLkVYsneKPJCxV%2F7boWBfzFuDE0WU0FmsL5aKk597vcQ7WpgRHvKXofgJGQuFkDBSz%2B%2BlEjwAwp0yJO9BfFAnQSHwJG98yXXyIlvblpAo4yDf2ZyZfJXQvp0XvWyH5fcs%2Fab7JkT3GsEaKehoPIs1YJuus8DT8vanmshrM477wwPRbBQUK7UqJYT6%2FjICaGby7sabog9sInjG0sIQRBfo%2BEjUOGApTTq8%2F1ImnWMW0KH4ij74KknFjCvJU%2ByYGjy4TUc1GUhxJ%2FV948TLfI99p30xqTf7Czf9NuryPyHBismv1u%2BMTlrqfq3lo5uVq%2F29gYrg8IksL%2FhX6dtSiL0DLcWAc2yJsog8MBvOuXfBFyupvdqFwABmE1qLWpUB1wiFymyfA%2B43iMflc%2FCaZv4k3IBEsRGulmciVC%2FxcnSrLTg0HKN8MTwr0WnSyA6WbQ0kDBfzgbVDSJjdgA4AGiDlZYzrxCfppEsFXBNHE35yymqeWqZ%2BcsJUMJ6hh8wGOqUBUl%2BOFMamgdEEpeksj8Whgc9QSlhiEYaSUiIctX9IAlHqfY%2FcUobbZYiX5%2FsCTWBEVZNckZcEKhTxCYx6g8Xw9bIiOD92%2FblC93jOzC4aTaSatyXCU0TQZIadwHHfcgLWD0pDoEmgykifmNxaSaue9rLOI8grHD3Rr0k6kiKjrQK04sggIDDir0cFykTNloAo8KjNimhJ%2BxtBI81%2ForV717YpXUe0&X-Amz-Signature=031d1fd530b32aaf3551548ae6c26334e595d00d861f6d43c759e4669034d1d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGQV3HHF%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIAara9wOVXQt7GVvNGQchdAz66x3QFlE1EsIfD54b6MgAiBp4YwzpcsbrYRhx7hyI3HeeYf7y6Y7%2Bl%2Fgl0EuEBAuGiqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6A3k2I89tX3hjiqMKtwDPeAqO7DNzUF%2FXcGwg3yOoBsn6gavKcLIHpraG%2BX%2F2lYMn9H65lfs3PwWpXKReCkL4e%2B5ZJtB%2BRjHcZi0GSq2whF%2FwS4VMT5CBZS8fa0Z77qWdmb%2BEquQftENDSQOy7h8zcMgxNBxDDB%2BE4FvxwNE%2B8jkkr0ewlowV4hoixFvY%2FdYioPpESx%2B%2FwCcRlyWxEt9j4fEcwRphpYcBIUdDLSEQXshGhSLsEkB8iZX696GOkRDyckUubhCI%2BwVhW6p4IesO%2BlNWb%2FFInpn4pnXN3JWGKMOjfR2KFxZJfmW38XMigh3Y8ihj%2FZok696c52BK%2FvsxTvcjjA0psvcl3UwHZi6WuZxWTApsAz%2FZctKPMUzAG6RnWdDV8DudjGJpearlpjDpzlwdEjxHRKLlDPB%2F8QlmCCb%2F3SymdVuQZeZjDke2d7NGu5%2FONGxPAhSodH4gaolpKwmCdZKw6QqxHl7jdix1xmnc8HgtAhAgjcJin3bZctQe0o%2BPCBem0iIjeGC4sXAntgN3cJvMREO15PPuOeqHiIZQfCwEJdlolIMZbgw7Jl0bnlJYtFoYAJzsO9aiU17kKF4reeZ2852HOqUjHY2YGJ0zoOJGOdXTijbTgCqGZESF9m5extiAWdIWhYw8aCHzAY6pgE6g%2BgdL5StuWXqzZMPEHOO4xVQuIQ4SRMpbavrO6TW5geALEhZEEf8vbn88z9J8sOfK0jD68lS4zQRIOdTOkyuzyE%2FQ2%2F2emDsYlFAMIxVoNTTtFmmnW8EdVf1SJatrfJVt5ouMXDiVo1bZ%2FhIhFgSKgy3X4qrNNmWxE6WMiDAl8xubhq6ufH0m4jkX9XGDJrU74AlEgEal9If9XiBQb4y1wtX2j3G&X-Amz-Signature=7e1fcfb012ce724241d6d55babec5718edb64526bab5e6f9e7654d557aee3f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGQV3HHF%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJGMEQCIAara9wOVXQt7GVvNGQchdAz66x3QFlE1EsIfD54b6MgAiBp4YwzpcsbrYRhx7hyI3HeeYf7y6Y7%2Bl%2Fgl0EuEBAuGiqIBAj8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM6A3k2I89tX3hjiqMKtwDPeAqO7DNzUF%2FXcGwg3yOoBsn6gavKcLIHpraG%2BX%2F2lYMn9H65lfs3PwWpXKReCkL4e%2B5ZJtB%2BRjHcZi0GSq2whF%2FwS4VMT5CBZS8fa0Z77qWdmb%2BEquQftENDSQOy7h8zcMgxNBxDDB%2BE4FvxwNE%2B8jkkr0ewlowV4hoixFvY%2FdYioPpESx%2B%2FwCcRlyWxEt9j4fEcwRphpYcBIUdDLSEQXshGhSLsEkB8iZX696GOkRDyckUubhCI%2BwVhW6p4IesO%2BlNWb%2FFInpn4pnXN3JWGKMOjfR2KFxZJfmW38XMigh3Y8ihj%2FZok696c52BK%2FvsxTvcjjA0psvcl3UwHZi6WuZxWTApsAz%2FZctKPMUzAG6RnWdDV8DudjGJpearlpjDpzlwdEjxHRKLlDPB%2F8QlmCCb%2F3SymdVuQZeZjDke2d7NGu5%2FONGxPAhSodH4gaolpKwmCdZKw6QqxHl7jdix1xmnc8HgtAhAgjcJin3bZctQe0o%2BPCBem0iIjeGC4sXAntgN3cJvMREO15PPuOeqHiIZQfCwEJdlolIMZbgw7Jl0bnlJYtFoYAJzsO9aiU17kKF4reeZ2852HOqUjHY2YGJ0zoOJGOdXTijbTgCqGZESF9m5extiAWdIWhYw8aCHzAY6pgE6g%2BgdL5StuWXqzZMPEHOO4xVQuIQ4SRMpbavrO6TW5geALEhZEEf8vbn88z9J8sOfK0jD68lS4zQRIOdTOkyuzyE%2FQ2%2F2emDsYlFAMIxVoNTTtFmmnW8EdVf1SJatrfJVt5ouMXDiVo1bZ%2FhIhFgSKgy3X4qrNNmWxE6WMiDAl8xubhq6ufH0m4jkX9XGDJrU74AlEgEal9If9XiBQb4y1wtX2j3G&X-Amz-Signature=7e1fcfb012ce724241d6d55babec5718edb64526bab5e6f9e7654d557aee3f17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJ3R4L6B%2F20260203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260203T112419Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDMaCXVzLXdlc3QtMiJIMEYCIQDA9Co3pycxzo2fwAg5AsID7O5hxs8K%2BLz573s7w14IQgIhAOY3SbwTG7RKl5o651KzlguZSjaYgfFzh74f2p3k6W%2BdKogECPz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyLLIywvrTtmwOdNMYq3APRonWYOsoQovB0eg6Q6CMCTStQQEEWgvsJstaeNlbs34qsqNS9MxpShvElf9VaoW49FmL0lSbhJcfKtLkU5byRVHeYMCOjuuxxwxRq0dUDXAHrK4CGzqcG%2BV%2FzoKNCcGazo%2FGamYX%2BoSzindowgau6Rj7o8hEY%2BqwhsdvKb1efsUXDbMqbRC3Sqb9ztF1cjPxkQW3lALxr6ItW6KEZtJcrhNXSaXDTVX%2FGKfEoPQNyNFe0S2ICrTCBVBaMaBS1Byfzhx4BcePRrnZosarLtIOK%2BZdVk56FGj2GcLIj%2BzXKnKIXlqt4tmy5FpN%2FOriJ1%2FWSM2v6deTy9C6gQayT3c%2FYgXAWhKlfqV4eherM4mn%2BS2UqM2U5Ejpk0X8a4q5jLbfO%2FK00iu5AhebN6Yqc%2FAerMkg6pqkr1YItXKKB1KIoG8gMMZSLlmhMadUW83SCMvWRt9FCD9KvOpX1SEe0TZ8nyBcHTVxBBHaDmrZ9Z8ZJ3FVcRw8js3%2BBKcTwqqoPNRDaHhvzoFrZCiDEtsPiYkgMKtduW5VDVNgf%2BkwEOeUcA9GjL2W6ajqzLT353i4S84Pk4BXobIRtbXFMXtQu1idF0KSbta8ZfHbgEuqfusgBPMB8VRohg9pSJloihjDroYfMBjqkAfdYo2w65XAX1ELPON0cYLUUYLGpvwY3nzUpQ155hAcK6P%2FbONO4ah54sHh0mSni7%2F5SJPYErlDXT%2F5lof3ut6bbpr9rK7Ctcgd0XTxNjm%2FToFbV8P%2FBzdkRFs0nZi0rymyC8EbL97btAA8Oq3MR6TDmVRJkSfM6TdOS%2FDrdWEIfdzOjv15CWi2B1CH%2B2tShvpcoW6bvz5ifDzE%2F2qEdU0JvaHVq&X-Amz-Signature=f263410111e48a987365066bebe1eab608d1b5aadcc327e870cdbe20b70e4761&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

