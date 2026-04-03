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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWQYK6HT%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDER3bTPlrX3nkU594EzGuPmMq%2BfxLS0T8H3Cbpa8iIRwIhAL9oM4J6b31XtbqJCz%2B%2BL9%2BV4QTLu3ERbDyim%2FYHsSUGKv8DCHoQABoMNjM3NDIzMTgzODA1Igx%2Fafk5SQfALA79hR4q3APCtMfwn%2FnTr7mlxYQCzY1sAYfygY%2FUAO%2BmPZhOHxCDEf%2BuwpS1vn%2BwgSqSU52tUOKyCt0xybIaz9c4n2B8XJsqtbDbd5iSvSP1bZwf67H85v91vlu7krJl56MzVWrxrUv32xPfsBkYhLc3Qwqce1Fm3TIg5jwfMZNgoKU21YXnE4vHN1qLeZOjHmKJuoPawRVyc4%2Frt196NuTsgs6BaXL96X8FweQSi7K8%2F8iIlMoASEu%2B119HJyOxqrON%2B14ZR4eBmTOuWtg%2FXXByndkcKIqVg90VXR6VB5m%2FdYv5Shh0633K5Lj8xkAdO96GmvJenF9e0sD6oEOAknpqjaLRETYR8sYtENEvYxS0PnSYiXJqBN5ljJqIZlxK4IyAo6yqSryADSeYEfD4Ay9iTCvCtOAJXyQGigOgn447fCy1grolHhgGcQX1rJ52Dj7hNIZUah3X%2BxD22qaMOBTAIIJdA3fTDjAyXV2L24CkJx2pvsqDlWM2ozOMcVyo4kAIHLYzaFg6xy2dNMUJhOSvVCZAY%2FKfeGFH344wgK7xiSLICYz25CTkHn4VVSvU%2FK5sdXtOOmjKqLswloDd9yeJR82y3VA0PSudh3ux2WFkaug4Qi%2FVSBJjNK24FDVxmqZILjD0krzOBjqkAWKNMyCrDewpfWItQCdpav%2FpLEG6zoVYeyEm7zScOxJsVdni1I3Oen7WNdV2p3K%2Fhfq3BP90HDmyNcEoC8qo8Ako6UfM8C4X3wtUVhtUEeILTwUNnJwhqpkQqRFN3ti0gfjHEpAI2j8O4a7TeB992I0BBgD7s6CmoXvuoW%2Ft9F5h1kofXZ2GS1rofHNU2RTLbHch2BKhjcNNLPalDR02Bj51w%2BnH&X-Amz-Signature=d7a6f7bae1eb830cf195ea078fe7b86a76d44f5b5170b2a7b056c5e4852ca2ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWQYK6HT%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDER3bTPlrX3nkU594EzGuPmMq%2BfxLS0T8H3Cbpa8iIRwIhAL9oM4J6b31XtbqJCz%2B%2BL9%2BV4QTLu3ERbDyim%2FYHsSUGKv8DCHoQABoMNjM3NDIzMTgzODA1Igx%2Fafk5SQfALA79hR4q3APCtMfwn%2FnTr7mlxYQCzY1sAYfygY%2FUAO%2BmPZhOHxCDEf%2BuwpS1vn%2BwgSqSU52tUOKyCt0xybIaz9c4n2B8XJsqtbDbd5iSvSP1bZwf67H85v91vlu7krJl56MzVWrxrUv32xPfsBkYhLc3Qwqce1Fm3TIg5jwfMZNgoKU21YXnE4vHN1qLeZOjHmKJuoPawRVyc4%2Frt196NuTsgs6BaXL96X8FweQSi7K8%2F8iIlMoASEu%2B119HJyOxqrON%2B14ZR4eBmTOuWtg%2FXXByndkcKIqVg90VXR6VB5m%2FdYv5Shh0633K5Lj8xkAdO96GmvJenF9e0sD6oEOAknpqjaLRETYR8sYtENEvYxS0PnSYiXJqBN5ljJqIZlxK4IyAo6yqSryADSeYEfD4Ay9iTCvCtOAJXyQGigOgn447fCy1grolHhgGcQX1rJ52Dj7hNIZUah3X%2BxD22qaMOBTAIIJdA3fTDjAyXV2L24CkJx2pvsqDlWM2ozOMcVyo4kAIHLYzaFg6xy2dNMUJhOSvVCZAY%2FKfeGFH344wgK7xiSLICYz25CTkHn4VVSvU%2FK5sdXtOOmjKqLswloDd9yeJR82y3VA0PSudh3ux2WFkaug4Qi%2FVSBJjNK24FDVxmqZILjD0krzOBjqkAWKNMyCrDewpfWItQCdpav%2FpLEG6zoVYeyEm7zScOxJsVdni1I3Oen7WNdV2p3K%2Fhfq3BP90HDmyNcEoC8qo8Ako6UfM8C4X3wtUVhtUEeILTwUNnJwhqpkQqRFN3ti0gfjHEpAI2j8O4a7TeB992I0BBgD7s6CmoXvuoW%2Ft9F5h1kofXZ2GS1rofHNU2RTLbHch2BKhjcNNLPalDR02Bj51w%2BnH&X-Amz-Signature=d7a6f7bae1eb830cf195ea078fe7b86a76d44f5b5170b2a7b056c5e4852ca2ec&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YUX3WYK%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAuxmfeEPDi9vwwmc3B%2BsHC0G3fncpzBx3bR168B9vhoAiA3s9XAkeFu40YKaNGTKjIYBTAjWy5d2PXqgntIDTRJ7Cr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMr5Phq9epjZujIJ9xKtwDUYGFSJGR6PtDFkoxPOxj%2FVvmda98QPL5ssDPY62uuTZ2aY51zJJcixD8Ry%2BXcxZxxqrS7byfUpq0x5iUxMlQA4qi%2BEgKw7R4Y16fcanCdK9oxHeuDiMTYcq2SoeiMLOXtOoLcc0KK2oCP4yT09FGCQl7TtKYvMz%2BcFZKkp7IhnRSpvi7XHl1IMmzK%2F01j1ypBJNMmFzQaMLrSrPGeaOd2%2FH8gN0RmQgXJfqjw0PEVfxWUpJGWzQUc%2FN7jr0HhyEQsNZgrpZQrJhi4ZU2mhedEDzS%2BG5C2%2BNDur9Eh8jitjdO7UUKCrrTx4eP40Kh%2BHtsXwPTHhUHKSBbk7faecp%2BBOFsTHYPjMLUg6FatDvtV8w8rgRz5wAz5QFPbb43sZhFMXsUE0UWTwrMdzVl9KxkOXzP3HR%2FHliMCj7C5g8XJghwjkRXQbXM0xoL9dzfzQetysUHKHrys2n7Y%2FQYX%2FcHJLNxNugIFuUAo4LACUBhdMjPckZoFECmphyifEUiXeOZHZV%2F3cIyQnSMpLm5DQ9B4WFAcV1hOZcrb6mhZqrm94hGdfQggIyFyZmPyNa5Kz5HN4qEtsCgJtkX7thUGjPev2zvGKMKBRJH2TJUvxjObvHho0ENZEUpvkZJ%2B5wwsJC8zgY6pgEPGkkxtsYtR03LK3uX9Yx8XhlC0n8BiIRSKjwIecsVjzACSHRhCBIYrXMn0dj5wrSs1U94kfNoyHa1LDaw67MhQD%2B9StkIc60lUhNQgbjfeBx2tvhPOETp%2FiJagQSREve16ME5p7GPCY2z6uySXJ1%2BZaPQj0tjXSHxIZJ1mFSvas%2BFgn8vrr3dgYZ4HhHdVPLOUCz3%2F2VndYqrLdejNjCNU9KbBYyP&X-Amz-Signature=8904e961ed5f3e2d86609cfeea67589e95dc302a9ea77f8944b67d13461a9d0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635VU3J6K%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBCabd85%2FXekvtGWX8cm%2BoSDMx4b2zmQjG7UZXrtK6GKAiB0gVSUV%2BKl%2BcjVj3h2GjYPLqkUyL7a6fdV5Zj9LQ26HCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMU7UTOncuJ1v04xBAKtwDabVHrhHJsDE%2FmzIjT7hRuTVwkgYtqH212kho3t74z7YR8BbBuCK%2Bi3CWfcRxzDQM8NUHpX45vbHIDvw%2FWgRyhtsMXrslrB%2B303aeokbDL4wWIvpNO3NhTKTDWarFF1MD3lter%2BLnJGvFRA7fLxTA2GxxVuzSfzURFqj%2FMs%2Bgi6U0%2BvdoAH%2BLJHhvJqsXDMMJL2zhQ3%2BRHq58FmKKR3gFS9SEWMNw2O60MVSzgzN1IYL9c%2B9PjkNJy0t2keMaibhY4Ky4ycavOJCMob5%2FS3TkCwKbfaE0wS5%2BUH4PHFBbsyyIJITjG%2Bl7xlNzvwiXghFrS5l4KeH2etgQwKH4D6ekIyKHPHU3c8EIDdFkGuhpNu%2BGMfFz8%2BX1zEVf4tmtDxYbB6fklkAIZYga6P0xoOIARtvKUnLMYzFyi%2F27G71C5Azo6CHI9xXHe59DwL1iehx8%2B9KMHdH3I2XsfPp%2BHyHSHg0iQgzu6QHG46uxfNgEoCsMLK2IjtgBsOzQbn%2BfZP0kZKHGly2PvUtk5Fr4ZTdpUCp2TrqdfyYKCG6S3vD3%2FS4baIukXACBY1ZK64fOqQJix4eBzBxZJqm2LXIRBDAu5A7VmW9L6DX%2FheFRYUIl7u061ULJ7uZFOyAtCPwwlZG8zgY6pgEJbbXLV1GQb9DupPV2xvShzm0IQiCiJ1U55c9KM7AoUOECCemoBiWJ8qnrzzB4pcRGacyBQa%2FQQnGN5GsnJxnrLStElQV0Vi5rnrEefHk3UrBY0s%2FrJ67Bw5o%2FrQtBRQPXDZOxuytyuz0ANQf%2Br7U3Gb%2BpXeSE8sqONYeTMjT7uvkUNPYApRE2AWPVdFqY%2BtDUaL%2FWQGTfIgAJqObRWSpUX4zB7Boy&X-Amz-Signature=326fc8395c8e3e8b535941f3ce452b81b7a0736061b0f33f93a32613d37904e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635VU3J6K%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBCabd85%2FXekvtGWX8cm%2BoSDMx4b2zmQjG7UZXrtK6GKAiB0gVSUV%2BKl%2BcjVj3h2GjYPLqkUyL7a6fdV5Zj9LQ26HCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMU7UTOncuJ1v04xBAKtwDabVHrhHJsDE%2FmzIjT7hRuTVwkgYtqH212kho3t74z7YR8BbBuCK%2Bi3CWfcRxzDQM8NUHpX45vbHIDvw%2FWgRyhtsMXrslrB%2B303aeokbDL4wWIvpNO3NhTKTDWarFF1MD3lter%2BLnJGvFRA7fLxTA2GxxVuzSfzURFqj%2FMs%2Bgi6U0%2BvdoAH%2BLJHhvJqsXDMMJL2zhQ3%2BRHq58FmKKR3gFS9SEWMNw2O60MVSzgzN1IYL9c%2B9PjkNJy0t2keMaibhY4Ky4ycavOJCMob5%2FS3TkCwKbfaE0wS5%2BUH4PHFBbsyyIJITjG%2Bl7xlNzvwiXghFrS5l4KeH2etgQwKH4D6ekIyKHPHU3c8EIDdFkGuhpNu%2BGMfFz8%2BX1zEVf4tmtDxYbB6fklkAIZYga6P0xoOIARtvKUnLMYzFyi%2F27G71C5Azo6CHI9xXHe59DwL1iehx8%2B9KMHdH3I2XsfPp%2BHyHSHg0iQgzu6QHG46uxfNgEoCsMLK2IjtgBsOzQbn%2BfZP0kZKHGly2PvUtk5Fr4ZTdpUCp2TrqdfyYKCG6S3vD3%2FS4baIukXACBY1ZK64fOqQJix4eBzBxZJqm2LXIRBDAu5A7VmW9L6DX%2FheFRYUIl7u061ULJ7uZFOyAtCPwwlZG8zgY6pgEJbbXLV1GQb9DupPV2xvShzm0IQiCiJ1U55c9KM7AoUOECCemoBiWJ8qnrzzB4pcRGacyBQa%2FQQnGN5GsnJxnrLStElQV0Vi5rnrEefHk3UrBY0s%2FrJ67Bw5o%2FrQtBRQPXDZOxuytyuz0ANQf%2Br7U3Gb%2BpXeSE8sqONYeTMjT7uvkUNPYApRE2AWPVdFqY%2BtDUaL%2FWQGTfIgAJqObRWSpUX4zB7Boy&X-Amz-Signature=afe860aedab276fc59a62ddcc789cec4ed215db8a3decdac15070d4d3e792918&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UU5WS6DS%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIESIOQbFReMu%2FgVuPl7104pMNpnjbxDRxCakrk%2Bd%2BRrLAiB3kw46bPy%2FiGflMV57rQYNBw8ADFlpmlhkxFAo1gph6Cr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMLV32uVQR2tv0nMCzKtwDcK734wp9bDkQsSBSCKh9%2FTFTd9pthPQrfUKPAEDGYSQbkUHDlb%2FxPYPGZHG8NkCYEaWQyShEvsP4nlJyW%2F7iUmb4UdXGVt5kuQ52pp2WfzWuC2Fv3mypoun2z4o3MLXLXA%2FNv1VLwXFdYJi%2FKf4iEM8qQYx%2B74ynHVeZ2lC9pOEp9Mu7hQUORpsThBXnH6w4%2BJid4oNlwSrokw8oH8fvpl4DcfT0BUA%2FDZmPUCalLVi9%2FZiWCo6j%2BK%2FS9E3bsxmGRuru5CXiYycGr%2FqrNMuZv7gS5IMt%2Feu%2FOVg0VXpPjCD7IwHxrlnR45NWg3cabZCSQc1NyI45aX6e9lVrREXQ%2FGQC%2F4%2BtLfRUI5rJs1F0t42Ug%2FLn6vJ3n%2FguspiAs42Vza0egj0Uy04TyE7GIqzx1zFIGCMR5Rnq5ikxHO%2BO%2BRLKEy8MeZonh%2BZlGHuxqCUJASlWN1962x0kK3n%2BzqhnkCjodoUVHpa3nYIYrTSxwpoEAA2CfvhInMukVzRliJr%2FdaMaGV0ZtEIW5OR%2F%2FA3D045MPpShCKDyt5m813SrTs5se2OsgV6Lnpk7U76Hw%2FXfKM9Th2BUq43OSpeAVWEmB9WHpdu6w828PolraWBIPQgmDCg05UW%2FFoKSEEowqpO8zgY6pgEgOEo9oLJPumyRipM2TJzOMSsiKJnjlv95JzEzVORz9hmvqP1ISFnkeNR4cAw5L%2BTbK6nbVHGAMbvQ%2BuPRkzDxmm%2FHKbGIfqi8Q7kqKEEvpCcCfsC5f60SDbnmj%2FmyaoQTefM7z6w8P%2BR2t6d0vs0Iutg%2F6Q6dhkMlwgT27Q80SPY9oigsPieiMpZwIpN4ZUxftW%2Fiwp7UyiZDWdJcsmfVKh8kcb84&X-Amz-Signature=e43bdaffb8830d439eb7d66b35352a7a46194932fe072fb7e49f4e744fd89656&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YANLYYLL%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG4AXvVhov2khPlCPenFotxJfznhVBpT2ohaWQEl9XZ6AiEAurMldp8KS4%2FWKNsFzdospvxizserxZtfr6J8xXIb%2FOwq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDOiTugnXiuh8vn1g0ircA0nUCZqAFD55%2FNQ4bJXNiq14Y2%2FDQliSEh%2F6LpsQCcZ6XNQCUMVd%2FEOAjo72Ka45rO%2BjgXCQ994aZ8JYEYbZfUArCF8kZnAGPLNZVgLWiFOdj9ZOjxhBNpA2puXGrJ33kjyInMvpWgJUTz1bnNjSEIYd83VRKPHGCvJ7UfBaWvIvtIXltoDLUpZNk%2FUmxbtqPOakhD5XLM7cy7YJ9ghgzL8esvqarGtzpqLCQNbCgyjIiIpkE%2BPuos7vMn0h2Mcgwz13pw%2FtHYy6n1N2LgFytrfnXuzKFjg1OnWStLhFoX9I%2BDQ7gDzxDKpmuCnTxvOhHT5q7ixUmlm8dG6%2FkU53nmk4GG3FDE4L8cjpz92fE5goAXZn%2Fb6igntpOvsx77ACBr1x2n%2FtvUJ53hVKHq5IkVrS8OhBSjLxABiUB8MU%2FORT5tbCg7uecz6PJMEaO9y1EJNCUjUevUJep%2B1US4VO3vOsAJjjyRd%2B%2FVFJmjiZoujgaEF6yalC%2F5zminPGGYEyR407TTy1K2OjSp5F0bw8fLcBeslqqwMP%2FQr8xB2vZ57udVZ4kKu3GuB0QS33IKis%2FaUvJjm0OF0lPYEoPZfDBe%2FZUui010g114AeIM5Yq%2FhSAeHNbOjihaN7VE57MImTvM4GOqUBWntR9y2V4MkdLfQTRo1k3ky5mYJa2UEk1bdhHzclqbx9yxFyKJSqwZ%2FCYCu5iZ4nnyt%2FKeqcK5m%2BWmtI9M%2F1AmCq0FRlNwA60bMbW6L3tnB6IMy6DwF9ms1iAEdatEhwWnNt52tImFMR9SViSppKQowVPnhExXYSa%2BxsF4UUBbiC2%2BA1Uly%2Bm24U6RNk7obDqRHBSLSS%2B7Wy%2FsEa%2B3%2BMBJkk1PHq&X-Amz-Signature=3cf5e72ec73cb8eeb26020cd2798aca7cf5aea5f69e26de2e13ec9305f803bc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QLCJ6QAZ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICiQYypqSStBf8o5Mz%2BD3unzkQH0gOaWyqer%2B2R8rEn4AiBQyd1Ftcry3eEQ6AJ3Y24k7ZXzWqwbiXnH%2Fm2cuVaTJSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMuHlvuUzAanngrZ52KtwD8MEtSyObaVDHHg%2BLKyaFelxOOje1g4UKO%2Fa03C8kMVH8yZqC%2BHvuta6xndCrvG4QresOonHDa3yVFlUqs%2FU4WWj7hL6tBqeoUNAWIInQ1jFKRtovLXWHcC7Q5tkrADwV2KL9QHa8SZqB%2FJWJt6SkG7b8%2Fa%2BIlT9G%2FdC7%2BD0q3AHUBA7jib8zqWfnlsvrW%2FgcaYuQ8o0%2FOhCMYeqlsQYi8peHZ%2B%2Bcd%2FXK2o%2FfZvQwddzm%2FmXmvXHwiLYPKJqeKCuQ1VIEnGmpx5yk3VYHZbI32JPHq2uyFBAl9LBxFMk83HdfH%2FW%2BiJ0lYwv%2FjG99uXAHGmdxfLjUuG28Ecdo9e4yq4%2B7gF3pv25GwGU7Mf5bQf3QlDvOwwp%2FgAqmrYb8qPLAOA5Ty9EImjLopymEdJk0y5c49OD%2F3VRbWyCWsN0kKtCUo0VXr1D0oTP0RoLzk2CwRQ2PXONpAZPJfAdrDgUGb0v4uyomVks4LG7dX3i%2BnUSS6JRs1c5ST4SDLdiVCnDF2taBssRh53E1MdEL%2FkBhXw2MtaTokrGkWTDeXGZY0ObEHx5u4I%2FX%2BjXPuF0Z4Q%2BXEto7z%2BTEUvNtzDgl2Mj%2F2nXPulcJe%2Fh5iR1IHowjQFZI6w3tTxCkJl1PmKQw8JK8zgY6pgGw6dHSIgwct1i%2FRfy9vmQfQLdkOCTumNITilWTk7Dl9rtWbCjDUencbGYt9NxiEmSJAhgVNjsmu5nuQoFYcQZG3RWxkVHuBhdjLovgWHzI47ns07NicMKG5t26BMH%2BYE7Yd8DUgP4PzMhCaqPQFXkd231QrEsyWiNjQEGAzyHeUO6IZFFw3f2MkiV46qO%2FLC6S7POC%2FXBTSxfM2GookIq%2FpAsG4Yoq&X-Amz-Signature=3db964965f3d153ee3856c91d3d227915586c72d0db41add1e3b8556138bd046&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B6IAIRM%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDLdCTDpbozi4CzHtxg6qqXe67WNhZ8w%2FUw2vQYog3wgAiBt3nLws6sttB1zEaINKqFZpf%2FIjCKv%2BA2ZRA%2FXwXriLSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMJdITpkRxMiZFqb8gKtwD%2FlowujxJWbTCeIQ6iexMStslLe537aDNFyP6%2F2Pvrasyo%2FijXDNmgYRTFGdlHXxT5CQbHP2vgIFESzP0CN%2F5c9rDoME9g7ayC6Hh9VimpGukX5si33nb1UMdvVgDKZP%2B%2FhqCFxk%2BFcSu2pOHkeHPXL9tAxN3aq9H04RmH1Y8zACmyLkCWR1%2Bjs%2FxAyK48%2BLGvVLhYnwr5NY1QNz3ZS4L7DacQOeSp9ELHugvwUIorWIyv1hy6JaB5vXgSpkjyCnRqo%2BTMWrO8hwH99fTvvp%2FcE21HPV7qq3JO0gXMWMcc0uDeuq8KBMWHPHll10a6oknSbqHsvvsVFHviv%2FAiIJxymrpDFtDPANtz25cB7Vm1GaLGBH1fFMeK7mBABE9lVqHUsK4Bu6hjSEw8Kt9HKuH97vYV1JNJeYBOhtK8NM8U3F16mQ8cyKDe3t0ZLwYrH1pAjETv8ZbIrU%2BnP%2FeVf%2F9nxPzmB%2FSdOA8gRx9kz3oJ8fSb8PMcMDFNDd2PiFsl7TJLk9Kz9aXrwCyBoVjC%2BkgnxtRWa0PR7kYaLVRQv18xTuDGBFaAogZfZPnd6wBkQ4UWz4FJ%2FI4kgrMkSK2QS5gqA3uorrr7ABctDDwdxUNf5F4aKCMxiKeBflzClAw%2FpG8zgY6pgGyVqIVcpadNDAP%2BONrhTqqNu2z%2BgrAPgVzaCfrDmsaOpkd08LpzONO3VwxzMLqstXcoMVSFNbXNak6bhNkCFHAdaW%2F7seNAL%2BUiByJOohrF6A8KpWsqdjg3wsoTN%2FogLGuSwCL7dbK2dYIgXPxqh%2FNeyAqKCoZ6tEof9xw23X9sDCDOubD%2Be6%2BNZdDDDFtBZQCxZOVrJvyHUmk%2BaZ7cLIbN%2BxEdXG%2B&X-Amz-Signature=c053aa314a8e246d4d4963d9151f6e0d03dbe0afebbb98bb30a3740c64bb27ce&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665B6IAIRM%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDLdCTDpbozi4CzHtxg6qqXe67WNhZ8w%2FUw2vQYog3wgAiBt3nLws6sttB1zEaINKqFZpf%2FIjCKv%2BA2ZRA%2FXwXriLSr%2FAwh6EAAaDDYzNzQyMzE4MzgwNSIMJdITpkRxMiZFqb8gKtwD%2FlowujxJWbTCeIQ6iexMStslLe537aDNFyP6%2F2Pvrasyo%2FijXDNmgYRTFGdlHXxT5CQbHP2vgIFESzP0CN%2F5c9rDoME9g7ayC6Hh9VimpGukX5si33nb1UMdvVgDKZP%2B%2FhqCFxk%2BFcSu2pOHkeHPXL9tAxN3aq9H04RmH1Y8zACmyLkCWR1%2Bjs%2FxAyK48%2BLGvVLhYnwr5NY1QNz3ZS4L7DacQOeSp9ELHugvwUIorWIyv1hy6JaB5vXgSpkjyCnRqo%2BTMWrO8hwH99fTvvp%2FcE21HPV7qq3JO0gXMWMcc0uDeuq8KBMWHPHll10a6oknSbqHsvvsVFHviv%2FAiIJxymrpDFtDPANtz25cB7Vm1GaLGBH1fFMeK7mBABE9lVqHUsK4Bu6hjSEw8Kt9HKuH97vYV1JNJeYBOhtK8NM8U3F16mQ8cyKDe3t0ZLwYrH1pAjETv8ZbIrU%2BnP%2FeVf%2F9nxPzmB%2FSdOA8gRx9kz3oJ8fSb8PMcMDFNDd2PiFsl7TJLk9Kz9aXrwCyBoVjC%2BkgnxtRWa0PR7kYaLVRQv18xTuDGBFaAogZfZPnd6wBkQ4UWz4FJ%2FI4kgrMkSK2QS5gqA3uorrr7ABctDDwdxUNf5F4aKCMxiKeBflzClAw%2FpG8zgY6pgGyVqIVcpadNDAP%2BONrhTqqNu2z%2BgrAPgVzaCfrDmsaOpkd08LpzONO3VwxzMLqstXcoMVSFNbXNak6bhNkCFHAdaW%2F7seNAL%2BUiByJOohrF6A8KpWsqdjg3wsoTN%2FogLGuSwCL7dbK2dYIgXPxqh%2FNeyAqKCoZ6tEof9xw23X9sDCDOubD%2Be6%2BNZdDDDFtBZQCxZOVrJvyHUmk%2BaZ7cLIbN%2BxEdXG%2B&X-Amz-Signature=afdc35d74c21afda5b87804a10f11cd86fbbd291da0b9e3dcb518c151781b3f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655L3B6TN%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCpJXuFkxLxbGNRd3wqr9q1RwHhZ%2FpWTfyuYjFnGh2%2FRwIhALwFyu%2Fk68GEbdd3VoNE2%2Bdqmsx1xKktr6MkFxv%2Bte2KKv8DCHoQABoMNjM3NDIzMTgzODA1IgyJku5k9EBwLFzVm%2Boq3AMpC1NpKhzMpTk55qgjd5KCHliQiG9gXC%2Bi%2BFg6hgwO5R7QGLJZj6wq%2BEagn%2BwR0LPlouOsSNOTHCtna53wP419PzWXjEttf3F2HDdW1hHbgx9G2hAtsuKA99ilIOUbHjwivXY8MmAWPjbHLKp%2BK5fK7NkpkBrWsV1DUNfbdQ5F%2FVJ9hefbEWL%2Fnw45hJh8puffILAXHOwHZxxPjJenZ5pxeh0OAbxllUhwKen70obR15qjq21VwHhsR30CAGzfrNTpQLm%2BYH%2B%2F18I9DdgpCoYPFusZJWoqBDXB5gX%2Fb1ctkvLibsGKtp11ZpqK%2FAi%2B86AUoOD%2FCoZ6pA7WZQjopVafTPStT3wBi3Cog9oN8Jm3VC7XNAeFHKZ9Yg03MulcFlJil36kNLy17c9ar4ZRGnWD9IfZeuO9x3aFKlfgMyNgdh9CNyUNk5Wq%2FoLlZQgQY3bCRxmaY3HRNsgoIUFDlTX5ReTJW06kDRMX6uJvu%2BI%2BUlhXN9nQWj2ECfCTiOSgCuDG3Hwia287Mpm2UtcVlPPv2%2BuSFPuzC9LFK9%2Bd7iNWWIEnKOARdQ%2BC0lW0sIS4z492yLwMdZNMTN%2FwycFVALyFG28PWUGiEHmufPplSxl9XhmQhjNPfvm0igELiDD8kbzOBjqkAV77SibqTaa%2B2LCoptmCfgtxNfACRvmDPJVTBi1xVQagzSCrn5rYejSP6DianZdmCSAMM%2FMXNc5cRsuk93AqQ86ZFi0hchyAuHJZtX4hf1nPYJvbYYoih3Shd2ZxJOkFXPRcR1Wb455NnVIY%2B8k7Um87U%2FPjmNlzJQSgp8W60orjku6%2FHVsixhvqRZp8MtQofITNy%2BhfyepW9mz%2FO91l1%2FpswnSn&X-Amz-Signature=675ce6b16372a5ca534c7707ceea5b145206de452e46dd7e2c3dc946f3449d8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CREQIDJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH2ZMJCHo9oD1JPC9yQgv1DQpBIUB9X2LAhdtQOyNZK4AiAsKPoR6NHF%2B2EhWjrvOZ1r5k%2BCKr%2BKVrqNOEzfekjxJCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMEx0HCHlB9Cxe%2BruVKtwD2A9k%2FLiyWrys%2BMTktizX82TY7tTjacjuogVtIVVgahCF3upVmRZ8KNzSLkhcLgIKeLNmXcbv6lv%2BJADNukGW1s2NtdDHfsHq7Ix8ID%2Fv6bTipjhjmzX7C38bHouHMzPj5Z3op2q5S4aqxoCiwic2OKb0igj6148AzspZtk1yM0S2dLqF2R4ijzLNVJk0rOaSzGFzX9ZtRjm2e67QHjl1OfQ8OaqCh4bqvPJSWVFrHseuXGesA0VVeAm5R593TL4r%2FkeYR2P8B1WD8TO7%2FE5EZh62kqvOtwFjXhvvyqJZzSo%2F6NbW9MFP%2FZ9FQrNkvu93cvTGi5O8IO0%2BIKFDYWnlQTxrMZMg76JmtfYz%2BDt8NvLwvIKC9R4mXVpF1fKYLrcedJddV9gU2nXCERTyufcxUp8Xs9QBHEq0%2BUUMtpaxZWKVmrjjUdz%2BvuOjIZuCOvteIkSqH9pWI%2B7Sso%2B9SKto4pOeQLQ2xJ01SSXW9Kcq3bZ79hPNPbgiOsQYXpl7dy1KPtnD43M6MOmGOAHL23uskvlca7hIAhBTHQ6h%2FjxbBw1uYzjCz19XjlmtuNH2MKdyi9FYJfx7U%2FH2c%2BSC6213tHjHk3PC9%2FHGIUqjYRHV6EXsnewz4WP0MW%2BY6fowvZO8zgY6pgFb8rXHDlLOAvNRNPlDDMxyeAbIwM3LtOAgBdwIcCiRFWJaRvIvJ5l8%2BxjyV2DKMOdXQdU4Faw5JCPxLsACn4vQUr%2B%2Bt98Q0sTmQh6KV7nVejmiMMWpXSYMTG0axEoNcelp2kCm3ShLpqmlCgvyVgCuuoazW8H0ufO9GDhnweH8eAG8tvqYACYm11%2Ftf5hTbfxEo%2BkRvem9%2FVyN5bFg7GjsRz5SWO7v&X-Amz-Signature=fac34b2d5b7ee8324de6b5bd974b058e41e276a8b159ec7c7fbe045d3daa1cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CREQIDJ%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIH2ZMJCHo9oD1JPC9yQgv1DQpBIUB9X2LAhdtQOyNZK4AiAsKPoR6NHF%2B2EhWjrvOZ1r5k%2BCKr%2BKVrqNOEzfekjxJCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMEx0HCHlB9Cxe%2BruVKtwD2A9k%2FLiyWrys%2BMTktizX82TY7tTjacjuogVtIVVgahCF3upVmRZ8KNzSLkhcLgIKeLNmXcbv6lv%2BJADNukGW1s2NtdDHfsHq7Ix8ID%2Fv6bTipjhjmzX7C38bHouHMzPj5Z3op2q5S4aqxoCiwic2OKb0igj6148AzspZtk1yM0S2dLqF2R4ijzLNVJk0rOaSzGFzX9ZtRjm2e67QHjl1OfQ8OaqCh4bqvPJSWVFrHseuXGesA0VVeAm5R593TL4r%2FkeYR2P8B1WD8TO7%2FE5EZh62kqvOtwFjXhvvyqJZzSo%2F6NbW9MFP%2FZ9FQrNkvu93cvTGi5O8IO0%2BIKFDYWnlQTxrMZMg76JmtfYz%2BDt8NvLwvIKC9R4mXVpF1fKYLrcedJddV9gU2nXCERTyufcxUp8Xs9QBHEq0%2BUUMtpaxZWKVmrjjUdz%2BvuOjIZuCOvteIkSqH9pWI%2B7Sso%2B9SKto4pOeQLQ2xJ01SSXW9Kcq3bZ79hPNPbgiOsQYXpl7dy1KPtnD43M6MOmGOAHL23uskvlca7hIAhBTHQ6h%2FjxbBw1uYzjCz19XjlmtuNH2MKdyi9FYJfx7U%2FH2c%2BSC6213tHjHk3PC9%2FHGIUqjYRHV6EXsnewz4WP0MW%2BY6fowvZO8zgY6pgFb8rXHDlLOAvNRNPlDDMxyeAbIwM3LtOAgBdwIcCiRFWJaRvIvJ5l8%2BxjyV2DKMOdXQdU4Faw5JCPxLsACn4vQUr%2B%2Bt98Q0sTmQh6KV7nVejmiMMWpXSYMTG0axEoNcelp2kCm3ShLpqmlCgvyVgCuuoazW8H0ufO9GDhnweH8eAG8tvqYACYm11%2Ftf5hTbfxEo%2BkRvem9%2FVyN5bFg7GjsRz5SWO7v&X-Amz-Signature=fac34b2d5b7ee8324de6b5bd974b058e41e276a8b159ec7c7fbe045d3daa1cfa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRPOXTBW%2F20260403%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260403T010436Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAN%2FUiDdoKtRaySznvtP5LNpLktsQnC6SzuoJlk6DqU1AiEAhgoqGBwbbIlxRV7y4ItL8tc8P5bpy20mWp1%2FFKxiczcq%2FwMIehAAGgw2Mzc0MjMxODM4MDUiDE8hYSfO4JCue7QYjCrcA6MD6LSmIGD6p10edFGNdSDjGeo5KQvKj3QkGiPHmOVohQYak1E4OU2ySV41Ih9chyRbOvdU3jZZC6tGGMC60N4aIMT6o%2F944jN9Dby61nkzfJ3QCJ7bOH8OGDSsT8qcwOI36jOSuYtOY0IabBdF0C4hIHv3AZWsdPF6pBGw77ThP4IFkngMrSjUVBdOWYVKIFu0d%2F4CrvoBIEyJAg8W9XUQxchsOqDBUEL4g1rUsHOPbQgt7n6UYuFcuUwo4lqc62vhaP%2BSWMMiGnDZofLXcDBPzuzUZvqzEgg7QhbrFGIlLIojkNG%2FQXtn8LifkOPUCugmaloMw%2FTB62W8S3vx4R47GXFcDPUNNSNPStVgj0Etz2tVXxP5DLjw2rS%2FbY2EnPb%2ByJI6WK7SZfj7vP0LtimwH0%2Fh%2BjQkomyJer37mbYFdnvL2mxKVEIP%2BmQ7upq7uwZm2nZKqFa2JYrBX2O6UpXgilaRmf53iqIN4JDT2Oa%2Bt%2FsDQNFwau6d%2BaF9D%2FNS0WVS5Y8b6dZx4rCu4ThmGj3UF2gYckuv8%2ByS9JeZ3RbbiKcfg7bq%2FwXaIv3qWl0rYtGyvK5KOBOeo0%2FWVrG6xslNFDpWaL%2FnIrZEBSqv8hJDv%2F%2F0rifITgGkJqXDMMWSvM4GOqUB9iaOo4XCs7txYBWFm%2BMYS8O8eAz4tXcY8NhlCADsmn3IdZVmm7ufpgAQB16vVy2DDcdQ7Yo%2FSSBsqgfI%2FC7fjWoTITnTLBsuBIIlI8sOy4be2klIGbaumapA5M07KJ1ew9LYMWiz%2B8iocLtqmR2v7JiPQuFXdaHsAWYf8TMj8QCdoYbcLGjYRc2XlOB94OCE%2BLsgHR6NwkFtyVsrSfNqoGPua93s&X-Amz-Signature=85411f85ab1d7d4a4cebf13a500769fcf987c766f079f07c1b2f5ce63c821666&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

