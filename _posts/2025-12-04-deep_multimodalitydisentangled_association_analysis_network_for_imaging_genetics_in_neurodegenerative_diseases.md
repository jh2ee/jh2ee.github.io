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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOLOWGZQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAvt2QFfl0tKPurYZiY%2BQKWchUfu3Af99j1eCAmFq%2B6hAiEAmzqrKSenQhqE7xM5bldf0dl%2BrlJbXs4dSljexFtML8Eq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDAt9Js4HCYfaLBrc6ircAwogJUgGpvW03Z8VRj%2BBDDlmZGI0Cpe9uZykEioRE4guYqmga7sBLIVJB%2BNLrHUUuMxJ9WCgCB2nzZ20WzL7x7xuUpUCYpgL8v4OZAeHCd7RcBr5qAPcuhRgHV0b%2FReZh0Lp%2Bz6%2BEZWAe5TfGtm%2BREk36Qwb3UWQX7ezF3NQx0AhU%2FKYrCQEto6cYQxYB%2BY2EYHYYquXbgPSKzMj2vPEaU2QFtisI5XrH2mF124JdXcTWrbHhLs1%2FA4Rb3Ux%2FLCsa05VpEI1JVekF5tOgyNO%2BqMiVov9tIN72mJ%2F510lRUUft1XPdGjFOx8FCFrLwQYSOkjySjWyqKPbtHuqO%2BdKTs4dfTe0%2BGz4MIpjrwKlBmlubfsie8bjod9WWZVg33%2B%2FH2Zv67eq%2FffKbPjfuXUmsVsJfKbklFareTTeBuZSm%2FuZc9s3d6y0dGZJLeYazuudfoMNXw6gt%2FPcRLAjjamF05vKbpVY%2F2pQ6om8pfQccSbCJxlL5%2FBKc6WgnU2xb59SrmzpmbgW1YcYibByATjT8RediSqDh0UkOgRXAePSMb5tfD8rS8zR1SRHHC8HAhVKW6KCdYWIkvoMzxMjNqDxBvcPQRh2zQrDslAshZWC3nvPync5tEYc%2B6YQ8X55MOO9%2Bc0GOqUBIWyGx2Rj8%2BP9W67qS%2FoLtuOBzY%2BVXnwo1RRy0niMf7x%2BUSc94HlzSdrrH0fIAeeGdWX9gZ3yt3FWxHwfwMic6PooRc8%2B0%2FDtiH9rdIMjuWSk2k7xMOHm%2FVGFVzVqDVmVzdjiGjP45gmoweoDvsJxVJnRsujmDMQhgbrrTkASTD7YTAU5TYmAwW%2BkcnkwPSGhS6PZuND%2BA6r5xfZ8tfYbp276VQks&X-Amz-Signature=df58d04ab009169f215b2a43e6f46e3fd32fd134e6f7c79458110e205f31aba9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UOLOWGZQ%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAvt2QFfl0tKPurYZiY%2BQKWchUfu3Af99j1eCAmFq%2B6hAiEAmzqrKSenQhqE7xM5bldf0dl%2BrlJbXs4dSljexFtML8Eq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDAt9Js4HCYfaLBrc6ircAwogJUgGpvW03Z8VRj%2BBDDlmZGI0Cpe9uZykEioRE4guYqmga7sBLIVJB%2BNLrHUUuMxJ9WCgCB2nzZ20WzL7x7xuUpUCYpgL8v4OZAeHCd7RcBr5qAPcuhRgHV0b%2FReZh0Lp%2Bz6%2BEZWAe5TfGtm%2BREk36Qwb3UWQX7ezF3NQx0AhU%2FKYrCQEto6cYQxYB%2BY2EYHYYquXbgPSKzMj2vPEaU2QFtisI5XrH2mF124JdXcTWrbHhLs1%2FA4Rb3Ux%2FLCsa05VpEI1JVekF5tOgyNO%2BqMiVov9tIN72mJ%2F510lRUUft1XPdGjFOx8FCFrLwQYSOkjySjWyqKPbtHuqO%2BdKTs4dfTe0%2BGz4MIpjrwKlBmlubfsie8bjod9WWZVg33%2B%2FH2Zv67eq%2FffKbPjfuXUmsVsJfKbklFareTTeBuZSm%2FuZc9s3d6y0dGZJLeYazuudfoMNXw6gt%2FPcRLAjjamF05vKbpVY%2F2pQ6om8pfQccSbCJxlL5%2FBKc6WgnU2xb59SrmzpmbgW1YcYibByATjT8RediSqDh0UkOgRXAePSMb5tfD8rS8zR1SRHHC8HAhVKW6KCdYWIkvoMzxMjNqDxBvcPQRh2zQrDslAshZWC3nvPync5tEYc%2B6YQ8X55MOO9%2Bc0GOqUBIWyGx2Rj8%2BP9W67qS%2FoLtuOBzY%2BVXnwo1RRy0niMf7x%2BUSc94HlzSdrrH0fIAeeGdWX9gZ3yt3FWxHwfwMic6PooRc8%2B0%2FDtiH9rdIMjuWSk2k7xMOHm%2FVGFVzVqDVmVzdjiGjP45gmoweoDvsJxVJnRsujmDMQhgbrrTkASTD7YTAU5TYmAwW%2BkcnkwPSGhS6PZuND%2BA6r5xfZ8tfYbp276VQks&X-Amz-Signature=df58d04ab009169f215b2a43e6f46e3fd32fd134e6f7c79458110e205f31aba9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WM3NB7SF%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCwrlXXCzdkS9Ypdx4eD%2F5fVKwWoeK%2Bm9ond96qwSdG4AIhAO20t8ETxST70pra2u1vqf2o3u2Mnb%2B%2Fyu9XenTrhHOIKv8DCEoQABoMNjM3NDIzMTgzODA1IgwXW%2FW3CbanjX9rGMwq3AOEYGZnS3XjmtjX4iUmVDUM4ZXtvJb1ZSsXFO3G5o5lgm%2BYiCsusTonPG8JWZHBm5pLFiTj4GaDY6dkDi%2FeoLKRez8oTGnWtwvm0bSy4mieYC4m0VK8mYR7lyQAMP43uinEV%2BFFFzTD5La28vV9Ee9IGvCap0K%2BNwtX%2Fk7rzFqdfBqj%2BpEog7s9G%2BK8%2BvEDvmVbejD38AiYruv12h3H8JTgt3URL8SaLezT1S715Dq0zHQLiDufPXnKzUQIw1YQp8F4ZMAs7B8YyetTGbQYQdBeVOCI7%2Binih0peoVIQ9G3WZ4p0D0tGRdc9Od7H2IGBZYR83fFmNkkttjCExawdYOqMF5Ngla7aKFkqe3qa1Q9fWS%2BtDY0HJ7R0Loi70GI1Wv5Vkz2BBfCJC9WULl9c8Lljes%2FZWXH33s19UzNge%2Ffl5qux4egDOgK7gi0viPSykbiiNIu6PSJEK8hZub1By0EEsVtZI1qfqWmQAsEIT64Wgt5E3R34umwW8kB2UgBG0YKkCpH%2Bev9uavkDnQS9rBC1gkve%2FN5c32Rgy5GbDDQHA4Be31YvEPaf3HGqevFeTzdy%2BcQTzMK8sXHVa7B3RtLPN4doR1bdgvXGg1rFt%2FGl0vk7xewCRRjBQtwpjDivfnNBjqkAeNTxDDHkA%2Fvh8ReFfomMnWA6ZIfUHIjkDomIrNolw6e5aOCzsXgTUO7N4sKBt83T9xkvwWRcXj5GbKuQErYTJZbqCow0PWCinlrC%2Bcs%2Fwke%2BsDoSUmhQg9h2Rlmzlonz3kAFMMb91vupaaZlyln9teUeLwqDV8mNSvtdSSeNNw3gCuvqKB3Duf%2BbHcQHF0reO1vxPa4n0uXebGgf6wxtygDBleE&X-Amz-Signature=0da105884947d25c0e41bb9e016a3365ab92f17eefdcb619b916b0114dbdea13&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZHMO6H7%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIGmAUXLSqlW%2BuxqbhVBroSiY6KTCKVqwyynifN30hLgIhAIB%2FGPtcuqX0Qv7uNAJq8pZYLzHPuMKagZoszuDWyss%2FKv8DCEoQABoMNjM3NDIzMTgzODA1Igw22R%2FW1yyaAds8SXIq3ANpArvAUOVGrKsifTmEtQW8qIOj7NOSKkVx5fYGYl%2BaitacmHDc%2B5PDtYw4qsF0qF887Tnd8JmFDz1MLyG0hiuNNk26AfJad2I%2BgG2aMxbhi82CBz3X3QFCXhGfQM7L%2FOhAWK5EIwUxTH5dFRJSSXdBCWSaHhUNHqgm7LIO41ZHqstcnh2QMmRjWdHOn03ai7x83oDeAEKXrgnLbaSEq%2FEgFAaTRFz3p6aMVJeq5Tqyq2jfwY9MoIsYlLbP%2Ftquug5XV26Nofsjp%2BvJaVyp8Tu7G0z5nvbmNxHkpE2kl4tEMg0pY5xktaTf8kgHAhCSOmvnj3dRxRw%2BVZASQJHdCc0AayjIw0DK4NutuYKgzfflcOGvibZLgfwV6SNCi7qyReDx0Qi%2FWaGEjosJowa7UAZAR04x814gBeuNHiDj%2BgklSuXXOZeuV71fDX91gmN7umXKDYgI29BbJHhVNeTucEJRRZEI%2Bbs4fME1ZvAoscAiZye5ERcKU3qMWwOk6VbKXc86HcV8E6Ougpqhns0ivgdl8CckafW9TYHdf5AsSrrk3mUuOm5tQq5GFpe79xIL%2F%2FGFZ45z%2BSc0k6p45LDN3VP1yQ5kwafS4TCUbsgSYkn5jgwAH7Kcn9AhJiw%2B9TDKvfnNBjqkARJ3Jd1vnWBtfKIjZSqZ%2FYIwuj0uMo2M7BXxb%2BtshgfA%2Fz0WSB4xt3IyvmlF9UZlcf5oQ%2BY77JRKVhdooyYp6L%2Fz8rlZcFeetx8Rj7JOiuRPx3TaircQ%2Bf3dXVQwHgNy3iL2yZS5qXwcTre9CDPupM4haCuJSv95c7s6n5UUSITJSmN5Z%2FveRcf1a2tfw2jENW0x8yQxaJVMB47Yb%2B5fccflTEfM&X-Amz-Signature=31fe47a493644d6b7dfd187925de6676c2d185e2268b5b2202e3739797c57774&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZHMO6H7%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133359Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIGmAUXLSqlW%2BuxqbhVBroSiY6KTCKVqwyynifN30hLgIhAIB%2FGPtcuqX0Qv7uNAJq8pZYLzHPuMKagZoszuDWyss%2FKv8DCEoQABoMNjM3NDIzMTgzODA1Igw22R%2FW1yyaAds8SXIq3ANpArvAUOVGrKsifTmEtQW8qIOj7NOSKkVx5fYGYl%2BaitacmHDc%2B5PDtYw4qsF0qF887Tnd8JmFDz1MLyG0hiuNNk26AfJad2I%2BgG2aMxbhi82CBz3X3QFCXhGfQM7L%2FOhAWK5EIwUxTH5dFRJSSXdBCWSaHhUNHqgm7LIO41ZHqstcnh2QMmRjWdHOn03ai7x83oDeAEKXrgnLbaSEq%2FEgFAaTRFz3p6aMVJeq5Tqyq2jfwY9MoIsYlLbP%2Ftquug5XV26Nofsjp%2BvJaVyp8Tu7G0z5nvbmNxHkpE2kl4tEMg0pY5xktaTf8kgHAhCSOmvnj3dRxRw%2BVZASQJHdCc0AayjIw0DK4NutuYKgzfflcOGvibZLgfwV6SNCi7qyReDx0Qi%2FWaGEjosJowa7UAZAR04x814gBeuNHiDj%2BgklSuXXOZeuV71fDX91gmN7umXKDYgI29BbJHhVNeTucEJRRZEI%2Bbs4fME1ZvAoscAiZye5ERcKU3qMWwOk6VbKXc86HcV8E6Ougpqhns0ivgdl8CckafW9TYHdf5AsSrrk3mUuOm5tQq5GFpe79xIL%2F%2FGFZ45z%2BSc0k6p45LDN3VP1yQ5kwafS4TCUbsgSYkn5jgwAH7Kcn9AhJiw%2B9TDKvfnNBjqkARJ3Jd1vnWBtfKIjZSqZ%2FYIwuj0uMo2M7BXxb%2BtshgfA%2Fz0WSB4xt3IyvmlF9UZlcf5oQ%2BY77JRKVhdooyYp6L%2Fz8rlZcFeetx8Rj7JOiuRPx3TaircQ%2Bf3dXVQwHgNy3iL2yZS5qXwcTre9CDPupM4haCuJSv95c7s6n5UUSITJSmN5Z%2FveRcf1a2tfw2jENW0x8yQxaJVMB47Yb%2B5fccflTEfM&X-Amz-Signature=bf41db3e81b3592df5ab32e84651c0b4b55d77a41ea85af35affea0bd19e552d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GMEFX2O%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDFH5plfCef%2BH%2BINTXsNrPEfIwv%2FPwOZTzbSicdV1QPGgIgKmAEXZ0d4z89BAVMI55AXTEVjW56QpJVT%2FfNOEpEbjsq%2FwMITRAAGgw2Mzc0MjMxODM4MDUiDEJCST0q5EugwpeInCrcA%2BJAI%2Ft1mW9xGkGmUs2zSHNk6yYquz0bgR7G%2FVDWkFOZX3oxEy2tmlPKGwneqUoMHqPvhPLXhHCR8UCcELzBV0uiw6UT%2FDMbQB1MeOTV%2F6yhseTPgti3habHrZneAjcNpgNrtGokucHsKoe%2F1p%2F6noVg4No9gIig0sAMdDQctWmRm6gUrIEO2%2BNvcL2MA1H3bjJ%2FZN8t3XLBdIf8cdmJR%2BTLrcQwYZRZi%2Fvf85WBvzZ6TE4OXloZWXmiwqI9t0o8SOxaEUQCHmDv8FXRgXZdtdUwHOzBaGlrEi8sa30UBHYS8jwhUM7fWQVKhTjf6xbyOsuoaNx%2FZm5NywrktLPLa8mPBghs9XCspioO6pObd%2FmUj%2FZEHQH69gN%2B5nMA7%2Fj3W7n2SyceDYFDH0Dqw6D5exzX9cIk75OSC5o9ZomJjndExJKUdTotYFMVMyFqLuu%2BONAulWgRIvSgVI0xoqamCzTILIrrmqCbGVlDxd6AxicaSrnbljXrgyxulIJPXyFR83ij2WphujMQYZveUX%2BsNONuJUIap6%2BoCvRHWZEISsP39Ys6mdkSE%2BI8K767NMxv9Zodv58RcLczeBvGdQwUA5COTo5SVZy%2ByKfrgp3FEX3vLCRwmDy4xMcbnQsjMJyO%2Bs0GOqUBi6XGZWmkdo9gLpbFLCeXtX3vO%2BKmI81u5ucDmTK5sbjA0V6D%2FtvYGX3QGIwetxwwweqaTo23RtXBAx8N1XfQZ98YkcSWH0mqrj8TFPdMJ14cJHz9ta2z%2By%2BjdrpERocVJdyZ8xYfPsSRp5U7tffuAym%2BihS0LJTzpF8aJBE%2FOsozTqdm3Fq6IABiXyKUKsBj5Bkno%2Fi5pdtbjfJWXK6hFysKbr3T&X-Amz-Signature=6ce7aa2b7bda7382a935556be7596d1f656c8d919361b65b5694ffd867ae4cd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KKHOBLK%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCIvXtwUlVPglIglebArX9iXayY1YEfxNgPxOjH%2BcRMSwIhAM%2FUd6F62iPSYsZSP0WBDoo2S082iHo47gHTLOqPsPE2Kv8DCEoQABoMNjM3NDIzMTgzODA1IgxlZDxP3UjbULmVJmMq3APv4GkbTAkzRGXlv0UdYDtdhhPwkKmI6LFyKSMWJRo4a6xLWiU1wcMTj0MsoJEcSPn2wjP1zk8qOH1cJsNDHHVsqFq3jz5QRqVpd8bX%2B0lm4XnKbttcK2ru6wTv%2FhEKCK24orJrUtaa4QsPRP9GFteoKRWYE1ekGaVyluBwBdyw%2FH%2FB8XIDWKtfC%2BWCoWrWK6gITZ08NYNGwkgQOCkxjpDss8sy0cmRkzu2Mk2CiV07QuAABHbv%2FQq5k1TA7KxDBulYC9%2BtHhh0GLqXxfPgUJ0WHb1zAkVjlXNiq7Zp8rQx%2FHBT0aJlywom3Zd6CoJ92jivXz%2BU5OeXN2lsYTMd%2Bf7ldnuduV5gtX1g4UDicqL6EkWzC8sa6TPTkXPwD2%2BnMKPBcEmhm2hFtEQsvaC5TxmK7TF6IZCKV9I5T14Apg8e8jUDILixqDHmm8QgeUN4c59eKtFKb0vJjvZ8GAmh6Fd%2BhU727yheoH0bazzez%2BKohL1FP3cWGq7dVRVBmGo4oe8Ies%2FDqvABrILi9vf9peN3QvBICiC5uxh1t%2BYn%2F7xqpuAdDyJdVs%2Bo6NcTLNzRJCHJOepykjsUPpc4hVRwSkbQ%2BtCULHTWOiGNbxTsYANydDLAidRl6lfljY07%2FjDVvfnNBjqkARJ9S1csZ2P%2F7LPKuA77Q90YoDUZDKt93WjNJedv8Xe4MzHosZqEBq2aoFQSSNu5TPCOeyP7YSrIpP1uRGEJb4YzA7f74hWmC%2BId41XyKZT5GalCfPOl%2F5b9YLVnyrLSHgIh14WeNEWP1WyskzO8VcTSxvITbL7U%2FomvQWyjyoqrrga6x0OBDwCh8T2YBp%2FugitD7savk%2B2Az%2FGy4UuxLsZH9Jf0&X-Amz-Signature=5a2b1a0e9d174083b7e8d6db817476f263e04e0943e5c524d610118498fcda5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVMA4LV5%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133401Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEKaJ4ETH%2B79NlLnNFaW096q6ox2s0kkcI2NlcBcfsQkAiAs8uh0YquWdMFcaboabe1D7BdCwAlQXXK%2FuV1NlP6q2Sr%2FAwhKEAAaDDYzNzQyMzE4MzgwNSIMsfkljsDaWsvIZD5BKtwDUccr%2B8DixIaoHu6Cj6yWRH1%2FM2qfSPVnTIvLYA%2FVoxvvDtv%2Fw%2F2c1rE6JsAvUeu%2FQ%2F0J2OO4oL6mQDvGrNPrydVid8L7yunV8T5TBloo2nhh2vaQOBPFBODh2qxQt83XemeZ77%2BSGQbP4mVCYeUdIEJlzGRFfmThJGDryGIN9stAD5vDQfS4sxEzpR0HHzTqzX16p6NaPh8kFbs077SDR9aZhbMhE8RntiCedtDaze4FgS%2FNpcXJ6XDXYIYQWXGi9l%2BpzLo%2F2oQtLjtY6xwpph8y9ZmM3HRH3jA7%2F46rzuJzmDl%2BKyFeS72sEAIfueSJnacBgEGO2J8fxAKF1%2Bv3nl5tK1BlE9yQhs17oYv%2BYD4p90fJ5u8Ehs8D4xhg77weZLZDBYl1yUY%2BwSVoDFK%2FDNF8H2CB2cXTECzTnw3VZvAvIK4VNImtIF7gApP8x6GeE02nXLUyiMl4DvRyhfnMHcHrJJ2cclfUeP9KgZ4WLHpn3T2KikHdN9W1IAkpaEQ2WKRFiIfL8Ethz2Ulygzvn1Zo%2FWu986obMka2RatAgC9jqYBZFRZDaPWlR1ftUZ1dkXKEbIaJPLsnUuZp9GwuM%2FgTUdiLWMDs%2Fe11GmOFqyrMDtlzYoRp5p4TaU8w9b35zQY6pgE5U15N7wViAxsxzEEWwhmMe1s1K2o%2Fvx1TTM1fdlNOK2PSJmUizE33yXqwGKpdky1hCcnUrZiQuSwx%2FfvB%2BgEnW7apIiwJA0Zv6gshVREGeDmUp%2F%2FMZ%2FBdcH7QY3v%2BX1TubPsq8z2esC6mUY0NLXnYSbyjG%2BP6zrrufCsi383SeSHc9jUhK2gYBHcUGi%2F6O%2FJTja4vwCXCcNC5c8f1iLmguCVZ%2FyOt&X-Amz-Signature=288a411b848b51ae07cfd904be68a5ba6b010b4c1f41d60a673b3c083880e078&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRVT3F4K%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEmku%2FmFxQzqmum5dgXqEP%2FlJeymGuCP4069G2RprE40AiEAjoy%2BC0Ie5JYlEJ8J5BiY0F16%2Fq78O5yVqzDDtxo4N5gq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDG88KYc09XhPq%2BJEwCrcAyuPUPtxC30MgzWsC0xtzT51RSaWdgVebf06SJk4iU4gZVDQmHorGz58PWSMmbF6mk8Tv8P6phcizTQ74FcKTYyl1Ed9vdmHLqppLwVGkgfaEbwTl986LgOpsmKTS0DuaQML4dkpvd0XwlLnyjuKCyO5aDn1ADK5cOHSFcI%2FHXPOhodqa01a4xrfWZC3E23KDIKveRL51vd3WffEAnA7epbKAqY3lnvKuliT4WZ7wZ%2B6j38JAwLLtbppmQXCbnCPp67iVdjyWOxe%2Fk2YdnAAv6H99lLK9pzCmj0gPICAhHY4W3yfx5gYB1Uy4E%2B6ZiP5ftpeCMwfG1ZSjQKXdUdgakh1Itlp7P9XJgkRpnZSIVJ7V4t0%2BOYKIRlicg%2BQ%2FJfBDsVgxsHOI1YAHkWhIDbYGBPe1wGhpxUDD%2BqXZ69hlYtkVLZtK2aCY6z18sFfPoEHKjlJJxfhWIHYzoB9qxq78ZGbcY9t5oRs7NOTOW%2B4SgSFv%2FJOMd96jJGG%2Fc0ZCbfMq8AiJdhTDUBX%2BYcbZKdkWjuTAYD5jNREnuJiPweTqHHtKjz9vDWmL6qCFlB%2FcWqz9V7cfCHxJd0AGsphTxU2cBMdL5iNyXbY3srg2XvAa%2Fdb4LV6XWIC68NSqDsgMPaq%2Bs0GOqUB6LMHC84nPtMrlfIRWciV6s9KgsboBTM4%2BpH4hUJfwyJyVRI%2Fmlm3PQw%2BM4DZWuTpL9xuHI6zuBKSrsCgdXqj3RnJ%2By5YoqjCyj3kcCl2rpDz3rIQgcFj8Kqe3ueRmayxa4pgN1oTPEiT1udMlc7dkSGLwprn9lhG674KSnpDn9xm%2F8x8lIRx1QgGnOtbnFhL79DUFoREKyausS1ZKgzqEBLPi7OU&X-Amz-Signature=aea907e9af3393759d19b13d9eeafd027da10b75314d73344cca260723adf06d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRVT3F4K%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133404Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEmku%2FmFxQzqmum5dgXqEP%2FlJeymGuCP4069G2RprE40AiEAjoy%2BC0Ie5JYlEJ8J5BiY0F16%2Fq78O5yVqzDDtxo4N5gq%2FwMIThAAGgw2Mzc0MjMxODM4MDUiDG88KYc09XhPq%2BJEwCrcAyuPUPtxC30MgzWsC0xtzT51RSaWdgVebf06SJk4iU4gZVDQmHorGz58PWSMmbF6mk8Tv8P6phcizTQ74FcKTYyl1Ed9vdmHLqppLwVGkgfaEbwTl986LgOpsmKTS0DuaQML4dkpvd0XwlLnyjuKCyO5aDn1ADK5cOHSFcI%2FHXPOhodqa01a4xrfWZC3E23KDIKveRL51vd3WffEAnA7epbKAqY3lnvKuliT4WZ7wZ%2B6j38JAwLLtbppmQXCbnCPp67iVdjyWOxe%2Fk2YdnAAv6H99lLK9pzCmj0gPICAhHY4W3yfx5gYB1Uy4E%2B6ZiP5ftpeCMwfG1ZSjQKXdUdgakh1Itlp7P9XJgkRpnZSIVJ7V4t0%2BOYKIRlicg%2BQ%2FJfBDsVgxsHOI1YAHkWhIDbYGBPe1wGhpxUDD%2BqXZ69hlYtkVLZtK2aCY6z18sFfPoEHKjlJJxfhWIHYzoB9qxq78ZGbcY9t5oRs7NOTOW%2B4SgSFv%2FJOMd96jJGG%2Fc0ZCbfMq8AiJdhTDUBX%2BYcbZKdkWjuTAYD5jNREnuJiPweTqHHtKjz9vDWmL6qCFlB%2FcWqz9V7cfCHxJd0AGsphTxU2cBMdL5iNyXbY3srg2XvAa%2Fdb4LV6XWIC68NSqDsgMPaq%2Bs0GOqUB6LMHC84nPtMrlfIRWciV6s9KgsboBTM4%2BpH4hUJfwyJyVRI%2Fmlm3PQw%2BM4DZWuTpL9xuHI6zuBKSrsCgdXqj3RnJ%2By5YoqjCyj3kcCl2rpDz3rIQgcFj8Kqe3ueRmayxa4pgN1oTPEiT1udMlc7dkSGLwprn9lhG674KSnpDn9xm%2F8x8lIRx1QgGnOtbnFhL79DUFoREKyausS1ZKgzqEBLPi7OU&X-Amz-Signature=7a50b8e2148a08c32c898a4ddab2e7d8633e7e0f064fb6495f9d2348fff61817&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZECGQ2U%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDR%2FJS%2BAz4hodFcumB84f2aEoZyHOcQWtkGwXVEjx6bWwIhAOJpOr5srn49oDyrVds1nFjgZ3uLHBrG1F7dBjCLDSwOKv8DCE0QABoMNjM3NDIzMTgzODA1Igwu4PDKRCN33xqPD7Yq3APpLpzb%2BFN0jcNrzpKarExZYX7%2ByHFg6IwvT56Lc1Kr5MDSbucR5MzebW%2FlAa7P6GVYhDjibTQkaPS8xoG8iR8SYM9qxLNH8C%2FQTzUMCs7OmoNmRzvpExUCL%2Bil8IpvuymbI1G4qeGwooGuGuPjd8lrorYoaO6BfGsjovZ7ucetS8kcdCkqhBjEFM6adCLiH%2BCm7L%2FKa%2BRDZH8iLtsoKyXqGxJmb30MR%2FYsRuLETocg%2FeIlRGrBQnehKOUjOIpKMTtzx6u0D37dcUm%2BpEkn8dWwc91Me3RNvhyW%2ByTYfhkgpRVUFVp8%2BTwETx6%2BD1mry93GEy%2B7l45qJ%2BgmpIT6LB64deKCnrI0T8onutrjEMmQ8wqWl9jrA%2Fx20zxWTXgyvAf3GXCI%2B4007RBNCzuoZPcKjpY57ml9n6OC%2Fv%2F8JWPJQyqvz0lI5%2BvejkePEOF2bneMGNODRs6pRayt5YpQW8KAW2nlqaxuODkY%2BVna2XrPdy0WG5YVLq61aBUiHB5QZVv5UWhCu93EtMCxeQbTStNxnuFQkpx0%2BLDEqRZAzVPfr0NBzTCZ1ut%2F3j9Nn9SHp4fIylmMPKtiZs1pxLsgorSx74yr96bQNf%2F8Y2scZmsoqjc%2BdvHucyQ6vqoygTCKk%2FrNBjqkAXkevK%2F3BE6xPy5SV1Uczr60WcO%2FpQ3SJp4TAd1qKn0WhmhfSV9YP6cCDhxKgq3TOc4EkDHXBRmyzrRsqmsMrqCCuZJpiWuhrcJJmlzGm3VADttCdanvaX4Zw10gWinCkLTQ3mZbhafy%2Fo3ZebKex5lfunwmG9a0wOaUZa3KJsXLD7%2BWsYN5SY3qf5wpEN6jdiPPPWCBFYPgu2r4zwWpN5sxmOA9&X-Amz-Signature=93ef66488ed1165a6013ce078f98fda11d7348dd18ac6cfe39ad0d65d8bde487&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RK7FXRY2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGS6TJnTpA3nAuo85LqPel5IgHBhW%2Fe1M5wfh0U6GNCgIhAOmAcniIRSWRTML4unElJ%2FDpHLrpOcYLwsnCt0hzw9tqKv8DCEoQABoMNjM3NDIzMTgzODA1IgwdAvlmAJWM7hozj7cq3APlGMzIDSwsmpiYB7VVVslJQk2dLASoltBwi7YWjLshotnC%2FEY0lYx3v8Nl7Fu3mxwlwE5OO%2FovHA6vehMq3Kn%2F4UyeWvpsiYVBfAbfX8yNuw4KBZhfz1LtrN7G6dFAkuOZpCPbWzCULMONJAROYChxSJ%2ByBvYbpFtBoZQ6R10QEp10DTiVa7Q5dQLkXNBhbfBQdIxrDxrcSYL2jKpTPvQPz5XfxEeW8Kmgf%2Fi5gXIwtmVdGJsmw93USr0c%2F%2BPBbhepyz1bNfmgwUyKY4mV8OKWI4vFZxPWGxzX0cxnMS0fGETy4M30v%2F8pNkO2K27oi73Ov4rrm2gDHg25DIQ36%2F1AhwE9jHTujgexNUzsrhQWOgh5NbNOUWgG2wjmevcrKx6MO%2FiXbd7iVWTc16l3uZ9cLeMWlKzNugwvMMcaZh%2BpnY8fliFTvjLzxVBCWdtQzt40F3nFbQUVsKy1J1K6uydGJt2NDo5u143fIbPK3xFwJsggztj6mqT2qNFMjPNxwScH2n9KoDZ1VcGLhJYxmDqE6p4y4r55tea70XhV7sY1%2FHsJPjQMX0%2F9rfw1FgV2uxlOfzL8cvrumIvZ1uRvRxjvlO4obaoS%2BHgvxbRY5%2BdL7k8E6X6xMr4BvnTURjCrvfnNBjqkAaCAp2XAdt8%2BREnvprz5GxcIyoRtLd8cVdB4GJU7qMDWrJk7drsl1HBYdOZIlSF2D1ecqartcvjs7tC4ObbgHsp1Xi2uZFnqomSHSfeV19t0qsjM0i2cTMtTglmkXofJEYCMPptSTS508f7sJLW52V5lJ3bXVlrl30ZU7Adn9pBiVXk0v6BPkWMwrmyQMmzluM0c6Fk7%2BH7O2IN3cW9Wu5Ks%2FKtp&X-Amz-Signature=fbd6830640831a5d0c6a38522d1ba13bd0a49184af1eb1dbc0988e7fd9244809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RK7FXRY2%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133406Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDGS6TJnTpA3nAuo85LqPel5IgHBhW%2Fe1M5wfh0U6GNCgIhAOmAcniIRSWRTML4unElJ%2FDpHLrpOcYLwsnCt0hzw9tqKv8DCEoQABoMNjM3NDIzMTgzODA1IgwdAvlmAJWM7hozj7cq3APlGMzIDSwsmpiYB7VVVslJQk2dLASoltBwi7YWjLshotnC%2FEY0lYx3v8Nl7Fu3mxwlwE5OO%2FovHA6vehMq3Kn%2F4UyeWvpsiYVBfAbfX8yNuw4KBZhfz1LtrN7G6dFAkuOZpCPbWzCULMONJAROYChxSJ%2ByBvYbpFtBoZQ6R10QEp10DTiVa7Q5dQLkXNBhbfBQdIxrDxrcSYL2jKpTPvQPz5XfxEeW8Kmgf%2Fi5gXIwtmVdGJsmw93USr0c%2F%2BPBbhepyz1bNfmgwUyKY4mV8OKWI4vFZxPWGxzX0cxnMS0fGETy4M30v%2F8pNkO2K27oi73Ov4rrm2gDHg25DIQ36%2F1AhwE9jHTujgexNUzsrhQWOgh5NbNOUWgG2wjmevcrKx6MO%2FiXbd7iVWTc16l3uZ9cLeMWlKzNugwvMMcaZh%2BpnY8fliFTvjLzxVBCWdtQzt40F3nFbQUVsKy1J1K6uydGJt2NDo5u143fIbPK3xFwJsggztj6mqT2qNFMjPNxwScH2n9KoDZ1VcGLhJYxmDqE6p4y4r55tea70XhV7sY1%2FHsJPjQMX0%2F9rfw1FgV2uxlOfzL8cvrumIvZ1uRvRxjvlO4obaoS%2BHgvxbRY5%2BdL7k8E6X6xMr4BvnTURjCrvfnNBjqkAaCAp2XAdt8%2BREnvprz5GxcIyoRtLd8cVdB4GJU7qMDWrJk7drsl1HBYdOZIlSF2D1ecqartcvjs7tC4ObbgHsp1Xi2uZFnqomSHSfeV19t0qsjM0i2cTMtTglmkXofJEYCMPptSTS508f7sJLW52V5lJ3bXVlrl30ZU7Adn9pBiVXk0v6BPkWMwrmyQMmzluM0c6Fk7%2BH7O2IN3cW9Wu5Ks%2FKtp&X-Amz-Signature=fbd6830640831a5d0c6a38522d1ba13bd0a49184af1eb1dbc0988e7fd9244809&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QBQOFUNL%2F20260321%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260321T133409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEIH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDI3oScgLcOL%2Bdf26RbhptT%2FMsexq2JHRxYZquYAR6zmAiEA9bpqBvF58OgisXo1HSvw6AFcU9yKhf2EGzxaMTFW1Pkq%2FwMIShAAGgw2Mzc0MjMxODM4MDUiDJYWW5kEd1qDHcR59SrcA6CbvRhdhudSNQeu9O7z4MU55ds43uVBmwzD6wpKW8XjB2w55dQa7fKkRrhc%2FNQhC3GNXJAigfHgGRo055%2B1BItV0ymd0wFzfviZm3aFShYO87rHRXsB7bGJFC98FCpphJrXGMtDksI1ORDQTvWt0fAsuDnFQpVRJvUBF9BOLygEuWxtUEQNVouWrTNgSgHNK9J0P24x6emsSCl2vt%2BZ6bRx3f8NFkRLaDBrxYqp%2FgxM%2B5QLFLNfCAu0%2FXCJMizgnKUQ3BMiZgO50kxvJgNpmuOT7pIMzj4juOQv6FJgmPqlkovAohNUncmcyQYLX24nEoCc3rM0pHD4RdFjsAL1%2FEKQJaAoSYBY2EbKe6gHaV6JeEhEMaFEMgw7dWEBO8feh1KiuDOj4l%2B985RI08SypSJDJ2xiKsc%2BaHkG04bMXuQLS7wFfpZFl8iyO%2Bwxnkpjs6wi0tJZ1ZvezPagafmPXy3bJbfomr5MeIecwPW0zhvUPAu4XFlm5%2F3zWdlWEKSaKYTDcHsBnXmaqogQC5AndqBzwLyHVcLjG%2FRys87NidWhuHHXZCemUhj7ZyKlQQBxUq4rjSkZe3kJrTVEyayG56xdTUCjgvlwkrh5C9K8Xy4EOZWilD%2FqY99BveQTMPO9%2Bc0GOqUB1AbiDjXhXr2wLcnMuoRnllc%2B8wPLir6EfIXA978LnG%2FBiNpvUbSv1jfETMtPOeMd1oDDvjnMeoMmEF9xFOCfqztF4dGeF3%2BNeRmeGEB%2F3LfzZ6DN%2FGR74ibaDTJP40XRBbjbWj%2F1rJdeumOlIYmjUsPsm%2BxqNQP2YvP3jYE3Oo4O9zvoscv0hFQn1q3VkhQ3woJq8kE4M3mLpUQsT5cqCprfB0DM&X-Amz-Signature=dbdea9b762071216ca076b5d0999d65249776b6013667d915853bf8786a2ae56&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

