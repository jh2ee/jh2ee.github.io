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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCQFTFOE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDvkWVX0PxcEfMoYC57zn4WIVI4GsY%2FQH0PvG2crQjQaQIhANH%2F2YMsho0GpNcCzzk56XzlKTsDyFmYNWupX0eFL%2FGWKv8DCBQQABoMNjM3NDIzMTgzODA1Igy8R8lY%2BKeArLYlPVYq3ANi0WR7g45FtsLam6vY5RklNLETaNVdw7i5%2BQjTEwQ3oc3iZ7vIG7M%2BK%2BaZAGmcdNXvMOk%2BUGUv%2FKV8uo3eREQOBVqsa33GUcSQSx61yh2LPJNPT7y70USJeDWeKWU9guq5PC9tHOxMJ9i8GL1B6p8GE8GYypTnBRbI6YRI8Q3YSXttn03ia6xBdpQc8AHsnUrGacoRp2VhdBwAGLy2ISXJ%2BESpRMxQd5cvI6v7AKb3ruXXgYSVSjrPSkKgOZOs0nsIasucsxDNAAOeCX1595G3VP4%2FnwW3MZhDQYPQpy2ihJ%2FBCJ34rUfz06oLWHqD9HGiDig1VM8KhZ6L4nMEo3qw39RcM9KOyph9cuvDiM%2BDSm9oi6fDb02FUWRNc6imM1NotV36o%2FLafws741sutfPun2nkJqzE%2FuCYIbufb3S3j1yw7fCThMiP35Qnjt4EIDghI5sWyIKeyHYsUL7QyEUF6OdOr3aJcY2LYo1x%2FVqbtHUgxps%2B2%2Fr%2BsrmTkl6rKG3ZQeElFrvWiYhJzdVcBdbQ3TYbsDX6aTwMmzTWv5%2FO6MRWoqwRhV90UpaKO9ze7ajLptpE2%2Ft0cp5AJ1DfOUX%2B8okWT4aJPAWe%2B%2FsYcRKdIaI6qcM3msUWvU4LdzCL1%2B3NBjqkAThjNNs5HnlFyycmsyZ%2BiZFFqZqfyP3E6zSGHNR4e7DOj6LBLKhGdSkvGCVZsv%2BRavA44SvkcH9N79gJGbkvj75uI4qhlINH5GxBoDR5pYyJBU9F7TB4dcDG%2BwFANx6zRFn6P0rZTWWZJPvKrj8%2FAcXZaBXUR5HRSoK%2F2R%2BeD0GwUWKW2N5z97aXPGpK9jOBjvgt3vFUD61s8xc5W0Qgx9JaAmC5&X-Amz-Signature=8f46e6dd528b1eb6ca6b63c93b7e48a664853a6733cab6386b8098fa71dd41df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCQFTFOE%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDvkWVX0PxcEfMoYC57zn4WIVI4GsY%2FQH0PvG2crQjQaQIhANH%2F2YMsho0GpNcCzzk56XzlKTsDyFmYNWupX0eFL%2FGWKv8DCBQQABoMNjM3NDIzMTgzODA1Igy8R8lY%2BKeArLYlPVYq3ANi0WR7g45FtsLam6vY5RklNLETaNVdw7i5%2BQjTEwQ3oc3iZ7vIG7M%2BK%2BaZAGmcdNXvMOk%2BUGUv%2FKV8uo3eREQOBVqsa33GUcSQSx61yh2LPJNPT7y70USJeDWeKWU9guq5PC9tHOxMJ9i8GL1B6p8GE8GYypTnBRbI6YRI8Q3YSXttn03ia6xBdpQc8AHsnUrGacoRp2VhdBwAGLy2ISXJ%2BESpRMxQd5cvI6v7AKb3ruXXgYSVSjrPSkKgOZOs0nsIasucsxDNAAOeCX1595G3VP4%2FnwW3MZhDQYPQpy2ihJ%2FBCJ34rUfz06oLWHqD9HGiDig1VM8KhZ6L4nMEo3qw39RcM9KOyph9cuvDiM%2BDSm9oi6fDb02FUWRNc6imM1NotV36o%2FLafws741sutfPun2nkJqzE%2FuCYIbufb3S3j1yw7fCThMiP35Qnjt4EIDghI5sWyIKeyHYsUL7QyEUF6OdOr3aJcY2LYo1x%2FVqbtHUgxps%2B2%2Fr%2BsrmTkl6rKG3ZQeElFrvWiYhJzdVcBdbQ3TYbsDX6aTwMmzTWv5%2FO6MRWoqwRhV90UpaKO9ze7ajLptpE2%2Ft0cp5AJ1DfOUX%2B8okWT4aJPAWe%2B%2FsYcRKdIaI6qcM3msUWvU4LdzCL1%2B3NBjqkAThjNNs5HnlFyycmsyZ%2BiZFFqZqfyP3E6zSGHNR4e7DOj6LBLKhGdSkvGCVZsv%2BRavA44SvkcH9N79gJGbkvj75uI4qhlINH5GxBoDR5pYyJBU9F7TB4dcDG%2BwFANx6zRFn6P0rZTWWZJPvKrj8%2FAcXZaBXUR5HRSoK%2F2R%2BeD0GwUWKW2N5z97aXPGpK9jOBjvgt3vFUD61s8xc5W0Qgx9JaAmC5&X-Amz-Signature=8f46e6dd528b1eb6ca6b63c93b7e48a664853a6733cab6386b8098fa71dd41df&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BVAFKBA%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033902Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDK%2FLrIbL17lzHkqOcS%2FohbYsrCwwZcgQ2%2BaWS2a7WRXgIgESUKYJWYPTBXiWif2xp09mXsjMTto3mUFVC8lay6l%2BUq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPW8s4j64xBOqAf%2BNSrcA1RqIcomHhLELEk%2FKGhRqAYeLyPA2a%2BZSKRA%2BIAygFtNFOUU4DtFY8z%2Bw2ytbUz8jJwD4DYANrgRwcCz0s9iHjmkIvWffeOZ0lq%2Fg6wt1UMAx5LZ5XSxydMzHtm5qcxBewFBYbrP6Fp3s3ro71kHostbMZE5aSH%2BICM%2B1hXKAfxrYl1IjjdG3hr5cU%2B5HLJHP28REhL1y2yVkqkLg%2FsKlSaWDF0Z%2Bdny%2FCV94yhqGCLCx%2BM5y0xAI5suKnzj1uZiw7Lmy8IFmQfxWFVMknwYZOXTtlrkXOFPt%2BMe%2BxfkkbF9Y1VbDjtPJu%2B6ECoCL0jrDQgcKwrbtL8g0qrPa%2BAwy6qwgtT5Ix1OqoPFfX4zMFQawkmoJyucNuEL9JHEgwKatPMM1Cq%2Bgju33A65W3YQ9mJJUWKg9vQic0fFkUS8EvMQlR0S0fKXwEdnxA02F4I0SblxXV5rCAFs0n3mpCR9e91tHz%2FPtUOfZG5RnUcUt%2BMNDIWqaC4QOp%2FEbG6ZAB7zLgiMI23efEHv6sfmf5IOzwp5qsVlOWplqGYv8Fyxg9%2BfTI%2B0B2npQsMIGVWb4KuYdmnaJfndUN3WBtQemKcYM5HpkXqYlOmac3YP%2BGs5usRJJY8OVlnx%2BUYOQ%2FNDMNbW7c0GOqUBr8Xf4S1H7ZOjXAKJFVGjxUVCkgzU2B3pVSGjVFXvcKVDaUMGxC%2FENFVimExODZ%2BuE8YPozmI19NJlHklk9qNBNP6txzS78gE4JDrzlz0iY0NYsKqGl%2B4IhShLBFcWPSl0XikP0GFWYmA3bEosgFFuBhI2AnHcnL8pnVytj4r6TPuPEDMBCyWwzPPyL69yLw38oFUTu0goxmPMZ4nhQsAw2zaVGIX&X-Amz-Signature=442aebf8e476082bf87f225b2999a6bb5da1d46448637bb4d2065c1d8863a7d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZHLVKNG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCSgdPOieSmuxq%2FpSB3gJv9h4Vuzbwi5ajFCloKDxKivgIgCiLuz12nW5%2BWdRFC2IhYfgLKsOqj7ixqGQgqhHTDF%2B4q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPlI9FNVVxIibT3sXyrcA58Wyi%2FHZ8Zy3D5YBD8LEiGNhJw4HMJK4J2FtRNyQKSKQost0Zi7s2avIFR5fmRF0JLUadFB2ObwHLv75b%2FUJ0SBisQxGGA4x1%2FEgREjHQCs8f9ZVw6aWtS%2Fbjuk%2Bm4fyc%2BMQctu5SdWr9ltG5FYQhsCnqu%2B1jSG22q6%2BpS7FNmXU5axARH3iqjY1fENnhNUL402gg9h5VHHpxlYeR3oFdduaZNIsctdBmW8Vs%2BP%2F7nGhFji1ouL6yPNaUdrgPfqdVR29GUGuPluWkJ73KbllKIXitMR8p4bMhVW1KOTHSB2AuMUQpk%2Ff5wVNlJLP%2FyKaK%2BGBsJ6AlU2GV6ljtgs60G94HtcsEjBBswZYQ%2FvbpzZdMUwZCt9JGqNk9PNgfqq0qYXmksDv5pJhjrdxXWA5wClAC7gEpS7J9s9JhhIAi%2FP18qOu0fe6nJPJw4rVV7CfpRhgSna3sFnZc%2FvWL%2BXfLjnLtMjExFsBiAfrgZ54Owlfk6c73dGtercwAoL7w%2FpGIntfwtVDQzAy6zc86lIb06FvjV1CCgiDsso9VYMj2zOjDDoH%2B7fuy4uXIMskrtPSvWmPEwFxJ49NbKzViXcrRoZUqm4ALCC6STndZG9kXjpM1CkzHI0d8WujqSEMOfX7c0GOqUBm%2BbPGZrio5Ry22X%2BkqZqZecCiFA6rKmbhvx3zWunH%2FEidBbOa5Dl7sImDuJfWfNFTKjcZ5lPIpr%2BTq6D9wl4mhwOYT2erM0UbNH7y8ttCYcrYhLWkUd1y%2F%2ByRtClqpJ1q2hDjF62KhAo1PjeZtK1l5huq%2BZ8N3RR00TajkzGJioKYRZeq%2BGKQLSCtbVf7X%2Bz4FRA1Pv1YkskufyKdZNWvi%2BV1wyI&X-Amz-Signature=10c078cc84b42c2e04ae65e70d38c5c85871ef6986b6a52bc5280751a4ebd92a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZHLVKNG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033903Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQCSgdPOieSmuxq%2FpSB3gJv9h4Vuzbwi5ajFCloKDxKivgIgCiLuz12nW5%2BWdRFC2IhYfgLKsOqj7ixqGQgqhHTDF%2B4q%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPlI9FNVVxIibT3sXyrcA58Wyi%2FHZ8Zy3D5YBD8LEiGNhJw4HMJK4J2FtRNyQKSKQost0Zi7s2avIFR5fmRF0JLUadFB2ObwHLv75b%2FUJ0SBisQxGGA4x1%2FEgREjHQCs8f9ZVw6aWtS%2Fbjuk%2Bm4fyc%2BMQctu5SdWr9ltG5FYQhsCnqu%2B1jSG22q6%2BpS7FNmXU5axARH3iqjY1fENnhNUL402gg9h5VHHpxlYeR3oFdduaZNIsctdBmW8Vs%2BP%2F7nGhFji1ouL6yPNaUdrgPfqdVR29GUGuPluWkJ73KbllKIXitMR8p4bMhVW1KOTHSB2AuMUQpk%2Ff5wVNlJLP%2FyKaK%2BGBsJ6AlU2GV6ljtgs60G94HtcsEjBBswZYQ%2FvbpzZdMUwZCt9JGqNk9PNgfqq0qYXmksDv5pJhjrdxXWA5wClAC7gEpS7J9s9JhhIAi%2FP18qOu0fe6nJPJw4rVV7CfpRhgSna3sFnZc%2FvWL%2BXfLjnLtMjExFsBiAfrgZ54Owlfk6c73dGtercwAoL7w%2FpGIntfwtVDQzAy6zc86lIb06FvjV1CCgiDsso9VYMj2zOjDDoH%2B7fuy4uXIMskrtPSvWmPEwFxJ49NbKzViXcrRoZUqm4ALCC6STndZG9kXjpM1CkzHI0d8WujqSEMOfX7c0GOqUBm%2BbPGZrio5Ry22X%2BkqZqZecCiFA6rKmbhvx3zWunH%2FEidBbOa5Dl7sImDuJfWfNFTKjcZ5lPIpr%2BTq6D9wl4mhwOYT2erM0UbNH7y8ttCYcrYhLWkUd1y%2F%2ByRtClqpJ1q2hDjF62KhAo1PjeZtK1l5huq%2BZ8N3RR00TajkzGJioKYRZeq%2BGKQLSCtbVf7X%2Bz4FRA1Pv1YkskufyKdZNWvi%2BV1wyI&X-Amz-Signature=80bb2a82bbd8c5b23ade990ef6f773f142b073882a383da021152193b30343c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QV46QJB6%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIA1drvHD0G35IgPbileqwtvx0Hs9UJj%2BaMxhG%2BCv9qgUAiEAvnHPUTM7K6pJI%2FSJKaVHjoIxiPkPXQ0tSxC1w5zpDvIq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDPUmhlM4HrjFpv1XcCrcA2iOE%2Fy2x%2BGYp2taF%2FoBhl%2F1J1AEPFCgzYDmmXfTKGxRTbeNlvToWZJuACsas%2BwZKCJOcBygp3vVEvuMYAyasUJHB5adiUpHmIIFIMIwOnSMD%2B4VqJY%2B3BTreiLuNmfxxWA0pz4Ics1qYU660%2FVKk01gSTTDzBSg5Dx6IuBkEIbB0KUJsEWA7rfdaSINEaXrLq6GMBuvhxQxyLRFptJlhO2m5L036NN5xx1mQTXWVtqmDTt1C6lDfphykEPLMOvQflNRhSwuZzcgxnoO3cao0BRvgjEUyu%2FrN4AZjt15etuVPtbbmVHj0KepQ5vSm64jOvnnUXjBNHPXmCbL1EL%2Fkz9kbSevTbAn6tb4cUooMuZgsrThW91tBJFav7KJnZYACihX0ujLfjM7SZ9UXWDNV6eUeJR9jPTzqxzHvZ2IFycHSh5INKT2qVWtY%2BdrhdA7va6CFuCCq1KaUU7Wf3A%2FUqA6tvhHngR36o42QRdiMYU9r3xVgtJKFHezMUpiy4iXeFitw5tPmNq3dIhGqay1LaaXWTMS0BqH1rpp1%2B3gE4Wz76CbHjDeFo%2FTRgOpDF1xw9%2BMefBXpVXvObM%2BesiWH3BlaejVYctjeXhEX3EdQBb7YPMJR6yC1a2dOWDZMPDW7c0GOqUBI4bSVyj9iTBoA0hUk5Rs6jxFjwkE%2F97QhIkT8julC%2B%2F8eCFoau1a%2BVzn2FpaDOw6XX3wTZLKXG%2FuDy1zRcP1sMyWqF%2FTOO%2F937zzKxD3Z8PyfxGxYdJMYfCwgF%2BqkOGC42m%2By4hLWXpI%2FVYj0G%2B3owIIMvKUHwVRDBjufe66bQVFTAhXdEGXzdU2hGmiiAGMney4kjwWb0iyhqr6kvXvA6QqA%2FA4&X-Amz-Signature=6c8c7d967732b9b0f80893fb6ad3cacbaece02a00d04c2d45f4fee4456e782da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQDC3OGP%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033904Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJIMEYCIQDHCCsfza8oAfOCNh6JCepUN5liz3ePqK5GRDDpS2pFlgIhAJlgQVBGKg3%2FBts%2FEsIOqkTh%2F4DVmCI8D9cby%2BhjRYRAKv8DCBQQABoMNjM3NDIzMTgzODA1IgysOOwY67wje9iVOVcq3AMBsgQHVnFxnsHQGAgWLdhqE9mcL3NkMSfhS7b3MtwenkjVAeZms%2FuZPy2KBz%2FVZYADEzm9Fokma9j5C4chC5yXHYXRstvYDz80DVvOFqsxvb62d8WpOFACRebzrPSfFbAgFNTam1ZU8VhgMwAb6jiETmaZl%2F5w8tooILNLx2MOKaowhlhFTY94l53vXrgPkC%2FecTtDK6oG76RA25nlLsxT%2Fxsa2SM9%2B23wxKAs8XNiWmcPtHBdSRoF3rxG1uazI%2B36qwkRI6l0UCe3gwHZ9mGvJz2lXp2BWgf2oZZExraCc4ooX3hn441NHmyjpJsO%2FJQQ8p1S9vjwzEDMeiDzfHVoOlKfiApMQgnguZrCnrqJwmpg8M1ZyV9bu8AT4s1pkSBJQxuHx8ymoCysji5jt5DkAJUfOQMm0Q2hRFnhvGrgmVpt7Tc3ScyJOPBsDwgUX5WCh4%2FM%2Bx%2FoVzho4Bf1IuPLX6rs2HHmXklqNm9Yp9d2vB98UdvDpEQflhj9fClYt%2FRFWmC8DDmcPMnKeSr2EhBQzIbdfU9S9GmKbxV%2Fe2jG6QyNMgYzlzRtFuniZg%2Fz7fGO%2BZIZv1Oir69dYH9ONGiTLLMoZSC428673BEBjq9gv6CVzpIcJluJijsAfDCV1u3NBjqkAaENXcEc1qKqBxSgmo3MGRrNjpceBRaPT6hM0ZkTfkBBwACoRWsRLB7Ugg%2BrJyZFefMkPlPXv%2BNDTBuZRq7hPlojHiA%2BD6bIPhzIApTq7WnhGJEJlNl1pLpvMmNaPEaPdyuXKtFoDeitAaK5wjSsYWnItmyIrBlyvYXzFFnKccwANit2jOGqlbGvJHqedK39YbVgSfzyC%2FVxuagRPUaYvJnvfMfd&X-Amz-Signature=10d2e1cddac558ad5c89170b42a89ebbc485d61ec631d5c976b7ccc710b63759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VXUEH7MH%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIDMMlCb2Y%2FDxV9XzBhcxC09VZmHGsADOecMS68B88jWhAiAYO90a357C2O3WOeP6%2FskC7CtHIE86AM7%2FgQ4LKE6%2FrCr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMdQsvCLbmEe3GI7wNKtwDs%2B7rUNtwWVQYddJIteQ0As%2FBP2SxRXPkuw%2FM4eMr0PTZkkzWXMBGVz13hYCtels%2FGQNieNyM1cDTi12XwgRPLG4RHIXIHaAY1KlWEdqiFAnrQWgVglS3J8U%2BI3zF6XqdivYEjPCACPG2wLq%2B3cmzKwLilQYtyT8VW4nYNc%2B7hy6ene8PcUwURjmzwY2uVHTKTjpRzkQiwpicmA0efHBicyN%2FqJTEm0i4J426dNApY%2BKQNNoJcpyoGCwKWyC0s3APy%2BbIrv51%2FPemoJatljNikRGIrRAKwwLsYJH%2BppqvMWbRdFOEwuiqz0uGmrQ6R1WdI0Wfu%2BcDOjTGY3axw8E0HqYIGSiWkphGtQUqlEgo0pYdREIA%2BW0JzkTFC96zTUGhLMkfYQa3okIhEghcKvBbiXyJgTHClyqXjaFEalcdTixsZQYx4m5IAiyr4CEbhbeLXWqHb4rbqW9sYbMWUpYWaOQkxn7rrjw80XZguG5%2FO8NyPuTzrCxUxCCgH3fizLFuqytMQadgYn%2FP0wejc%2BS4BUUxP326QlrqpMWNM4Q9sx26dB6hMwSRQlrwPhvwimdiDfc62MaCamzO95XDNyyf249%2FkgsJgR5Pr0iFYyPRxwfmpzti25vsXIPln34wxNftzQY6pgEw7%2F3nbBv2ul0%2FKlCWeRw2n2nkLE9TNkjstGYRoT0668HL1IuYq3sEMRPA9c16266%2BAVSOxZDv7H9EvjSU4F9KiuRrmpZjHGb3UdX%2Byf7L9SdsHLjy6R3KzfkBgiXiLXiPv2wVzuRkWz8ZbuLIDpTk%2Bx%2FCoTztXisb%2BoXn4tyfhUyImk4NlopXABH6PKZ1bPyx1xbKUf6q1uC5NHLFJhsJFRO0S%2F6v&X-Amz-Signature=f9ca078d131e8a648cb2bd01c8b94dded698f28388da3ac9cba3aa2909679000&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6MMLPKD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIAO90xS01shAe6RFQK7V1St%2FGiwDWrJurCtXIjNXGlOGAiEA48%2B3wY%2Fqb%2FmoYn%2FpxfJZajlagA9E61RSqGd%2FZc1h3Rkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDNd2RN9WCKvAjlaj7CrcAxh8%2BHlfuuCinm3SJv%2BaThh0PTLAqPp9L4sbCTx66aJqsalyKGQyNOhBofGG4zEus%2B6Nu5c5sGgVhFBjbwfWGPC2eReDFU02wrYMdkJr9T%2BdG26wd1P0J6bAYLAZ7F61QZqp%2BahUeBmjLkkPR5v2YyljhhdHEfvmzxnjtj%2B%2BU7vVZupFz0yqmaQaisXGRXz8phr0gwXi8jUCcvskPavv9u1e69DLe31MWU6EJPG%2Fa8d0c3OhC0hd2fmHHCVUjjHfdqrcQBJmYzl4npEUFBTTJvnj4dCdBGVcbrPdpNBcluj5l%2BFp7IQpfxW6xFOuAO7iETBzIlJXHoWMb6aIx6W%2FoFWDJzU2kx4o0PvTuxerV4z%2BM96U%2F3lHJ%2BHhfnF%2B%2FPgJnGQkLeR37941F%2FAr09rhHDzoymnijp7lBNyfaBTDZbZKYDIB5okxdIzlPqWG1iWniCIxWJ17V3Z4QHuNOOx%2FnGr4UUXI2OSPDBY1QhwA4y0ESyHIUxucnSF7q3gkaqUT4ICIG2Yx2l57SlhzvQs3Fq%2BPZW9vhdFjSJCkFpLfY4M8K1rYzBOPtLsdMFbziXdFnUTA3aQl73zFXDpxWJZAUGEMiRpoHNhoBrifDgeeWzxQtjP6FGwVXsKCjejlMPvW7c0GOqUBDdaSvcCCCCqURl0SLMiYsR3yOhtKf5NI%2Bh1q6tj3%2F5o%2Bm0gipQxAduT7d2qjJsZfp52M8pn6ftzv5Ken082z3AcvSncoTf9QWn1uSjTK4eU9UBtWh7O8F%2BXoaacua1HPsqTB%2FNq9irT3jAJWlbl4HZ0Z9qv0rsSdzfk6ULsODd7PdkeTSYRhsHvESALuvDvQevJQ1xtwJUHasQQbe3%2F6TNmgFSQd&X-Amz-Signature=e81c956c00d6a2b2e64284d75c0a25a0c2a12e522a788284633e289f624cb97c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z6MMLPKD%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIAO90xS01shAe6RFQK7V1St%2FGiwDWrJurCtXIjNXGlOGAiEA48%2B3wY%2Fqb%2FmoYn%2FpxfJZajlagA9E61RSqGd%2FZc1h3Rkq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDNd2RN9WCKvAjlaj7CrcAxh8%2BHlfuuCinm3SJv%2BaThh0PTLAqPp9L4sbCTx66aJqsalyKGQyNOhBofGG4zEus%2B6Nu5c5sGgVhFBjbwfWGPC2eReDFU02wrYMdkJr9T%2BdG26wd1P0J6bAYLAZ7F61QZqp%2BahUeBmjLkkPR5v2YyljhhdHEfvmzxnjtj%2B%2BU7vVZupFz0yqmaQaisXGRXz8phr0gwXi8jUCcvskPavv9u1e69DLe31MWU6EJPG%2Fa8d0c3OhC0hd2fmHHCVUjjHfdqrcQBJmYzl4npEUFBTTJvnj4dCdBGVcbrPdpNBcluj5l%2BFp7IQpfxW6xFOuAO7iETBzIlJXHoWMb6aIx6W%2FoFWDJzU2kx4o0PvTuxerV4z%2BM96U%2F3lHJ%2BHhfnF%2B%2FPgJnGQkLeR37941F%2FAr09rhHDzoymnijp7lBNyfaBTDZbZKYDIB5okxdIzlPqWG1iWniCIxWJ17V3Z4QHuNOOx%2FnGr4UUXI2OSPDBY1QhwA4y0ESyHIUxucnSF7q3gkaqUT4ICIG2Yx2l57SlhzvQs3Fq%2BPZW9vhdFjSJCkFpLfY4M8K1rYzBOPtLsdMFbziXdFnUTA3aQl73zFXDpxWJZAUGEMiRpoHNhoBrifDgeeWzxQtjP6FGwVXsKCjejlMPvW7c0GOqUBDdaSvcCCCCqURl0SLMiYsR3yOhtKf5NI%2Bh1q6tj3%2F5o%2Bm0gipQxAduT7d2qjJsZfp52M8pn6ftzv5Ken082z3AcvSncoTf9QWn1uSjTK4eU9UBtWh7O8F%2BXoaacua1HPsqTB%2FNq9irT3jAJWlbl4HZ0Z9qv0rsSdzfk6ULsODd7PdkeTSYRhsHvESALuvDvQevJQ1xtwJUHasQQbe3%2F6TNmgFSQd&X-Amz-Signature=ed40f3d8e1e6109110ab7ae100abd5e7164945917e169df54f17ae3024fb99a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TXA5RV4Y%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIQDDtvzBng7LPyYOs5UaXtYSfBH8lEk97K4kZZfXbjpVZAIgfKdk7Zxw5DU4DDeuFDiyJ2h6sXK0vP6VErgcARQmscQq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDJ5xqLqmeL4DxDdiKircA9EzjcvJMRavWWyBQkIz6pmDhw6JDopgnAC4vYQIi%2FG7UyaV26ArQ7m1X0%2BzLoBRTrlV5htGOhGA2iGhUHAQCHQwotjhxB%2FQ27WOY4G9k2JX90sj1p6ec0YCAFfV%2F5CFtQNuOf%2BAFTw5TS5gZtudfGQvZGLcVaMPGxLXNpwLqOkiT4HlNQu3eEigwQd%2BYmgmQJdNWR69pK8Jf%2Fx7xzraY17ijuG4ULX6Y49bKkispWlthvjvIvBj%2FdJQAHHCwiZGCxYRlP5T6OzeCDoFFlbxOK%2FPnnDQDcGsA6CvAC33TuQ2RWOVTj%2FJEWuvtaouTiIvGhoA0LiWw4BzS%2FFWReF6zgEypCBeXpD0le8bySUyCyfPLgybwGgDmk1odUro27cTBozVCnF6YeEIPBUpLZUAngK4Phi3TNbk294gxCsZppyfYcZr8efwYz%2BgwJJMPUWrUtgw%2BbL3mzpmQQ%2B0fJ95saTBzV42nhHbssafmYa9YUY3Eo9NBm47xrzGrQd1wjwr%2B74e%2B28gDHlL4T4n0nOYhRZtmneBq8YqPFdDt%2BlhSiwHX6m0AOsRnRH1YT4sGnliN9Z3eUGGY2jpbCNBA%2FldusRQRGtzQ6Fh7EVm%2FxJ41rCuHb1imUSPJzrsB5CiMNLX7c0GOqUBwKdHpbr5N%2FRqj6V6SDz7%2FJwIhKT%2F4HX47ROIlP1vQ7At%2Bl8e9B5teR%2BJCe8lz5nGmBtxoNvfpJzpkRXI8IXQNupN0UeQhi0i5%2FB3InC%2Bd6fYiKfw7BEOjd0h5xNp%2FxXNgmeNct0seIiABjMqxle6PWHajhgQxbz0L3KjfYq3gdCVR0numMMGt6hv9czntrrORypYm2HucqZqh9Bi7unvro8npJF%2B&X-Amz-Signature=915e7a92c14c89f892830bedb418393c235b818c4c97a4bb85edfe70a5fddca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS2XNXGG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIDOBSebFQWHptnPAf1MWeZhLaOdBEno8ffZQuw%2Fb%2FQ8JAiEA1wwqbzTXlk6jW0xJBzjC3HLveINH1Py1bDbqBvC2d4Aq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAlr%2B5ur8wiFCFxonyrcA3TKNxbvwsSTDMp1GMnkFFAG70BiCCoHUEux23VX665e5H1HC3hIIbxLzp43kL7Rw7QrTjfIq271VjNRAgw7kDZvR873%2BG68kJK4tecVSJ4%2BHSLeYiQG%2FoT60nTquqjw%2FJ%2B3OQnfOld1m0gmHPnc0NxHLWpHTQqkiwm9viM2gZ0guZXDx7Gft11o%2Br%2BmwPj3YNO0WG6eQzaCnIs6UR1Va0IBYkwEifw6XfoJwrNe2Pimi6Bi88LC77RsmXsniu9sOFqJuNQ%2BTBeNZRtrA9vxfDz0C%2BhHdgPG69NSwwY1DG%2Fad7wqhlvqt1WeyRdRi9YK4TLk1iRObO7XcD7m1SuxVN81hkR%2Faj25zhZSSc3A%2FSsnfCDEfSHGFdUdpQAtDGa8KXRTRbAgi6t3TWrsXWfAVV6gZL0okV88An%2FvO877CF6W22A%2BMAL8R6DbDJgx%2FKWOCmjye5uke570dohrQwpSD0ynoNyWDRymLmtWCcWD2dJUKH9IXacC%2BjgZCNOZbcOVNrl3IMWs0%2BA9NmtbYozS6MHy33nnH78pkdGpDqxApTXwaXGHaVJJqg8A0LIdFrOBaVcfbWxVgPjr8f32lV1ELc5F4BLZVi4rGQnR4%2BFzw6UOgQGqBsZfDOcCxswCMI7X7c0GOqUBskB4eBwmzDEGVSLR4APOMFX5qXMsdFISzwiItl5NVS1ZQo5ZzCf3kyjNkP6PPj2DMpw4jXRqAUUaCeuSxCQYnfwEiisyCVzw8w9nes8jrVPNNwHqGBURpewarmmNOHDWuXm2khtNHPmOPGp2KGu3tbnCpEy%2Btg2QzP0F5fXHEbvcNadOzXkfbr%2BVXET9h2wVQAy1cTuwZ10rU4bmipSxzvP02sOj&X-Amz-Signature=03c89f267b2ade1dee56e81cd257c68687c06d33dc7699f05dbe3d744f927544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VS2XNXGG%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJHMEUCIDOBSebFQWHptnPAf1MWeZhLaOdBEno8ffZQuw%2Fb%2FQ8JAiEA1wwqbzTXlk6jW0xJBzjC3HLveINH1Py1bDbqBvC2d4Aq%2FwMIFBAAGgw2Mzc0MjMxODM4MDUiDAlr%2B5ur8wiFCFxonyrcA3TKNxbvwsSTDMp1GMnkFFAG70BiCCoHUEux23VX665e5H1HC3hIIbxLzp43kL7Rw7QrTjfIq271VjNRAgw7kDZvR873%2BG68kJK4tecVSJ4%2BHSLeYiQG%2FoT60nTquqjw%2FJ%2B3OQnfOld1m0gmHPnc0NxHLWpHTQqkiwm9viM2gZ0guZXDx7Gft11o%2Br%2BmwPj3YNO0WG6eQzaCnIs6UR1Va0IBYkwEifw6XfoJwrNe2Pimi6Bi88LC77RsmXsniu9sOFqJuNQ%2BTBeNZRtrA9vxfDz0C%2BhHdgPG69NSwwY1DG%2Fad7wqhlvqt1WeyRdRi9YK4TLk1iRObO7XcD7m1SuxVN81hkR%2Faj25zhZSSc3A%2FSsnfCDEfSHGFdUdpQAtDGa8KXRTRbAgi6t3TWrsXWfAVV6gZL0okV88An%2FvO877CF6W22A%2BMAL8R6DbDJgx%2FKWOCmjye5uke570dohrQwpSD0ynoNyWDRymLmtWCcWD2dJUKH9IXacC%2BjgZCNOZbcOVNrl3IMWs0%2BA9NmtbYozS6MHy33nnH78pkdGpDqxApTXwaXGHaVJJqg8A0LIdFrOBaVcfbWxVgPjr8f32lV1ELc5F4BLZVi4rGQnR4%2BFzw6UOgQGqBsZfDOcCxswCMI7X7c0GOqUBskB4eBwmzDEGVSLR4APOMFX5qXMsdFISzwiItl5NVS1ZQo5ZzCf3kyjNkP6PPj2DMpw4jXRqAUUaCeuSxCQYnfwEiisyCVzw8w9nes8jrVPNNwHqGBURpewarmmNOHDWuXm2khtNHPmOPGp2KGu3tbnCpEy%2Btg2QzP0F5fXHEbvcNadOzXkfbr%2BVXET9h2wVQAy1cTuwZ10rU4bmipSxzvP02sOj&X-Amz-Signature=03c89f267b2ade1dee56e81cd257c68687c06d33dc7699f05dbe3d744f927544&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3JYWGCR%2F20260319%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260319T033912Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEwaCXVzLXdlc3QtMiJGMEQCIGUFYlDzHzva8Epr4kXgxmKNwdhgwMyVO62W81Gj8CZBAiBbbRu5TElt0sAFN9ROlAMbZevytZqb1AI6Fuc2EjTZ4Sr%2FAwgUEAAaDDYzNzQyMzE4MzgwNSIMHTGx4zceiGGjj%2BDVKtwD51B8AmJlA79EfctPJWdoGEg5r4DKNnNQvsxFVBp0wn2flqSgQncryaMBcG28yIeO5XCF%2FaPNP1DRji3%2B0EGXrb8F%2BWQFRWik10qqqq3rH3yN8C4TiEUfvbaYUnnJBMQ%2BdrtbTw29Vw1mmHxKm9xwu2b8UOTOHwrBXbtKpR8%2FOhqJKA%2B4RBBADHELsQKhQo9UDqvPRTJe8v0beMPJcQKYXKkLhSKPvNh3HCGU4nLB1LngFMzhCJt40YgA2ocSz0xsFY2jSwF3jzJpvKm5AcX0Og%2BWIEjjQ0r%2BLnS9vsI%2Fg8WflmWUpS3wb4XB%2FuXcGCt7tyekF5MVjiaoI6tN2YWiOOmajbLuN2wJv2XAWLyiaE3vx%2FJDSgkNreS%2FM%2BAm5b%2BGeDxclZqbjR8iJruZPztgVDxblI0YMr%2FuV%2BCWDbNS%2Fr0URFADUAQsZrAfGraHUrkuwEBMMfz%2Fe69oP2SQE7NcZrW2WVAaAe8KFQNhLgzVLBixnly7SIPi4gvpc4od0syJ8NBN%2F8wUui6lJZa9SpBtbxhLb2Jrye2p%2FLwnhQNC8Mhm6GFj7j6LKERhXFTkptRjASKTxov1eLOPHVA%2FaMCKegJeEXM7%2F4m2w6UeHaMgqtzqcgwePGRWX2tZJugww9btzQY6pgHNJ86V47DK3xgsBNljHMLp%2B%2FrfOOwlxmi2Rof1P3H5E6IHBAqN5sHukKvFsWKQSmTU94N0mY2doKxYargyYYtJd4urvoJr1jqlVK6GArr4%2FmpnRZfx%2FhbkWmR8tzxsYBHqyEeJA1Ztkc%2BMFC4NU3mgFTSEAesg7PbWZWkr%2BYlXH3wD7aRLrdRHI9N4CMkjcBUGmc43GS%2FHaxtu8mQ%2FMO7tFWfDQfOJ&X-Amz-Signature=a63a874f67b526592e014be22fc7b95e869f5c26d6883bf4783b8965ec78f38d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

