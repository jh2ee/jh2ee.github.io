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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R62XTUII%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHMxDWlzmLPS6D8C2H4jJh2TrZgK6cUAXRFrWxLDRdURAiB%2Ba5YCjVtNfjgnndhEwCNpEYuQmQKKK9UuGPQZM%2BX%2Flyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMrn2seNSu9KWImGpuKtwD9JUOauEpVVdAaVSCZmayavFbMqetIbsM0oAY%2BKqeXGDCaJoCf4T9x4uv5AE2EPShuK0TbavHY1gnQAuLCZckkLNM99lwR7y13pHOcjc1lw3kM6Lza4o5zI1Rs86vrTUTph%2Foln%2BX8J%2B0bckmZCMO4pEfRR%2B8kqfXNlk8%2FSAGKRFdHjFMjNvYGTfPbUWY4pc%2Bx9e1l08s7ByHcXOkbiSpHbL8JF8KHfwnr7uVDPOAa%2BuhRpj1Eyet0D33x618sj%2FYwlX0wC%2BWm7rnWfKgjkSb02dznGSPrIfrpXh%2FjrH6mQ8IFXSxa1l91gIzstZnt0DTRR9MrKKrcQyas%2Ft94nYF4da%2BTyxorSejgnE%2BLxJZTVRjIjWCFZRNpW20CEF8vjP%2FSTV3gVhMSL1HW0sTtJMB0X6%2FIwX8rapRWglc%2BKDhhi7PFEwOWSD4TgYOVovmPKZ48WWcaRZ4bI%2Bf4mVdHwvar7S0bau4EXEpeShRlpAjPlA8sgacWLzhN%2FfF9OZokG2Oi4bmUYXehpeXHnJhT%2Fw6yTsIEmFRbVe3uFuAHIez%2BcPw6qhAx1VAZCADyXeLQrveU1thG9x9Ey5mW1RTkXIRESOS9%2Bm8FTYp6dYTqFwwYPLOLQ6oBqsfknY6%2BZ4wvK2mzgY6pgEb1OOV3QMPyZuIfS8ohxBv3tDU4opZaeBvWWVa7DWqGqGq5vTHATiunjSjujVOx%2Boj0W%2BqEFAI6YMtib62pTip0EJwCEHF2RvwXBuxQ%2F%2FxeEl8KYtaJ6WxgwXyttaOWoyRLfXK1yCu12cwF9NqS6bXqCcvOAhRVY6tdhp1gXEOZUrjfHisSBaZMkKkD%2FFcJKB8MAwUZCOw%2FDAP%2FrZB99V1yT46K%2BrI&X-Amz-Signature=4bb51b8b06a3bb6901a0f1ed2e842566342ace823b7466db05b3fcfb9d32fd9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R62XTUII%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211907Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIHMxDWlzmLPS6D8C2H4jJh2TrZgK6cUAXRFrWxLDRdURAiB%2Ba5YCjVtNfjgnndhEwCNpEYuQmQKKK9UuGPQZM%2BX%2Flyr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMrn2seNSu9KWImGpuKtwD9JUOauEpVVdAaVSCZmayavFbMqetIbsM0oAY%2BKqeXGDCaJoCf4T9x4uv5AE2EPShuK0TbavHY1gnQAuLCZckkLNM99lwR7y13pHOcjc1lw3kM6Lza4o5zI1Rs86vrTUTph%2Foln%2BX8J%2B0bckmZCMO4pEfRR%2B8kqfXNlk8%2FSAGKRFdHjFMjNvYGTfPbUWY4pc%2Bx9e1l08s7ByHcXOkbiSpHbL8JF8KHfwnr7uVDPOAa%2BuhRpj1Eyet0D33x618sj%2FYwlX0wC%2BWm7rnWfKgjkSb02dznGSPrIfrpXh%2FjrH6mQ8IFXSxa1l91gIzstZnt0DTRR9MrKKrcQyas%2Ft94nYF4da%2BTyxorSejgnE%2BLxJZTVRjIjWCFZRNpW20CEF8vjP%2FSTV3gVhMSL1HW0sTtJMB0X6%2FIwX8rapRWglc%2BKDhhi7PFEwOWSD4TgYOVovmPKZ48WWcaRZ4bI%2Bf4mVdHwvar7S0bau4EXEpeShRlpAjPlA8sgacWLzhN%2FfF9OZokG2Oi4bmUYXehpeXHnJhT%2Fw6yTsIEmFRbVe3uFuAHIez%2BcPw6qhAx1VAZCADyXeLQrveU1thG9x9Ey5mW1RTkXIRESOS9%2Bm8FTYp6dYTqFwwYPLOLQ6oBqsfknY6%2BZ4wvK2mzgY6pgEb1OOV3QMPyZuIfS8ohxBv3tDU4opZaeBvWWVa7DWqGqGq5vTHATiunjSjujVOx%2Boj0W%2BqEFAI6YMtib62pTip0EJwCEHF2RvwXBuxQ%2F%2FxeEl8KYtaJ6WxgwXyttaOWoyRLfXK1yCu12cwF9NqS6bXqCcvOAhRVY6tdhp1gXEOZUrjfHisSBaZMkKkD%2FFcJKB8MAwUZCOw%2FDAP%2FrZB99V1yT46K%2BrI&X-Amz-Signature=4bb51b8b06a3bb6901a0f1ed2e842566342ace823b7466db05b3fcfb9d32fd9e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46675IY3HNN%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211908Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCICizPV9A2e13Av37M6TkDzkNgPfee11ln9zS9bpA6AkjAiBu1upSRBg6L%2BVTvdZA9ggENi46UiIg82VZhZhEFOQWVir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMj6ikalfq5Boa7G1pKtwDc7lGMTXxToG%2BFfbErSSbtVe26rS8XhBEbGOcd1Q4TreSfg%2FkbFHH61ag%2Bm%2Bq0Xt0zZPlZh86IAYlHFUoubZ%2BaA7Q4yYg6atOEy8DdDf1agtimBZS4kBKIjuEvZYDeFmuiRjPeAujavILpaEFhcLDpFB6cqeusQ53kTkfQH2UoQGj9AxfZJVCvcB9%2B0bUO8MybKOI8P2VmchiqkwpUqkrhQ3TEN2i672i%2FLPYAoc4%2BBtu7zPOdHalokow1TSGf3IZ3B3INji7XdACfHAtPW5NOypL78CxGJlqpnioeV6IV%2FP76JBBcpWQpKSclSwAM0izwzGrtWk24scuvQbu9dKOacv3D1JUB%2FsEvnId4S%2BLkC3m9%2Bx1zAYA46RhFIv%2FzllmiMTb3Ou7x0slneKmC6bIMXrn3spCErlDIOdSevKtLXZb7tBtBy%2B9H4%2FvDKvBdgtDJfLUwLE5EfesTtwJ2FV3k%2BUhcMkelHmNq48mi1uMxsWjXrgSeY9XUH7cTtoFahL0th%2F1E%2Fy79vxTRVrgyMToTO2iDYAgEKKRwtq%2FHKbFUkzuzyTn0xDUMMFl49YZRvI5WGtiIajZe%2B1wudj%2FqRBtU9hPX4wdx4NRqLQUFWmJ2%2F4l%2FpeNfMJZfSuRkTMw0KymzgY6pgEqUrCkO8mVtPiHxw4T%2FVZ%2BeRSz0ucKrMS2NrcTjQ2fdRL7g1KfJIxH8TpIqZNcQeNAMZKtJLWOlzUwxycCG%2F%2FR6cZrY4fnsQpM%2FsCjI98xBNxRbmX1GvyvlYtSayPnHUljHE7hZFNL%2BDhogTcH6QzpslcuWThVwAJk%2FZGkaZalymk8Md9dF2IJZ38EIwU74oNeLhX%2BLXnglmlGhp9jKCerQFLeYl%2BP&X-Amz-Signature=f3490df9086ce6466705310e72b5a14275b3722c25faeb3cf78507e522a82744&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH6TSSDV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCEjHaEd%2BPdDagnFDkcM3Z4voz9FnSnSwwBa%2FoPriIVLQIhAKWdu%2BMlk46VYJnjAAeuXotx%2BDz57nIn5yiKHg9jRb2EKv8DCBYQABoMNjM3NDIzMTgzODA1IgxZgN6%2FQ%2B8Ct5nscCkq3ANCDT2cmPA3FfNtAQUCEUjMFIZwq8Fr5WBj71TPeYlYa3DgcdOmQHS8%2FmnSpm570Cv3CVUE6tK7jq60I9qObHvEHxaVYIfr2GzfNHi%2FeulL%2BjW5jq%2BNxNx3A5RVRcQ%2BrqM4csyb%2BeIlQDfYIhmQIyzGIqCjTw4loUo2nob8gv133In30usqV57VgIrB4rw0kX2INtAz461pHtxbiyZ6tCKPv%2B7P20BiB9VZng7OFALI5AuYO1l4CyUaJgmV4dr1M8SAhQCDrQtWDae%2BrZ8CGWLBWIxlEQwNaETcB1pD9qxGEB8P812vxUiO8zpN5avk7JPIiWrO67OVdqHG2%2FPT0n4vS91hZRtXRxWvjUZDfnwbA58Mb95JbQIPyvlkD%2BKbA5liC8tUm2N4xXBA9wFTjyBJAKfqBaViFeBB1hGWnQVAFO9xuEn31cDCZe1t2NSWTCDMvRGwjR7kQxHmkrhIhKTogQWN2uMO2Vey8inJTvnjuyu65NL1c2vh4kzfp9Op4l%2FVSj2eMHUqNcyZe6B4d1%2B54GFcyZQZig27XAWMb8SUV2v0kNJYtba81Ykm4Jfdzze53j%2BizfE0Lw2o%2BEK7pqnugtboUj%2BlEW%2F%2BpDq2A1npZ0krOHy27Lqo3O4i2zDOrKbOBjqkAbTodp3T%2B37iBiuZk%2BYIZP2Sr%2BykbUZxF2Inxv67JwgbeZiUXk71urp4mYTAF6B85mgxco6JLDHu%2BTNCP1gOTpOjpOAVVl09geXhYyiRggLoJIBOikB2KDjgpjoDTSwnL2zN1VP1wNq4JOenzs63W%2Fc1P9C4JdSmi2%2BpyFhlmMJIjuwWWCG%2BVT%2BrEhXJGp33rxOW866Lnjc1C35xgIW%2B3l1t7Hep&X-Amz-Signature=4c84f3fb70a62a22d7135296ede90fcb0abbb3b05ae38e4b2bca4f9f4aaad3f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QH6TSSDV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCEjHaEd%2BPdDagnFDkcM3Z4voz9FnSnSwwBa%2FoPriIVLQIhAKWdu%2BMlk46VYJnjAAeuXotx%2BDz57nIn5yiKHg9jRb2EKv8DCBYQABoMNjM3NDIzMTgzODA1IgxZgN6%2FQ%2B8Ct5nscCkq3ANCDT2cmPA3FfNtAQUCEUjMFIZwq8Fr5WBj71TPeYlYa3DgcdOmQHS8%2FmnSpm570Cv3CVUE6tK7jq60I9qObHvEHxaVYIfr2GzfNHi%2FeulL%2BjW5jq%2BNxNx3A5RVRcQ%2BrqM4csyb%2BeIlQDfYIhmQIyzGIqCjTw4loUo2nob8gv133In30usqV57VgIrB4rw0kX2INtAz461pHtxbiyZ6tCKPv%2B7P20BiB9VZng7OFALI5AuYO1l4CyUaJgmV4dr1M8SAhQCDrQtWDae%2BrZ8CGWLBWIxlEQwNaETcB1pD9qxGEB8P812vxUiO8zpN5avk7JPIiWrO67OVdqHG2%2FPT0n4vS91hZRtXRxWvjUZDfnwbA58Mb95JbQIPyvlkD%2BKbA5liC8tUm2N4xXBA9wFTjyBJAKfqBaViFeBB1hGWnQVAFO9xuEn31cDCZe1t2NSWTCDMvRGwjR7kQxHmkrhIhKTogQWN2uMO2Vey8inJTvnjuyu65NL1c2vh4kzfp9Op4l%2FVSj2eMHUqNcyZe6B4d1%2B54GFcyZQZig27XAWMb8SUV2v0kNJYtba81Ykm4Jfdzze53j%2BizfE0Lw2o%2BEK7pqnugtboUj%2BlEW%2F%2BpDq2A1npZ0krOHy27Lqo3O4i2zDOrKbOBjqkAbTodp3T%2B37iBiuZk%2BYIZP2Sr%2BykbUZxF2Inxv67JwgbeZiUXk71urp4mYTAF6B85mgxco6JLDHu%2BTNCP1gOTpOjpOAVVl09geXhYyiRggLoJIBOikB2KDjgpjoDTSwnL2zN1VP1wNq4JOenzs63W%2Fc1P9C4JdSmi2%2BpyFhlmMJIjuwWWCG%2BVT%2BrEhXJGp33rxOW866Lnjc1C35xgIW%2B3l1t7Hep&X-Amz-Signature=a3a6e6256e36c30ec913e1e61ec19346b7615c4aaa766a4790a795dd9b9ba921&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSOZZD6U%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCID3V6Howrz7SIInIJ0GV6veVBli%2BY9TK9lmDMegu%2F9qJAiEAqwfWCA5Wly7UtC%2FpBBKmSqkLx%2FipHV93G0zMIOdPI0cq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJP%2F8RZuvrKPKzpU3ircA7ghrNKkVOnkC8NXIiDMzC%2FtDGIwONVWYOzoBGYr0nCKP6MiuMfnZw%2FASAiZ%2FCfzav%2FJyl%2B33ntlQXFAOM7il2yzAPnw%2BbJwHYKxK%2BQ8XJ0LhytaAqNUBC9MFbPIMVva9qvESA%2BbmuBeH6h8EYveLFGbDzMSNCcugZGkYi1uQtdW4YeS5sWZbubXpwGnC67saWUUS4KyHXmWc2MpM%2FnLo2UvzgyuoyHMcnFTKbAEoY7agsHPt6My1fhYj3IGiOWeubfQ831tk96bJjVKu6zqFMg5xvEBY2rU3Uah6TulggOPtgqrEo1yrK44TsWPn%2BQJ81rhFrrDraSJUqhGbX2EjY5Oo1%2Fl7kryXIGttTBbarc149jorJ%2FbAJmO4hjWUm9Ss30J5hAiY7LLoPClyU3ELyzdR96oMwmdj%2Bca7LobHTMSF9Ywsz5diHGqbj61nS%2Fuvw15CDkUCw0vC63kjXwldLRTkF59RrKNtCbWUV88EaeOJBedLjncQMCpuOOcVA2Y6OSj8lhEV7mpx9JB3xRXgWAoMDvViD%2FCX25JgtYqW9Lue6dX41Nkueq0J1lKSTxLcpMH7VMD3QbhwzJ1apXQCSmRKMQLQ5T6LzYSnxmMGtian%2BeziZO4d5xDpbWFMIOtps4GOqUBioSnUPYbUwccoGHQLFU8iovYEUO2lJ%2F8v6f9x6WtzIpvAh9Au%2FtiULPV99EadM%2BTZJqkG8rIslpwWOofdIYAYJBObUeI2HVtvx27H%2BMAi39GBMGZ0M4q267lppnpqVm7E0JWT7H1bNTyq8VgQlf49uVZ4Mj3iqRnzF9%2FJNNbI64VJKc3b%2Fo7m9M2P1MMbQRfDZ9Wqb6i14voHVtQ3Eyf4vrXGIPH&X-Amz-Signature=3f96661d0c92a9aadef1d97f52a236f06cc939967e7ff25e0a28f6d68368abd3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623SJNW6D%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCIDlHCgfkDlA9pEbESrMqaofBnzIVZmPGKy93224%2Bd2d5AiAnpWnf706Q3ObW7WFor%2FGRUsh2XifN%2BjYDmoL8c6S8gir%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMOpDaJ5RhKXOoG4WMKtwD%2FKLfq7%2BpiQ9Tht2worxFyRmkxv4WSixCHgNBbSbneHVK4t9UHKa%2FsS4bJISKZf9FzL5RE6UOoalKrFsyl4oZH%2FIBEvFqEZf%2FuLYeFK1Ys4Ptj0P1Yt%2FNFyKsZclEFUT23OSi%2BTgQ%2F%2BHhabbwwejpOiinibNv2repg6X6dh57eo9kXMd%2BXyRpHhOQGBaX%2F%2FYSguedZv8Eq8TdxaHmlTOwFSbTfAq3s3Rdy8yrO%2Bw1BWLcaqt3NNhuMsjSiqugAWa%2B8tnAr82S2ro85omGy%2FEsfOz%2BnirvEUrZmxqn%2BcJtTQc5ggShrHvicS1AEGiA3YmEQqhuyfvt0R41WCcfGuxThJVjg2E%2BnpK4XVNgwpHhYyEWSaVJ5YcF1JKtugLqR0MRf2iQwf%2Bs8YnPi7rYpP92t0%2FC1ai7ddwcxTw9eSCooxTZd4TlQet56%2B%2B9SxW82l5O86JU4W%2F13xG5zPZ2etPj2hi5747i877iEFP%2BHPVVrWYvV5ZrZmiPZxUU%2Fw5qcRLlXi9a3jC7ssm%2BoCdL2LmwxWoCuaGzZAOygyPJQZN%2FJJAuUXJsmVqkeYKx5R9u6RhuiOhGls70GwTwiSPur69qndEy581VEJ0bYwcw4T9z2lqfJhmc6YJuHR6nYbcw0q2mzgY6pgF%2BrcBTtjQN7r1DmyUCRjx14egXvGFjpQy0V0dRIrsDYPajuuaAvyiuIt1LJeItyFA%2BeexceY0WWtMXmzymubJFJy7rAvvcvZBmfNykIuxBk4gQ5eTP32er3OA%2FQ9D83nMBquqto91Hmzk0mj%2FrGhOF%2FkCLpyMD2baPaYPQyYyW5JxC9btIU0NFD9Vi%2B7HthUFpwlvjvXRYUlF1JwYk%2FBaAp4wTpkFC&X-Amz-Signature=5eb574bb23c8f8e24ef6d7c0cc278d6876719a8ea87fa3977366a67dfc9863b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TTMMTIU4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJIMEYCIQCW61rHy3Y4DMMGzzEeQsNV8subBVvnrNZI7wyXliSO%2BAIhAIUoaj5m%2BJ6qXGv2Wl7sVx1B5mGtkyIiZFuMkAtqbnywKv8DCBYQABoMNjM3NDIzMTgzODA1IgyHYKKe9O%2Fni66VVT8q3ANC947SBiHM4gyIKCpfeZzcafjdaRvwF0JpSCoB87YJwv9w%2BElEdduoriIo8it6jVbg6%2BSQN689RRO4VpFfaQvFq%2BtwQjoEvZBf5aBI%2BsIOa%2FEwmCC82u%2FClTs5t6661PROKn%2BAwBO6hBQ2Q%2BDMpPvkR%2BRMKQSHD1y9QAyDB%2FbHHGTaacMP4VfwIaF7pzBox1t8pW3adot0tqf29iuLtOSApArwbyW0LNPQWlo7o2AynS1q3UXokAunUjAwVY33IckjdwVol9U%2F0KuTEh3A89%2B5AuE4iqoYaZMNDo5eA%2B1mbJ47dC02czvetewe2R%2BWQmdyRxMQXFQoVw6qb2g1jKEBQPp74mpou0ezSgHaVLkxnsOM99EU4XH0radF9gzkq%2B482OMuu0s1RnOTaawTrzxGWjPde9wOxhf5a%2FRadQq5rbzM4JkOTwjDucJA9z%2BgIkArJQ4lXLItlYE0MKm%2FJQf27jvYEj05Pp7Y3aiYZxGw5q09wgWB22AMO4Yn3czZOP8t4tPwXVAjPOG8GIb7Ie05i5qb1GNS2vZsXAFZAL%2Fz6TQX9rPOSrflH4jnaZx1ewANGXxllH%2FzDa7TmG6Lmqge%2Fo6S%2FINhyQdenm32hjcom%2FMyvJhIpfijG48RaDDIrKbOBjqkAfOR5nBpVVjhvu2N83BjEOkEApcEaW1Ft8ZZTf2XqOGFQ8NxwhbalR5ICvPPHXfgGeWMQ7OGlo3W1C3KoqqlJxiobgkbfABgJ%2BahyOICtvtM5UK110eoYIwH4%2BXaiu2JbVQpLFIoinN%2B3YrGMariTer%2BH3XxIOGLk3g0%2FKu39QJiN0VBVmohQ5uAIYUhQL%2Bl05qXq8hKcVLhd91zdPdaoy8PT5q%2F&X-Amz-Signature=83ec132598a79092d1ce733d71d0e4836aa0574a53554e13317476b7141f12dc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QERHLQTM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIEkF2YBbvJTHpX7%2BrONQDHo9NwUE%2FCPwI6SMX1M94zwpAiEAtzndf3h%2BHUhDcLJ%2FgBCfNmFr7kfAMedZyB1rW6lL2FMq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJ%2BSTsWPHYAvuHkElyrcA4sNl%2BZaOD%2BVI4vWz3vVwJt1whVDOODCGjD7tUapizW%2BKxn1SkfJ1g2DjIXx9lDwPgLxKocHoMEpqLRKKt0JTC7J0tHl%2Bj5k51UAgxtjiExdpziS2tROBNH1V%2BzUnSgRL6DA%2Bzh9a%2BwRmGTCmfhfN5osOr1K0oOPqyNEyPSgJwO%2FajLhhCjC3FBelMr2lzvefWPQqUXaSixxOy04afujGVxBmcnyjB4%2F0moaC16WaaAj8G0vHPdLExXCsgIu31FVwRi4n5fFYXXHvkg%2BVXeLfbzJxoGrdghzUHmW9kfjGlifmLADTs4ilNPpp0zGEYGdTqxwRXIpgGVPuroXm5vGQNFU0XcNzEKgGm%2FaFVZ3HHbAzHV1HbpdgRzMq9pFc0IcAPe9NWPrHrNH5ktURI28rRwF9%2Fm5iNtEMzBQMogdyjz9HfuBsgGW%2BkFMs%2FAxSAHwyq9qsDmzUodaV%2FZdPyAbGiJxD31OoFRwkyBoFjqRZC75Rh0qBFfHmi0wTx%2BfRHeBUBMwiNNMT44FMLCkM73oxuSJjg7BT2DZQovCG%2Fr8kTZbiS%2B43eGwRYQHVDtXaROJ7tGnioTLJPvMYH7EnokjVpyjLDdAaKhW2KW3dVJ9C2Xp2MhQVUAQ7LrICnwlMLStps4GOqUBWzET0OGK88I66Po4TN0geh%2Bf0FnF6xI%2BG3VtlGUF7blgUTk6d72e7nIC0r%2FiE1hIBTXTsb%2B2LZFfNySMWBzl3B%2FrS%2B%2FLPv7PV8XIyB%2F%2BcwQMHE6LXaBAoLk17cpsC8EbrEr4LtukqUsPtthqPoP7%2FzejAUB7%2B%2FFMPzZy1BZ7LDhGPA7sXgdFMn7y7O4zEZHbXakiNoDkAK%2FxaHCGH07NFvRJvmqN&X-Amz-Signature=b35036023cb592eb0a536385695766912d52ff2c0512a04c9d23d114dde24af2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QERHLQTM%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211919Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIEkF2YBbvJTHpX7%2BrONQDHo9NwUE%2FCPwI6SMX1M94zwpAiEAtzndf3h%2BHUhDcLJ%2FgBCfNmFr7kfAMedZyB1rW6lL2FMq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDJ%2BSTsWPHYAvuHkElyrcA4sNl%2BZaOD%2BVI4vWz3vVwJt1whVDOODCGjD7tUapizW%2BKxn1SkfJ1g2DjIXx9lDwPgLxKocHoMEpqLRKKt0JTC7J0tHl%2Bj5k51UAgxtjiExdpziS2tROBNH1V%2BzUnSgRL6DA%2Bzh9a%2BwRmGTCmfhfN5osOr1K0oOPqyNEyPSgJwO%2FajLhhCjC3FBelMr2lzvefWPQqUXaSixxOy04afujGVxBmcnyjB4%2F0moaC16WaaAj8G0vHPdLExXCsgIu31FVwRi4n5fFYXXHvkg%2BVXeLfbzJxoGrdghzUHmW9kfjGlifmLADTs4ilNPpp0zGEYGdTqxwRXIpgGVPuroXm5vGQNFU0XcNzEKgGm%2FaFVZ3HHbAzHV1HbpdgRzMq9pFc0IcAPe9NWPrHrNH5ktURI28rRwF9%2Fm5iNtEMzBQMogdyjz9HfuBsgGW%2BkFMs%2FAxSAHwyq9qsDmzUodaV%2FZdPyAbGiJxD31OoFRwkyBoFjqRZC75Rh0qBFfHmi0wTx%2BfRHeBUBMwiNNMT44FMLCkM73oxuSJjg7BT2DZQovCG%2Fr8kTZbiS%2B43eGwRYQHVDtXaROJ7tGnioTLJPvMYH7EnokjVpyjLDdAaKhW2KW3dVJ9C2Xp2MhQVUAQ7LrICnwlMLStps4GOqUBWzET0OGK88I66Po4TN0geh%2Bf0FnF6xI%2BG3VtlGUF7blgUTk6d72e7nIC0r%2FiE1hIBTXTsb%2B2LZFfNySMWBzl3B%2FrS%2B%2FLPv7PV8XIyB%2F%2BcwQMHE6LXaBAoLk17cpsC8EbrEr4LtukqUsPtthqPoP7%2FzejAUB7%2B%2FFMPzZy1BZ7LDhGPA7sXgdFMn7y7O4zEZHbXakiNoDkAK%2FxaHCGH07NFvRJvmqN&X-Amz-Signature=3f9858f1c441aa233c77a388350fe1a3fd9d05318e82916766a934ec7c44ce78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665TZ5LTIH%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211905Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQDyyyD81FnjkcvJX%2F2J5CIvIUrHTwIaCwn%2FTkdh1%2BahNAIgPTe%2B5kTqhis6ibIwi5zt%2FFAxKPUjZZsCZpMZpGe6C1Aq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDH1juoCh1MWQv382IyrcA9%2BllZqDDsS4sQCCWmRNqZqzRQVc3xzE8yYydDdLjn1JkpO%2BiV2usYXEDHSYB2QWJLIHbPOM53JeFcfs1jHKI9DfjWGl8YiV5DM09aXY%2FmT2uzFYvFRdd6z4afdwUt%2FqELUp%2BNkaT%2BiObUA1WiPgMvi2ONW2N%2B80rv%2F11mapdy%2FsxsmbumG4hALAEPQCslRacL0BMwzIpm2noA71fGUMYJQxvolnfMgqfi7fiOfcM7o8rLqvUsMpo01gZxWH8oIL4OMsRpyoSlSv%2Bls6D2BRV7floKQGc4KBtR6pMASJ2%2Fhxcz1uvXBEAV1LbPn25kzPTV2%2BXZdEadjOHQhL0biqSuSnQMhJ0ubDSaQblP5LPoaRw4NsQq8368NUtBrYKelYpve%2BdTtUw25ZkZn9d91ER2qIUyGOfRXsM6QBRfk8b%2BI0P7dL3mwAxIK1zCq8DQDbWWptequ1Zp6gL1JZAgtlWUNXGIAmlyRc9s5LBHbx8tjGNL98XNm%2BYAM1eDhKQVNUbV8irB0340R7Di0eRS1w8WHY%2BjCL0lUZXTw7aD30RtP7k7USzYqiJSxtvY1MR69FJ9xCE9NJ3hCIhu31vM%2B7HmWm69nymlfxv49WVfd8YWNOVf7FiF2HGG45gI2DMPSsps4GOqUBIHxFMQqGo%2FP4FVMHtpjKcw23q5vcb3jIx%2BPeLMoZoAof4DWVeonyDYApUDdmjRT7Jwq0%2BU%2BdZdwh%2By9MBdZQXwp9JakYfBwMgx0CEE5J11HLoZ6nEbq7X6l8eL1HYN%2Fc4rYUj1OSClxQ97x7drN8vCslJZNTpIxgPaQktpnr%2Bx1RX7o1xtwh6l1AQUfzOzmFDmb8LRmt%2BJM2iogteUvDoTZnYVDV&X-Amz-Signature=b498aacfc893b784c4cb5d599ab7d19bbaa27e2cc73c712dd4b96313b1d11756&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667T4N2DL4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCICOb2JZvAfQdHgANYgXB%2FHPClWgA62c35NkAARUNWrkqAiBl7WLOZWSKrE%2FVaH%2BAE0z8t1ucM2ffO32anLm9ziS%2FqCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMBgfhFtOYirf%2FaViVKtwDsRVGt0DnHvFRL19zqecvvDr5ex4XYlpY%2Bn6knzRQYyaSVATG1YN0O9YOsjwTHu7vWMsXFPcusFbbGELxxs4tpQ1gExHEt9URZKpr16xxMhVEjFJYnmbCh022rvgk2imMuj5NniEwecY91PFBuXIs%2Be0e8e3JXxsmLXyM9VQAcfbBoaVL%2Bs0QPchOM%2B59h6jDog%2Bq1QgSCAB9yh2db4uzrFJGyS6W2wn8%2BWPlOV%2Bgi%2FsmUVjOMxp%2BjZTa5m3CPWbNxG6FBoMbH0xo99xprcC0pSprT3Wi0u5rIkHgDE2QUTMNuBg2if%2BXX8L%2Bko829Y1Vf4EI84X1P6hXGXL8X5QU5bsqQ68RHyjrNvcgvdbm3%2BLucLBs3HCja94xMXWv%2Bi%2FGatDZ5gcEK2p7tzyoFnvtYzTV7BwIbFc%2Fj1ZiUv98WON72bEi6YP27bO6JHKxAUs7h2LpX1CxIkz%2B%2B3tx3AgKAfItaWeCJtZyJyg3RvZlhYUAxl927Ql6cmRQV5ykto%2BUam4Mlmrhweo%2BBEaJFSkhonKdnDeiWs7s1qyci1QAd%2FkPlHzX0tfayPmFOtEL33wfFZo1UrL0HrAdeBLouznyi7%2FsOnhhYRtvsOGKy50jdCkx1oGlpRoihmJ%2FhjUwnaymzgY6pgHdf1W1hB96BWzNRHYfsPoKZ1rPVtaRHBEFMRGkXSa12dAXSxZmYl7zOdep2xt%2B0hQb7mih0Znv4B%2Ff8Su5wM1tcQLH4sGoGvUtz%2BFEqu8LKkcBYaJ56CMcgVuGs60kbPSYy3Rvmf%2BwDse1USsy1be5U2PAWc5%2B%2B%2Bts%2FgeLFPm6k%2FxbRH%2FtXZ7kDFl%2B69bnXAOZR%2FYyNmme4oN1pRQxOFzCX%2BLyhmIe&X-Amz-Signature=7cb64ebd3ea44079a8c37c8979a4dd6610c50376b4dc8956c51be2e674990ada&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667T4N2DL4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJGMEQCICOb2JZvAfQdHgANYgXB%2FHPClWgA62c35NkAARUNWrkqAiBl7WLOZWSKrE%2FVaH%2BAE0z8t1ucM2ffO32anLm9ziS%2FqCr%2FAwgWEAAaDDYzNzQyMzE4MzgwNSIMBgfhFtOYirf%2FaViVKtwDsRVGt0DnHvFRL19zqecvvDr5ex4XYlpY%2Bn6knzRQYyaSVATG1YN0O9YOsjwTHu7vWMsXFPcusFbbGELxxs4tpQ1gExHEt9URZKpr16xxMhVEjFJYnmbCh022rvgk2imMuj5NniEwecY91PFBuXIs%2Be0e8e3JXxsmLXyM9VQAcfbBoaVL%2Bs0QPchOM%2B59h6jDog%2Bq1QgSCAB9yh2db4uzrFJGyS6W2wn8%2BWPlOV%2Bgi%2FsmUVjOMxp%2BjZTa5m3CPWbNxG6FBoMbH0xo99xprcC0pSprT3Wi0u5rIkHgDE2QUTMNuBg2if%2BXX8L%2Bko829Y1Vf4EI84X1P6hXGXL8X5QU5bsqQ68RHyjrNvcgvdbm3%2BLucLBs3HCja94xMXWv%2Bi%2FGatDZ5gcEK2p7tzyoFnvtYzTV7BwIbFc%2Fj1ZiUv98WON72bEi6YP27bO6JHKxAUs7h2LpX1CxIkz%2B%2B3tx3AgKAfItaWeCJtZyJyg3RvZlhYUAxl927Ql6cmRQV5ykto%2BUam4Mlmrhweo%2BBEaJFSkhonKdnDeiWs7s1qyci1QAd%2FkPlHzX0tfayPmFOtEL33wfFZo1UrL0HrAdeBLouznyi7%2FsOnhhYRtvsOGKy50jdCkx1oGlpRoihmJ%2FhjUwnaymzgY6pgHdf1W1hB96BWzNRHYfsPoKZ1rPVtaRHBEFMRGkXSa12dAXSxZmYl7zOdep2xt%2B0hQb7mih0Znv4B%2Ff8Su5wM1tcQLH4sGoGvUtz%2BFEqu8LKkcBYaJ56CMcgVuGs60kbPSYy3Rvmf%2BwDse1USsy1be5U2PAWc5%2B%2B%2Bts%2FgeLFPm6k%2FxbRH%2FtXZ7kDFl%2B69bnXAOZR%2FYyNmme4oN1pRQxOFzCX%2BLyhmIe&X-Amz-Signature=7cb64ebd3ea44079a8c37c8979a4dd6610c50376b4dc8956c51be2e674990ada&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOMQN4RI%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T211921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEE0aCXVzLXdlc3QtMiJHMEUCIQCuy5%2Bkmx1K%2BAeF8bh%2FieFXAvUJ8qKLdGNH3zHvF5cGhQIgLnqACm%2BbRW0nKijQS%2Fwe3CYarqA0E2sQiwwq%2BzIUWYwq%2FwMIFhAAGgw2Mzc0MjMxODM4MDUiDAl6DPhWQjJ5QaxM2SrcA7vgTdNLHe7%2FZgvnL9g7olzaBblPlYLWvP%2BzMq4kE%2F%2FRkngeYXV2n5FL8YbFp8%2FMdQ9H4KLvBvy1vaECYxKvlIBfPHzRasb37iRw4wRtb5TU3oMo2Z%2FmO5kH5G697KHlKOo0gc2TtVXbBEW6hc3dtSr5Uw1yzxxgzKzUcHg90dKcfOEdk5gEyqdLmAzNDUP9S3cTQXD7q9JUgBy4uQagxxNNWiPExThNW%2FmzvvCp96OURF2ScfTCiJg8kGbhSOPb2fIylSPFMYFCpBglxHE3v1576nGtVPrx2mCXYfe2OGHvXcPpEkDQjyo42iy0kPNHl6e4%2FYfK7a%2B61pfje8Mf%2BJ%2BgK04IJb85VvXwNzjVA35Przqop6mIow8E6G5%2BzYSM7yb1GI5gSK%2BRWB%2FfqyW0WMJlwi7%2B6hq2HMMg1FSaq9klBObpjxwfDs7pzpfP6lQWTdUpJB3Bc04IAwVx5R30J%2B9LKOpK1FmF4R33%2FRJmIT80kF%2FNYBPyxiQLIoqpAZ9f8YPhwSCu2hqIlL94ZtaQcMRp%2FCbnLyS2J2FX%2BqmfMEyrCGye65jEFRbpOPln000%2BavX5wc2nISGwZcyZ4AujzscyP5veTR%2FVx31q0BP3kK3NFdM2%2BhL%2Bjq2g2Pu3MKKtps4GOqUBx5LyvLz8eS14mQ4nE%2FeSnVexr6nbrS06XEAxvKaWktE8IWAwLLdCHiMRXS1S5e23cWRHcB4uivdRrsBsaVt7RdbA4NCPYiA6Q71oZBE%2FPTaXP9UW7k2Hki8w2%2BtTBIVkJQp%2F6Q3HlBaYKB49%2FT5EM2GZdOc8uoHJoPzfsjVumgzlx8f9DCRKAfYgo6lAGSbtpDfdzNo7kciZrG7GfIEtv6onn4Wm&X-Amz-Signature=6eb83728c74f46de6c18bfd55a1a9954b3a939a577244d85858c608978b2d837&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

