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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4VUZZN5%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH51Q6Ugzx6SnNz%2BitudFGQng2eEfNBLUSaQGqwQlnxzAiEAoqSzwv7z0EWYlpqZb6FvLAzV0QQimSP1qg5ulGGVRTsqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOIA4%2BGqWnVhbFLXgSrcA4XL4x8viM6%2FiQ9oG7P%2FjDUTCSR6aYXEBwdHRUtz4M2JlEvpElMcTVAZMYWeqwuONltude7cS2bdyz5bwIv69K%2FfoFrCtbGMHBowcb7a49bG5X4cjkjT%2ByusezvmRVCqRJRqlcm%2FsOrUgW3CmLd0MjZQHbYBLsOKIWCJN9FgeVrt%2BsOCYsNwyn0oQoWf1NDdx4XlYvOZoXXiGu3lGc8AIkQeJLn61xIFCoVhBeF5MickXbmE9ekdy3oSzuFpO80VXajKUdpuClfG4NwK2QHI0hTf0MNeenWdOebRZfpBhJU0RG%2FeY6Ig4GRePfZgt8XiH%2BJtFlTHoqJbN1iKJrhhep2Lc%2FIbLSVdc9W5De4IkvpJoWZiv3D7%2F6Q%2Fp3JadoA5z%2Bcwjm4AA127lBVJ%2BxtvgN4dd%2FstAMaG3W90h%2FoclMVz4d0rNK45yCDNkXImBi8x4yJIaShRsmR%2BbWwjLKFeMUZ%2BvjxCa1oLgoxflaozPxZPAOu3fJFsrl%2Bg6ME5BIYOUNSnjrQ2cCYoq8dacVNFdcVirmeSBhiReKKu93JP2ELmOfxAcg6LoqM8yIXGqfQLlnS2WTUt3IaUNRjfyuueJ%2Bwb92DTS1xc5eEG3b%2B%2BIz9vPU0kWD2E5ly%2BR1itMJrsrcwGOqUBNMUHkngFmZ%2FIgwKwO4l8m8pn9cRQHMagsXQjStrGUqTPt2%2BNyVCCCiFMkVQ9rxA%2BGCCKqN%2F4TUMvSx%2FYTcz%2B8%2FACaocqpO61LVQzdaAFD8zRqs165WsczEiwmb4y46D83PxL8AmJCByXCzDZSWQWvqZszSawkwrj8feIctG61VJLf2d7iBgw3F%2BOrEZfvHgfl2Tuzy5iMaU3%2BOvR%2FPX8Qu7ehZf9&X-Amz-Signature=590b0178d3ac62b8b03d2d8e67b34073600b211021e71c96e352f9adcf22909e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T4VUZZN5%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH51Q6Ugzx6SnNz%2BitudFGQng2eEfNBLUSaQGqwQlnxzAiEAoqSzwv7z0EWYlpqZb6FvLAzV0QQimSP1qg5ulGGVRTsqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOIA4%2BGqWnVhbFLXgSrcA4XL4x8viM6%2FiQ9oG7P%2FjDUTCSR6aYXEBwdHRUtz4M2JlEvpElMcTVAZMYWeqwuONltude7cS2bdyz5bwIv69K%2FfoFrCtbGMHBowcb7a49bG5X4cjkjT%2ByusezvmRVCqRJRqlcm%2FsOrUgW3CmLd0MjZQHbYBLsOKIWCJN9FgeVrt%2BsOCYsNwyn0oQoWf1NDdx4XlYvOZoXXiGu3lGc8AIkQeJLn61xIFCoVhBeF5MickXbmE9ekdy3oSzuFpO80VXajKUdpuClfG4NwK2QHI0hTf0MNeenWdOebRZfpBhJU0RG%2FeY6Ig4GRePfZgt8XiH%2BJtFlTHoqJbN1iKJrhhep2Lc%2FIbLSVdc9W5De4IkvpJoWZiv3D7%2F6Q%2Fp3JadoA5z%2Bcwjm4AA127lBVJ%2BxtvgN4dd%2FstAMaG3W90h%2FoclMVz4d0rNK45yCDNkXImBi8x4yJIaShRsmR%2BbWwjLKFeMUZ%2BvjxCa1oLgoxflaozPxZPAOu3fJFsrl%2Bg6ME5BIYOUNSnjrQ2cCYoq8dacVNFdcVirmeSBhiReKKu93JP2ELmOfxAcg6LoqM8yIXGqfQLlnS2WTUt3IaUNRjfyuueJ%2Bwb92DTS1xc5eEG3b%2B%2BIz9vPU0kWD2E5ly%2BR1itMJrsrcwGOqUBNMUHkngFmZ%2FIgwKwO4l8m8pn9cRQHMagsXQjStrGUqTPt2%2BNyVCCCiFMkVQ9rxA%2BGCCKqN%2F4TUMvSx%2FYTcz%2B8%2FACaocqpO61LVQzdaAFD8zRqs165WsczEiwmb4y46D83PxL8AmJCByXCzDZSWQWvqZszSawkwrj8feIctG61VJLf2d7iBgw3F%2BOrEZfvHgfl2Tuzy5iMaU3%2BOvR%2FPX8Qu7ehZf9&X-Amz-Signature=590b0178d3ac62b8b03d2d8e67b34073600b211021e71c96e352f9adcf22909e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJ4264JE%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICXdWM%2FFGt8khxAV%2B1i0bbk6dFzv6bxUtSjApS%2FeE7XoAiBe9afu0W21welvyGxpnRCp9At8IjUNgh3Oyr%2B%2B1FaHtCqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMhnWsHEY9CANa1rFVKtwDjblPpmSsrvDOqxXI4ZdSf9%2FkwmZOtZS8HtWGnh6rQ24FofVbwwT8pkj2aRx%2B6wC89l2O0rVSRySxxL6qmX8IunorIWkBphcNBaDU0uT2A%2FDMFhMsDWoXlscRGWFlL%2Fikoq2yGqoAC%2B3D61r5TG2oMQT%2Fpa5zwyu1ZNJUEQBWq70fsFWCSRT2VDhXMyWH7IMsYZPm3FrG7JSYzKC9nKQjnzC1pZdVFPnVLVHkMMwAWCfFdRJMQ6zoG%2FeCNefAnvbDZa2tZg83Z3dGQETe%2BLwgfzKnJmt%2Byfk%2FL%2F3EJU50t5lQWiDp3%2FiG%2BdqA11eGnVif3jhvQCMeyI7Ma0q3qUevyuUU%2B2DTRjDltotSm41fKqhIxleXaHIJOqVCDniSMMPPFH3dnLum5SPH1eCjQDDGK86aS7frKjfXBRJ8PpF3k%2FiwC4mIfZu081ipZp2maCL1grDrCLOffdpHLis7jae%2FdOeqTxhQy%2FR9Qfp%2F55Vhu5bcQQNUKUSiQjtBMFjomfAPsg4uAW89GBwoK5aWDAHxgtXAYpxPYWREx5JeY83%2FNmKyD88CDBdC%2Fq4zMi7R7D1AYwEwFL7acudfrm8HA6lCmFYL1H6iWujyzQH0ouzfZ%2F8BVta1r%2FGNxdhBv6cwjeytzAY6pgG2Br43WLnL3YlJgdbmEqZIdT0l%2BE%2F5%2BvMPKLb53Q%2BpEC7QSlP5vpByXDRg8%2ByCzZ09H80sAjbyI%2F4xY1stBZkH0KXZStW%2Be3U6gszz5oyLCffpsQ6mId%2BFye9d6mpsz8OVky3zte8AVZWHfcdoJ%2BZzsD6tgLfKZsR2rZIbp6W7BawXB%2B0SuoY3LA%2FskOzfSFkFtkCc0PUaWrc5B09R9Uj4godiK5rI&X-Amz-Signature=0ba320b3d627ed238e043b48df8e6a67744777e9fc7d2464c18cc022ef6665a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TE33ZYTZ%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEheiyWrE26IEcdLOOnZdSsk6yk8GUUIK5FwKvIgLy0gIgYGNpGU36xWv6PrWquwKqjFF%2F%2FanYz0zKdAt16ymVCk0qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIrODY38ZSaIOCPtQyrcAzzxcmD12HgzgAHI%2BzBajNJy%2FK6tpW4xftdEny5whvohO%2BAGSD4RYBDCnCot%2FaPXTamNNXrdeylcDsj8XBijD9JQ9OWqMKNI1G7EjHiaTDt9JV0ydXGbOU%2FvDaJUKDYvSE7fxHDMorlzwamvvKVe5V9bM8K87X%2BhRDSOG0cF41A8P%2FdFUAb8JfUXKyiWGqxzJNXJKRVt8hEOltRQaoPsjkj1UOaavkesrjzGNlG72Dlk1wftA4l5XUornv7jU99jtMwa4SYRy%2FYatHzvCeje8ZbSVo4fG884TOBZf9sqi9R8WzeGWGwNVaeziH7WdmI8MDhgHzSwUvLQRbZGlsp32Pz05hWMUNblYzlh2HHbUi9c8n0jcUXqssq2U1hkMMtXJw51hCEmlAQlEm7oEM8GjM0gCJfE9VUExnPVCV7qR5XWvEMM3neReC5Z%2B%2BwN6Vphrwb1F6duPh7Lmwu%2B6UO5O5wdtQxvG4BXy96eHaB%2Fm%2BZ3sjTu0NUHoGzDBg7UBqaLgI4UpVXRqGQJoMRhNib%2FJWjSOER%2BajD7sSajFyW%2Fa5%2Bz9kKh6rg0a44jAeLrylv9zWDVhSPMoMjeNKXoA9Y%2BjSWfkGWZ7BH20i0ZPduXExM3FMR1nkxA1byZVwNdMKPsrcwGOqUBORLMbgNBBwAS3r98pWn5mzZ1aP9QmxQCIe4WR5QVfS1QgEu1ANsSWRggMB7AKqqcnHye%2BlF8WQ9uVYPaVZpj5DdYOpSC2Kp8%2FfdY2Pzup2EatD8wVC1BpVdQMf0sV1ujHs5uoFNrWorpiyb4eq3IS0q9jZePvRW3RaXcyp7MV%2BnQbOoPKI1AixuK6mDSiZxhawyR%2FY6qTLQBq%2BJ0u5%2BylIy2TXR7&X-Amz-Signature=4c5e3bab46147590958969137365ab4b18e02c0a7b974af11ba7eef0b707f3e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TE33ZYTZ%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCEheiyWrE26IEcdLOOnZdSsk6yk8GUUIK5FwKvIgLy0gIgYGNpGU36xWv6PrWquwKqjFF%2F%2FanYz0zKdAt16ymVCk0qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDIrODY38ZSaIOCPtQyrcAzzxcmD12HgzgAHI%2BzBajNJy%2FK6tpW4xftdEny5whvohO%2BAGSD4RYBDCnCot%2FaPXTamNNXrdeylcDsj8XBijD9JQ9OWqMKNI1G7EjHiaTDt9JV0ydXGbOU%2FvDaJUKDYvSE7fxHDMorlzwamvvKVe5V9bM8K87X%2BhRDSOG0cF41A8P%2FdFUAb8JfUXKyiWGqxzJNXJKRVt8hEOltRQaoPsjkj1UOaavkesrjzGNlG72Dlk1wftA4l5XUornv7jU99jtMwa4SYRy%2FYatHzvCeje8ZbSVo4fG884TOBZf9sqi9R8WzeGWGwNVaeziH7WdmI8MDhgHzSwUvLQRbZGlsp32Pz05hWMUNblYzlh2HHbUi9c8n0jcUXqssq2U1hkMMtXJw51hCEmlAQlEm7oEM8GjM0gCJfE9VUExnPVCV7qR5XWvEMM3neReC5Z%2B%2BwN6Vphrwb1F6duPh7Lmwu%2B6UO5O5wdtQxvG4BXy96eHaB%2Fm%2BZ3sjTu0NUHoGzDBg7UBqaLgI4UpVXRqGQJoMRhNib%2FJWjSOER%2BajD7sSajFyW%2Fa5%2Bz9kKh6rg0a44jAeLrylv9zWDVhSPMoMjeNKXoA9Y%2BjSWfkGWZ7BH20i0ZPduXExM3FMR1nkxA1byZVwNdMKPsrcwGOqUBORLMbgNBBwAS3r98pWn5mzZ1aP9QmxQCIe4WR5QVfS1QgEu1ANsSWRggMB7AKqqcnHye%2BlF8WQ9uVYPaVZpj5DdYOpSC2Kp8%2FfdY2Pzup2EatD8wVC1BpVdQMf0sV1ujHs5uoFNrWorpiyb4eq3IS0q9jZePvRW3RaXcyp7MV%2BnQbOoPKI1AixuK6mDSiZxhawyR%2FY6qTLQBq%2BJ0u5%2BylIy2TXR7&X-Amz-Signature=0efce20b9b7c00aaf182f5ac88bf87248c73394e6e486c771154d51f3c117f99&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7JTW5OY%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCrnKFWrL%2Foh1BYnxd4Qd71E7f10sXMo8VURvJEYFvWiAIhALBqvQTXMfWr9kLE97%2BNUZQnyK1p311kV1%2Bu2yxuw96GKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzMEtnfWOeyovi4Rcq3AMuRn3qw%2BTovLb4pPPp1wPwoT5ynLm%2BrUzHkWb6Fi2P1oBfqUXH6ffosg78OLPHewDIVIeiLuZih3jMY%2Ff7S1nrJ2dV7apao0%2BblqBl57qUkaXJZMAPZRZDLgVJ3PRlhm8QyeFfKjKvk%2B36V%2Fu8y0lQ2ah3r8aJ%2BNHzKlrPmdHl%2FQuwut2%2BD3gC6BR2Qk6dH9qUgc8%2FK5uRc6UVM6DVV%2BMiNwrLtdUcE5l%2FRB1v4En78xlgqDcKzdxDVU7zFrlHE0CWdJwrmhBVHpYK7DISf6O1xbwCGOgWzWuDXrcNI7zInsJdD34ytUVJf1Ny4tGX44ZUuX7a6xecnKYyJjPkvszNbFOoRGVlwe%2F7VBl47tI22RBI1ET1D3AfQVss4FVwSH2SOwcm9GKKnUhi9OmuQl7b7GKbXEUSd6TRvAo%2FEdi0tpI%2FtBcxM2y3zvJp6miyYMxQAF8hS59S31C7RCF2drPj99U%2FKeXwk3X9juEopADgOuEmUVAlO2WC82whsC6xXdwsLik%2Bu9lG5Mddz1Fxag9v3YN4JOy30dFO%2BXfi4CWR2V6GCjVoBm6qykvF1oKbcKHc%2BZa4HRepXtUReL7W8obeK%2BOfDMcA2Ges%2F2sdemek4Wd0IkTThJ1O0wePPDCd7K3MBjqkAcS5uaLeQP0HZyTel2vfwyMT0MA13DexdE8Zex9NzWbWahO7b7OtvpF%2FiX9X2CFOgSevSzh2eu1PvllXeOhN6hVD%2B194jAOSqOTtM863tS8bOlBWW08Vw%2F3DDSwmIOLmUGFbVo7LHKfMqz1P66ignLiYsr2Gm0SJsWRYfSy%2BSS%2B%2FaPtl9dVBPxdIZC9v0QnvSuSYQJwJJKONeE6%2BVWMzD4LlvTLq&X-Amz-Signature=02412c355b8a2e11578d3a339e22f72385ebad158bd24238723371d2397b4762&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFRFPQXV%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCSot8SBgG%2BGA%2F5YAFnk3xJFZMMTUp9jkEa4N8hrzk57QIgDS5hyJdOZ0qttxklDUMukCrd2skII6ALe7hd0wySSfQqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMH9ZhSZyqZh9HHxzircAyQ9mOL%2FddntWYln3mKiuL4tC8X%2FcWOYMkKHXcxOQZHyM2wkRErvOWW5OnLJlH2k1CsiX8seW2gSH57xo5SsmhRincdqfj6U%2FUHBHVuZvxEeTRIP0feKyN9hz6YHI%2BDDUYF4az30I%2BuJaxiVQy6G1kSCENtpfMUOMlz%2F7wGYyrXje08hwptyux1BwgrNpSckA1Yp3Kq6fL0dXyXrkrrUJRorhR8R7KSgz77dDfL6RT7ID1RAa8D8qm4oHa%2Fjoehh7ew1z496MiLf37fExMnUROqhZEHcR8hN0cAUBmhOABHe%2F%2FmZGjA0d%2BwLrns3zos9ScUYoNSbuTaD518sQo52xqMuIoI%2Fvjkodm0n6iQHKWl4zdD2QXp3NslLBXLIVyyGwC%2BI%2Fvmz24t4%2FHFJfr8BbQD6HmT6lrw1Jziidmw4zWW9%2FTFu%2F4pzeGHutGLMsh0ZxwikGf0bJX6qnB5VBQeezJFrph5pxDr8NuiiWs3AwZ8AlJxAZgWtKVi73HW99uM%2BsLu%2FYmQWHa4%2BkndDYVprX7KBV%2FxH8CudzjCu2667n6oI9lbXApzgvuq3f98LBEwUNqRrvNc01zQtr84QVZIzRmFcRVcgq4YRXVNaoz4uFSAyvhqNklErXzGWzMW8MK7trcwGOqUBTfwwGRQzb%2FzCmjdz8S3kXUZZnx94Rhgw9Qj4dL%2BsvzCs6%2BbJX%2Fz%2F3Z%2FjrRNDb%2BNCycO%2BV1vcrn2W9EbeQiRw3PF7NwRTsq%2F%2F51u7dMcPZtHDaygXLMnMZ4SvCBupiKnyETmpxuar1v5H7nSaN%2BceqlHeQrnU13n306KmjsNPXnlg2DZmKHLBIzAX7oaQANpulXLwiNnC9Nuq5qirbUsK%2FoKF04qp&X-Amz-Signature=acb539827a6a59363a81f42fa17d1db8d4c4e1b134ab16bf49837a47a6ba9ba0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HJM4XMB%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCjD7uI1yzwh7iEcWg0fupZ2YZBKe3XwCLRJvzU68fMEgIgbCT77vQedwXFDa1Kr3Y6ZSqCJ83Kg5oTMvE4KvpsSK8qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDADvcvF%2BH7DjS696nyrcA45Z78Gn2U9nN2XXNsp75AbQM8FX2l35IQusPCOXuAaNZTL8Oo0vGNnv1%2FqVSiWCiditEH%2FMp7Dj9UvwDtOzYkvIFjGMunHQm2M1tCh6PZWpyJaa1bl9zPgBaYXZJWY6Plcq1857TbLwJ1hGlEkoYeUi15qRF7iiWA5soM5LJO9qmLdUYzk9WO1PzlaMmIIemZY%2FuMiymbOlMc4tPSmrE%2FgA1l4OEN%2F7ZFku4bV82zYqWt8Xkf2QFvwtFcvWi3N7gdtHM2Jk4yFKJQY%2B2Aac9GyLvvgadJw27zyTZvXOdScp8ejlrC9EqqH9wmIhJQxhCSDASqltEL2PS10s1Zh6sWb72MD3%2Bu6I29WopHgPcy4vXqsXWmdwJTEjDRRGTbfMse%2FqawiMLYY9Bz1Bt8%2B0gga0wf%2BIctn%2B9TrBDg%2FjCAgZfP8HT4pbpcUXYokLHOa451kOid3Oo3B7P0dAzaw36j3ehnfSJfxGCueGlSDxjNcaWvH7r1dznTvXWTgA3NSeYXqfrae2WVBmWBj%2FSZGsZjsIGhJ%2BRapS5fsnGoJ9L6QaHTvkdx%2BjIYVAreWPUa900sXUDbW8G1VzOluEmcYx2%2BrEjsgZmiRGNm9t2U4UwXtbSCZfydaFNIgJ02jBMIrsrcwGOqUBBThgNx8VL6Lx2OcPe2zR1qXS%2BIEE%2BXskCTg%2FG47OSmWNxVVuWIsUbz85FR5N7IkX9LCS47Vdhbu13jEkcpbL61%2FWJ6FZKthKb1okUM0oQkrKwB7NkqH61uaJwV2q2anOlLFnJGIvAJf3T92H1wPWy2mu5xoXbwHQo67DwhqJHHNTnABRyaY1lkfvgPWSp1L81dp7LkORLwCiTEbP%2BbojBc6LFRSK&X-Amz-Signature=0e4e2b827e7e3d6fdcf2f2fad496e05e935f2e4ba9c6b822f284e8e64d9439bc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ34D2H3%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1ma0Ur6ydXr519UXZbscyGHzXvcuKYsTovWb1kazx5gIgKGjRKgucvaGYm3hhpTZ1LxNXAjJ7CW66stzUBX8CS8sqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNnbeKMHRCwx332bAyrcA3OF5dshSjQ9frulNnGmaLN8YUjON2DoE56LgEqpHrmm%2BfcxvCLzMbKjkYCegnrpjheqYFZ4qk11sPkbDmRBh4QEk%2BUpM%2FuJK0zKf9n9H1M%2F0l8lFXkfqrZav8%2B7od5bzFmsOnf5btjgbVaU4KDm5%2Flns1jw7gMei%2BpaMiBd1KQSH3CQy41n%2BKZX%2FMA44ynDeBxi6F1JoqYy6wciyT6ENShuN2esUE3E%2B0xyCYAVpKfpQmQYnUAxbFWkzaWk9DQZ%2Bdb4QofXzhTO7M64vb7pIwCiQmTvVbFhwLWpP6waJD%2FcYNWRyWDzCvB6STjVxNJ0vYehwH28KUrLFlnJRBNSTNsIrPJ4gjiI%2BYqs0g3NM1T3UgL6WgIW5TWtnJ3O2g7QzD7UqG%2F%2BwHbPgPwckLj6BaEAXeVDz0F%2FhP%2BYTURSIEpIvy2JBCNDRJXistZt3KvUyoZiUIcIXJ%2FYIvDtYKBC%2B5ruHC9MJCf7%2Bc8vpddYWCWNZqkLF90kBTszGyrareAl%2BoQCttuvlqO%2BtV9kuWVOfS2Lt9eZ9O%2BnEMe%2FiXuJViLMyOKdPW7rlbNAJRLwPxCTORYmVj%2BRDsNFvPaTwykbbvZI79%2BlksXN9v%2BjbUzZcYXPSdWmXFCoRamp7TlAMIfsrcwGOqUBJfCG5oPP7bdImbjOhaX7Dt3STFg8%2FnxbRQugpIJ6g4wVHcKW9HxmPR3SoGaj9jYXCpAj8PIQiiB29lNib%2BU7WVcf8q86KJDtFocSm83BocOT%2BO7FfvYgTkurcvHx6ivxBNRSKY7S3T4ebgxBar%2BI8ihVIMvkP1RNEgwgCWUxZ0NFpkMyCWoMt4E%2FeLbRKo76%2FUmZNh3Yb2i6IFaKsGvihiWT9m13&X-Amz-Signature=3b58f535d2699675ba105c840d6689b2c75a650469f6d5090d985a069fa15350&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJ34D2H3%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1ma0Ur6ydXr519UXZbscyGHzXvcuKYsTovWb1kazx5gIgKGjRKgucvaGYm3hhpTZ1LxNXAjJ7CW66stzUBX8CS8sqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNnbeKMHRCwx332bAyrcA3OF5dshSjQ9frulNnGmaLN8YUjON2DoE56LgEqpHrmm%2BfcxvCLzMbKjkYCegnrpjheqYFZ4qk11sPkbDmRBh4QEk%2BUpM%2FuJK0zKf9n9H1M%2F0l8lFXkfqrZav8%2B7od5bzFmsOnf5btjgbVaU4KDm5%2Flns1jw7gMei%2BpaMiBd1KQSH3CQy41n%2BKZX%2FMA44ynDeBxi6F1JoqYy6wciyT6ENShuN2esUE3E%2B0xyCYAVpKfpQmQYnUAxbFWkzaWk9DQZ%2Bdb4QofXzhTO7M64vb7pIwCiQmTvVbFhwLWpP6waJD%2FcYNWRyWDzCvB6STjVxNJ0vYehwH28KUrLFlnJRBNSTNsIrPJ4gjiI%2BYqs0g3NM1T3UgL6WgIW5TWtnJ3O2g7QzD7UqG%2F%2BwHbPgPwckLj6BaEAXeVDz0F%2FhP%2BYTURSIEpIvy2JBCNDRJXistZt3KvUyoZiUIcIXJ%2FYIvDtYKBC%2B5ruHC9MJCf7%2Bc8vpddYWCWNZqkLF90kBTszGyrareAl%2BoQCttuvlqO%2BtV9kuWVOfS2Lt9eZ9O%2BnEMe%2FiXuJViLMyOKdPW7rlbNAJRLwPxCTORYmVj%2BRDsNFvPaTwykbbvZI79%2BlksXN9v%2BjbUzZcYXPSdWmXFCoRamp7TlAMIfsrcwGOqUBJfCG5oPP7bdImbjOhaX7Dt3STFg8%2FnxbRQugpIJ6g4wVHcKW9HxmPR3SoGaj9jYXCpAj8PIQiiB29lNib%2BU7WVcf8q86KJDtFocSm83BocOT%2BO7FfvYgTkurcvHx6ivxBNRSKY7S3T4ebgxBar%2BI8ihVIMvkP1RNEgwgCWUxZ0NFpkMyCWoMt4E%2FeLbRKo76%2FUmZNh3Yb2i6IFaKsGvihiWT9m13&X-Amz-Signature=a47f5759217431f94447d2ad223329a12d8c5479a775f50ea363eb2c4abeb16e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W22DQR6W%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184619Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiOAlYphbO%2B7XG5qgcS0nRfpgyckuB4EM6DlEehpG9GgIgCB5vq%2BvTUIjTRi2uxjFi6u48vW268tgP6FZIZf%2FS5YYqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFsJkbvospoqnQI5ZyrcA6yWHjcbP04k7c3ZOex8vbrs4PEL5Gy0CpLf56f8hwhditIj%2BPdMtvjZe2Hmz3WS0jETUPqVU%2BMa7NyRrSAUnJZ2sEO2tFbLA7MxUk7Cn%2B%2Bs7NPgh%2FyJjhlvZnPiC%2BRZpy0YVx%2B3vVTlqMXgRLiLJ2K5ICQcUrnWWBQnwnLU8Va%2Fcf7piEacOeQTOJTXo7jaVrke8UysbrIzgBLn7jx8XPPbCy7xyVA9kWQNi8ffBPXhxJCYeFr%2BW3ggepydSTfws5PbTzM2kPpZ9ObZJPDLcsjwSPEXE2VkevN6O%2BuGPbJIyJb%2FsRKzt8ZJZYm%2F1Z%2Fwoll1%2Bqu2ZQxbfmvfRstsooLyALCEBKZtGyLBEtI3SMGcCaCMAHtmMS%2F36DAED2mm75vlokmewlCx%2FIBW4ZYi%2BSoXgxfGymbFtpgvtbbtxMH4gL5ZZmf3YrK%2Beh6Tn3D0XrZ3JNgeW31fYsdWxWCvNQEZBftCLbl7Eoh5RGibQw4ZqBOtZrDf%2BuECQauz5TsFqrpTuagKEnG91PS9H79o9hGWYEsWmF8eCIebq9zwt9vAeYQyw2%2FZbIeKAmuqZhRjaHqc9ztNhoGsz3n%2FLUARcltjC%2BG5I7ofLQmklCLQjIfspciui80wU3HwxJW9MMbtrcwGOqUBTj3bzPjxiKvHE%2BjM3rXtxNMQapsSAGIhutbbB7WJ6bwwKpiCikeVYZtm3Lt8mMxFe2GRs9SaF3tKGpmXNsRPhK5OPqofBSaGs6NOMVqFub%2B78xw4BZ%2FVm38HvSmzV5Ty7ZS%2B%2B%2BX%2FgAD4A3tcTudPEPvyWv2kCBnBfdr1%2FFgJ70sSc2UUkcXG7qvse00CoMTveP0tZGdYzO1GLQ8YwsTBLdg1znsH&X-Amz-Signature=80991314fd2b8f4839f9d001ca32eae36833c4c5215460aee0954f658eb2fffc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZOSX6EW%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtQB7hw6SUBZBPeLtyD60XL373l%2B610Bus56bTWmmtbAIhAJB0Uo99AMg8T5m7Rtxinr2HnHKA2a5qKuy%2FUSvjvEC5KogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2B%2BjbOvLf1eskX%2FOEq3APhDqBMancSU8XR9gazL4ZjJRe3dbJu5rnJ5fw935Yf4nXTIpvibgkUS%2FaoBQq4mPvp7Uq3NoELK8ZGUpvlRGyWXyYHtHiSZbIyw%2FyRDXeZBymXAKwZPmgr%2FDEQrxe5d0MMikhI0nwfsh3b6yel8SB0xUeZ1rRngC%2FNBDu7qOdfXTOfNjYYBk6nTOe9vyo8Kl3yS2H%2B3B%2F8TQC06fybl5spNyUNwG7qw2My%2Bu07kPHxIM3BrT9K8R7dqgEOBcSsqE%2FKlClsl%2B4L9UUicyqBqKMDahdybtaiMMgiVK9SdKz78xgGmkIhGuO9ejAspaADR1kK4hT%2FHgjTbPsK%2F9dQI3cVb1W8nyqA3JJfT%2FwqTdicuSD6HgkDzgt1AkSxPfgWcVRY5AZHOrjzr4pY%2FfXLlcIDd7hfvhpLjrknEFSeDUGmK73Hw1tN6GFu5jIIyl21mSn7BcvEADnWWPuSQrykdyZ%2Bl6WAACSGrLL%2BRVpYBRnhjUVCeEs00b3IQ8j8R84u26J0uz6lFTuyQuyfx7r82oy6ct2qEukFa%2BcGg3bcmQFGmeA3LmR3UgO5rRZtzqRXY1a5aZl5ctjBNTRWoTxYQqiNnR4XaXjDukvvfmLPO1qN3n5VvzjxqRRX2MPv5DCL7a3MBjqkAbMfFDS9JBstkTYxIw%2FKVvtiikMYEgLltQ%2F8ka0RrYnI%2B7ezD7LdefAPr633Eo5rOoOQiVn7VBmo01VvJJza13ucjY%2FaYVysxpz5hHWJw2C1LvlqLwACt4nrkR73Wtygpqd6wcFjFIY14kyDDLOSp%2FBNqcyXHMBHvZG4Nh0p3zUcZziheYLZNqR7czLBxyVcma%2FmZbOrp4VNxjxdKM4adXHIWygn&X-Amz-Signature=71dd66aa86c56477e9e380c2982b9a53226c71a83a5f02e142e8aabe9a877e59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TZOSX6EW%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCtQB7hw6SUBZBPeLtyD60XL373l%2B610Bus56bTWmmtbAIhAJB0Uo99AMg8T5m7Rtxinr2HnHKA2a5qKuy%2FUSvjvEC5KogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy%2B%2BjbOvLf1eskX%2FOEq3APhDqBMancSU8XR9gazL4ZjJRe3dbJu5rnJ5fw935Yf4nXTIpvibgkUS%2FaoBQq4mPvp7Uq3NoELK8ZGUpvlRGyWXyYHtHiSZbIyw%2FyRDXeZBymXAKwZPmgr%2FDEQrxe5d0MMikhI0nwfsh3b6yel8SB0xUeZ1rRngC%2FNBDu7qOdfXTOfNjYYBk6nTOe9vyo8Kl3yS2H%2B3B%2F8TQC06fybl5spNyUNwG7qw2My%2Bu07kPHxIM3BrT9K8R7dqgEOBcSsqE%2FKlClsl%2B4L9UUicyqBqKMDahdybtaiMMgiVK9SdKz78xgGmkIhGuO9ejAspaADR1kK4hT%2FHgjTbPsK%2F9dQI3cVb1W8nyqA3JJfT%2FwqTdicuSD6HgkDzgt1AkSxPfgWcVRY5AZHOrjzr4pY%2FfXLlcIDd7hfvhpLjrknEFSeDUGmK73Hw1tN6GFu5jIIyl21mSn7BcvEADnWWPuSQrykdyZ%2Bl6WAACSGrLL%2BRVpYBRnhjUVCeEs00b3IQ8j8R84u26J0uz6lFTuyQuyfx7r82oy6ct2qEukFa%2BcGg3bcmQFGmeA3LmR3UgO5rRZtzqRXY1a5aZl5ctjBNTRWoTxYQqiNnR4XaXjDukvvfmLPO1qN3n5VvzjxqRRX2MPv5DCL7a3MBjqkAbMfFDS9JBstkTYxIw%2FKVvtiikMYEgLltQ%2F8ka0RrYnI%2B7ezD7LdefAPr633Eo5rOoOQiVn7VBmo01VvJJza13ucjY%2FaYVysxpz5hHWJw2C1LvlqLwACt4nrkR73Wtygpqd6wcFjFIY14kyDDLOSp%2FBNqcyXHMBHvZG4Nh0p3zUcZziheYLZNqR7czLBxyVcma%2FmZbOrp4VNxjxdKM4adXHIWygn&X-Amz-Signature=71dd66aa86c56477e9e380c2982b9a53226c71a83a5f02e142e8aabe9a877e59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZLLZGUM%2F20260210%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260210T184628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCyme0BJxk5yoiTGrAjolPvapCeHzRy01DtTNXuaFUbtQIhAJ7seju7onxfFy35NSXe6lpxRV1O46Yb5JdEdQH29a3qKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwzFCN106OimiSr0Hsq3ANi0ZWhS6gVVI%2BUmbXVYAxWSeYmKC7tC8tq5QTpElZReEXz0Pv%2BLiab%2FpciptMIVFSiVR5aHrB5It9EdkrcsPmzczKIB7WAT4YfKEUDdJP6UoLToEKPWcOefBIL251Qpo5allxfn9N1W4BveR9ea%2B8seQgZk6%2FO4RkHH%2BBE6xPxMOuCU7DlMgGRdjzVnvLGyvFbyz6Le0aP1GD%2F5ilWN7qOe7GQLFNGuM0QHjERQlbf01xKZVx0JjXeFuBkCi5oTXwDwqyDutuvtaKPUWj5KygrPnD158etaIE4j%2FKR6lqt%2B%2BnPHLQG2CCXfbOLuzeTyHo00i7VQcCxvryTKpqUbwT3%2FNfge6TBSsrNmjcjtFZgLhyAP6y72ctTphCcinKxEjJbwcnQTZpg1GSL6IkDjt1Sy1kawvouqRawM79P%2FfruIDIPMfHRTkEvL2SWrF6lXyGvHZQlS2GbSCo3r6xHaqxEc6iGr7Lc%2BxfmeQGeUTNanm%2BwBu5Nb3Rtif%2BIJCXsfhOSqvC1aZt1MHF%2BianiK1YfZhj0fdy9UkrbMEiqY%2F8aewblkBZf4CWEdRdA%2FEKksLuLtzxSfqacx4uK9igBCpupTNCV9sxHTfSxd%2FjCUxCm99jGGcrHIXXW11MYiDCP7a3MBjqkATb8acLvRH3Z%2B7W2LpJfvbWKuQ11uO7LWYss5ONYWVe%2BvvPEvtcKjzSB%2Fx98CEksoHQ6IQCgXNKKsDvg4fApJPPOd45OdH2UJ1mg1l6HiQvXtSFecBImnF8pRVzpc2Adbh%2BOeJL2tkCVSM6TpDlOC1b4FoLee3BLEIX56chaqdQWdmF0fUdIsWiwcC%2BQWWYQg6rODs8XfscXrRgPuvLgsHhCbxDi&X-Amz-Signature=7be0815c58038867795931623fb28e0f7086f26c0da926bf7d50e74bed5530da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

