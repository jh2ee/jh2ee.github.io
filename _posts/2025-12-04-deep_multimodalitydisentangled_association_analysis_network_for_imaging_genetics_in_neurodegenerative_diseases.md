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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4ER33CB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCICW%2BFwjuB%2FR5RSzqbTLFg1sDlAiTNOMNxRHk1r41OTwhAiEA2pqLZ9%2FoSE%2FrjDP5awstVTHMGQFgDfPUPXq2vFjdAVoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDzvnyO%2FuLI8iPOAsyrcA%2BiwQrulewcYx5u7gtz3q84WsJl6%2FC9p2kdKtTluejJrPwqTcSdKcELJwVIO6EM5pxEW%2B4JBmtWTKSYci6z0xwO5KQdjeIQxOIJpFI4%2F11eJneWBevPO0hq54%2FOZt2jS64YJOg%2Fo%2FSgkZ322iLgd2GA2HHeGzYDjfBheOd1L12IWvGjlEMaNnwgD7YS%2BXxlMHHd5Gqf%2BnCxIs85V0Ga9Rtb4XcIfIrk0xqm%2Ft5vP%2F%2Blb9BuQjKJVkzNLyw7Gn9%2BHWj4LhldRBogjiTf3NProaY3KHqThrVa1Aq3rERANmWJbTfjhZxjPTQrnsP9tCdEeenP7tTKb73r4%2BGY9OA9uo8q0XR0yD1ww3V6%2FedQwzEiCclqG%2FFYNEmzP%2BvLcTXnC6jZdAjxGQZxVcpqFiivtjTJBCBTud5XRr9QCDuLPzyeW3LWpgfQHKV8iFAgVRxJNUbIdOmsbqwL0BCS6oyAcXfb3RJlfoTwqLA70Xr%2BCqMBwLoMq5RqfLpmNWKX6T8%2BkOnZ3WvzbzkcXIh5kxvqcmuKdG0selopqzIghTgmhUXFF%2FraK6eGPPRW3eYQQOHfrKIA43Ucv8%2F5rQ%2BiRpgJiAZWsgMg3mPfFpFXe6KCe1rcBtySbDmDQFdQjXi%2FkMLuJ584GOqUBrtj7D87iSFlg%2BSeYPGMFRrCHg7MToewSggeK3cYo%2BkxwQmPr2TUW%2FeoYdjcIXEI3gIxx5t3rf%2FbAVwHqfBKKMw0q9QmdSEOOSOQ2cLLg69SikykVsRlJMRdPIvctAQYjVbwAL60LeVlzcvNV8bUGPqExGmWu57E%2FDO4Bn4Tx3FLPjwuWVPaChAWPlFTt7APY%2F%2FMvVjq2wKZWs92HGTZkf27Ycjfe&X-Amz-Signature=b1eec525bbe0627b25eba596a9989842c815dbec475761c9271401e253e12371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V4ER33CB%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040802Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCICW%2BFwjuB%2FR5RSzqbTLFg1sDlAiTNOMNxRHk1r41OTwhAiEA2pqLZ9%2FoSE%2FrjDP5awstVTHMGQFgDfPUPXq2vFjdAVoq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDDzvnyO%2FuLI8iPOAsyrcA%2BiwQrulewcYx5u7gtz3q84WsJl6%2FC9p2kdKtTluejJrPwqTcSdKcELJwVIO6EM5pxEW%2B4JBmtWTKSYci6z0xwO5KQdjeIQxOIJpFI4%2F11eJneWBevPO0hq54%2FOZt2jS64YJOg%2Fo%2FSgkZ322iLgd2GA2HHeGzYDjfBheOd1L12IWvGjlEMaNnwgD7YS%2BXxlMHHd5Gqf%2BnCxIs85V0Ga9Rtb4XcIfIrk0xqm%2Ft5vP%2F%2Blb9BuQjKJVkzNLyw7Gn9%2BHWj4LhldRBogjiTf3NProaY3KHqThrVa1Aq3rERANmWJbTfjhZxjPTQrnsP9tCdEeenP7tTKb73r4%2BGY9OA9uo8q0XR0yD1ww3V6%2FedQwzEiCclqG%2FFYNEmzP%2BvLcTXnC6jZdAjxGQZxVcpqFiivtjTJBCBTud5XRr9QCDuLPzyeW3LWpgfQHKV8iFAgVRxJNUbIdOmsbqwL0BCS6oyAcXfb3RJlfoTwqLA70Xr%2BCqMBwLoMq5RqfLpmNWKX6T8%2BkOnZ3WvzbzkcXIh5kxvqcmuKdG0selopqzIghTgmhUXFF%2FraK6eGPPRW3eYQQOHfrKIA43Ucv8%2F5rQ%2BiRpgJiAZWsgMg3mPfFpFXe6KCe1rcBtySbDmDQFdQjXi%2FkMLuJ584GOqUBrtj7D87iSFlg%2BSeYPGMFRrCHg7MToewSggeK3cYo%2BkxwQmPr2TUW%2FeoYdjcIXEI3gIxx5t3rf%2FbAVwHqfBKKMw0q9QmdSEOOSOQ2cLLg69SikykVsRlJMRdPIvctAQYjVbwAL60LeVlzcvNV8bUGPqExGmWu57E%2FDO4Bn4Tx3FLPjwuWVPaChAWPlFTt7APY%2F%2FMvVjq2wKZWs92HGTZkf27Ycjfe&X-Amz-Signature=b1eec525bbe0627b25eba596a9989842c815dbec475761c9271401e253e12371&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YPPIAQCH%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040803Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQC4a5tQGimXA5GCebAaSszKyY4TvnE5U%2BCcxmibxXfGGwIhAIQhb0gqr5LZJUt26surKh%2F%2BE%2F7zEvtPUBcvvzf%2FS5tQKv8DCD0QABoMNjM3NDIzMTgzODA1IgzlrlPYszB72raNbucq3AO11zYEmX7RGP%2FcCyETk4oIy6NHKvHayw6T2hqDQo61AssdcXjCI49JITfhd5smmdRH350EFAKm5%2FthQ%2BKjKpxBTUYiOE2OOw7pe8Ddu1DEHX8ZhK3tx0UNotxcZtPor4v4xPCRLCV84ps7OLPnTLgxXkWNy5AMyx5AGuFeqn999CXJP02vr6RKAV%2F%2FdiyFwjMCc7MsNi4HWK3%2Bk0pK1IfR3XM65bra%2FOx3gHzSCsnamjrP0vS4ZeDElL1JOjs4xZ36TRbf9kgLRQWFNTn5fBLwc%2FKviIMkNVCV6skltQulnj%2FG6S2tcs4KiRWG5tptAKN1wvf3ox%2Fw%2FsJChZkisDshbvoCSbhSFSXjDHW2aD6H21gmn5vuVc5DZfTiLzpP0BkfrtbqvFLwC5VUhpsAR7x5B2IrwO245Zfi1izL4S7pRp9VsTO3sxECa2KW2F4Ke3apZXzKzopZlBFwt2Ptm5LArXjUxFcOMWFVIn7zCIRgwTgxch6AkVVDKItFlbulHdNxUZW3DoDxOXr5vG9tlGHofm73AmXI16WvFHo%2FjLQvOKQkfr49M%2BPY1tFjgweM9PRsRqFjyknkB%2FGQ1Zo66EN68kFtZdrRdbZxRYYEPX5L891IJTSgPYVOtkhMKDC8iufOBjqkAWQcfpkSLb2j2uN7FPEAI8h2cmJVdWhLxqa%2Fns7hlb5SQEWZD%2FEF4V59%2BfeG6gdZOc99tMpup4gsOll9tapavELYwZzCEYPBkGAhaIRxYmrG7bHl2%2FYP%2BuDC%2Fdt6qeYfI0kw2VrGsQykLFSvtUh55ZswlQlcSpsx%2FSWaoSa4yrEwZTCQk3n2aQLy%2Bi9ZGYTmAWMd%2FyMZl3T8LpqSJ7vBD%2BVzJFWi&X-Amz-Signature=1919d3cbd2f4840e3b2210403c5c25b44c53509c9569d291bbfaecef2903e5b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663APW67WN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDVOeHWvV9G4opnta2eFvlRf8PzMT5xu9IdYJ1LcASjpwIhANZ8QfaZfG8eDSE0%2Fxg23c1ikMjRmp4zoxUNU36Cn63eKv8DCD0QABoMNjM3NDIzMTgzODA1Igx2JN1fETKT68Og4B4q3ANdzm7v%2FXUm3EPEYVlu%2BIawR0xjdEBr%2FTtUE6AE1hRWRq4C7kUYxIUbAz1zuc%2BKOuuVJER4xLcwiWAiuwizyUfi2D6bBkMkktgLvUuplStG75GxEU8B2hgdBh98N9%2BT%2FEF8uZpEQotGrqm6pSTmJTOMNEY4Ur1%2FNR1Di8giG5L8vg9KWTnOWBGf%2F003jCAACT29mRHTmrLt8crhqaN2TK1taUX3UjRzWrAiCggxqQutF25neoQIrgGufW94AkgW4TAqzAA7sftHulJMFAt17g7CLVyLwD43G5roAdwyrNwhEFx8KH62tDeAf5f2lULUCaRn%2FoNsoU0MhRM2Mdzs8iY26p0XdD0nTIaAdCPLLP%2F5GUuXBkiWX80dJ8gQK6Rpda%2FZL2gasgKFpBCFRAEvSUsOGcN3yFjSpV2DIyYxgZKvCkMtE0h5sasSdvYw1QuaTP2HEGqfVbtnGyapY%2F4xBk29hp6m82IigFSVfU00B%2B6j9FmEVfUDhX4xK%2FsFw3JZzbfiaqKMItzzGq91KqBJINMTs4TOYSrgEjQP7zFSl6OiL54A5ZUBs15VO41v1EL2LymeOJcU2ezaRQ2dv%2F7jq3MN3ha04HMyERxyT1xtEmvA3u66q3xx0mxUbjOg2DChiufOBjqkAUxvdVnzgkgFpsDIaQKxKd9Uyc%2BzF6hyN9hdxjKMrGDwoK83XPGYhvqNa76WUYqaHSQgk4A22qNZsglxs7TkVJ1OJ%2FURWpDFpuGcUscrXTCwVwcvFJiW0%2B%2BCjqmS%2BCLTdLX0LYSFYMxiF%2FKDkbS2AfA8YZU%2Fh7v7%2BJNO%2FZOSvhnuONpIRv2x3HYk7K303YSsrjsca%2FhDypY5jnQ7Sib4MUvIC3Tn&X-Amz-Signature=24795cf5207f9fdb2d59031c93279beebd45ecded534ab089ea43a954d1db1b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663APW67WN%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDVOeHWvV9G4opnta2eFvlRf8PzMT5xu9IdYJ1LcASjpwIhANZ8QfaZfG8eDSE0%2Fxg23c1ikMjRmp4zoxUNU36Cn63eKv8DCD0QABoMNjM3NDIzMTgzODA1Igx2JN1fETKT68Og4B4q3ANdzm7v%2FXUm3EPEYVlu%2BIawR0xjdEBr%2FTtUE6AE1hRWRq4C7kUYxIUbAz1zuc%2BKOuuVJER4xLcwiWAiuwizyUfi2D6bBkMkktgLvUuplStG75GxEU8B2hgdBh98N9%2BT%2FEF8uZpEQotGrqm6pSTmJTOMNEY4Ur1%2FNR1Di8giG5L8vg9KWTnOWBGf%2F003jCAACT29mRHTmrLt8crhqaN2TK1taUX3UjRzWrAiCggxqQutF25neoQIrgGufW94AkgW4TAqzAA7sftHulJMFAt17g7CLVyLwD43G5roAdwyrNwhEFx8KH62tDeAf5f2lULUCaRn%2FoNsoU0MhRM2Mdzs8iY26p0XdD0nTIaAdCPLLP%2F5GUuXBkiWX80dJ8gQK6Rpda%2FZL2gasgKFpBCFRAEvSUsOGcN3yFjSpV2DIyYxgZKvCkMtE0h5sasSdvYw1QuaTP2HEGqfVbtnGyapY%2F4xBk29hp6m82IigFSVfU00B%2B6j9FmEVfUDhX4xK%2FsFw3JZzbfiaqKMItzzGq91KqBJINMTs4TOYSrgEjQP7zFSl6OiL54A5ZUBs15VO41v1EL2LymeOJcU2ezaRQ2dv%2F7jq3MN3ha04HMyERxyT1xtEmvA3u66q3xx0mxUbjOg2DChiufOBjqkAUxvdVnzgkgFpsDIaQKxKd9Uyc%2BzF6hyN9hdxjKMrGDwoK83XPGYhvqNa76WUYqaHSQgk4A22qNZsglxs7TkVJ1OJ%2FURWpDFpuGcUscrXTCwVwcvFJiW0%2B%2BCjqmS%2BCLTdLX0LYSFYMxiF%2FKDkbS2AfA8YZU%2Fh7v7%2BJNO%2FZOSvhnuONpIRv2x3HYk7K303YSsrjsca%2FhDypY5jnQ7Sib4MUvIC3Tn&X-Amz-Signature=11fe20b914655a08813c61f3d8b28ab01f95106ac98924fe44693e78b565ba48&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDBETPAT%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDwabz274Tb8O42Znq8H72553sqtXOIBnax3TaxcInwCwIhAI5R8L6yQrO8CBK1ehM2vIgG%2BgWba6tSUV5hfaOrwJ6jKv8DCD0QABoMNjM3NDIzMTgzODA1IgzY00IwopQ50Ji5R0Qq3AMcpow0xRjLxFSFnRWfwv77wH0cThb%2BhGNL24XaEwIJLy3iu7eRsS7hkTowfPlZ94IMx0GgGE1y7YDIlnb%2FhY2Rr5kdR89ZP%2FpQCbFrShzPFHLNLaAQ3Ku1dJ3drWFUvbqQFiQRuhYGiPK7OTz30mM1NFQ7aq3ugYyLotZ46w7xlU%2Ffo5nYjY7Cf4RSnl%2BuF6OSWxPyilJjcfa%2BQTDcR9Dv00OHAbstFbaRhr2CKcqNURtxAnFuqjxbthgZF%2FqJ7x2pgf8ohQlbXWc%2FyiRHpxYFgEHctS35eUs936LsJErpKNoeircVdZo2%2Bw7tq0KHiV0T%2B23FFdUIPjYhjIVFK%2BLZyN3kLnK5ccr4ze65OlZbCWAS42yZbHIDGPf29k2%2BVa8rEjipeaqPGwIhWtpwx%2BoFWHLF36P3R4cyKhnwueyB8MqPMEqA2EX0DXRYtTkfotOULZLg0wV%2BA6HTKLshBAXsMn1mb0I6Kcd1fN5nLjd0AY3Ekpk%2BujATCChMLjvrvUflapM%2FtuFTXlI9MszC78lqH5FxRedocOorHbgJ43cRM34uRBJyX7ECVHF0cJ8l2OETqOzU3lIGrJ5d2Dzq68JVV3g4UCwKFFSe1Fvlj6o6naFHfBso7eUxEmi7%2FzDKiOfOBjqkAU2d4x06EuOQrhMeD9XeIjPhHRhlyUvHfojMJ6qXATXZuuHdydvtbXHrl0KyS5br%2BkBlWgb29fsT8YdXL6WoOEoC06CE59Pu57R8CbJBcnK%2BfexOJhDUQ5k6tZ8rhPRFM%2FMYT8ZD8ogkvOxVq6sQ1%2F0IO0QgJeCSPpk1IMOC85%2FQcxTtCq5EKhvPyI2lmYaFYUSN7M0bD06SkE2CtBluP%2BokmORo&X-Amz-Signature=34fe64cb6427e56b743dfed7602703b0915ff98de0df2d297cee02832c04d272&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EUQ2TUF%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040809Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCU%2Bcc01qpqqkqrcDvrg3bA0qQMSdcsQlGqjDYh3WUpkwIhANgavwqYfZmAbuWmQPp6ZtVHzxc14kHbcL49x%2FQA7TRiKv8DCD0QABoMNjM3NDIzMTgzODA1IgxwP8UN88XtNokFkUkq3AMxrxbnSzkRmAmf7fHdGN%2FB%2BFEJAA230u5KrENV5%2B3vEWwHnYi6y6NEsNTaPVhKvtv1G4rxrtNfrXmgBKZWspLAfV6Lb4cfh6prPtrFVqgb0DH5FbZ8VgCHjpoa4YqHn2U8mAyoim%2Be7tkuXk6HF%2FPU59nAbc%2Fiak2obwDLWl58v%2BbDeJc54Pemflj49cxW97rJ6%2BaTbwpFLy5JMC0a9sEDU3BVfB1uhjOv9FWzEv1wcaHrjZM%2Bz1qxW1D%2B07BtTFpOBBuElxh98VaggojeafyA0RIOl9fYO4aRc4UApc27sVtMDjekrNLGlJqnbJ3Sl6%2FUQ2g6uEAaqzZriFNu9yuLZLSegy15zLW%2FR9bw83FuHxs%2FIBNB9kZ49cdFpwS0gPHd2VHspTJl213Emy%2BJZPa%2FrE7g19%2BA9n8eHPZGdgQ9VeOGnbFPsbt886pl6mJ%2FdaaUco%2B%2BdMeVc4TKvIL%2F4NMY7jg2hzw1S5KHGfbyks95hcRq3u8u2vUa6Wn2SHsGMiQNgmFbtcy6r1%2FTCOYelNWq2RlYMO16IVaT27GqPv8Os7mT0zwaOJmD7lqlCTccFKhtXarmewGv2CESqM7ZghciopBsYyXMJ2DlETqxmvgh9n8qVH6HkhRsLJIpMTChiufOBjqkAcanMhwkIn7mPTyl8jQM6Z%2Fo6KBSvxsCJLFCmgxAn1f8y4mV6lYPbZ6MtR5xFRuFAH77tmnyJ9xHYJNPUm9DRSGB%2B1WbBJCY3gw1XjfGcuMy8xnbV%2B3Z%2Bem9aXB2qboNRw1p7AqBw8tf%2BjKq1ExGjEakvB7g8Sc3%2BaUmEJlIJk5O0Rk%2BePsZSsrIxVLxkyeZggL4VKq%2BVwM5Sz%2FQIYZ7qsMmYZTE&X-Amz-Signature=39e00a70925177a2301a23886e0c94afd8ce92cf366bc3a5da3b45afcceee088&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPLHYLGO%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040813Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQD1XgUbSdBK5lZThJSGHu3BVkdQHOA0WP8cSUyC6iw0lwIgbU1STBum3qLTgp3E0BFGaxsxvHYIixad94r8vXjYdfQq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDB2DTTnjnRoPb%2B0NBCrcA4zG8egyacjnnKc6DqVTzBNjo5J6ZMFFFZYCed4r3sKcnMEJGDKvMnaL4rkJG16oTquq0TeVwhmHYXBSI0OeDOM1Eghq3kNgRGXEDqC9EkvcQZrNdmJR1dp2wNhz3m%2Bq7230K%2BVhQef7sMQjy7ZWtjSBKp%2FLOMo%2FipOOFEnJqM4LE%2BtYiA0kDq1VauyAzvD%2Fi4j0ci9Wg85drXsEngWCWm905JDJWO8%2BSh54saRx%2FTbzxO8Dtq7TbyjbJkbIiD98sfpzKagrEuc4xbVYJoXSc6Mf41eAnaoMHdeJLXXX%2B785HH%2BzkZWL9TIpxoYRPpxXSiQMIcm5urEAxxlHcvKgNu2g5IGoQ%2F5l3Rd180Qp0yj80YHkT1Fa1WXsAjMi6Y%2FeunkAVFtDHz1%2FvGRYUt1uwVfwr5Bu6kYTQxcOuM99S%2BxPQpS%2B18R9dj3iKSoZPq6qq%2FBb8QAUxMT9Fsx4lpOLpXMrj1kpXPXV%2FONVfmtP1UAR8UDtWvc7UEV5FTxJSjKS9%2BK6bkh0X2vZVVPvT45blJGnbE5%2FpCE3whvg7AkWf66BrHexePklgiWEW4QCwvujowtbAhbVBOxaw7T5AoCZPKOi7qdcBDWyNl8%2Fyn%2FRyWgcOeY3bJ5u73H2Zb2JMM6L584GOqUBZHB9ugZt6tmJQququTDsGNCimjMLNc291wIYMxeD%2BXGVF2EXxQ3qLCi5Uu5kjHBmHb9Mya2RIMd0LIZR4vTPWDmG%2BHwDbOvX5%2BrGyMICO6kZtCxyxsVwNctS9iD%2F61Xr1%2BILuj9Q%2Bf9bBEBOcxxfjcibWWHjiS4UtlErN5yocQVtDmCAwj75SOMLU4DPlsA5OYUOetMe%2BJP6%2FA%2BbFF9%2FpVvjCOdK&X-Amz-Signature=7e1e7e5c07a93191cfa36b62bf6a34a1152e2c63650deb6a3232c9ba9e31958c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L6ORQHX%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCvpnElIqjnGwnXuouRMLwis%2FvaUrqUtFRTwqdfhGjaNwIhANsMzRPf%2Fsru7ThXBPae6D1vPHz4sBOhaUPn7SkQEijDKv8DCD0QABoMNjM3NDIzMTgzODA1IgzhF5Dh8unLhcFK5i0q3APecgFaxjbsoynam080qOy53I%2FsSGHGOKNDXBvJwLi6IUTwOG%2FURmWrQJ3jEg1hAHYC%2Faibpmp7OeOW%2F9XEH6kaZg6UdHUkOlc1ccNE1j10o0%2Fx41g1qPL0VuBybB3EIqJzkDjDDKFZ%2Fl4Odrws%2BcBxN%2Bm43ldTltI5MqYjYA7FJyGEMalD4A33IylHnWn4%2F9ZlpnZwVKDORgBcNFCoMfhdV3Zyj2NViylpohIFlZar3MPi5XjtabpDHFxmMRuVPy2SvqRAlk2gPfrt2K0zMWzCaF%2BMgBDjnoFiHiP%2FI7AJTGAA62lP7NQwY38jeFp5Z9ueNjpzB6pXdqmmUl62qa0AzNf%2FhuglSfSh%2BtpB2rn5xLfM7QEsdeEKzXHcop%2FkeVRzyShJursvjuzE5mhEA4b%2Bar8Kqykz7qSHYsKPOyFG4rv6l6eMlJC3%2F2gskNmBKjJxArfZ9brq%2FZuI0PIWNik9jStdyg6g0Xk0TRWY9gErsJtNR4tJvNH5KeTrX1mniWsv7PWGSWz3iKL3RkffFhbEMu6PSrnYeY57fUHgVnDtTi76JzVk1uC8Y6EacfVULEU63fWZRritis9HDmGkF6qGztRRPKDw7sCg%2BEcJKSi%2BcxxxZ3umLR2UGHyTFzCHi%2BfOBjqkAUOyGBVE37vIsq6YJXyOTFJaV6n4MQB%2FwAojobWpggjSPyw3QeKo6eanKTYkH%2BJ%2FHzrFFtGPG4NJiUpXRzcOlMGQd%2BpT0kfMUse0tsaqfq7gQqpxGFDgK28FDKGD0JB3EMkz0JgOvb4Bm5AbPr%2BaI5OVBn0LZg7eERjnAsS5T9gspuMkuRzgYIUXjVWRuSLg0%2BXKEZeCEk9c3zB06%2BaMxE5jAcYe&X-Amz-Signature=0681e3b6c2e5921ff98b9ad4f680d3468df40c841c3d192c646dce435f695e6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666L6ORQHX%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040814Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCvpnElIqjnGwnXuouRMLwis%2FvaUrqUtFRTwqdfhGjaNwIhANsMzRPf%2Fsru7ThXBPae6D1vPHz4sBOhaUPn7SkQEijDKv8DCD0QABoMNjM3NDIzMTgzODA1IgzhF5Dh8unLhcFK5i0q3APecgFaxjbsoynam080qOy53I%2FsSGHGOKNDXBvJwLi6IUTwOG%2FURmWrQJ3jEg1hAHYC%2Faibpmp7OeOW%2F9XEH6kaZg6UdHUkOlc1ccNE1j10o0%2Fx41g1qPL0VuBybB3EIqJzkDjDDKFZ%2Fl4Odrws%2BcBxN%2Bm43ldTltI5MqYjYA7FJyGEMalD4A33IylHnWn4%2F9ZlpnZwVKDORgBcNFCoMfhdV3Zyj2NViylpohIFlZar3MPi5XjtabpDHFxmMRuVPy2SvqRAlk2gPfrt2K0zMWzCaF%2BMgBDjnoFiHiP%2FI7AJTGAA62lP7NQwY38jeFp5Z9ueNjpzB6pXdqmmUl62qa0AzNf%2FhuglSfSh%2BtpB2rn5xLfM7QEsdeEKzXHcop%2FkeVRzyShJursvjuzE5mhEA4b%2Bar8Kqykz7qSHYsKPOyFG4rv6l6eMlJC3%2F2gskNmBKjJxArfZ9brq%2FZuI0PIWNik9jStdyg6g0Xk0TRWY9gErsJtNR4tJvNH5KeTrX1mniWsv7PWGSWz3iKL3RkffFhbEMu6PSrnYeY57fUHgVnDtTi76JzVk1uC8Y6EacfVULEU63fWZRritis9HDmGkF6qGztRRPKDw7sCg%2BEcJKSi%2BcxxxZ3umLR2UGHyTFzCHi%2BfOBjqkAUOyGBVE37vIsq6YJXyOTFJaV6n4MQB%2FwAojobWpggjSPyw3QeKo6eanKTYkH%2BJ%2FHzrFFtGPG4NJiUpXRzcOlMGQd%2BpT0kfMUse0tsaqfq7gQqpxGFDgK28FDKGD0JB3EMkz0JgOvb4Bm5AbPr%2BaI5OVBn0LZg7eERjnAsS5T9gspuMkuRzgYIUXjVWRuSLg0%2BXKEZeCEk9c3zB06%2BaMxE5jAcYe&X-Amz-Signature=4dacbaab261543c680973aa321bb344e98373dc30fa8dab66ea6a5b656d0f5be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJRFYB3W%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040800Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDqYYDjtEjDdVWs66HYVZ2GDfD1OMqb2%2FEDTG2qpLG5ggIhAKL%2FvTNx8ootlJLAbaJKGoHAyOPpU%2FKnuSsyUJ2I3ucRKv8DCD0QABoMNjM3NDIzMTgzODA1IgyofhE7SaX13xsySKwq3ANLRwkB%2B8BH2ZFZFZC55QOdTropjK%2F%2BXdEE2hOSbNK6hRZPujKyvHuD%2FJhSL3YTLwi5PGHjCo5Grab2CsQshbCoR22dscI0wVRzsRU7cili3dgKCf66RvbvyM3YMnZvJARxDwQeH9vCmPTs70IpeR6SoWZD5Gf6b51tPG46xNg%2F5HyOC3BjWT7ACIvsodNJqYBfQRn57HnsfxrTp9WUpkkpZ%2FXOJGnvdcxugM8hR2vsatm8NO5IoC7g%2Bp9nQctgHAj2w0%2F978oKk5hCaQz7SVrwSucJdHd62MalHUqml8h%2BFnfvJPKMhphBAwqE%2FwF5UuaDe3sKZjiMrbkQdBWb9Mpy0E3Yl5vXlaf4ZgMIf%2Fe%2Bv6m7SemEu841lZFxvbb99DxUtqh9Do5BQbz%2BBtrKovRL32TDCwOAokZ7kwOmY7ifmS%2FKgWaDXyidiNR5Qv4KfmJY5I7U8m1tIdfpNT82cfObQYbnvTo20Mdkl%2BZkkLvNqidFVjtBqNeU0AwCzroEY5ghtw5DQFXXa8LCdp51%2F%2BjnB3N65IYIl%2FDjHQy7Te6kh9YoetFmtnPcVfXT5auApg4fo5wx9ApsFrRJjVRXwXMoa%2FNSoImaxBhD7Dxn%2B%2FLce3Crq0hcDsfNfnvGqTDpiOfOBjqkASm3EJ%2BqyJaV5wGVudQvPicdSDezW0%2FYPzfXK1QaHN%2BSKSZdLHU1%2FJglbkI7lKsVcxGsMDY6DPjnnBs%2Fj0%2FnfnRvVAxixKdzUjaFHTAis%2Bb3RVyA9lOtL9egAneCiLHfHw%2BiDBe8JBhveGHJGqdGFihuNmt4JunZZgdiCDXZ0WbydZSviVI%2BA2L1ypXfigWKKwtcUqsEZ%2Fk96q2ypAW70nfZ%2FzgP&X-Amz-Signature=e30ecf4181c9f59f533922d4ba3d2e529359514402ee640bf85d92886fbe22c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLZYU5Z3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIDTAg6LJ0AkCY%2B83y1r%2FswSncsq8GZiA4OtWyKAt7dr4AiAnhsEnknmkM3NxlcVi2%2BLUWUpGuM9%2F40k2Doi8h3vy%2Bir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMnNm8QVXhxrDR0k7DKtwD5tYY3XHZG6yBsFtQDtV%2Fqr7CkieeM%2BS2vkpOVAWmTw1e7wxWAS9qAc0hDJ9OKDZz7dHP2d9Z1kjmLrSGm51aRuH%2Bbsq%2FJGAm4c2V8PYNwM67%2FdMkrEjyAgfqVGAUY7g%2BqWFfmEUWwOsOgY7XNXqjKeh%2BBb%2BGoDYdwtjITCD%2BqcM%2FVig8o%2FjuI5Ex%2Ffb0epgkHERNONW%2Bpl7fGsLHZU3%2FZVcdkPK%2BTVYEuCgGZsoSygIW%2FyaRjaMIstacafYH%2BTJjQreUujSZdjZBb3XFpAzVM7Nc%2BAC9LI9ctdeBVWe%2FsCc2r9nEUepC4uDKyPnERV4syNEw6hgMQg6Lkc04rplcoMg4CrnqKwcowf76paWIXT0D0Jl5l2Nbox1reJTckdSrlV3Z%2BRWSv7FqntH1U4cNAj6gN1x9DQegwu9vx%2BPASbpyiJ59xkJNeScOMQiBETa72dkpUbIzwRNV539N31SXJk2%2Fvu2Y77rDiWB1JKI4ZRpHtAxs3VBK9DxakxOqFmZQgPPrL%2FA%2FVtYvglNAcxsqpCT5f2PXtwV9AE%2BCXZN05wDqoKEPsRqao59kw1tGwF%2BsQu5b82bX5n7jldwATepjCZRfMqDzYlcMypaRDe6MOv0Hw2CSlPbBFe%2Baz0ow9IjnzgY6pgHPgYRV0Rc9VOxYuZPYo665tYVnSxYl7ROURzSg4breIhbVqHPmgO7ynmTDWrXQnIg2qigJrz2bhw8Gsj2FUIeyET9ht8W9JzkjNvlUww%2FtuCeL6rIXNvEZ41DQGmHRsCwj6pYeIWhCL9f79E6Gqrb8z1dAujWlAUYqydjultM5UWMzeaE8wZXXJc16exCzKUjP5YM6iMBWzrCFTOuTCT1d1mV9Ehcr&X-Amz-Signature=5e0f6d0c5aa1c6d8be5327e8e90851e90628f1181d11e06c9ecfaad9b430ba04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WLZYU5Z3%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIDTAg6LJ0AkCY%2B83y1r%2FswSncsq8GZiA4OtWyKAt7dr4AiAnhsEnknmkM3NxlcVi2%2BLUWUpGuM9%2F40k2Doi8h3vy%2Bir%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMnNm8QVXhxrDR0k7DKtwD5tYY3XHZG6yBsFtQDtV%2Fqr7CkieeM%2BS2vkpOVAWmTw1e7wxWAS9qAc0hDJ9OKDZz7dHP2d9Z1kjmLrSGm51aRuH%2Bbsq%2FJGAm4c2V8PYNwM67%2FdMkrEjyAgfqVGAUY7g%2BqWFfmEUWwOsOgY7XNXqjKeh%2BBb%2BGoDYdwtjITCD%2BqcM%2FVig8o%2FjuI5Ex%2Ffb0epgkHERNONW%2Bpl7fGsLHZU3%2FZVcdkPK%2BTVYEuCgGZsoSygIW%2FyaRjaMIstacafYH%2BTJjQreUujSZdjZBb3XFpAzVM7Nc%2BAC9LI9ctdeBVWe%2FsCc2r9nEUepC4uDKyPnERV4syNEw6hgMQg6Lkc04rplcoMg4CrnqKwcowf76paWIXT0D0Jl5l2Nbox1reJTckdSrlV3Z%2BRWSv7FqntH1U4cNAj6gN1x9DQegwu9vx%2BPASbpyiJ59xkJNeScOMQiBETa72dkpUbIzwRNV539N31SXJk2%2Fvu2Y77rDiWB1JKI4ZRpHtAxs3VBK9DxakxOqFmZQgPPrL%2FA%2FVtYvglNAcxsqpCT5f2PXtwV9AE%2BCXZN05wDqoKEPsRqao59kw1tGwF%2BsQu5b82bX5n7jldwATepjCZRfMqDzYlcMypaRDe6MOv0Hw2CSlPbBFe%2Baz0ow9IjnzgY6pgHPgYRV0Rc9VOxYuZPYo665tYVnSxYl7ROURzSg4breIhbVqHPmgO7ynmTDWrXQnIg2qigJrz2bhw8Gsj2FUIeyET9ht8W9JzkjNvlUww%2FtuCeL6rIXNvEZ41DQGmHRsCwj6pYeIWhCL9f79E6Gqrb8z1dAujWlAUYqydjultM5UWMzeaE8wZXXJc16exCzKUjP5YM6iMBWzrCFTOuTCT1d1mV9Ehcr&X-Amz-Signature=5e0f6d0c5aa1c6d8be5327e8e90851e90628f1181d11e06c9ecfaad9b430ba04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4BLHI6K%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T040816Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQCFVVwGCP6JooJUdPVhmRiLK80UqnSRkQIBQNoSeYrwKgIhAN3wtwWWqZxiw0eqobd83KO4dtEPlCqArnarPDZSiXHqKv8DCD0QABoMNjM3NDIzMTgzODA1IgyRL38A4hYzX%2BoJfJYq3AOYW96UofFpZOIYfteTkN1jtI9Hi3rauXZbeIe4aHM9MCZctWrazJ%2Bp1ua7UFJCm1SKjtoRIZ%2BDD6MYCFY%2F%2BPz%2BBt%2FDjAgeDIJXEH3iSz4K4o%2BOE584KecvbBPiLCIX6GyPJkI1p%2Bf1va8tMKS2PUAOI2YrBr2vVsNepBo7ZyWoe%2FJdHE8zdBl9B2inKvaqcgiCipjqCmDmHyljlnVHofx1v03C8TIGK%2Foqpv5C3Qu0nCmBYubXGtwL3CCqnUDXqjrXqF%2BAJvvbehVIIw15e6ullIjuC2rJhckKYWgH8pVcvQ8WLrACjBQy5yWFsrLkkbXwsYU0t3vY7IQlQz6%2F0xJOfv7rx2Pkra4tKrKMA8YeNOhNpV2qnpa5NXWaXoJ24tP4WFaOuyPxCB7eJaDDE4aMx%2BJC%2FpE4x5Yq2ZWwvZ%2B7KNjdiRDKfBaYFpYso8rBwjAhtgyeOK7n%2B3FrMRMO1hD3W%2FM0rvR5d1bXv0Gbc68ZsHnV3TBXnjuicCjeexee5oJKjivsktwiLmrnLjG3ggxXEHbBm8ZKXriKpjF4ABeanj9gt%2B%2BwnVRBlhcPuiM4Vo4xwS3YCHv4OkFJJkUoWvwm2Q9UUWbFNtcUB3W%2BqIwUaZonoMSrP2cI5hbjkDDii%2BfOBjqkAZiwAfk8HjD%2BRB4MWmWxYwZVuNOdmdp%2Bal98pYxXSTJupLosItimjKFHMrxgXu7FNqx5%2B7nu%2FPZIb%2Bo6XgtzggR4K5XrpXr5C0AWPu8uPJbuSzaY%2FWRQ1ZO6KLcGJQoUNOUM5%2BXz3w%2BjvyYhkygblGfOpVNQrIQulz9O5pqUqIaw2BVJkykve%2FqjURjPbONRlqME%2BbGGBz%2FuYMPOAfRQcPGLyhGn&X-Amz-Signature=fdd0ce73d052f2559f8e4010e0d588a232e0893b0f1035aff006ad0bf6ac7f64&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

