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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FJEYEFO%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDS%2BPasrEBHhhIdmc4WhXJb7ZIqEg9Gk%2BjM0KJTqziIzwIhAJ76p9nsLQ6Ma7d3EgEWpHDCPUkufCyG4c5tqzc0yv%2B8Kv8DCAIQABoMNjM3NDIzMTgzODA1IgznnRyw4qbEi7xuZeQq3AOcQq7P88ejYz79fAE8mz%2BuN9oY1vDa0ZuBiwgKAVx%2F%2FixPwcIJZICmuQigNkNj1boakDmuyB5U2okuwCVL4xpmLc%2Fop6fRYFJOlepkOGXgQqBJ1ZUsyBwG6bwVDPIwZLOaBthR0ZAISEbiuI%2FiZfJOcR4VrD4gbIH10WD7%2BTxhCcmPKVwFZqZl2WZXkQ1%2FmKdeeHbYFzP2p4G477Oq4naKInkxxwqHUrdH7HYW4oCU2%2B4Z0Krhkz7xJVDqj%2F83UBBgYQm7XkFq6kgT2mEdPmewN25JjhsvbaxRot6vKrIsLqMtZSxzlDYFuWT3Ez4JB%2FQNSRVnOagyg9sLnJn8ctkKrq7Us99qa%2B4BsdBeBump2xob6xkt%2B1O4D%2BT5OZCz7fgkexajD8PE%2BhZldM3v%2BT%2B85gLs1i9Kkb5e8qH8aqh6skPBenpYYfr5ys9NgU1%2BWtFWjUM5vSUjwG2Mggc6oUHMFTYjRK65%2B0MvKmGPoUya3vEogll2vRdJ2ryIsjcF%2BYVc3iRVODi5phRtJ%2BXzrPMrlABWXWh0HIhH7hz7ikqSPhHqtjlCarJdCIOrVfpwnt9bckUiv5lymhQGuDjMBWcQcor1gnOQTsZkTjK9PjZUF%2BmJOXHUxbNzPNjhGjDu9sDMBjqkAfhlM14YviZ%2BpFh%2FpYJYUaKYvqAY9eklj6RXzNg2el%2FGj6%2Bix6ic6MNO4jA2jDc16Uo1Qu90RNLjCfbcVtGPFwvqPLUxu%2F2msMFh0YbdD4Ke5xjo7tKS896gw%2FNzFozQH7V6opEKrFCrXJmWoKp1pxM7O%2Fu3101WWm%2FR2n3TLXrxOGLFc%2F0uj4LWNwrSog0JTH7wq%2BLHPqUdJwd0Aa%2ByH1NJYhKd&X-Amz-Signature=c7cd12e68714a8383f5b8456a0a6f2b8c70f54259c587e092cd37344890a789c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FJEYEFO%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101238Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJIMEYCIQDS%2BPasrEBHhhIdmc4WhXJb7ZIqEg9Gk%2BjM0KJTqziIzwIhAJ76p9nsLQ6Ma7d3EgEWpHDCPUkufCyG4c5tqzc0yv%2B8Kv8DCAIQABoMNjM3NDIzMTgzODA1IgznnRyw4qbEi7xuZeQq3AOcQq7P88ejYz79fAE8mz%2BuN9oY1vDa0ZuBiwgKAVx%2F%2FixPwcIJZICmuQigNkNj1boakDmuyB5U2okuwCVL4xpmLc%2Fop6fRYFJOlepkOGXgQqBJ1ZUsyBwG6bwVDPIwZLOaBthR0ZAISEbiuI%2FiZfJOcR4VrD4gbIH10WD7%2BTxhCcmPKVwFZqZl2WZXkQ1%2FmKdeeHbYFzP2p4G477Oq4naKInkxxwqHUrdH7HYW4oCU2%2B4Z0Krhkz7xJVDqj%2F83UBBgYQm7XkFq6kgT2mEdPmewN25JjhsvbaxRot6vKrIsLqMtZSxzlDYFuWT3Ez4JB%2FQNSRVnOagyg9sLnJn8ctkKrq7Us99qa%2B4BsdBeBump2xob6xkt%2B1O4D%2BT5OZCz7fgkexajD8PE%2BhZldM3v%2BT%2B85gLs1i9Kkb5e8qH8aqh6skPBenpYYfr5ys9NgU1%2BWtFWjUM5vSUjwG2Mggc6oUHMFTYjRK65%2B0MvKmGPoUya3vEogll2vRdJ2ryIsjcF%2BYVc3iRVODi5phRtJ%2BXzrPMrlABWXWh0HIhH7hz7ikqSPhHqtjlCarJdCIOrVfpwnt9bckUiv5lymhQGuDjMBWcQcor1gnOQTsZkTjK9PjZUF%2BmJOXHUxbNzPNjhGjDu9sDMBjqkAfhlM14YviZ%2BpFh%2FpYJYUaKYvqAY9eklj6RXzNg2el%2FGj6%2Bix6ic6MNO4jA2jDc16Uo1Qu90RNLjCfbcVtGPFwvqPLUxu%2F2msMFh0YbdD4Ke5xjo7tKS896gw%2FNzFozQH7V6opEKrFCrXJmWoKp1pxM7O%2Fu3101WWm%2FR2n3TLXrxOGLFc%2F0uj4LWNwrSog0JTH7wq%2BLHPqUdJwd0Aa%2ByH1NJYhKd&X-Amz-Signature=c7cd12e68714a8383f5b8456a0a6f2b8c70f54259c587e092cd37344890a789c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WG7BPJTG%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101239Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIGUlubSgXFZ26Dh9shk8q2sAdS347wCZQaD6g%2FX5ztOxAiEAjo26zOWDvANjbNkBW%2FBFnZsuc77tpumV95S5T09Bh7Uq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDHLjkiQT7ktmt6UIzCrcA4fORzu7HvvSGimgqZhwBzSrG9FnN9DaAMBvRAxsNPBtGl5G4NxQmStQ2dy1lvplG%2BOhZngRe60FAPD9wdjGZAi5zAva9V0ExRz%2B4Pt3gJciYUt3GjSQ2fzYMJPrr70tzKUwVtb6YtntDZKvzBYCl%2B%2FdEhYxew7Zk2PPEfGIY9mx4pBYK3CqzBR1raznHjJ2x7lLPpPRm836qf4hm97mcCzuMXX%2FcXYXFESQusfGCscTLdLczIp2dhYQhBfmGshnxn8pYkb36nFuicpu7zOAcsyQ%2Fwxlt3qYQOPLVDCYYp7x8qq%2FangPG0n52uCefpPGa7TpB3BfaSq9k9OeL4uXzro43FfvRLUjduF%2BzgNH8tJ8lf2FIpGGlkID5XJlMlzIWgi4%2FV%2FuWMZ9pkHmczM75G5MZe02hwHCQye06Gu%2FULusy3cXnBfumfSMVtVodqkAIsmr93Fmccn5VSmoB%2BF9l%2B0ohNlHJT0U5H6J%2FlzXmuQQDMKMh3228rXT1YZl52b8%2F%2FSGs%2FvbLILuASUwceqUQFWYE%2BnWh8izB8gv%2FHgBo0dl4flBBcb7YprHORv02tg%2BrCSOAyah8xuRvkpn1CW8tPKInSoXTWNivUW9MgqWtwli0CKRCbx9boquzddoMJb2wMwGOqUBHOnaMFj8y5Nl93qLeAybBKb9yDmTAgMIPtMluQx%2FdK9HVNyP4BGrgpIHW67Ftwt9sDeZFrTfLdxNoJfXjkoFSa0k83tJPG8stSwGIOaHo7qyMakAQnMMPqUm9j5PbYJX0deyK9qRA7PS3H%2F3u26flRmKT%2BJYGc1017WnLk44jdt5Sv5rAWRtpRnKsxTx75MwwLddrTdSzbS6uwChrPMwETtxbCfq&X-Amz-Signature=4b87fda2476191e6ee89ed8af30e47d713f1cc4abf9142ba726abe8aeb6dc5c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SL2V4R7A%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIB%2Fl%2BOm2XzBzn7EaEldN5%2FCQlF1%2F3QHUX2x6%2BDFzo962AiEAiWh8pRGdeW39Ay134RAWuHUxMF75yaI6QwAQzMg9EC4q%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDNJesvSdXneLYT5L0yrcAzn7hRkbhIEW1HrqSzeNGrMPA%2FJQ%2BYF8rRK1okT08D9s4VSi226DlRkh1wj7A9ysudhhkOiT1wEc%2FuRt4%2By46VnD%2FK8hiwPjYsT36Ywqp8lByrbGHtjlAca5uzq8SJ6HwO6D0o3gE3OCl7TMM%2B38bX1XcPM4VRZxp5JFvQBPcQlWNx6HbzRWg4zGs%2B9dbGyguHl2CEyKzSwQI9doYAilYektLK%2FSsPAUFTx4XPQ9jK5pw6OHNf1rPvamIv4cK5EHCkjwrKf4gyvmuual0FimxSSvd21dYGGm8jqZTFdAuQXN9OKKsEglMMdxvP%2BxdeyxfQGmknv9ptGN7CsgoCOPkVG6S4qaQfjhty60CeWu85EQStQV93aaZSRnuGAiP34ph170JoUiPG%2BNHC%2BXDXUY4EwribXo%2FvbKqGX7T8cEVX6E5NiYCqwOCibNw6QK9xIxHxQozawpllbxeGUCpJpNO9SpF465dm1YOvg2WC2gzPi5v1vaEEOF4qwPiy86lUJVKON9SgZwxzsVF9yidU6VpiQ3BDK1SrHCIsGqlyqWFtMtZMJSywARNzaDJpW21Lc%2FDYopFnBjgOxpszqqqxzjreTw6%2B2p8BCTJ%2F8eEA5h3NdbwZWSH9H8o0zktKL1MMz2wMwGOqUBAtdSPX%2Bdcw4HPpvpCxInFwmFT412pifAM441v%2FUN%2B5PdJjZHMuBNVRsMtGeyXhADf0ZDCXL5LpU8ybbZRSqSyXi2C%2FyyBM5ueisrNi3EzBEF4MgQv0xZjyi8N6NlghNlsknx43IQmKluy9e6iz5vb5IlsEw6Bg0unKoirZebkpkTcYXqm10dEh9Kfy8RrrHWZgYwqSHjVgIPMM%2BkdDW894HQMLK3&X-Amz-Signature=2439a2303725b19e56d82470a31f3c7b2862df8b25f392c4c32e1ffd9f567a81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SL2V4R7A%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIB%2Fl%2BOm2XzBzn7EaEldN5%2FCQlF1%2F3QHUX2x6%2BDFzo962AiEAiWh8pRGdeW39Ay134RAWuHUxMF75yaI6QwAQzMg9EC4q%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDNJesvSdXneLYT5L0yrcAzn7hRkbhIEW1HrqSzeNGrMPA%2FJQ%2BYF8rRK1okT08D9s4VSi226DlRkh1wj7A9ysudhhkOiT1wEc%2FuRt4%2By46VnD%2FK8hiwPjYsT36Ywqp8lByrbGHtjlAca5uzq8SJ6HwO6D0o3gE3OCl7TMM%2B38bX1XcPM4VRZxp5JFvQBPcQlWNx6HbzRWg4zGs%2B9dbGyguHl2CEyKzSwQI9doYAilYektLK%2FSsPAUFTx4XPQ9jK5pw6OHNf1rPvamIv4cK5EHCkjwrKf4gyvmuual0FimxSSvd21dYGGm8jqZTFdAuQXN9OKKsEglMMdxvP%2BxdeyxfQGmknv9ptGN7CsgoCOPkVG6S4qaQfjhty60CeWu85EQStQV93aaZSRnuGAiP34ph170JoUiPG%2BNHC%2BXDXUY4EwribXo%2FvbKqGX7T8cEVX6E5NiYCqwOCibNw6QK9xIxHxQozawpllbxeGUCpJpNO9SpF465dm1YOvg2WC2gzPi5v1vaEEOF4qwPiy86lUJVKON9SgZwxzsVF9yidU6VpiQ3BDK1SrHCIsGqlyqWFtMtZMJSywARNzaDJpW21Lc%2FDYopFnBjgOxpszqqqxzjreTw6%2B2p8BCTJ%2F8eEA5h3NdbwZWSH9H8o0zktKL1MMz2wMwGOqUBAtdSPX%2Bdcw4HPpvpCxInFwmFT412pifAM441v%2FUN%2B5PdJjZHMuBNVRsMtGeyXhADf0ZDCXL5LpU8ybbZRSqSyXi2C%2FyyBM5ueisrNi3EzBEF4MgQv0xZjyi8N6NlghNlsknx43IQmKluy9e6iz5vb5IlsEw6Bg0unKoirZebkpkTcYXqm10dEh9Kfy8RrrHWZgYwqSHjVgIPMM%2BkdDW894HQMLK3&X-Amz-Signature=af5bfdabf59c5b4918b4fc7f9b688a78677bb92318063f89495d0b5b2c03fb35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y3UVISET%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIHCXgVjurvHFpyFbFnDdxULWikEVJNfORHda5nSyErWPAiEAiZFSWUrlv8wnNjkZYvtowRXxN43KgD4k68LVnWTERCwq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDLjBPRUR5JOM0SG24CrcA%2FLbXGQquztmeZLJGgD6Q2litqnq%2FJCSKv0hUO9OmYscvjhmTd1E1xRn5hmkEDvgumpvnDyBIksdCu0nuV%2Bmq5uvZFLAO0JYi76SX5pIg0WL7vpHQmiCA4%2Btjvbw0ZLZueXmngsPDQeJT1jo2LayQhlmnSUlk8z9C4SQaojBs%2BAFe4RfV%2FYLtkDr1ooGOoDBf%2FJs17jelQ%2Btcpb60odci2jzpJBW9PRORah7Q24IIDx%2BYtXGFjJ5C8H%2FNXlkuJ7pYH2JxeVkfIeSdwBrcIPh15sstZWxREjhBQKQizXc4v5fVBhiYpSltazRr2QflKWQgpQKgjEcvOMqoV5nPCl5rxvlqp%2F6G0p8v2O%2BkUjxuzjutWtGmU%2F9Ikz2fJjv3Xdvck4XET345E3XcXQy1pENWs4YXdm13kp57wvBvxM7HxjaOVB5Uv4lwGztitSWesr%2F0LzByjlafwyT2VEAJb2JGvvYdYly2BomZpmubUFyetjimoX5vCnMX6R5GfSXdS%2BGCzoxIkAw5WOTWIHe4eh8Y15%2BGtZbP4r%2FP8m1Lgu1m2RygJUVYyVSjucL%2FQ39BryGYyB2J0aDCkrm35txNpLB2wqJysOwX78oCw6a5BhJZMoWCPR2MHm0Hloz7zYXMP71wMwGOqUBIctXukcN3uTv0zzYKXehsQ9qYhkjW6rx49AC4BfxwPudjAwNxSHgjV7pBHKWB8UqHP6XLc6NSqNg0mg3pW4CYUp2UtaIjOh4HTjDlNnvCCMYgxxwU5qa%2B8hv8n%2FNYfuC%2BK3vPYSOBgQIAVPhLReOMuoVuf88Z0EJFHQfsrWMUlHolhbnvKxeWowrTcCbfatnGT20AR721b9Hu09U57bX76wYY%2Bi4&X-Amz-Signature=67575a023d6abbcae074365df29171fc301cc3087044eba6c1dbe7d9eb4d6a2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFHQ2P3D%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIHm31mKke%2BFM5oL56HqL0RWtsICYLSLzKuXEHB9fh5dyAiEAvXO5u%2BReAOKmuzhC2ethTTtAxHFzJKvikaatXaSMk%2FAq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDDDAgmWEyNldlEXvWCrcA1eeiFo0u6oGWESeqV9ThxLoyc6HAK4PlsdPGFT3JkZUXM5Fih86pT%2FmJTRPjetPQuodpdLqi7OIYPcayTGLdL2mYlfInKFbH5qh%2FqOO92%2FzYcqpMxbYJXOKSYFZZJnfMVf%2Ba9%2Fc0LKqfbhxI1fl58S%2FB5PGEz1xdPWILxEsk1i2dZteRoaaliRla34IsF6P53QS2yEiVcBalMKfyfpu%2FCVh2RNlCXsMaH2y6zXzc%2B3JfHK4RcN1sAbjyS1KyLZ4r%2F33CDqUomEz1f5Z7NnSI4aWVLQrRj%2BR0TlOC0gbY1w8B%2BdiJTaRx7Dc%2F9g8d1jO3jqApIDaXlMrjXFT0zaIGFviwRJ4WdAy3xFew%2FEUP9YWE9J5KDQJoa%2BJpEWCvbB0CMgEGeoYsh8wC7rQv0hjsr0Tc8ZAu43eNdYP%2FY8ru91cyeYc4FgkOaWziwLiwRt9TanxE4j40C2Bv5QDmgx2PgHRsS3%2FG5nUsh7M621vNBOW1b2%2BazgRLzHgUvMddQYI%2B78q%2B6%2BKmh%2BylpqF3w%2B33%2Bn6oqum3mtIjQGYB0YsiLi65NyXpYEcn9738GN2rP9exsMZUzFoqjAJ1MdX6dAqjM%2B1WSnYmfzdlmBFKXdryAf5awrywosYsfKo6a1%2BMMr2wMwGOqUBx1%2Byoc6d2X3AWm%2FNFJZhBvM7zxbiMnzbk5LTCo69%2Fc5zWhCCDjB2aSZJNu8HF4UKxgBIfgR%2BwMx9JZxdyEk01UNvIKJdfdUhHmXEjI5oVdJPXbAPJq7lmBb1AGbvS%2FBUhJTsfXD1m1PX8r4NnvPpvt2frs1nVlW%2BElmL8%2FfnWDPHim8KHrQ%2BWpEX3UJJf9GwFkOjeED5zCVHDtaHigc0p9G22jdE&X-Amz-Signature=1134ef366a76870b0fa6f21a2aee90091197dcbf759bcee20fa2730aea82ce7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XDNVPV7A%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101242Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQCvzs%2FvjM50sU7%2F8weJt8Y92woQirI3iSUaWTwZQYIcvAIgB0RmiVc1IK5WgXvL5quFKViEESRr8M%2BjMZfrTl31znQq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDBYU%2F0LtJuykW6UHNyrcAxhdIowpxkEUSgyq9Ao4laBi%2Fgvsebe3%2FHAe1RuWCkFzbTQaY%2BR7bWnZsrKwrU6sdfWUGVfbEpYrCXDBCX6aJ%2Bwpa2ktec8REqaFSV4CjlJzTJVcS7HcVnH44dlsioBS13eHs3I5QUkRbB1jf7W8ENHRqC9lO7AJ0eH%2Fqx2RHr2lPhgjumrpa7q7FJkNZOaDl3KOvfgFzQL3tKYqoyWvyemRtoO0boHR3F7jX2gY1MTS9mky4Owo0ly191gISsyKe14U4CH3SWjzipluvEMixouGs%2FmI0vfDyh9WHzY%2FmmmrX7L8%2FLPzYCrWrij0RFarPPFrwbaR7lqQd8MQUELn0Q6S22plYePWz5YzRtW13JOp43anScAamJd6GSuCulC8oEWhyEmqIbSO25xqrk3fBkDUl2XR4CYox%2F8HllK8x4xzBdkcyidUNDRzrS3fPHLlu%2BJXX7gV234beB8%2FYKitRf6xF6op1W5ui8moo3nfPdbZkD%2FG4wr9%2BHcIayO%2BgVs335nLF4EabNTVG7%2BUykOFBRlWtwyXc5EN37JsNKBxjUlAmKYAk3Z%2FaPTDSb7rfznETwXn3%2B4HSxj7GWAWyKz8lEbO7KCeBBtUtjoFa1Xa%2BkFBedb89Z2EEZmOC%2BAoMMr2wMwGOqUB6oeVaKhSQPsaVvmbZyJIOJJ0b5wT8pPviEGNhGKHIOmnok6EbkQ9%2Bf6shMsXKiZlaGQJRUeTxNF2Tu9wr39%2F0e%2BoAKukhZbfygNuaPHW0sjuKTbrOqHm03oN0L93U1M%2FizkG9HoYE4l6YVo75Ss%2FpYzcyn6K3N8wv25euyAydRiyfx2eRGh0b0fgk2PnJL8ly3dS6Kb1aj9gRpaq750q9fqdrmxD&X-Amz-Signature=57f028842589bcda09e88abc5ef454f157cc71e314fd7cda0e87231f699c07dd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q65C6MKQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQC61F0ApSRaJJhOfKvS9KcYLUE7VnI5ST%2BOm2FMRUBKewIge5hFy99G2k9XvEDT4J8nro5mpfN%2FnBCgfsljswqtWrUq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDCXRZl6n38IwvSELoCrcAw5WC31wI0S0Xjz2GebqOlNEvqqylxSAu0GyJYqbLM7T8GV1LWx6HSqeWubu89Q6PMwppch0nb2%2F5TStMOq3xAJcw7zpLDhBpOTk3gNS%2Fl2SJoXZBf31GluLd%2FdXwwPJzJFUETAjo51hYFwY%2FMbYBjMxvirqFYh%2Bwj9Un5JEHyHOmzh5G9IXmpSM3G9HS4CwJ9rpf8dKpWCYvqYUTMs11TlPaHzeVPquHZMtuV7lt2ENNpJ2rn43OyAXVJkEVbhDlRi8HhLMR0go5%2B%2FNo5lhDYGR4YJQjeO7D3Drq%2FurBVBClD9QOF3v5ulHBuSw2C3nFHq29Cna8N%2Bp%2BcS2ilBNm2IpBRA89t2c8Zp%2FvLWDSjOqP%2FPR0FAgcaVxo2r7f89K2YZWs8sT2Wp9LFJSGxkNGCFbJJ5crh9c7YKf6vPFgw6gnie54O8IZRLt5SSIH0nw7voF561qBx%2BYhVF0QaKbEjLb5T4pTrR4sCABE1D6lai7YAx%2FcezYz6Js5JrHf9f95cQrONKoQituyC87YAe4hRXgvuTvaBAp1KNA%2FxTsTztFhpUeyJ%2FwFQwJtzyTlfz8m2uyqiy0fKi1z1Oj5ELGF6UMdzMovF009d%2B8KNiUkJNyZnFApusrFx3ccnVTMOn1wMwGOqUB8oEjl2d2lUoFUJ%2F9O6PiIBghJbQfpqpg%2F1BonQIAViirMnCJi6vgSe%2Fleeltu4%2FW7VirnnBYwTCK97QrO4nTcdykcujl%2F2gpsvDZ61XCTyz5R2NX58%2B1jjfd%2BKIWZ65clKd2cMq5qYqZyApl2%2Bg9XnTgTLJAdrK9lXUMiVqJW0bRX2PqqykVtHXRjqJlfAhZo6qceg19lw1mjxODeRYi0N%2BgvQy7&X-Amz-Signature=a4388ca0e268c78b3fe293feb52c732bb50e7e66a726fcb59b8b0d8bbabf412d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q65C6MKQ%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101243Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQC61F0ApSRaJJhOfKvS9KcYLUE7VnI5ST%2BOm2FMRUBKewIge5hFy99G2k9XvEDT4J8nro5mpfN%2FnBCgfsljswqtWrUq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDCXRZl6n38IwvSELoCrcAw5WC31wI0S0Xjz2GebqOlNEvqqylxSAu0GyJYqbLM7T8GV1LWx6HSqeWubu89Q6PMwppch0nb2%2F5TStMOq3xAJcw7zpLDhBpOTk3gNS%2Fl2SJoXZBf31GluLd%2FdXwwPJzJFUETAjo51hYFwY%2FMbYBjMxvirqFYh%2Bwj9Un5JEHyHOmzh5G9IXmpSM3G9HS4CwJ9rpf8dKpWCYvqYUTMs11TlPaHzeVPquHZMtuV7lt2ENNpJ2rn43OyAXVJkEVbhDlRi8HhLMR0go5%2B%2FNo5lhDYGR4YJQjeO7D3Drq%2FurBVBClD9QOF3v5ulHBuSw2C3nFHq29Cna8N%2Bp%2BcS2ilBNm2IpBRA89t2c8Zp%2FvLWDSjOqP%2FPR0FAgcaVxo2r7f89K2YZWs8sT2Wp9LFJSGxkNGCFbJJ5crh9c7YKf6vPFgw6gnie54O8IZRLt5SSIH0nw7voF561qBx%2BYhVF0QaKbEjLb5T4pTrR4sCABE1D6lai7YAx%2FcezYz6Js5JrHf9f95cQrONKoQituyC87YAe4hRXgvuTvaBAp1KNA%2FxTsTztFhpUeyJ%2FwFQwJtzyTlfz8m2uyqiy0fKi1z1Oj5ELGF6UMdzMovF009d%2B8KNiUkJNyZnFApusrFx3ccnVTMOn1wMwGOqUB8oEjl2d2lUoFUJ%2F9O6PiIBghJbQfpqpg%2F1BonQIAViirMnCJi6vgSe%2Fleeltu4%2FW7VirnnBYwTCK97QrO4nTcdykcujl%2F2gpsvDZ61XCTyz5R2NX58%2B1jjfd%2BKIWZ65clKd2cMq5qYqZyApl2%2Bg9XnTgTLJAdrK9lXUMiVqJW0bRX2PqqykVtHXRjqJlfAhZo6qceg19lw1mjxODeRYi0N%2BgvQy7&X-Amz-Signature=ea81585e9e000d9995aa06defc1bcb9631402baefa8c529ddc92bc14833db382&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TK6DQQFD%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101237Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIApCHmuj7dmwAV1keLrV3QbqMja8Fb5hKSXnrU2A8oiIAiEA4hB9Z8dAQ1QINTlx1Ctb2pHDV9HXkHeNea0QrodX60Iq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDBv4xzIg1xgvzBX7NSrcA4W5T%2BMvCo%2FpA4yNNCZgIyD1IQ15zfJAuoZgetduhZjma8xZFcKePFvbIpLrard%2F5GZ6rfeSDkLqZ8L7LHnZ3YfT%2BgMa2AYK0Pu99to6F8Z760OqarpfnYZLUCWyEDl0URYYgB40NiZz0CZZqzn5U0WZJnCzumdb8Vq9qJyMY656vj%2BCXi1AfAiNqde2TFhDUcO3KSeWYNKKXGfi%2F0QeOoHw36armroKhgrSlwG3v81W9iLFV97U5NH%2FN%2FnGdTKdY8%2BngXkycXkMFajaDs8Uh%2F3YGbO35Lduk3CJ4FIo6I%2BQuFHD5EO4U9Zf0ab%2ByQ46um6XKJaHKvymkrPJLSzLuUs4AqQqzCtOiAMRpN5WK7xQeaVK0y%2Blbe1U8P9LcoJNvrsaXFe3Ol2SwaQzNEWS6ysUGCXr4knY4lsQJOb9TgnVPqVSkCmdYurrw5WN3btXXAzHr8JnoOQ5vdOqF%2Bonexjn7LxnkJUWlLMWWDFI2D4SuU8witQiACBRAB4DKU%2Bnn1sF4sxXiR2L76Z2dNOJz%2Fe5fmPUYa8zS0dt3xkwuUW%2BRZfWRr7NE6jnAd3sFTPdyGphXkSnpXYqjups8oqLd1O1F8tRrfTkLklpY%2FiXpVI2fWQsno8qY7cWEmAWMLz2wMwGOqUBSEYAjt6vEhcPkuQCFK0G0Fl1%2FB4mitQS%2FBCoDJJCf0WNcbFN8wxfcG%2BrKW3s9ibVhYCDpM0%2FidF2by2pKkzTFBWFgQdF2n0rB6ugmUJgie0UB8K8nWkmLeLkeEUzlonlmo0RhnjrZrdqCB0UX1qSVvtSaOe6sNNJY1CQG0j35K2mlzJn3wMjir%2F4GrHRjwo7hmncILjHiBXBSsR%2FHAtT3NVmsDI6&X-Amz-Signature=30760e634507bcf8c79a8bc6a20811b224d866ab4e927f6fdce0246cd6a27f19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIAM65J4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCICC48T8LeOOc9Hlcs4oLpjbXqEREFtNPjPZjLlbPeRBjAiA9CkMx4H9qfAOFbE8rzPbdHmLk1DXheGCl8DqhnDhPjyr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMuci77yr17Rl1p4oiKtwDpsef3nnuBKHgHLY78WS8fWBqVaWV%2BJO4FPeSbwXCPtHamP4O8pnU4iwo5L9GcIJm%2BDj7vzftwyOSuS3YgVgcZXlXkY3A6TvLkfmjkCC1YjM7cjl%2FpqydSxKXtB5xdRkT3Y%2B2r5Dzqi3PJMuiKS4P%2BYRsROWI0ccIea0r5%2FN2Vrh8qRmFgVHcA%2F%2FA3S20kAo4zv188CRutjSQmDGr%2Btnhalos6%2BXX3m8yRz9PcRXPlhVFw%2F1CJSTU75W38i3n7ABcQUV%2FHEO4VlJiXEDfDSFC8tGfDI0xAV1epHVxwNjd6Q%2FTiJGeIqJM4ToyBTpGqM5lQaQCkOzJBVd7yop7eyNYkkkRE6oMANItgfkH7wYs1Vn8F5LxZE4EA51vRGPCKIAvTM7A78lYFor8D7ZRs6%2FzByIOZVybxka97rGLXv9TT5oFR7U45I0M88ItZaHJ3YQRFaJE1d7zgCDmfh19jhbfymlIBP59MVexWba%2F0bmlmGJ3inMzSeVz14JuXY538U01HcmqNA6ZOkcRgO35sK1m2sSZtwNm8DRT%2BZAWOw6710Zj8jOe1H%2Fwg%2FJfn%2F39n9%2BLzupDzuqd5ZkUWwa4i0vmloXGLSoIlY5%2F3ir7k6ObejXbfSTcv3Q5zqJleFkwm%2FbAzAY6pgEbIjCLiFN2%2FSZ7el5SXJI8PGXMgnzN1oSagH5kkrIjSUDjfPy4pTKxOeCdoGKCu8NJ%2FcTsQhnG1LyoIsDHaFUoHix%2BrbuavtTFtke207FMvtyKLTym9AE5n6ng95Xs79WFrqRQSJwIhBVSLQCktiXsOyXQtl3d8azh2czxTAuWQeuho%2BfrBzF1dD2Sa0%2BInGT6AYXpa8nLZt1CuyUCs%2Bvr6NhYdCri&X-Amz-Signature=8fd0e512e7d69646570147a740739b43561d107d3f78dcaa77cdafbc85bf5fa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIAM65J4%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJGMEQCICC48T8LeOOc9Hlcs4oLpjbXqEREFtNPjPZjLlbPeRBjAiA9CkMx4H9qfAOFbE8rzPbdHmLk1DXheGCl8DqhnDhPjyr%2FAwgCEAAaDDYzNzQyMzE4MzgwNSIMuci77yr17Rl1p4oiKtwDpsef3nnuBKHgHLY78WS8fWBqVaWV%2BJO4FPeSbwXCPtHamP4O8pnU4iwo5L9GcIJm%2BDj7vzftwyOSuS3YgVgcZXlXkY3A6TvLkfmjkCC1YjM7cjl%2FpqydSxKXtB5xdRkT3Y%2B2r5Dzqi3PJMuiKS4P%2BYRsROWI0ccIea0r5%2FN2Vrh8qRmFgVHcA%2F%2FA3S20kAo4zv188CRutjSQmDGr%2Btnhalos6%2BXX3m8yRz9PcRXPlhVFw%2F1CJSTU75W38i3n7ABcQUV%2FHEO4VlJiXEDfDSFC8tGfDI0xAV1epHVxwNjd6Q%2FTiJGeIqJM4ToyBTpGqM5lQaQCkOzJBVd7yop7eyNYkkkRE6oMANItgfkH7wYs1Vn8F5LxZE4EA51vRGPCKIAvTM7A78lYFor8D7ZRs6%2FzByIOZVybxka97rGLXv9TT5oFR7U45I0M88ItZaHJ3YQRFaJE1d7zgCDmfh19jhbfymlIBP59MVexWba%2F0bmlmGJ3inMzSeVz14JuXY538U01HcmqNA6ZOkcRgO35sK1m2sSZtwNm8DRT%2BZAWOw6710Zj8jOe1H%2Fwg%2FJfn%2F39n9%2BLzupDzuqd5ZkUWwa4i0vmloXGLSoIlY5%2F3ir7k6ObejXbfSTcv3Q5zqJleFkwm%2FbAzAY6pgEbIjCLiFN2%2FSZ7el5SXJI8PGXMgnzN1oSagH5kkrIjSUDjfPy4pTKxOeCdoGKCu8NJ%2FcTsQhnG1LyoIsDHaFUoHix%2BrbuavtTFtke207FMvtyKLTym9AE5n6ng95Xs79WFrqRQSJwIhBVSLQCktiXsOyXQtl3d8azh2czxTAuWQeuho%2BfrBzF1dD2Sa0%2BInGT6AYXpa8nLZt1CuyUCs%2Bvr6NhYdCri&X-Amz-Signature=8fd0e512e7d69646570147a740739b43561d107d3f78dcaa77cdafbc85bf5fa0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDZNXITX%2F20260214%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260214T101244Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDkaCXVzLXdlc3QtMiJHMEUCIQC6b6rGpBccVv44fz03bxLn8izt2stl4mKCw96ZuqzHpAIga4fkKeAoJAjBRkbt4475mWyQN6dBOaA390YyxYkMEIAq%2FwMIAhAAGgw2Mzc0MjMxODM4MDUiDA2axWgcXLrtswfOIircAynkY1%2B%2F2r8WeYUc7lYhJpKzeI4cvzUWS6pKRwLEmJnigSXxZYfQ6J%2FOnr%2BcQd9P3os1LyLrp3MmT8TntaZQ1nBTiHnJwR5qg3D0KYRbrApbyIjaQ5Eb80WQLF2agyarMbH1SuoJA47gbqDyWoHqJ1Cd2OnSwsKS1dnX4ntXj%2BT3NbOsdsxu%2BGXdfFKqDgcSGpN99z%2BHjPhKXyVNISyr7jtx5%2Fjh0iqBkCinxEW2fmIzqTCv6Gj85V1oAMB7oz71V90OZh75t0oXDgjyKZAAAr32abgMO9vWCYe7pFOm4%2FZ1jq2QXeUjeMUCUbeYJe5cCrxB%2BKHvylSvH7SMybAVzED%2F1Lvy%2BrbAq1HR8nMQ0xds6WKtgt5pMO6b0%2BSu5SC6yuwFt%2BMYUJY%2BFQgWE7yZS7N0Io1VyJn2uDlZSd77jV%2B1FEDIGsoKc%2BnbRHnJAv9t%2B2wyDreYNdcK%2F%2B7n4DGo4jACwTjmch%2BB5%2FAOdG3N1P2ke3w2s9uL8pLGQ4SM%2FwRMf15bzWbls0s6tnw1qdNhEU9vIza96OuOB%2Bzar86fw%2FUKnzMbCNUskHZDh4bh4vmCmSsPXvcdaxLqBbaPM96dmM4xEY9lRBy4VFPn5SjbNRQIsWuFscp8g6D4DR6hMNX2wMwGOqUB4PAbHCLE4EMFRjmRSR5a1NGLGHvGRTSVvK1hUj7hkEydZw%2F2zkLm8XtPdRYAzoX8Au87ppW88QOSevTF%2F7b3%2BGNx7KawJGuVcTawrWBNdjPvY4iQjaWKv4L9M1Jbx56l6%2F59RSHU9Ne7mX%2Fc6rQufVF%2B9etVo1BYhORDvoiZwgj%2FD5mv%2Ff178xY5NiC%2BDNJWnMXCgFIfpPn6esQRu8SeN8hvlRP8&X-Amz-Signature=4fae2dd7532a00eeaed030b71414d29cc59f3f465ab1d13e92ac9117931c4fc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

