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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGACSLTB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQC10yQYhmCntqXsviHS5Dp3dl40K%2BvYlJLvX9MoKUKbQgIgLIIf5pc%2BjFxLYyUnuPXirzCWG7dDyZ%2FKr%2BtSpX62ohwqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE5JoEZ71yVcC6GMLSrcA0x7yOOvLdIhxNe0LOZ8u00wI9XtKCUlX%2BVfVQB8L4XV4dTryPlruAB%2FuhKMZGYddAopUCuWmcnTU00NpaXrC5ehH9YmzBoW8sFWhH741zq%2BR%2BVtrGjZhvCTG%2BAJPwH5kGs6fIr%2F0y27kO5xbRdmoYmLOef0%2FEBKh%2Bg%2B40cqugd5i%2FL7zDi1jWxRhhW8rfAUPXNsjICGnT8GpNHtnZFqJS2kmGy8MRZ7EakfZFbN7%2BPSYrAmeFZFTIpxwzH5HeCdhs%2B5lr%2FZ0k40VBadWzyf%2B5h6FnxzXzccsqaRL%2FFjUqOqqJBD0%2F0Rco00aePb%2BAcFn2eKU8ab6IkkC3N9ltjcFyCb1km1j7HpNWbNWzMR79nynvNYI9826uYmYa7sG%2BAIAKkTbvCodksQB0DLouqKxaQ8ar%2B9Fo7ndy51Xrplawu%2FW7F7BSQFk6TTEjN5biPvDCvR3Da4CpV1QA7LO348t%2FeY%2BiZge%2BDo6n1p2X8VDDiw1xp3%2BVTyuZwZmTN2s2muDzrYAISar%2FdQwHYIAo4id%2Fuxg4jIjij4SnUkygHl7I8hzi4VoWa%2FyeZ6HYs%2FgwaL59ykWi4XEI04rIhwPH5V9o34h97MWhB5qi5L%2BIR1962nBjkFxm2EkiP3QPQVMLWKpc0GOqUBCM8HdefoiPHxBzr%2BepvKuSFtp%2FerNUBRO8bg897PFH85ckU0YU3mJwwz88zgDqj8rsgz2E9HrK%2BEIBGUXyEakllxTaZx04XCIGFsOqGLd8qXwfi0NCbqAOsCAUIloDymQjT2Wte06H5mlFEYar6xV5JB62n3RBCCcC2sjv3PxIB05VWuBthLBtlfcu%2Blpo70sP85GNm9PN0J3XkhqaF2Z6qzziNa&X-Amz-Signature=029f0f930a046d689dd6908e64469799762b2f156264584176cb5683408f9126&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGACSLTB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQC10yQYhmCntqXsviHS5Dp3dl40K%2BvYlJLvX9MoKUKbQgIgLIIf5pc%2BjFxLYyUnuPXirzCWG7dDyZ%2FKr%2BtSpX62ohwqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDE5JoEZ71yVcC6GMLSrcA0x7yOOvLdIhxNe0LOZ8u00wI9XtKCUlX%2BVfVQB8L4XV4dTryPlruAB%2FuhKMZGYddAopUCuWmcnTU00NpaXrC5ehH9YmzBoW8sFWhH741zq%2BR%2BVtrGjZhvCTG%2BAJPwH5kGs6fIr%2F0y27kO5xbRdmoYmLOef0%2FEBKh%2Bg%2B40cqugd5i%2FL7zDi1jWxRhhW8rfAUPXNsjICGnT8GpNHtnZFqJS2kmGy8MRZ7EakfZFbN7%2BPSYrAmeFZFTIpxwzH5HeCdhs%2B5lr%2FZ0k40VBadWzyf%2B5h6FnxzXzccsqaRL%2FFjUqOqqJBD0%2F0Rco00aePb%2BAcFn2eKU8ab6IkkC3N9ltjcFyCb1km1j7HpNWbNWzMR79nynvNYI9826uYmYa7sG%2BAIAKkTbvCodksQB0DLouqKxaQ8ar%2B9Fo7ndy51Xrplawu%2FW7F7BSQFk6TTEjN5biPvDCvR3Da4CpV1QA7LO348t%2FeY%2BiZge%2BDo6n1p2X8VDDiw1xp3%2BVTyuZwZmTN2s2muDzrYAISar%2FdQwHYIAo4id%2Fuxg4jIjij4SnUkygHl7I8hzi4VoWa%2FyeZ6HYs%2FgwaL59ykWi4XEI04rIhwPH5V9o34h97MWhB5qi5L%2BIR1962nBjkFxm2EkiP3QPQVMLWKpc0GOqUBCM8HdefoiPHxBzr%2BepvKuSFtp%2FerNUBRO8bg897PFH85ckU0YU3mJwwz88zgDqj8rsgz2E9HrK%2BEIBGUXyEakllxTaZx04XCIGFsOqGLd8qXwfi0NCbqAOsCAUIloDymQjT2Wte06H5mlFEYar6xV5JB62n3RBCCcC2sjv3PxIB05VWuBthLBtlfcu%2Blpo70sP85GNm9PN0J3XkhqaF2Z6qzziNa&X-Amz-Signature=029f0f930a046d689dd6908e64469799762b2f156264584176cb5683408f9126&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664JFQE5DA%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIDFfTqi%2FctyjwQuV89%2Fnth9%2Fv%2FVMIlDoIw7WcxB6lovSAiAUpBSr%2BG8w7LGszholGH%2BGjzgneTP4eORN8tHHOobJ%2BiqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMun6MDGbLA3A87CwHKtwDijqTGzoBWRDBEv9XQUyrTckp%2B71xylIsIk5veSj8aknpzt%2B6gRF5uN1hMlrB1HuCzh9O62uuWJgZkIFpx72v2QPOLhbLgGxcuD9OneDHFNuzI9XlseZ%2Bu7eVTWuJ3Atdcb3MNKzuXNKaZDBuoouu6ZFPMkYzKxeMFWyCzLQozWntNfbgAfLHl7nZzjVukX%2FMc5%2FWuM2zZPrsNhsLsWw2JkG4FyYXPP3mTJ5BQwak4Hmh0%2B2o7AVtIsPGhMdlTkC5GKip6wN1VzU8iPKRtDumu8slgpA1y1OshRNktzRHUfRiQHRQm4Ob6a52o5E%2FopVG5V7NmxENCDFAruT5iRIpKVnErzDGGPDt7Rq81S%2BbRAK1KXxj7gMTycbX5L2Ct7FKX0QCxdIu%2Bjr0SHglWqptui1log6%2BFeymnFqn6QooaBiPrQShRT0biRvk6AZP1wTqOm4tEWAIs7fZF34HGJRt1h1iObWugEluCPo2aF7%2B3UsPt7nYh%2BAOePQ6PWtZ5oQ8VyGTcYpLceJehevLIzY7ODzOQ9mXfDUJTHNcVuzJEGBJw412WoQ%2BztzlPbBtyGvZmQcjZykX5aHB%2Fo33hSO8qj1IPI1fZO1uAtyRayiELRITs1B1d9%2Fgn%2FQDs5Iw4omlzQY6pgF8MNyLaQCTSnR0Mlf%2BNFzSWfcVHNyeqvNysWjq0uQdJO3gZw58nNaYB5qtKak13y3Xfz1TgBzeeC5e%2FcgoEBKq1s%2FiSf68F763Eh0%2B4ojbWHh7l42rGjZAhjbrT6NPYFj%2Bqf32KTPhvi%2F1dPN53VoYY7gb7HUnMAigHaxRSeJraXDiM2PM1ygElclhUg5Nmq2QSpzHo8aOe7ERutsvr6QavWwXncgj&X-Amz-Signature=b736f3d711b08df158d8c3b14e0d444bf9ee2f78aaabcbbf3a1497e7d566fec1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B4LJYNA%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDVXgh8AuO%2F0F74QQ31csn%2BcuIdH6iIjKu%2BrucehsL5lgIhAKYleLqlPMsdVNvz0hux4IC9DKo1Ij4koVFjwGuGN%2Bh%2BKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxlKlXRtyLqA3kigAAq3AP22brN13FsNcNViue4iELOXzYJu0nTO8WsfuTiK5JDJEa6eQZC0JUvZjXbrHqUgZO9ByYvFn%2BGW%2FG9ZZv7%2BF8C1wLN0POEkK8nY77FWFi6N6gwiXPV6533KCpvccecDfhQWCBC9XVNjZOkxnpisCmKYWGgOTsOYqtYSlrL%2FtCAWdwKpoX1AwXtJvm65ruQhm6LVUM%2BiosXtmVDt1Vcy8%2BWvK4%2B89gPvo67z0b20DwbGiiiwT0NPwSST9GuF5RwO1Go7gRA32G2%2BQTw%2B9RT2mL3qfPdLLzRprLqIxbMzdG6JOt5QwfKEBTJ6UqKlNQ%2FLMLon4GIuCH3845fxpqANwVfwZBMN%2BGCmqBNTvp%2BwR0jUyhBhaK669O0Ub1l7GGcUsPPMWpIXkUfFwVdfN5Ct3Jpiik%2FThE%2Fs4OPEJ8auRHn1h%2Bz8IM3KBdDGnxJ4Hfs8mtjyp8TM3hulAElnRZ7amnAaKRu480tR%2Fyrc4m1beMIZebu6qw%2F9ydfqROeDf8Nz588FBBXJFFLKa4adnBaVyprPY6vD1gNvBplRuMYMOa8ypX0N26s7DtfHKCbai2kd3htWK6WcCCGmRB%2BpC4CQmnK3f68edXnpgdETdbUku4gPkS%2FCbWGrbxljkH9BTDPiaXNBjqkAZICW39foiZF4jhWfkKHBfafcpFlv5Pk8JTF15zxHG20aaNu2l29W%2FYogXkR6V4tyJUWLB1HGcHRHClH98wS0RYcCMnR%2Bc%2B7l4HuPl33l90zp8YpbYA7aoo9xXjUJcay5bLjM4e33slN%2FlxMo2QGJXtJoGIyYQcmNGdsIBOewkLyHLw%2BMWhM19ehr3UFc9i7FkBIEHWZYbEStDc3xJjXZzqgvk5U&X-Amz-Signature=4535d7ba95c480e69c81875a1e13cb7c066fdd9810ee719bf74e39ad7f1ba6d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B4LJYNA%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJIMEYCIQDVXgh8AuO%2F0F74QQ31csn%2BcuIdH6iIjKu%2BrucehsL5lgIhAKYleLqlPMsdVNvz0hux4IC9DKo1Ij4koVFjwGuGN%2Bh%2BKogECMr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxlKlXRtyLqA3kigAAq3AP22brN13FsNcNViue4iELOXzYJu0nTO8WsfuTiK5JDJEa6eQZC0JUvZjXbrHqUgZO9ByYvFn%2BGW%2FG9ZZv7%2BF8C1wLN0POEkK8nY77FWFi6N6gwiXPV6533KCpvccecDfhQWCBC9XVNjZOkxnpisCmKYWGgOTsOYqtYSlrL%2FtCAWdwKpoX1AwXtJvm65ruQhm6LVUM%2BiosXtmVDt1Vcy8%2BWvK4%2B89gPvo67z0b20DwbGiiiwT0NPwSST9GuF5RwO1Go7gRA32G2%2BQTw%2B9RT2mL3qfPdLLzRprLqIxbMzdG6JOt5QwfKEBTJ6UqKlNQ%2FLMLon4GIuCH3845fxpqANwVfwZBMN%2BGCmqBNTvp%2BwR0jUyhBhaK669O0Ub1l7GGcUsPPMWpIXkUfFwVdfN5Ct3Jpiik%2FThE%2Fs4OPEJ8auRHn1h%2Bz8IM3KBdDGnxJ4Hfs8mtjyp8TM3hulAElnRZ7amnAaKRu480tR%2Fyrc4m1beMIZebu6qw%2F9ydfqROeDf8Nz588FBBXJFFLKa4adnBaVyprPY6vD1gNvBplRuMYMOa8ypX0N26s7DtfHKCbai2kd3htWK6WcCCGmRB%2BpC4CQmnK3f68edXnpgdETdbUku4gPkS%2FCbWGrbxljkH9BTDPiaXNBjqkAZICW39foiZF4jhWfkKHBfafcpFlv5Pk8JTF15zxHG20aaNu2l29W%2FYogXkR6V4tyJUWLB1HGcHRHClH98wS0RYcCMnR%2Bc%2B7l4HuPl33l90zp8YpbYA7aoo9xXjUJcay5bLjM4e33slN%2FlxMo2QGJXtJoGIyYQcmNGdsIBOewkLyHLw%2BMWhM19ehr3UFc9i7FkBIEHWZYbEStDc3xJjXZzqgvk5U&X-Amz-Signature=3147400dab1f709a8f15c25c528383dbde24ef3c07ba7056724bac0f6e6df388&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YHGGQGDI%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIBpn2zzhZMp3JrvmbkSaRo2Ldw2LzfGLt4mfu9wZ5EKAAiBrRR%2BHi46j9YYCQeVwP2aVL3PWkBz3ah0vVSdqvgO5uSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjWMwUbmG6BZWmxbmKtwDIX5ZeZyDCuiQzrlSZ5SVBMketO8KBls%2FVFXp897fkEYAxzuqyNI5HZj%2FOgMcLKHlU9pAlfpZR1BjtBDYGCmDlckjfYBr%2FocSHKnuy%2FVLcsLY0mRSAOMpXKlkqyfzkzM9VyOFpl8S1uf%2FECsjUtF9EZWRGR32N0j5TTA0QV3ODy%2FCYHbt8x8FWKmeXBv4eKSXc%2B1rPLwbpdVc7kBSZ8ydtIVuUgNpIobYrHnjsujgaedJk5KAGbJjjO9Z2lIdyHSoShb50QOpt%2Fdd6H2%2F7GWKpgNQiPVrkpMBiPo%2F2K1lHm2fVJn6GAdsULis%2FSwIoZ0MOGmA7gHXTNWN2NXHX65V9l9Cdbsf9wSxp0LQ2V71BqsxPaX9QUu78yaBzW5cPP4z5Mg3LgAfx1EDt%2FedlDDnEAFgTFo2M8ABQcXwq3tTk9ufeESAUHYKkEskJ87AIAU5OViOpWiNXHTGwb%2Bd3GsszKhLOvDXs4RnzLheG%2FPVqMCYtv8%2Fs0sa%2Bwvi5K%2Fo4Dh196UrzjVbaDDNcWJTjTy0Wa9NbfgEKxTX3cuBD7kHd8QXVBz5%2B%2BHyh92dSN0P4vAX2t%2BZ8yRiKF28RUvZ6WVbzQyWsTT4SAhFAUiaHhKPRCP10bTvk3sLNARSDJsw0IqlzQY6pgG0DHRGeAWo3JdyrDe3K7j1molaubE%2BQ4OMvheABaf9eTARukRmI7r0JllknXirvqAwjbZWi9lFxCqXF123aB3yVoIsorqFlXgUmsTBrS9TvwXk0mNY9TeEmyA%2F6t9Q37s8sSLn%2BXL2GMdcm3YPNtO54g9Ht7QCOJk703HPIkBVXvlQb2Royt9edprjrMHWgtaHRZQYmiym0ftNssQIyIgrhfZzD8UK&X-Amz-Signature=5cbda9922d41db9c0ce1ad496ad1842393b924985bbd9b46fd0253332747d083&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RJ7FA4UJ%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQCnLGTlpPLBpcxs2j6nhoOjp1Vssmzsu7TNil56l%2FEBjwIgFXR5kiL0oGjdbWOMzb%2BPvg9PeRSqiscGPzuSkOLPCGEqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMyj9tK7Kw92I0HkxCrcA2P%2Fwa4RPdzJ%2FlW4WV3rtJPegvIPU5PWspyBBaR%2BOopIUJ9iyhZt%2B1BChFQx8iMHLxTMccIZPOxq%2FLBJRlSO5qAT%2BWztgqh1dTiJj81rJr2t6Yns6vRxqg%2FHfVjQOlFW8LVNSmMeFvNtVHv5i4Ts2IVLavFuRB2f0elVMH5ONfKwtBYtFwSx9C0XsE5yt1E50do%2B3AvNXsnq5OzPMwmPl%2Bcvw4ItmLo1%2Fu3%2Fd6nJTE0fs%2F%2BK5PqjGBXftuiTY28rqlbD5RwbNg2ffFTN1t5eGKi210wdSxyV8w6ieFCX4oY8zMu3sJod0wEngRrrwqOIHRZIfgANZtu7zNj4%2BWR%2F0DliDdyn5QJj8N7MMSeHb7AzRj5MMuQJk86A1YLS4tfsMLGiooCsjyjo%2BnFqhFtxz9nbIz3gbcUSJqGO8Ib8m3J%2FB9BbOSH9hWexL%2FqfqaL%2B3Ucp2vVVe7P7MS6CFlg56vlAvAB7037wAuQT0w4%2BaNSoTQEP4NphlCisMT3RqB3NajrIdI516zPUS51BrhqJzMrMQU7yUJmiKuQETWzHsiLJUdUwz%2F7uPKWQXm8%2BgewJ807nOMXW7he1V7K7wesxQKRfVQWf%2Bxef6Wot7%2Fb7TE2EooZ2OhRN2%2FqLeii3MO6Jpc0GOqUBlGXRNW7qxuyRjljxtsm4KiKfEFfhv2cx0XOGdfROmVZ%2BS4LN%2BLMHmbHALhjoh6O%2BWZT%2FZCsRlr7XvfMakxnAkhIHNYUFyMdItOCVJ9Ec5ZSIpbT%2BmXi1g29%2FgH7iesMsfnn5UiM%2FDSlrlCu%2B6crldvOSxpE9SVrAiNtbujZVq8LmXcKzuj5SfyVLRXT%2F2ei6h33ZcS%2By67LjoGGQoIaMpcP3%2FJX%2B&X-Amz-Signature=b419ff827e4c8d3a9060e91b8f847a8bb06223115b7f2fe38abc3dd471b6c966&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RUIDGXEB%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093017Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQCFpRvZ3sxVw2lSZ7Pl%2Bv6BWDzSvech5%2B9QXFehtZxypgIgLm1VGKUS8qyalqfMEGxMa5wmBhcIaKPfitQgu%2Bl0ng4qiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOyHvTMTglxDqROC5ircA4TizFjH1HYH0i7%2B7M7TQb1rEObzxE6OENGsF3cfBUlThXTAgnQlwHoPBkuBokVpmCjKHR5HHaL47k9ZxB1f7uLcnmCKB%2BXNsoCKeByXcIMIdJ2g4PqpuDv61xpvyi31N4inj%2FR1c2klIEcGRgRnhILzRBXs9yVc7kbEfCwl5hQZjnzSsETISEGJ4DddYokyW%2Fwe5J1x0X1gTcfnq%2F318hpygNPNOEb8f0DdMeO%2FIvXnqbnnGkHy7rvVk9IZXFAYG8X5DHIcs8ALTR8%2BYa%2Frpd0HwHk2a0YweY6p4eChf7%2FvRU%2F7O7kI9QNjNMnzPoqH78A7DR%2BUddL4ZMC3dQzzjEbof0%2FxzCU%2Bbm4x2mTZgJ4m5vQNr2LEE7PUakgWIH%2BrwT87frcv4LPrTgK8OkkJ3eRyiU6B9ykZ5jIZFE2z9LWGxgnRCaNOXn918N6Y%2BcKXtgBoC3J%2FVQP4%2FzAIE9FezVwRtD9eGWVPN%2BVmJu3lpK7qenB0s2PnXHcdE83XxNJu3boIYuw7AdIqY8S%2BaLTezBee0pWpT3sU10%2FHrtbFKMNRi5iUZwgPuE3THM1D3f%2FMxJAfqNhbyS%2FUcb3MKJ2NwylLTzu0SvH%2F2to4%2BGXSYOSwl8in5zJfe1tHAirUMNGJpc0GOqUB0MhXHaaLZvE02%2B9veGPywovLssaRaAJEOQky0v5Sazh3plOaMOLjIAQn%2BYoYeiEdYgepVdmI8JgzwwQglIZ%2BcK6AqhNPUx4%2BTocS8u7q6OAuMDcjCeFWgrVdZOXGAql5S0AfTpiRy2PLJ8s3pZLf6CxPWaCtJbHWYDQqQPF9HSn1KbIKos8x5dcJpYUn3ItAVX8T04YP5nnHyXdrXY71%2BLKBPsla&X-Amz-Signature=ef7ddf40eab83fd38d8b0eb4a20a1e8eb0c035b1b04665eaf84b08314903ab2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAYTSGOV%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIEIdXIDI%2Byo3X%2Ffwlqu2m3eVzd1zYsQrAelreG0b1ZZfAiBSlc0ofMfW6UP%2BIErhl78Z4EjXbGizet9xAuoi0cH5JSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYwkdYklTAt3r%2FubsKtwDEimDHiqTN%2FyqrgQzFe8DR0PMO3IgEdBcP6v8LASZvHDhio6erV26r5e6Owen%2B0A%2BL8YrTnCHEkcolCIlzhMrGzAWGrjjf2%2Fox%2FbplaeKY4baC5MyIod6sBbret5bjyfg%2Bew%2F86hWBU4GLEzmU00igRt0IyNRJyKkPwDNzi4i6t22e0pGxPIhA1dUik1jZcpnlXFjJ3vXBovPCVlKXLS3g17njOKM4c1tn80XVDK4RPVIeDtQIADCA%2BlLt5oG9g9hW630ISEtfmZER0pmNS%2BLMjabel1dj3i5I5D9vwVrKRv0WIMq4VZCt%2FHizwyvskiaeP1GmfO6EI5qNMcoy7LbxYlnSADTsbL%2BUUijaFCTZ9MjAMq%2FZWPlrkK8xkgaChKPJEhaiOsB7QbSCALUn7N%2FkVNvCSDS0xmsCE5j%2FsXBs36gzLKrCFWoIMXTW5xvr1bsavc7XOOfRVvAupUP%2Ba0dur8H5E3nfYDJ37xA3RhVPzzc5%2BlvMT57FiDjgyWgFIIuPkmc44mLcQcsqIFpKNsK6uQ03VGbegFDeicaoSvx1HBSenKg1pzhkhwYo3LHavuXlYQj0Ef8qx3%2BE%2Frz6Wpk7ImFZrUasyXxJPc8K6uPDeSAa4UVV2mi7brxkqcwmYqlzQY6pgGVnqxrDcgJrGo5sD%2F4GTg%2FFEsyLClB5Ge5DWE%2Ft4xLR5D50tiv6eCBZb5pb1xsp%2FN83UC8tJbvl%2FjYngyv892Hgke0bxG1Jwq652ZGRX4zCW7rsWVyGft8REI32VLgAfvUJ4kqjjxW2EjulH9sv%2FszzPgqRHbaWhHS3OVvvuws%2BD5gOpoDv34RzpAPOfIsV0Oryi0nNkPg3ZADBei9nMDn7yJqo4qK&X-Amz-Signature=12448e0511fbd94eff7593c32c1a5be021455cfbd725850d2bee5be9b81082c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAYTSGOV%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093019Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIEIdXIDI%2Byo3X%2Ffwlqu2m3eVzd1zYsQrAelreG0b1ZZfAiBSlc0ofMfW6UP%2BIErhl78Z4EjXbGizet9xAuoi0cH5JSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMYwkdYklTAt3r%2FubsKtwDEimDHiqTN%2FyqrgQzFe8DR0PMO3IgEdBcP6v8LASZvHDhio6erV26r5e6Owen%2B0A%2BL8YrTnCHEkcolCIlzhMrGzAWGrjjf2%2Fox%2FbplaeKY4baC5MyIod6sBbret5bjyfg%2Bew%2F86hWBU4GLEzmU00igRt0IyNRJyKkPwDNzi4i6t22e0pGxPIhA1dUik1jZcpnlXFjJ3vXBovPCVlKXLS3g17njOKM4c1tn80XVDK4RPVIeDtQIADCA%2BlLt5oG9g9hW630ISEtfmZER0pmNS%2BLMjabel1dj3i5I5D9vwVrKRv0WIMq4VZCt%2FHizwyvskiaeP1GmfO6EI5qNMcoy7LbxYlnSADTsbL%2BUUijaFCTZ9MjAMq%2FZWPlrkK8xkgaChKPJEhaiOsB7QbSCALUn7N%2FkVNvCSDS0xmsCE5j%2FsXBs36gzLKrCFWoIMXTW5xvr1bsavc7XOOfRVvAupUP%2Ba0dur8H5E3nfYDJ37xA3RhVPzzc5%2BlvMT57FiDjgyWgFIIuPkmc44mLcQcsqIFpKNsK6uQ03VGbegFDeicaoSvx1HBSenKg1pzhkhwYo3LHavuXlYQj0Ef8qx3%2BE%2Frz6Wpk7ImFZrUasyXxJPc8K6uPDeSAa4UVV2mi7brxkqcwmYqlzQY6pgGVnqxrDcgJrGo5sD%2F4GTg%2FFEsyLClB5Ge5DWE%2Ft4xLR5D50tiv6eCBZb5pb1xsp%2FN83UC8tJbvl%2FjYngyv892Hgke0bxG1Jwq652ZGRX4zCW7rsWVyGft8REI32VLgAfvUJ4kqjjxW2EjulH9sv%2FszzPgqRHbaWhHS3OVvvuws%2BD5gOpoDv34RzpAPOfIsV0Oryi0nNkPg3ZADBei9nMDn7yJqo4qK&X-Amz-Signature=1a5d4f0926761394159c41a13c67ee026d7cf56ee278a478f9301071a37a66b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQQRWCWV%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIE8yh4J9%2FvZ6sydmYPRhRNcKKq7DrYUsqh7UMx37wUiIAiBaVoZLsr6%2FsD6CI8qd81F4UEdvxSrZKjqj7s7glVVMFSqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzvMJJwSpIKfUFM%2FQKtwDC3mvCM2rVpbhfylj1e8gA2Cj%2Bxla2n3xC7YCe%2FQdVXL4%2FwvCLGp1wegLaL3BX51nX63K12X2YZpMkvWWNzzmIiE7pLm1YX2eHRIdHFaqbtt2of2523NZfCuvHPgUr9dHS%2BMKaqGr6ocZIDlnhVezy4mTeguM9TIa0b6W7X9T%2FU7lkzGXt3hctyNtEdrKgvZndAbsjjgMGvuDCMdaB204K3O7pw%2FVFkCJP44zBndFqWENnOS8SYflOKQSXFmS%2FK3ULyP1fyom9ChdtsYsb9onGfIXRa6ISuuN27kuqWP7KKw4ziwtD%2FyJ%2B0rDVa3ZkNG%2BW%2BjZAanU9CdY3cMOYycC8p%2FGYPx8x57i151takfK6vFKopTDNz00TOH%2FQ%2FzvNDAIZ6fQqdzf10fKH4YEwgIywCEcVcTX51GLX7w8lKJZdZ4nEgbmRkK0lOYmr1PpCs%2BwiQ8AaKEtF%2BxEz3HjCiUAH6mlCw96Z1pmr530mpGNBTh2b2aZJJaQusJLDG1yWsrfCfyBAGp9KTPydQTQcRjEJ%2Ff7fX%2FUweDMR3MNM5LpsJAMQ30tW9RB8cImxczxVbvWT3v3nZdOJtiljGJ5rR54vdsffuEsqXX%2FpYALN2WrtMYKyr0FMgSQg8lsVqMw04mlzQY6pgF3%2FKe%2FfeTrU39JrgO7QxMylMzHWaHfcZ2qVCcH%2B8iO1lu48RRJyGJjEwQ8Z9xy36Dl7sy%2BMwnCLzXo9jgt3bq%2B%2FDLbjfxL7kD7Pq6lpKJmNVFuLvzv2F1m%2BfRpRvpd9nkPaPhKA9v3e7oqL1EDwfFTiTBv2HbL82njoWTLHArd9LWxmTTaXWGoaQ4wyN0lDX9aePw%2FsYWveju%2BTIItIKnl6T0IcTTc&X-Amz-Signature=d3b201abd71855339b8d3ac6f8386f2eb083d4521f1b750e53f2c19197eaeade&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5HGX2WY%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIAnwB%2B2qtxVQ7Vg3Rua79b%2BsqEHtntdiX59ysb%2FnSNULAiA17eBOLBPdW%2BLYwOI9anr02yqsQitO1G2CB2BhGCWYjyqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk1KZMZAa3SdRAfRsKtwDDAMDKO6s5crBQWqhC90Dg%2FqVF3wZ3%2BSQuzfJBS9FF4%2BZdqwl%2F4yGDWHQPiYsvUI%2FuPRuEbRcrmKJTM8wHdx%2BdUcsgSkgUTmbKLEuwXKcSE%2BTvR1K7NaHRE6iWiT5IJejAlR3fwW8zBz8FaMaJhyvRAdpOsjcnoqe2CE7RWpmS7OVFnQAeOPOdo0%2FQ%2Bm4plzRHDVolNOhB6W805SHaQ02KFr74yNGD3ddzk0O0biOpekelgPZAqIR8DxtlkARc%2Fv98ji44wkbGXLzK8cHWHedejEM1kz%2FOV%2Bbfa7y1m0xOi2mnHO4KN5lc8UvXQO1qE0etPJmR%2FWwpsAwBcyz%2BtZAo%2BEbzXtjHtF1FNXy7o7bEKQn5%2BERr1OPXcw6Oe%2Bx60SUDGj7anHrwM3lIh5Jkap0PqDpzyGQBHn8i0FJRmyTlLzwWJD9U1JyNXAiNzsuccjLZndnZVsSjNvU0j9v9qhTxv5pRWym7xrO%2BUZfMHdTEjQVFMIA17Bs87IGny5vgkzaYMpa%2F4BzXifHR%2FgZpxLtG%2BxYmOP8ZNGorraOopilZml8GkCxwv7gvkHJIYk9acUKhdHNnhmjBCunGbEghgEsORLD1a8rigj%2FyxhIy0y3gdfiyBcsnKdtEsK68cow0oqlzQY6pgHG%2FBNzu2JGHKXRBvby5km%2FweZ0Zqou6eJ5FyhMyOmN%2Bq8blu2yOeK9Ws39okkkiFUSg%2FlVy%2BMg8vxceFB0%2Fs7twuYsN2JEBaC7R9prlz%2FAxzpmfAEVddiN9GTp4RdaVwYLRmNxz%2Fg6GVR%2B2XwnFKBLT0oZztSu2IxTtewbt4fdKPrimIPI6j4zHe58oG%2FZpERakU06i3oc6D6nnK9VhhllS289PHXr&X-Amz-Signature=56eca1b066426d8cbf9f9a148f403ecb2a3b5057d2c4532cf507b5404499ced0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y5HGX2WY%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJGMEQCIAnwB%2B2qtxVQ7Vg3Rua79b%2BsqEHtntdiX59ysb%2FnSNULAiA17eBOLBPdW%2BLYwOI9anr02yqsQitO1G2CB2BhGCWYjyqIBAjK%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMk1KZMZAa3SdRAfRsKtwDDAMDKO6s5crBQWqhC90Dg%2FqVF3wZ3%2BSQuzfJBS9FF4%2BZdqwl%2F4yGDWHQPiYsvUI%2FuPRuEbRcrmKJTM8wHdx%2BdUcsgSkgUTmbKLEuwXKcSE%2BTvR1K7NaHRE6iWiT5IJejAlR3fwW8zBz8FaMaJhyvRAdpOsjcnoqe2CE7RWpmS7OVFnQAeOPOdo0%2FQ%2Bm4plzRHDVolNOhB6W805SHaQ02KFr74yNGD3ddzk0O0biOpekelgPZAqIR8DxtlkARc%2Fv98ji44wkbGXLzK8cHWHedejEM1kz%2FOV%2Bbfa7y1m0xOi2mnHO4KN5lc8UvXQO1qE0etPJmR%2FWwpsAwBcyz%2BtZAo%2BEbzXtjHtF1FNXy7o7bEKQn5%2BERr1OPXcw6Oe%2Bx60SUDGj7anHrwM3lIh5Jkap0PqDpzyGQBHn8i0FJRmyTlLzwWJD9U1JyNXAiNzsuccjLZndnZVsSjNvU0j9v9qhTxv5pRWym7xrO%2BUZfMHdTEjQVFMIA17Bs87IGny5vgkzaYMpa%2F4BzXifHR%2FgZpxLtG%2BxYmOP8ZNGorraOopilZml8GkCxwv7gvkHJIYk9acUKhdHNnhmjBCunGbEghgEsORLD1a8rigj%2FyxhIy0y3gdfiyBcsnKdtEsK68cow0oqlzQY6pgHG%2FBNzu2JGHKXRBvby5km%2FweZ0Zqou6eJ5FyhMyOmN%2Bq8blu2yOeK9Ws39okkkiFUSg%2FlVy%2BMg8vxceFB0%2Fs7twuYsN2JEBaC7R9prlz%2FAxzpmfAEVddiN9GTp4RdaVwYLRmNxz%2Fg6GVR%2B2XwnFKBLT0oZztSu2IxTtewbt4fdKPrimIPI6j4zHe58oG%2FZpERakU06i3oc6D6nnK9VhhllS289PHXr&X-Amz-Signature=56eca1b066426d8cbf9f9a148f403ecb2a3b5057d2c4532cf507b5404499ced0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZVF54PIN%2F20260305%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260305T093022Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEAEaCXVzLXdlc3QtMiJHMEUCIQD8HLeI%2BrKxR9aCMSe4ApGlBl5BecKuFP5E9lrj1Vk9agIgbUOUJepwl4smc2d%2BIAvqvUw1U5zCfsAlF6olGdOLOCYqiAQIyv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMkcWKJ4Ok2WcSobtCrcAwMqZ5hBIz%2FHSTdPvcvtAmFwQB8A%2FIHwipVIP6I34QLIH7%2FOmKtSsAx9VkIGNotfCf7RCixfifpo4FOD%2BWQydYU%2FiGts72RgeG0BARfEqEjADKNcXPg%2Bkl9UbabssmKxqdytXA0nH8jU9gIUuBn%2FowE67ixvB7u2QzUU3G0n9vRBe4jdUg6qeDZv0TPR%2B1nVh3Oi%2BPjMFe0Nf1wXr1wuNwBme%2FLT3Uy2Eh9BqlVs52fPbJpeuDyZ4es%2BXLDApFsiS9yC6KXLii9r5X0S%2F5dOlM40QkmpWkxwYPXEwkg0tBQiFXjzn5zW7Emj0SFWlsxG5e0vK5I%2Ft5KTksr9EQuTM24PmgZMM8BUZ1HO5n%2FPVPVbTPivc1g3aDMvAiFBiSk6mu1AhW0OFGtKwm7CpipYxCGASSLwO8SRhLoeqmEh8aDu4CL7%2B3kfEz6cDnMnutchgQNP1xYvmsAUXZYCSkfGX0TGbMN4sbfJ1wOH2Y5F0txEAsr%2FUshV24kZWfz62wzXbKtfH7N8HwdDIgkZB9nVQI5QBLUECPsZSWzOUD7qxyO%2B82CsiaO5ksM7ZaE%2F%2Frp8A3QDlIBdNtUOKOWQDKioFGAIiMGYrZCKuFR8PMIQ4wkbREqfOFvX6V5uGaKHMLyKpc0GOqUBAMcpmFuL4H6Li2pzPuYB4L3J9tk6v2EYaORSmrMXjRy266SfdGEC2yLDKM%2BBa5BiivDMrxyfRayAlUd8yI%2Bk6csTavE6fvRbKE08jhfvs6Bb62csiITj6QlM47anOV3HBN8o1h%2FtdNB%2FeLVTgUgR04ewOspbuBTwwQm42YmhVl61siiUAT6I0dwfPxpqS2K3hwviocxqxyTq5PX2i7GWd9ALRvDK&X-Amz-Signature=bf49672759b2716ed78c6e71e9c1e16a04aff5441fe3c96c10ac141bbe03f34e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

