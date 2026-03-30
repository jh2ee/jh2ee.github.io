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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ2VMG6W%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQClynYjyWArpdpU0pHcFrIXsr777o4IUcpF5ICg9ltSkgIhAKyN%2BD5M3v%2BQdtBRTv8LGIPxEexdZ1pSYv5BwMcfIILpKv8DCCgQABoMNjM3NDIzMTgzODA1Igz3sMCLJMfrVuMuhcsq3AMQwCaI%2FSjBHfc3k0n%2BAAtmWTeV7USvWVP8SAEm6pZEBPiZHQgConnJzpNqlo8p3NPgq0OFPHZ5fnJ15AmHlg6N%2Ftn1oMq6e5LVroRSsQ6InZpaJSjY06Pssf0lZE15n00NDbAoPWejEVoyfkVKx9N5oU3Gcqs39ifuUG%2FYnGxh8M190V%2FMCk9keyoVtGuNruEvhhrXHf70zAKu%2BkANWRpYxjkgdPbd9il%2BT%2Bd67R8ZZdEHco4kuj%2BidY7H%2BPb4pKN9HdN%2BMHhnIfL5TIxka1gpaQz7oX3%2Fi25RT7Ejc5bOhJkNBM6aqgy%2FRlUNRIhhGIvkFNTsl6%2BJ0o8bv%2BN0HBk6tBUia7IlovIdUZItKnAAgWVvjJ9yM2P7MtGmtmFx1b6Hv0fmEskl31ECYH9jn3NhWazK0j3glBeHfQlHJDHi4iCqMXvB%2Fk91Ojan06OWakM6qjUv7%2BLZW5EBYXuW75frab8I4KRee88ZS10Yyk%2FEWeFtpTf488uuHiV1pN5T%2FKSdMuM%2BUOItNa83HXVmMkOa7vlQdvnvyg%2F9%2F3Kw5MYEnRUDohGwL%2FmG8Ztqis6uaqYM7TNqev2g2DQQD37hKRWYIYOgHASa9JTi3Sd4fCamIhuKfatAT2fCZJaAjTCjparOBjqkAcludBmq76ctxTc6uLBPga07ZqyeDN4Mw61B%2BKQO5KVrk5DELF8t0DPH5swd7BJ1RA%2Bv2vxg9b7kVvxvriKTyMis%2FEIODREbIBirZ8WAWXp7G1DUqqqBlc6w5izKatrYTzs3wgGiwf2ciYpe5TkL4%2FtPgV3QwQbckWV%2BJBA698fWSOdaHwXbdMXWmlP6LH9KB3jLMMSaQI%2BfuYIqPBIUxA%2BdSS28&X-Amz-Signature=517d7007a4f9d2e9f07e768a622ba47f66108b66fe1376399b2d348b7ba60a6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQ2VMG6W%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQClynYjyWArpdpU0pHcFrIXsr777o4IUcpF5ICg9ltSkgIhAKyN%2BD5M3v%2BQdtBRTv8LGIPxEexdZ1pSYv5BwMcfIILpKv8DCCgQABoMNjM3NDIzMTgzODA1Igz3sMCLJMfrVuMuhcsq3AMQwCaI%2FSjBHfc3k0n%2BAAtmWTeV7USvWVP8SAEm6pZEBPiZHQgConnJzpNqlo8p3NPgq0OFPHZ5fnJ15AmHlg6N%2Ftn1oMq6e5LVroRSsQ6InZpaJSjY06Pssf0lZE15n00NDbAoPWejEVoyfkVKx9N5oU3Gcqs39ifuUG%2FYnGxh8M190V%2FMCk9keyoVtGuNruEvhhrXHf70zAKu%2BkANWRpYxjkgdPbd9il%2BT%2Bd67R8ZZdEHco4kuj%2BidY7H%2BPb4pKN9HdN%2BMHhnIfL5TIxka1gpaQz7oX3%2Fi25RT7Ejc5bOhJkNBM6aqgy%2FRlUNRIhhGIvkFNTsl6%2BJ0o8bv%2BN0HBk6tBUia7IlovIdUZItKnAAgWVvjJ9yM2P7MtGmtmFx1b6Hv0fmEskl31ECYH9jn3NhWazK0j3glBeHfQlHJDHi4iCqMXvB%2Fk91Ojan06OWakM6qjUv7%2BLZW5EBYXuW75frab8I4KRee88ZS10Yyk%2FEWeFtpTf488uuHiV1pN5T%2FKSdMuM%2BUOItNa83HXVmMkOa7vlQdvnvyg%2F9%2F3Kw5MYEnRUDohGwL%2FmG8Ztqis6uaqYM7TNqev2g2DQQD37hKRWYIYOgHASa9JTi3Sd4fCamIhuKfatAT2fCZJaAjTCjparOBjqkAcludBmq76ctxTc6uLBPga07ZqyeDN4Mw61B%2BKQO5KVrk5DELF8t0DPH5swd7BJ1RA%2Bv2vxg9b7kVvxvriKTyMis%2FEIODREbIBirZ8WAWXp7G1DUqqqBlc6w5izKatrYTzs3wgGiwf2ciYpe5TkL4%2FtPgV3QwQbckWV%2BJBA698fWSOdaHwXbdMXWmlP6LH9KB3jLMMSaQI%2BfuYIqPBIUxA%2BdSS28&X-Amz-Signature=517d7007a4f9d2e9f07e768a622ba47f66108b66fe1376399b2d348b7ba60a6a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SSQE3GZN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIDiRe2tUK5JyS8nJn%2F1qz3uTz2Tua7lCen3yZi5LiNA6AiAxUyWbS%2BXMj8i4vtLxzrc%2FZjTWRlyIw7wS143sidDB4Sr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIMKaw0iBufqh%2FBA8IEKtwDkho6CRC2Xf1lj%2FgJjLJyw1%2FFZkO1SmaASC%2B4jWugVPadnSLFzrvBPDzzsMcgLp4T228uZCCSXIwKgEyzSNa6CJGkUqdDnuyTaRvcD0lYBS%2F4%2FaKMFHnNzYQ%2BIvdPx9lJnf%2FF00PirRx%2BZPwkd0ZOvZw3iGUf9dT9fvIXT9J2AwlKlifhRCZp69QAxYmv3eIjeyXt8sdSyitgqFNCZ7KpnBM0zbyVNfz5YWdj8oKT2U6rzoGXQ7CvO%2BLQ%2BAwwZ%2BcyS8BN8PKodKPEREY5kaxOOL8aj5gQKRaIz4LufihkC7UKyvZpqH1Rbo1YlmC0%2BgMSGPID4Ah9l0uIYX6cLx3CrZm1O59%2Fxf4fqLqPZNxPUL1nCyxVHsC6q40cRDOTWjS20bNEQnTcgRh8Mw4w0d2HyjjeyMaP%2Fy435A689ffBFmddPavr77Z0aMYysmrUZJAip5meD%2FLH8P%2B7Oe7YEcJkDeLAsOZxikR9T4xdMl1ae6gbOgzht1j9lX2AibyUbdgFGFKGSoYn9kkfwsshzcSqvlyOWEveCp7wGQ1YwUG6TNWVOAGT44J4ZUNFyGM%2BbsvDHt1MzR7%2FTPDYyP5lSy82CJ9EhrGHQzAs33A3pYi%2BKmnkf4%2Bv0GRqc4tZpKcwi6aqzgY6pgGItumclLHolBAOJlH7%2Fj%2BBGEP7ETGIhYeWPhE%2BQHVW2H3k8055oPcbixFb1p9dnIErV7aDSWTSKQxlEOiaWwdu5O3BbuuqUdY1QyTuooIPW%2BjF4NRjzEXKxSvzh%2BQR78IOc0axt1XnF6hLqK4UaPHNUW0RKHX%2BclOE%2FOt%2BjuZMfLrR1H9Z6%2BwlxGYgkf2BiPYgSkCJPRlwB8p2XNp1CwQbb8f%2BQpK8&X-Amz-Signature=2f63097b4ddffe2dc43ff9966172ace5b2ff163658dcb6c1b306eb24e8915cf4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5DIRXLK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDAghf6lZrVGH5ISnQxtac%2BgHGX2z7N3MbXc%2F2XYYjTWAiEAo0qdE1pv3fwYKZqn5uPbpCDz3PoF35V%2B1Bg4IaQACzcq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDAhZ%2B%2BA%2Bs7tLt7iRvyrcA1tubA2nsIZdj5Mo%2FO8yIr9XGT50riSoE90h2v4ld33nj%2B7yXmXQ6HCld2XnLf6UiJpljpzWarkURAIssZvFO6Isi40rz47%2BAIksfskYMcNvBq1x7o7Zsnl4lvWYebNNkgNAXEe%2BJWXHAO02nOpdLI4oBBvcjPpJTQkbwqsEY8RGL55yqK3glf6Cq5bMbERSRrmc138tJr8N7462oN6Q5L%2FVgLSbOhS2Yb9%2F3%2Fxn2jY9PGDunfLrATNGHrA4RTtRGk7sxfpprFD49IsMRbmG%2BK2HpV1DZKR5ZCwrdMaz1K75Jd9dmcpzEuqM8iYbTnGE402AUcHtSRmgBXBRauq%2FOLvfPjRnOrZ8Y6o97vViFEIf%2FwPyXkkAg1Bv88j6u%2FsMiHvZlU%2BSHtPsVvFLQ3tk1jdz%2FYQki87MG72BLZwuIB3IFq0JQKbrzFWS8dW8ruuGcU%2BH%2FIXhmFHKjNs3fZdeO5ySwYYFXlAOax2ooEWZ13PH057kvG9n%2F1FJk%2B7GS3s230PMeAjW%2BqZayhdG02LeYNuVdVq5sWD8ycYBkeh9LlGrcdAqr%2BzDMIw5b9TYsqNZsB7nWSPS%2BA%2FPiUXl6trmfCPcE%2BElU6SK6rJ6MZ4ahVIJStgywcUuKHTAMJnXMLejqs4GOqUB%2BIoin9NExUWGdxRL32VrFznUbcFOYrfUszZYUHZQ66CJpPtqTmqHPZF88v23pNXxld2ZAL%2FXbABRyeWnLcTUoj%2B280Pb6luMrq%2FzNaMW5LUixncATxmPO6Zs5TnQ7fcqRXm8IyK3jtn%2BUGZi0wti8Pungi7KNevr9ngRDLWxS6tIncpy5vjM2BXRTkEyR0ewv5j4wugMvRFWDEDtEo8lcjrV7F9M&X-Amz-Signature=e3fa88556b5299aff7bf312785e6c56efeeccf37e6c85afb1d1190dc94f137f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U5DIRXLK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDAghf6lZrVGH5ISnQxtac%2BgHGX2z7N3MbXc%2F2XYYjTWAiEAo0qdE1pv3fwYKZqn5uPbpCDz3PoF35V%2B1Bg4IaQACzcq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDAhZ%2B%2BA%2Bs7tLt7iRvyrcA1tubA2nsIZdj5Mo%2FO8yIr9XGT50riSoE90h2v4ld33nj%2B7yXmXQ6HCld2XnLf6UiJpljpzWarkURAIssZvFO6Isi40rz47%2BAIksfskYMcNvBq1x7o7Zsnl4lvWYebNNkgNAXEe%2BJWXHAO02nOpdLI4oBBvcjPpJTQkbwqsEY8RGL55yqK3glf6Cq5bMbERSRrmc138tJr8N7462oN6Q5L%2FVgLSbOhS2Yb9%2F3%2Fxn2jY9PGDunfLrATNGHrA4RTtRGk7sxfpprFD49IsMRbmG%2BK2HpV1DZKR5ZCwrdMaz1K75Jd9dmcpzEuqM8iYbTnGE402AUcHtSRmgBXBRauq%2FOLvfPjRnOrZ8Y6o97vViFEIf%2FwPyXkkAg1Bv88j6u%2FsMiHvZlU%2BSHtPsVvFLQ3tk1jdz%2FYQki87MG72BLZwuIB3IFq0JQKbrzFWS8dW8ruuGcU%2BH%2FIXhmFHKjNs3fZdeO5ySwYYFXlAOax2ooEWZ13PH057kvG9n%2F1FJk%2B7GS3s230PMeAjW%2BqZayhdG02LeYNuVdVq5sWD8ycYBkeh9LlGrcdAqr%2BzDMIw5b9TYsqNZsB7nWSPS%2BA%2FPiUXl6trmfCPcE%2BElU6SK6rJ6MZ4ahVIJStgywcUuKHTAMJnXMLejqs4GOqUB%2BIoin9NExUWGdxRL32VrFznUbcFOYrfUszZYUHZQ66CJpPtqTmqHPZF88v23pNXxld2ZAL%2FXbABRyeWnLcTUoj%2B280Pb6luMrq%2FzNaMW5LUixncATxmPO6Zs5TnQ7fcqRXm8IyK3jtn%2BUGZi0wti8Pungi7KNevr9ngRDLWxS6tIncpy5vjM2BXRTkEyR0ewv5j4wugMvRFWDEDtEo8lcjrV7F9M&X-Amz-Signature=9dfbd28af4af5081806ec4d46fdb7fa117ffdfa6b5312b894552e1009d9fb6ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLCJPEJM%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIDbxQLbn8h9KU17wVYXT26z5elRXeCBMLMlDx%2FLyEBkdAiEAjhsvWmXpzRm4DsUcpn5%2BM1o5cqbPpe750d07k0uKgtsq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDH4cfP7ImNvl%2BoPAmircA5%2FJC186%2BMXIrcrgvN1GGCOBhdLpVVjMAluhey9t6gy11w817PyQtc7G8ivlDarePSJN%2Fu0GwM%2F%2FOQcXNCu6FVGaYYUQPMb5DvZMR1tOM4MTmYmhsziOHlag6fY26Vjdvpc6c9F1eL012FoklJaleaFKOoZ2ZhdoaC3iDZ46GX70V2n%2Bft89vysE83eZEbqjGJSLn82EDfcbITSyppq3dh4IWuA419j7tMRvwEXn1xAtyd5V1ZYD7%2FNtX6tm0tWul%2Fmo7Uw2lZ06DZqq1KIAitVfsrW9RaKpWM3gVgI3iTlNklosQ8EqMInHO%2FUKSWKDgTASt%2FmiiPSiiGVVxFglFC%2FCGwUvusX%2FY79b4C82y6czrQQ0jEQg4K0I%2FEHiDxpc%2FK7cEKCr4vVWtcRK8qk4JPRUzeOLMa2LGGn9CSARb1k%2FhliPWO%2FYxshBMZCBpvgAHy4oxSGCR%2FqQuPnWLuM%2Fbf8KzyDk%2FsIVLFy6kLcaro4KcfFTe8cJrmY4ACwefOJbrnrC1P7DVBrfCqpveT1nyWHcZEvTwvqnqCJLX%2BEWYeg71hI0n4Doc%2BDP78gWRRqIZl0hX41u0ZR0jWEgLhYGszh1JbvQ7RVWMavQI8lgWRRMIWnrOfsFKwAL8vibMJSkqs4GOqUBZ%2F8VUdSmVIHRyf0Qm2KHbsOz8Qx5g23RPMEJ87PcxwvJgNa9HHxVU38CtcEMBO1jFFFfM8wJFXMDj9YhZZs2rYCCuvQUxydwQSh8lU%2BjtsFYZPcViWOSPnhG9TPOXhmTxnj%2FBA%2BDCjdAMd8pDTOn64gTyHF3enYfdU8x7YCzIzYc%2B8x0owb2%2FmXGtmMeYQic3KLGTWFqo78iDzzNQtfv57DBbJ%2Bq&X-Amz-Signature=4cceead61fee4cc112abd18e41407015a304f5f0985522a2bc5d94c284c9b12a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWZEHVAF%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQC6hRpt%2BWOGJPEmuRhg1DAg9%2BE%2Bl%2BLWOUp1B8vamE2HWQIgF%2FZjI%2FoidCfrgY8NUwCVjdI5oLHl8LSBeussTzUUA74q%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDKdQZzmR%2FrbuLLdSfSrcA5ME8AzTXl81tFYqyl6f7dDafd4vPkE2%2ByEoCkxU1gOXR1QmUTiBePsTtpDREBwaRuV58EBgvzZ6r%2BcBH%2FKxxLuOaRIqUyByBuoVcxAc4W3zVjd2fEwS1VTfzKLjSlU3roPRQk7IQr0yev4puH6pe9avYPqsoBqUJgOEi9G3eFCifsFgnBRZ1T9e4e7%2BGdaBIRnFT%2BxCp93x9gQFvJicAgALtVauKIXPJJM60rB%2Fn9FM6kNMtxc2G4v7b4yh6CEWDrgCBkcCXtJyXEnMdzwmu%2B34Z0DFELOgG9acBphtUc%2BkZ3XkVX80TUOLVLFN4oXQMtJNIm8ldkoS0DuBi5RRRA%2BnzziAhf%2FVdN9jYuUlFX%2BCucx%2BO6K73DhziaheSJCFrUwunkvf0BacRDAFJx4hPj2waLLrq50%2B6dls%2FTorex2ymioUP9pQFA%2Fn4skNMCaTrYT6WoDJXYAeJr5NAYmSwWd7hU0Thx7%2B7K2PzMo8rw50KE%2FFrlSdMN1NjB%2B1d6Zg45bv%2Fp2l%2BQeeW7ybiD4O2ZHQhXP4r1NT6QkustPOW6btL2ZvpUPdBaZtwo0NAwBoaxlN5hd8z2GbPffDN0bi7u3%2BW6ls7O%2B9nkYe1niinn1jZvVdECIOvq%2FCHI7wMLylqs4GOqUBTt0hh9%2F7IpYGEJkrYFP9zwk702OmX5L2JrsB%2Ba5ZbbY%2BLDLQL1cPsxTqMlMsCy6wVcLopJWWjgnc7ddbD9Qs%2FlbkDyNEEfBEynhXf8km6F0y%2ByqTasMRYBrIAXjZ6J4gmcYbCUNWmsCrjgLxo5qJ%2FtZGFMG%2F7kMixopaLjxVTpaKrAASUkFrkrfuTHlgtogTo2%2FbmDqJmIGmIvCqCSlVJmLbsoTo&X-Amz-Signature=e620c6fb8da18da6bfe60c1e1dca3af422be186e4014dce1200abc52362732e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIKIBDUU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCxwxo1lFAqiQ61mIA2MGQTw34yKpGeiqyUItTkupv7ggIhAMNcZrwZFVE38Iq6eIq%2FmBtYz8I83o1Uq7htcPHHy5pWKv8DCCgQABoMNjM3NDIzMTgzODA1IgxU1JIxfGge5XpM3AAq3AMkE3yn0pM0EFnp5Pel9Err%2Ft0mVjYvdtYjTAVXQu3Lgu2StqqpNN0zdUExItukEFJU1RaTncBmiRvu5%2FawQ6T493bKX8MANbrbomk6lyoRRHbdccsg0GJkgVFC27uf3eGZDUsvesGq4azUmWMSlYHSfIAKfqcjACKsojcGjpT8sIKqnwxQrnaA2yr6RWEpnUdRDGpHXeXvCLONOL%2F8SilycKZkjwTXRqnvoldqzLrBZVvx7uR0cQzxnHxPUqIhZMf4X4DrTSU5Q2yXFJ6JW01TQfTM1WQw%2FWiP6jCLi0NJnl50gwNwU1sWtJNMLk7Wsf5xO7DqSuQG%2BxLcxCV3kLbTuZYhyZuI0nlP7pPX6snA5uzKoK4vrc%2BmZPVWjB2uTjyFZXi%2FtR5dvDoickDXyTMmjfBwRG9Wud5jaRUYJuWqO3%2BGX89wA3yExcOrrovZK4Cm%2BuewWJEDW1qqn3rr4CY8ayIxH6GG7BYV0NmVYM6DSF7h%2BDaQrMWJqfNrjVTu5IQAVHpKw25IAUM%2FhDmN9haB9tQJQK6C0QGxzlni0KqNMAFupxpo2ZaaLLuK4Mx1uqUNU6IGoRqEDG%2BubjKzPJftuCKSvfDFPrE6NA%2F0yX3y9Jea52KWpX0U2hS53jCKpqrOBjqkAdkeLZ6mhCB2oUWIalEc8ZJPyNlWPS5XrQsDVYmYouIgc8978%2B9cFHLrq6DT65sJiG9f7fGjCHmZbJmp4lfgIx%2Fh37S4hOOJzbVIWOgO3GhW6vBOELaDjyTwwY0tzkIVSmr2L4H3%2B%2BYOeQkH7JrzZoKGsmlHthI4eN%2FrbPmZj07gXoh21fjq366xLX7358WCfJUJSPLwm3qy0k1yWi6LFVZLum8v&X-Amz-Signature=943db8e9577984d5a66c19853351e09de91354d1d1f99281dcf09c98e75eea35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676TQJHHK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIDsO5dVszrInfohe15h0wDyAijxYX6dORJXmBJTLl6HrAiA%2B9J6niVhJbwVl4HScK2Ppo7b8ULN0n0lNu1eErNdu1Sr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM8Xb56vXQ3Ypif7%2F%2BKtwDYZgNDGyUk1fPK4%2BVNpVyvxAK9Fwk5MomtcaPc2Y6gGOkRbB%2BDV8KjpkhDiGjkyEYmvdCDbwd3B7uiowpxVRAhU5Vek9m0pKm9fND3ROpQ%2BfhYZ7IY2E%2BbinPbIMqq%2BmMGtBwKxxNtIuq71i2tNBkjag4%2Bmyh2YG10dX%2F%2BSvRBPRIlkrtp9XakDWYYSXcRLSDBgm4O0F3Lx%2B0wnGS1ua25BiD7kaCdcitpaEdbukPwu8D6pUlA%2FbgbFl%2FUeo9v7pOmS6gPcjjpH%2F6sC%2BF9j3Z3vcHavcVyT5BB0OBbiAbPSmDZABdd71fjFnmYcXF9448n0JuJWwnsMSwoAqEX5fasaAOp4zlXwd5VwVVq6oaX4chwUCdx7sNiu2zqpdOrAIGrnKg1%2FfZk3bHL9oZJx3xaMICo%2B6CqdoAnWvcKypxx4hyl3hXwfZoB1sXAgm%2BLdwEMrNtuTx32KksjKj9MX0QOCqVZP7VA1fiQD329U%2FqTSUIg9pab2Z2Ip6SWetM0KBoLZ5AJAFsjSxKOlklDmp5xwe2hvxFznbgYIdEn%2BuP18vM1CBLOoceodMSbWrqFehPOSgN%2Bn%2B8BeIr%2BkOyXM8n0XCPx0d6xfGU49UPB7Uj%2FQh6fySc8fEVIrKjiWkw%2B6OqzgY6pgG1mD5ggyW7kL3UeJCmtOTG2fD4%2Fe0F6AhzwLK7j9QYcNnALflWnm%2B%2FHH5%2BnEpSkdj4h19p%2FqLjOenHkTSTkdVXm64CofXftCFAw1%2Bv9fMgTAUkmlIKzRngGMzMcgeSauzhaF2oGI1etj%2F%2B%2FK2FdCwUkpRyZFNEuEhqq3T5NEeSjN71L4DRlhVIbiH%2FnBxgu410rX9x%2Bn0nKVCH41WxmxY87M6wKuUW&X-Amz-Signature=f55589306369eea5188950f22232c1376ad50c27cd05116f3ff8caf7e43356ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676TQJHHK%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIDsO5dVszrInfohe15h0wDyAijxYX6dORJXmBJTLl6HrAiA%2B9J6niVhJbwVl4HScK2Ppo7b8ULN0n0lNu1eErNdu1Sr%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM8Xb56vXQ3Ypif7%2F%2BKtwDYZgNDGyUk1fPK4%2BVNpVyvxAK9Fwk5MomtcaPc2Y6gGOkRbB%2BDV8KjpkhDiGjkyEYmvdCDbwd3B7uiowpxVRAhU5Vek9m0pKm9fND3ROpQ%2BfhYZ7IY2E%2BbinPbIMqq%2BmMGtBwKxxNtIuq71i2tNBkjag4%2Bmyh2YG10dX%2F%2BSvRBPRIlkrtp9XakDWYYSXcRLSDBgm4O0F3Lx%2B0wnGS1ua25BiD7kaCdcitpaEdbukPwu8D6pUlA%2FbgbFl%2FUeo9v7pOmS6gPcjjpH%2F6sC%2BF9j3Z3vcHavcVyT5BB0OBbiAbPSmDZABdd71fjFnmYcXF9448n0JuJWwnsMSwoAqEX5fasaAOp4zlXwd5VwVVq6oaX4chwUCdx7sNiu2zqpdOrAIGrnKg1%2FfZk3bHL9oZJx3xaMICo%2B6CqdoAnWvcKypxx4hyl3hXwfZoB1sXAgm%2BLdwEMrNtuTx32KksjKj9MX0QOCqVZP7VA1fiQD329U%2FqTSUIg9pab2Z2Ip6SWetM0KBoLZ5AJAFsjSxKOlklDmp5xwe2hvxFznbgYIdEn%2BuP18vM1CBLOoceodMSbWrqFehPOSgN%2Bn%2B8BeIr%2BkOyXM8n0XCPx0d6xfGU49UPB7Uj%2FQh6fySc8fEVIrKjiWkw%2B6OqzgY6pgG1mD5ggyW7kL3UeJCmtOTG2fD4%2Fe0F6AhzwLK7j9QYcNnALflWnm%2B%2FHH5%2BnEpSkdj4h19p%2FqLjOenHkTSTkdVXm64CofXftCFAw1%2Bv9fMgTAUkmlIKzRngGMzMcgeSauzhaF2oGI1etj%2F%2B%2FK2FdCwUkpRyZFNEuEhqq3T5NEeSjN71L4DRlhVIbiH%2FnBxgu410rX9x%2Bn0nKVCH41WxmxY87M6wKuUW&X-Amz-Signature=1adf72daf5b8d9410388821a13c0666128af9d57d68ef1d54b2ddf28ab0773ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RHYDQV5%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJGMEQCIBWBjTtOpY2iDWsnGVQyR0%2BFj4giORR6IRwSrHOkwLyxAiB5AmLx7219TNPe0W4AO0V93b1IPKYpII0y1jJrpddCbir%2FAwgoEAAaDDYzNzQyMzE4MzgwNSIM30fSHy8qA79wnXY6KtwDqM31gKDST4SrQW9H0YDBHFO3Wx5IdAsItlSFEPYOkuk3Jwe4GfCiOlvUoM5owLm9vKmsDIzBPxE%2B9Ml%2BOzCUJhRuRxyOfsTmaVqQYxD3QJRa8LY8gG06s0iBkFF1K%2B2OmixBTt%2BUwa9ttr%2BEtdU%2F3wSWXGeKL1sSaoniSuYjZCZe2lLGlX%2FVGytsdxi1zJeWL5JrlNv%2F7GRtDTveO%2BW7zT19MMDnsGecLS5BHoWCiYh9omCvyKO%2FrS8ct31Syq4Us6oOaNL3eCiaDjE%2F48l2gees4WnnX8w9Qgl63B5EaEMt5WW2zwdpQGDafdsyO%2Bp%2Bn2ePLbLlk9A9EZHE5jnyp0nHFcthfbjLHq00dFD%2BfOjB1iiOzHGGKI3OGyPtmW%2FPE%2BLzsCAypXoYoDhzJduUlxj3dBlzW6WCSU36Qfbbn9RRIxDywrzkYTG%2BvlnET9JfF%2FHra%2FIS4l%2F3sBTObb28oZagv5kAhJsYbphQEFZsSWKWDzfIqxcLOpH79pSa02xRMR093Ii1oV3BkUVzY%2BhkkkDHwLTja17GaUzOx0ysCOli53lSfBr8BapKQjhJY6I9h9e1X1rmCv72ficOhKV12BYMuLLWFx0G5qp6kw1cR8M7DJfZ6PkPAZpjry0wjaaqzgY6pgHIcGg4Dct8Vv5xiu0%2FY4Po3NpQ288PE5Z9lyYpr7cHri1ljiuKokxWJChFWpe%2FRNtnMghMJfb5HoZK8txiGB6ofyeUsFOzfK15C5dLO70Eta1L1n3s%2FkpIXfYp0oYveslmY85wtfnx0y0zmc%2FUCgXVIlb3vSKFcwxPAdoMCmNTcpiexTgRhBldOnly133nDwBwlL79rh1WdM8dtro90i402z2JtVGf&X-Amz-Signature=18988b6a427152e67fe201bda7e2b7f5d6758e17bd4f182dab259e25538b2c4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSY6PPRU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCfjZADlHjY8q5Ax5ai2MhDRj5jyZYn7OtJxmp6xvRE%2BwIhAL3y1LBREO5JF6MBTTa%2FiFOgbq%2BiIy7KQMHqWDtZCkskKv8DCCgQABoMNjM3NDIzMTgzODA1Igz0%2Fwoe0Cl5vD%2B2jlQq3APTGExHLKlmI5PDKd2BXuflWERe2SNOjWFx%2BK2U3DJb4oH6230RkcUWNWqfwfY0Am%2B2NJj5AwpSKSwkqVfYK2A%2BeUx9s1jvUU0IY2II5JhgcgHldc7Hjo%2FYXe6w2Fu7LBBlS54G6KOAqIqaJ0Rxe8w0sN7uFOLkABnhhuKf1MnIH9Fm8h8uBsk1u9kPPH%2FbPq4dpKd1WGBEF5hRVwlcMrCqDrR7ykxRQ0PCJNhvYnoGrNyw8jEF8yfBovftMBhv%2FpkCww5UTE%2BLPsGC5vhJyGqjZ%2Fy5PdI1a6OeYNyfzQO3lFkQWpL5DLPATSWp7vBdTDHNFwwxJt19%2FwxUD88u5XrVbHIF%2FRvz5ZKAp1wgRAdCt76LK89E%2FU2yFqFy4PtcOXTro06bBbIT5ROnm9Mdw%2FCoBtN6CEYpzS%2BJ7YZM2q1wBqSh8J24oNjYpQkvS9OYtB%2Bm9hkJgl8mMlgGnwgGURm2CJeDfuGfvVO9wGTjNf6%2FnpcbUGVnxY6BMVQTe3hie105xNpfnrF1atBc0HIs8Vb2Ms1WYZymuPZ%2FcXKPAD5GyXxSi7zbr2GSRp7ovIYv61PMYiw7LTyPyRkHPbevvWJIkKKq6YarbjME%2BnO4RrYJb59%2BTAQI%2Fa65s1MBzjD%2Fo6rOBjqkAaVwqynPLTaYbv1khHuoCQmhwC4dYOutyVTd%2BIzj0zQTfe73BTq0sz1FgulStMmlWa7RDAD%2BbPlEhz33yzNDHlhTRUEDo1xbrDKxNe1PRRyjVfXSEB8GFf53mcj2jR2rrlyo%2FFuG5e3iGCKaKi5ombMVwlL%2BO2P8Hj0diELLNnAocQGfnr5mWmfzLVC1HDprHCVZDeq82YlG%2BTA0hCsouE9vQXcq&X-Amz-Signature=a1d249389e36d3b9b97c8a9639ee9e8ab9b13fb00ed3129efca9fb27f2842131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSY6PPRU%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJIMEYCIQCfjZADlHjY8q5Ax5ai2MhDRj5jyZYn7OtJxmp6xvRE%2BwIhAL3y1LBREO5JF6MBTTa%2FiFOgbq%2BiIy7KQMHqWDtZCkskKv8DCCgQABoMNjM3NDIzMTgzODA1Igz0%2Fwoe0Cl5vD%2B2jlQq3APTGExHLKlmI5PDKd2BXuflWERe2SNOjWFx%2BK2U3DJb4oH6230RkcUWNWqfwfY0Am%2B2NJj5AwpSKSwkqVfYK2A%2BeUx9s1jvUU0IY2II5JhgcgHldc7Hjo%2FYXe6w2Fu7LBBlS54G6KOAqIqaJ0Rxe8w0sN7uFOLkABnhhuKf1MnIH9Fm8h8uBsk1u9kPPH%2FbPq4dpKd1WGBEF5hRVwlcMrCqDrR7ykxRQ0PCJNhvYnoGrNyw8jEF8yfBovftMBhv%2FpkCww5UTE%2BLPsGC5vhJyGqjZ%2Fy5PdI1a6OeYNyfzQO3lFkQWpL5DLPATSWp7vBdTDHNFwwxJt19%2FwxUD88u5XrVbHIF%2FRvz5ZKAp1wgRAdCt76LK89E%2FU2yFqFy4PtcOXTro06bBbIT5ROnm9Mdw%2FCoBtN6CEYpzS%2BJ7YZM2q1wBqSh8J24oNjYpQkvS9OYtB%2Bm9hkJgl8mMlgGnwgGURm2CJeDfuGfvVO9wGTjNf6%2FnpcbUGVnxY6BMVQTe3hie105xNpfnrF1atBc0HIs8Vb2Ms1WYZymuPZ%2FcXKPAD5GyXxSi7zbr2GSRp7ovIYv61PMYiw7LTyPyRkHPbevvWJIkKKq6YarbjME%2BnO4RrYJb59%2BTAQI%2Fa65s1MBzjD%2Fo6rOBjqkAaVwqynPLTaYbv1khHuoCQmhwC4dYOutyVTd%2BIzj0zQTfe73BTq0sz1FgulStMmlWa7RDAD%2BbPlEhz33yzNDHlhTRUEDo1xbrDKxNe1PRRyjVfXSEB8GFf53mcj2jR2rrlyo%2FFuG5e3iGCKaKi5ombMVwlL%2BO2P8Hj0diELLNnAocQGfnr5mWmfzLVC1HDprHCVZDeq82YlG%2BTA0hCsouE9vQXcq&X-Amz-Signature=a1d249389e36d3b9b97c8a9639ee9e8ab9b13fb00ed3129efca9fb27f2842131&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662WTXAV6J%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T155716Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF8aCXVzLXdlc3QtMiJHMEUCIQCZVxQEWhTJ9%2FtFNVdGMPXoaRjSnduodB90xDJ3xD1qmgIgXHS066KULN1xbJHy4Dw1e%2BxYwuS6XkIsoycXvKN%2FDucq%2FwMIKBAAGgw2Mzc0MjMxODM4MDUiDPe%2Fgr6PmhcYzhdz%2BircA2c1lV4uFJt565DwKGLMxzVjmAutrjYM%2F8HFN5G4%2BH1dWg04zG2K22DzOb5MUC9Ok3KeaH0QGZ0ZywX%2FGxhAL6IQtzbZK42LlNj2KCzN8g%2FIHesTQxsTP3UyaPFLvFyTzDtPyUPufLTRdmI1uqDB3jSd0m%2BKam%2BTsRKmembXd4emw5QT0OBy8XwT61zkiV5BRZNaN9Bhv8EREsoXb4hjpnnuK%2BmSIr6TbMB3KwmgcJ0mMjHuRPIGR6Rkzk5rej2ZVGyBCNf%2BZpxDDK9%2BRFhDEJ3ifF0oltyvgeftLooZhjogWg1RIqlLCklErPMdFUF4srm4eIEWq7IHSgv%2FKdwY0jtE428hA36dHG%2B8NTp6%2BBCUvCXp44W0HFhxV9XQY5Z512rkkv%2FUxjHqiQbNSPhDhl3OVKmyOr79MNCkW3v4Mx2XQeBSe%2BNsOaioE22GHAQtyXWVLRe1hxFIHmEqMkqadU9UI2N2qFExUoTJ5kN0jpRv4J83QslGHZzA5X1GT4KWxSjYyW8hdt6wBdsavsz3r%2BflLtkoL13f76JiUo1fg68l2Xu3bDkG7nTNEdfv9VD0nfNzKWLti2H58joICNCM3VBejLuKJqu2D9DUeQ30fAzIppCehOGkSaAmU8ofMIukqs4GOqUBfDq75C07ePeUgmBmyLNuZZ6G27eaSN0qmVVQ%2Bc8WC1etQuGA%2F5jlnSnPdyn%2Fi7Jq%2BXKtM%2By0nFr7HbN6yIIHxAW9Ju9q6ur6o9a%2FG97UOLjuHRCHY9nEeszFzuZIVtvcDDhZSPLHPKevU1bTlBzOMwomK9JBIKoeK7OXD9ZS%2BGgaT2zKFakzjo%2By1gGeVTc5lRyWgZJzhCPx%2FhIk1DBsLmWGOMa3&X-Amz-Signature=83cd295f2d46a68848be6c1d24774b95b8677fe7b078b20bbe45683b562a9396&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

