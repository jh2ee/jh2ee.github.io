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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WABZS3Y%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIBXgSbDBZL9nHek36hLchqFiv97NmQrbzZCJuent4bpHAiEA2H3gqRDDJdxH20SFfS%2F%2FoGRc3c1UQO6OekNT0IXmjqoq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKZwUL%2BRVI7eBDv6DyrcA%2BJxqlZs%2FWe9Qe3r85RtKGQOZylrIV1K74mFUcAj8VchUmlCSL7%2BBe5JWmIbtk39N6Zg1zd3XW6TVPL%2BJ4oNRgA8uPIqtQv0vRJwCbCa0iCNr0pyi6GBVcjRWYuhXjcSxBN26fwBnSlY3s8fhf4NIclPaWHmDiSNf97QAi4G6KrKCnjHjtmtss1ifEcetDiruiJQFSYski3K5zA%2Bunq2YTzu%2Fy3jX86ZngR2jX8UUgQg%2FRE0458uYONWkLfZbTIYPTbiSS3rrX7Oes5RjnmG3p5oT5J39gLqUEIoFAVTMJSwSMQwx8N58mrXpExgT1rL1evu09jXiT7yqRpuUt03R3Ttor%2BJ3Sc8PD4z9sBjw7hagRkwusSQdFeu7qCVgDhI1%2BpBfN8xYKkWcCp9jIpAY55K2CYwh2V4j5f9u8gr%2BpZz2Kv9Ca4WK%2BH2he%2FfXkQSJIkDVNlZO89XMQfGohk6rP6m68ZKf77luYWqkUR7EwZhrvV44qrQZpqpuTnNBnWo3FNnUAn7iUmtnxEljtjD67vQgapXdBZynpzhTi9URb6aC2tOAzHT%2FPnxR8v5g75i3Z3GwGt91BNLPKZuuv6d2KasB8XOPNqs0V40Ol2g49HvnNDzC8R1NyayA1lgMLCl680GOqUBjYz13zAkX9eeTLedL2vdT4FPh72MCnJ9fAyFlvdxUlvHYf4xuFDRjc%2Bd2pp4UMWZ6Q%2BiLMAxH1cXQ%2BbuCU6kibsJkjnIAQRJ1MMIMgUjfD0%2Bw%2BKfAtUF4l15vCtCUP4SClaxK%2FZSSsQZeZ8isYJg%2FKmz%2FKCK00Idlqgq4kqBIjqfvtEZh%2BHzdKkY2IKXwCXBXdGTRO8NJ0nF6q%2Fvl%2BNRBdu8xfSJ&X-Amz-Signature=847abf4406b07234a23f120ac014956341aca7f8e81930244fcbe6966409f6c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WABZS3Y%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIBXgSbDBZL9nHek36hLchqFiv97NmQrbzZCJuent4bpHAiEA2H3gqRDDJdxH20SFfS%2F%2FoGRc3c1UQO6OekNT0IXmjqoq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKZwUL%2BRVI7eBDv6DyrcA%2BJxqlZs%2FWe9Qe3r85RtKGQOZylrIV1K74mFUcAj8VchUmlCSL7%2BBe5JWmIbtk39N6Zg1zd3XW6TVPL%2BJ4oNRgA8uPIqtQv0vRJwCbCa0iCNr0pyi6GBVcjRWYuhXjcSxBN26fwBnSlY3s8fhf4NIclPaWHmDiSNf97QAi4G6KrKCnjHjtmtss1ifEcetDiruiJQFSYski3K5zA%2Bunq2YTzu%2Fy3jX86ZngR2jX8UUgQg%2FRE0458uYONWkLfZbTIYPTbiSS3rrX7Oes5RjnmG3p5oT5J39gLqUEIoFAVTMJSwSMQwx8N58mrXpExgT1rL1evu09jXiT7yqRpuUt03R3Ttor%2BJ3Sc8PD4z9sBjw7hagRkwusSQdFeu7qCVgDhI1%2BpBfN8xYKkWcCp9jIpAY55K2CYwh2V4j5f9u8gr%2BpZz2Kv9Ca4WK%2BH2he%2FfXkQSJIkDVNlZO89XMQfGohk6rP6m68ZKf77luYWqkUR7EwZhrvV44qrQZpqpuTnNBnWo3FNnUAn7iUmtnxEljtjD67vQgapXdBZynpzhTi9URb6aC2tOAzHT%2FPnxR8v5g75i3Z3GwGt91BNLPKZuuv6d2KasB8XOPNqs0V40Ol2g49HvnNDzC8R1NyayA1lgMLCl680GOqUBjYz13zAkX9eeTLedL2vdT4FPh72MCnJ9fAyFlvdxUlvHYf4xuFDRjc%2Bd2pp4UMWZ6Q%2BiLMAxH1cXQ%2BbuCU6kibsJkjnIAQRJ1MMIMgUjfD0%2Bw%2BKfAtUF4l15vCtCUP4SClaxK%2FZSSsQZeZ8isYJg%2FKmz%2FKCK00Idlqgq4kqBIjqfvtEZh%2BHzdKkY2IKXwCXBXdGTRO8NJ0nF6q%2Fvl%2BNRBdu8xfSJ&X-Amz-Signature=847abf4406b07234a23f120ac014956341aca7f8e81930244fcbe6966409f6c1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R7RSFSHY%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174953Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIF2s6m3LbarW9qMHwVBOT%2BC2%2FFT%2FwHJLsp6cJ%2BTT%2BXnHAiAGgF6Bh2GvqWb9S1l2L8jWTwvT8RZkeWrxbcUIJkKKair%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIM7o3mGgFZlxKBr8USKtwDdVAa%2BbS7I%2BJRoaMcpPK35Lo3ZVHVLUJ3WzHpdrRT4uPFTft8lk2dSz3%2F8jADIgkScHfBtKWMaaWgXV%2FlbznApaNoFK%2FWUugSLz0UFLq0tgDzv658S8mecEjJA1Ic3fb733068GnVB%2B7Pdjt1qAesUIJSh8756u5fNYMr2nb8gDLKPpvSajI6%2Fzi8OggrpINTz3rCh3QSFJXT7pKEWWuSoA1ymyVq7ppV6j4ZHfxSju8uR07BM2nY7WdX1tPKzwqFEYeFbAdIGQZPlZ1jcFBkeOSHAw%2BzeAVnA5efS82SYAYTlxvE4S%2F4DydMzmUKh0fqSyppY8FueP3c7RhQqWMc1CP%2B3UP5aMH%2BSqFM2g%2FrKOEx0shYbn7Q3XdH35a%2BW80R7qhkf%2BwP%2FCstfNkXC1%2FElnS6afuQjtyrTRTCxilkDV1PZtmvYkuwFbRYjl3TP9XtWWmtLBtguoR1P1ftq3Cuok17Ndd5%2BWti9%2BIBQgOtKwjbufpmo%2F24KDnAMAW06%2FHupqPiQjTN20eC4fXuUxMsJNP%2FQ37H%2BMxfIdD6DS2F3mAMjHT3UOuk%2B01UYSD3%2Br83IbOkPpkis0LjdvvTwy0Woazyhj9giRAUC%2FbLEPmvM0q9lXO71gRAZKKLlYIw5qXrzQY6pgG2OeGDRk%2FZtamehY%2BFwZhF4GGIssyrV91b%2FKLJ4NhmvDT7Vk0NP6PPLuCwbxkfn%2BTankNbISRfOXhf8LoCQF5dK7jVw0C0CLFhYJY3t%2FcQ%2Fl9wddx%2FgI4K8yuGafABn0IEU1fetduzuO4MK0Xx0DynuEorCznosnM%2BkVgKq%2Fxz%2FVJBOEFUEn%2BbxRBnpyP5fMyYJVwsg2vAtE1RUjnlMyypUl%2Fx4vmr&X-Amz-Signature=a51dc07b6cf88586064ba5b50b4020e1dced9454c36b1c636a212eed223b56b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VM54N3TF%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCPFlnsElXpxFG1iPxWSuooKfqacbxT9UztkapL2t%2FOfAIhAJ2Nq1tkFMl%2BPW3jVDeN%2FCUt%2FVuWDoi%2Fy%2BCXYEj%2BmcRUKv8DCAoQABoMNjM3NDIzMTgzODA1IgwB50M66fJGgkRvwqkq3AOqTM8EjLUrPE594tqkGk8zTG%2FSE3mBcD6XUZCdBqNPE6L6HUK5TEmUjEYW%2BeoUKqVNvkOhXJSVuyez7R3fwom%2BCifbEgWbkNO%2BKIyu5ptJWuM4Y4uDetEcLAsVhwv8GbNZv%2Fm5LLnnAfelF9GLFizNEFVxhRtNY53xkeJeNYhSYg9J9G4HoVPdcU%2BkHVLdFQRQnK3xUxUK2o5O58S4eqX288znCY%2Ftweh%2BBJCKMsaRsRThS4CRyuO9fxtw4i7%2BXDx2sVx9mXHqTcGMROzwUqCIL53dRfM9o4Wb8iWH2jPN%2BUALeSNdlgNIlf4%2FEeeUF7b2OZQzE2ePd1yWDtYqupA3sDEZxeItz6NZ%2FWA%2Bgc71e%2BKFZ%2Bilis4IlZmk8StTn5unbIEBqeSjKt3m0xkVQAztxztLaKA%2F1QItBDIzMCVsYGIC1rWWG7354OPAFVuYMZ8KAPGDi2pMUyMpVhDo9DsovaT1dFf01Tjhf1kpLzQHEIfpuprs5PEGQb0U1qTqxlm7%2BKYk7ww0jkdtKhjEaAdrSvzjzlZe0kbd77sGsf%2BuJEN9fLcM%2FbQaVybPKHmNqjxrqz99uQYPNhBZrlhAKDMmP%2FBVizwpyVlZyM1jkGw7onJQ%2FnYa9kFFTM8K0DDQpevNBjqkAQufyZUvBXIjFhRRNgl4HkcmSCTskJ1B4Fag4einrEcd7wzrTm0oIqRfSM95qF9sKXm0wXxdTPTW6NZu4nTYnPN4WBBrULYnixlirKjmgGfrHPJCix4%2BQTgr6taUfGsgDYOa8NOI4ShGGXmcsotqgMwJsz9zF6YDaZ913F%2BphdwJC47D9nwsUUEnJH1RJzl3WU00WxpOywoSLzXmAf4vUfzpW6aR&X-Amz-Signature=ff076a07fa5736fd487ee66c8e6508c9b36ec4818a14817b1ee2055349a0dc69&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VM54N3TF%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCPFlnsElXpxFG1iPxWSuooKfqacbxT9UztkapL2t%2FOfAIhAJ2Nq1tkFMl%2BPW3jVDeN%2FCUt%2FVuWDoi%2Fy%2BCXYEj%2BmcRUKv8DCAoQABoMNjM3NDIzMTgzODA1IgwB50M66fJGgkRvwqkq3AOqTM8EjLUrPE594tqkGk8zTG%2FSE3mBcD6XUZCdBqNPE6L6HUK5TEmUjEYW%2BeoUKqVNvkOhXJSVuyez7R3fwom%2BCifbEgWbkNO%2BKIyu5ptJWuM4Y4uDetEcLAsVhwv8GbNZv%2Fm5LLnnAfelF9GLFizNEFVxhRtNY53xkeJeNYhSYg9J9G4HoVPdcU%2BkHVLdFQRQnK3xUxUK2o5O58S4eqX288znCY%2Ftweh%2BBJCKMsaRsRThS4CRyuO9fxtw4i7%2BXDx2sVx9mXHqTcGMROzwUqCIL53dRfM9o4Wb8iWH2jPN%2BUALeSNdlgNIlf4%2FEeeUF7b2OZQzE2ePd1yWDtYqupA3sDEZxeItz6NZ%2FWA%2Bgc71e%2BKFZ%2Bilis4IlZmk8StTn5unbIEBqeSjKt3m0xkVQAztxztLaKA%2F1QItBDIzMCVsYGIC1rWWG7354OPAFVuYMZ8KAPGDi2pMUyMpVhDo9DsovaT1dFf01Tjhf1kpLzQHEIfpuprs5PEGQb0U1qTqxlm7%2BKYk7ww0jkdtKhjEaAdrSvzjzlZe0kbd77sGsf%2BuJEN9fLcM%2FbQaVybPKHmNqjxrqz99uQYPNhBZrlhAKDMmP%2FBVizwpyVlZyM1jkGw7onJQ%2FnYa9kFFTM8K0DDQpevNBjqkAQufyZUvBXIjFhRRNgl4HkcmSCTskJ1B4Fag4einrEcd7wzrTm0oIqRfSM95qF9sKXm0wXxdTPTW6NZu4nTYnPN4WBBrULYnixlirKjmgGfrHPJCix4%2BQTgr6taUfGsgDYOa8NOI4ShGGXmcsotqgMwJsz9zF6YDaZ913F%2BphdwJC47D9nwsUUEnJH1RJzl3WU00WxpOywoSLzXmAf4vUfzpW6aR&X-Amz-Signature=ef44afc01bb7055d5af0861cf8342c09d30ab33d1b27c6f262cb540f2cd8c773&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLBJ6VI5%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIHgFODp%2BHmz9WlxRCIcy30%2BIID8aLcJtliNo0ZY9vTZIAiB5AF61JuhS9bMkJu7%2FRms0QZ2V7KwNs4VQJ1vBx1Deqyr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMEzfMFYJGEDaAbeF0KtwDixw4VB8EUncHcFeJMYzHWu8XGjlcxEdpXfqmkNAzCQMrt0osAntPff9xsK6Kt9ac3Kqqg5IYBpVN2TvNN%2Bl3v0HoQGCAnGTPnS7IrF4K62seKZTDhcKL%2FMJyFiJJADM64ierfK3L8BZRqOuuVB5ZHaSI9bzi7bUJPTrv9OtKJ8vVN5US%2FYoZn3xbV7eJgH26%2F%2FAZaAQR1xGXvSrjFr7weJNfhvSrp%2FN2H4t2Sf9ksQb6QPPnO5J1SL%2F7pCl8y2eSSiXdSNwMatHDzy3pO71yaGBT9vmyJuKdkTYTKqZdkaNQXC%2FXnJABeXyJZmDYSQHtJoH6seRHMAge3pJSiAwPR7NfGyKQpPpQC7tpFRrGAVYUeNKV2s3Yq4b6rCrVAslUXziDKNpy83OTWc0DZEJ0cR5f%2BJ9fCy41%2BHMGHHQYj02ucvCAtZC0m8Wt4nMYxQ6dadQB7FyS7OvP3XGTc47ZOPyWF5PeGXa4L%2BsQ4xQSeqHlgyXs%2F4aiAFvbqyuMDVFCLDUVToYbDc4o35yer%2BRYNGGDlXVqj%2Fk5n%2F%2FUAqyjNBXLbAvjqEStkacBW0LHepP2PgCKjJ7L4V36DH%2F8ZwNj7EpRYyZyhVyFocGlhzXWuQ7DnJlkUSicjTpuEikw6KXrzQY6pgHpWP7tXCl1Carh3jJMsPZVe4dZlX%2Be24%2F%2FYI8rnZZ6oKicc%2Fdm%2BYmVGW6a3ncKQb9%2FEEXBlJzCZ3OzOkmbdyrDyvFwV4AN80MHxY%2FbbBg8D7KvvXQBQICpRm%2Bw4TCvp9%2BLzQmvN3f1ztlMCN5i8t3lgtng07eAr9oH9Lm6TP7jrgkCoaP1Pc46GlasWOgY9v0bcVKxyrAZfl1njuonJ3mDlgvHduqD&X-Amz-Signature=6e24ebc82b8faf0ecc1924d43339f60bda7e9aca346ab47afcb15a98914deaa7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U25RVXLL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174955Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIEJznvgd9cA2SWqHyYZKuJSXcpPRk8avqg8cbSCkl8dTAiAGG7OCk1mr5caDL2JCHZL9nVjg7w%2FLfwhdy1YQ7kn9iir%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMdT7iHQaw43%2FxyZB8KtwDRZJAK5hKjTtK5aDSHP4QiK9DRXFeSYAA8wGve2NqzQGRz1k5P4EaJl4JDHOkqBPHCm0BidiEQJt53CsAb9bKOP%2FUin2YP1vxiPWenHKmf82HI9r%2F7p1Y4skm5M3PywycPaeQ4EH0f5k%2BiVGajMIu9RkGOlM6AQZd7vHs812QvJfJergyP5xcnwu%2BD54%2FRvkPF29JHGPuI4M0l7Y4KKMBEPDbje2P2nf2kZSli%2F74QBKr629WetDBRRQWqtA9K5RuGfblQW95%2BdKZtduh6AeohGE8MiyZnPlmSBuUnr%2F3QHA8ekptGge%2FEretRWur5FZ%2FwzpaUqczOaSDUGvP9vfcZlexsMMfh9NuhW2BvrcAGiRiB3xoIZaTMnOoy92RcBytpfPfyFGsKGhHlVkTNkozLXv%2BlG1FkxWwHjaxQ7W688iGQZLqt8iPzbwsvJes8rlq5iPmgI6iO6Mz1x1g7IwaY001x%2BpHbrw3NKSZmZB3Qcz4Or5Ao5pL6CltDJ9PtjlBin9xKCYQapueavMYoYzaMCebHpNi7ZmXwW%2FGqSshTBEzdsxuQfXOfYaXEjqMaw47nLea4AVTdmbMqeiSYB6VBjNQol62fBMl1oolo4VJSMbjVRsYC57Oe8nRxUEwpaXrzQY6pgESrjUVq%2B07EnbLxwJQhYej%2F1LU3Xmzkdk138S%2F5UKTZ3yjy19NkPrw2CqkYTWR5G0271zTIOilq%2F8AGnyc5ph5qNSj6Iq%2F8fULCHSTh7LxVyf6Stkz6v%2B57ZDWKftqhv1Svl0777R1CBcheHgF3kM%2FknGhPmrA2CJsNHBVO%2BapDd7iEq1niIAZhJdTwS1eKW8Tg07rKi6NqhUn3KYMoMziTFYlChLX&X-Amz-Signature=d5e575076769eb467944a7b450b1793ab94c72208503b6696dea482e9abbd87b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CDPMBWO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174958Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIF1WK41Z3Cxw7Z9EM7elQGPHCTGUrg5wax5PNL54sooYAiEAlFXvmEZ3Yv45ErIqU61AAAc04b9Q%2Bvnv7xVD9iZZVNkq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDPiC1JC3UQgPA%2BVfQircA1JtUpvajSCsziglva%2Fi6VDhPTCNVASeQ2dNnAR6a6S9Z0Y0k58RVa6r9hnujKe44ROW403Gadygkpdx5JYJmUYa7XOjfPF2HY6SYtHkJuOo3SAKZvw0EugJL06C3L1JUHR5fA7Z9VcrVoDXQaH6W5QGuhQEbwfNHQj34F%2FeNleUqJn2LRLWcpm8Sj1HoDlGGL9n1CAT8U292NsmlHiPRIP5iEK3MjNLqQzb9i4xUonWSQJCQpcOEYvzu4PV%2B%2BtzszqwkU2Xbe7JQPd7ntVSwj3a7I%2FHhCoyMBt02xJPXzoSeUD1HrP3nFWQuX2i9A86rXLFOhQs%2Fe9eONX8scj2mvqkwETDuRRDwFQhJkzUqjO%2B8pOrOv2TDyrAV0KP8uw3xETqYRqTRMjB4LWxJL1C9Da%2FTsDUnHeCZl0wf9Ml%2F7UcQj2pjW4374uHtGi9c%2FO5dWALu1jrPtargMomCnI0ZfZRDBU%2FyuH6VeuypBJgPeYy8hOnNs%2BJ17mtpCpwfWj3BUuiIPMkNoZ2PD0oEfAblvcvDcUnwgWVVMT%2FBYr%2FdlW9BWqAIqA1OIkKdnaYQnQ%2BFJD5Ldia20KA5am487sw07BIvUtS31sJ2N5G9aqrs%2BhR9pQ6GVNVttlQmoyGMPqk680GOqUBkcweOLWF3abXijpoJI3yJXpVIiv2aQlIMsIygkVj69yS9YK%2FAsasxU8T06LTxd1s5iRgWLRcfavNDmTUlCMQaxyvBpSKT%2FOHQUrgnrJ%2BV9IDjCCUtoDrb5z%2BuQywKETjJuzZauyHU%2FM5beu1fhnutEmxVHVnZMLVdU3draqCCgJSD9x%2BVtTfwaApXAYkf2otGJswyVWUFZdfYKNgWXPCix0erOZ1&X-Amz-Signature=a654335a83c25c3c734f9f78dc1c48f23fcca08f28630bf86f7e4a725646d64e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JEQEMPN%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T175001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFVW6AGF4NdsFljcu%2B2owWgmm8HwJOB0VX9hVfKAv0L6AiBwyinnLVrm8cLw64WrwnFwLoaucCgwsFSXDaRMV2OX1Sr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMPnUDnibDVGedy3rWKtwDeTG0jr8uObeFKvAcdbQ%2BC7t48EwgwT0VWUlHBe6AlT4plHc2rW8TePIo1x%2BILXsIL2QndLwPsWPIi5vpBFxWfLJslA2%2BjWpHNPFlIrNX%2Bz63OjsZtpNC46PcHAj0vXrkHRTanPBD2qJ%2Ff2Sro48z0DMitgw9v9THu5dsmCw%2FZrp3j65A0za6XUUo32Ojrb3vboUcNIFzoh%2FCbRTYf6NZE7kv7QwlirvFCsZkpqVxxoK6dqzA2YKvmaXUJ33xq28l1G2HPkBoKCNusf4p5HH0f7RlkBE2VY9TuE8EfHgMt9mEflnKYL4i%2BWtQPE47rngwatdVHAE5Yfyi7ONBj8iQAum3SsDLKSVKvGNEZmXoUPR%2F1O%2FQVGSMrooiFqqZljfUg%2BCcd3B2aLWqZhMJ0KU5lEFoe%2FSw31i29nHZIzvkB%2BgPgBAKAfs7nQ%2FV0b6nwByl%2FsJEa2BWzQfoRVng80gdfGOm1OmNJla9dmJsmTdqj2JKGVUW6iZQYElgyU5qEuWY%2FPgm5%2FX1W7w6452RHkGzZ2VsibdOL0AEnbfLVEnBmT85Hv0LT90x1ON0gBPQ0M3L9KBc8EI%2FlIITCqv%2F0IrHMRPXy7eKfHl6JwrgLvLIZXLLwmx%2B6yblc729vm0w5KbrzQY6pgFci3e2RE6HiDVbmuLWXcbSQX3TRwsqrpzS%2BhyAnoeRfCWm%2BnBO8zSCf2XcKZoM%2FX9LQQXmtHONaB76G%2F8s2Nkj5eyB9yFKOKR0FMREqlF1JHmMLrGvbsB1hZdUIpjbyyZ27a0fP%2BklNn4L4VEtfZkupRSM1MuYZz%2FAL0SjWqQV7u7zVnusG%2F%2BzR2PK1snBZMY%2BZQGr2I%2FjTK5HV1Z5DOz32gAJVVNZ&X-Amz-Signature=26f310314a82234c6286fcbb482b45c5a936d53a0a75ce77b83ce4604e115d6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JEQEMPN%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T175001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFVW6AGF4NdsFljcu%2B2owWgmm8HwJOB0VX9hVfKAv0L6AiBwyinnLVrm8cLw64WrwnFwLoaucCgwsFSXDaRMV2OX1Sr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMPnUDnibDVGedy3rWKtwDeTG0jr8uObeFKvAcdbQ%2BC7t48EwgwT0VWUlHBe6AlT4plHc2rW8TePIo1x%2BILXsIL2QndLwPsWPIi5vpBFxWfLJslA2%2BjWpHNPFlIrNX%2Bz63OjsZtpNC46PcHAj0vXrkHRTanPBD2qJ%2Ff2Sro48z0DMitgw9v9THu5dsmCw%2FZrp3j65A0za6XUUo32Ojrb3vboUcNIFzoh%2FCbRTYf6NZE7kv7QwlirvFCsZkpqVxxoK6dqzA2YKvmaXUJ33xq28l1G2HPkBoKCNusf4p5HH0f7RlkBE2VY9TuE8EfHgMt9mEflnKYL4i%2BWtQPE47rngwatdVHAE5Yfyi7ONBj8iQAum3SsDLKSVKvGNEZmXoUPR%2F1O%2FQVGSMrooiFqqZljfUg%2BCcd3B2aLWqZhMJ0KU5lEFoe%2FSw31i29nHZIzvkB%2BgPgBAKAfs7nQ%2FV0b6nwByl%2FsJEa2BWzQfoRVng80gdfGOm1OmNJla9dmJsmTdqj2JKGVUW6iZQYElgyU5qEuWY%2FPgm5%2FX1W7w6452RHkGzZ2VsibdOL0AEnbfLVEnBmT85Hv0LT90x1ON0gBPQ0M3L9KBc8EI%2FlIITCqv%2F0IrHMRPXy7eKfHl6JwrgLvLIZXLLwmx%2B6yblc729vm0w5KbrzQY6pgFci3e2RE6HiDVbmuLWXcbSQX3TRwsqrpzS%2BhyAnoeRfCWm%2BnBO8zSCf2XcKZoM%2FX9LQQXmtHONaB76G%2F8s2Nkj5eyB9yFKOKR0FMREqlF1JHmMLrGvbsB1hZdUIpjbyyZ27a0fP%2BklNn4L4VEtfZkupRSM1MuYZz%2FAL0SjWqQV7u7zVnusG%2F%2BzR2PK1snBZMY%2BZQGr2I%2FjTK5HV1Z5DOz32gAJVVNZ&X-Amz-Signature=77c6330fd8cabd9cbd838930f468206a306374033bc3f269635fcc420e87feb7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSYRZCN2%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T174951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIA2at39xGcM1vVOb4WTQZgh49D%2FlSMzHeuxgrk00y1bkAiBFlT9B%2BStd%2BdDlXEvU8N8FTrORcIlP4hQ4EuWg%2BQtwRSr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMYa2QMyap5TM4GcfmKtwDKaxKz5MW7mrm5eb3TDze%2B5rhciFX%2BCjb3C6XvKFQKSESuI1YoXWSq%2FXr8rxjB1yPMB67qLymZYR7MFLQUmb0GpakyByKM3JRcu4LsR%2FBWtYHbFP6gvXGVZ%2Bx%2FNlCvNLhyqP7qA0hSxI%2FhD2EzJ8h9ynx8T4pQT%2FiWiltSWyqTjryDEARuFXPCHz%2BMRNaYhgrg9trQt3g1FxS8mlvIlFRRVQfo%2BdtZWd81v2tnfW0eyfSp1FxSxB0YacQ75ZaxUksRF19nOabMNHPTm78XuWXZclhKCjXhu12zm90YVC2MR607D3JMVJAAmLkEk6MFayXV1jooEznNzxIrgYg7wT7PVxOjDeCsIJTgpGWKrYWbILHcyDDZryYkzRTCxje6jseHPlejj1jsm5oP3WCRMSMqrZHr1yGiGFfGgKwGjVrNuXHjH6zKhAvGRioqcS141wPajMfEIWdqrf%2FLzpUNdsL63mLDDKV%2FKU0ZClSmGBZvEfdRDnoad89FKtfQZvAo7UvbpppiTa5XJQVqGpQi0I1f0HsGyPnzQBqPCf5LWMhjsLSGeWL6datQU5ntBLuswKHF8ywLeEQsrZjYxuyDPm%2B%2FILcdvmW4pndwAQ3WHQ8oocyYIlLNVe2vbMct0gwr6XrzQY6pgFSe8uF6M6fh2AHr1L%2Bir84cMHfDgBPKpLgXg%2FAdib2hx8537rYe9HOQhmP8S%2BQdkT5dKR%2BLQPG3jk2JQxcU92lQWJFXK7npZl5J1Ae1cBAO4l0yDDFQ3EUTx9QQF6lqaUIw5bbhcZoT74xEr2sQ%2FqkjwQaMFVp1y459yEIZKCQnG0YW7DemknFl8Hy17lmxL69%2B7Naagty%2BKM732t0dHz1ik%2FK0BAJ&X-Amz-Signature=a227babf852230f660fe4256907b3421e02f00e9f11041b1f9cff92eae7d3bd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M2PVKZU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T175003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCZURwQXWTxkFr6Zksr0%2BwNvMdpc3TQes6Z%2B38rgKoVmgIhAMuVbMQTnOik%2BXnv9YTKMfvBcJuVTjfT4ftlhE4SNgSrKv8DCAoQABoMNjM3NDIzMTgzODA1IgwiAoFNiNYoTxeTvboq3AOMpmjwShtTnHCzbiaSlKKvZIEBBe%2FxcemjwPNr1X32OkbgV%2Bee7ixeWcDV3RixPJw4igjexjVescJJzdSWL5f0J%2FSlZkRFnr2YQZVg2cuqFzmZzZlSW0ByHqd7NmDzl%2BVpyvNAGBrw%2BCrvsl%2FI1pnO%2FFPhNHLZYN9f2ghCF66tprw2eB%2B0LzxXViGrUCsP%2BChwWW7hAYt8%2BHvDgcNuI19MMabGTVmVUVWm307XkEDNw3HrWpOzRXNaL3liI2L1XKtjwZh13tJvydxbYNrr1TKBxY%2Bg6eQd92Iw5%2Fcjgt5Yxyz4j7SFXX%2BPsv6qAQc1hbax2VJwJHeTw4hk3I1Xcz%2BkA9dQFfCOYV4Bn4edo0tL2PmGPE3goWqM9HXCsxEk3FsxcsFw%2B1wPWzvde99sf5pmH3yN%2FVio1ym5gMt40Bkj0qI3FiVroOYIvr8PbXGmDELmMZCLw%2F2DS2EHyz1%2FngoF%2BCEAhJpc5%2FtvYk9163wWxphonPdp8moggYkoSCiw6vgnaoNwL%2Fkr1TjwiFKGAFweNxSmnttc8J6YTBT8jhCYABrye79j1BXPn%2FBilftJ9lnzHK4op6Ii9PZGIWWduBe7v9kF3yDCndCeqMpVU7M7Yxn0jZsQolRc%2FNeDuDDBpevNBjqkASy6aJx3sz9BUIfzQz%2B%2FOCE13ux5%2BqhkMnmKEa8kEZjFikSUCzOJ3rKBWNb6LwQIybHRcBrO5GI0lzY3GPCZRqzPPexPwLUYspKoncWdaUacluBHxyTHRRPT2JN1yc5YzndtrJVPXbM%2FOoFyXsoNGZJMxLTXK0qtulwu5%2FCcyl0dFmdHnguycFYsK35tle23dYx9OxhIBWeHHOMTaHvhEGmra8uJ&X-Amz-Signature=1e25c5e095b7603492c637fc6f6ef3b75d68f7e70608ed59c92da610ff6a5def&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M2PVKZU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T175003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQCZURwQXWTxkFr6Zksr0%2BwNvMdpc3TQes6Z%2B38rgKoVmgIhAMuVbMQTnOik%2BXnv9YTKMfvBcJuVTjfT4ftlhE4SNgSrKv8DCAoQABoMNjM3NDIzMTgzODA1IgwiAoFNiNYoTxeTvboq3AOMpmjwShtTnHCzbiaSlKKvZIEBBe%2FxcemjwPNr1X32OkbgV%2Bee7ixeWcDV3RixPJw4igjexjVescJJzdSWL5f0J%2FSlZkRFnr2YQZVg2cuqFzmZzZlSW0ByHqd7NmDzl%2BVpyvNAGBrw%2BCrvsl%2FI1pnO%2FFPhNHLZYN9f2ghCF66tprw2eB%2B0LzxXViGrUCsP%2BChwWW7hAYt8%2BHvDgcNuI19MMabGTVmVUVWm307XkEDNw3HrWpOzRXNaL3liI2L1XKtjwZh13tJvydxbYNrr1TKBxY%2Bg6eQd92Iw5%2Fcjgt5Yxyz4j7SFXX%2BPsv6qAQc1hbax2VJwJHeTw4hk3I1Xcz%2BkA9dQFfCOYV4Bn4edo0tL2PmGPE3goWqM9HXCsxEk3FsxcsFw%2B1wPWzvde99sf5pmH3yN%2FVio1ym5gMt40Bkj0qI3FiVroOYIvr8PbXGmDELmMZCLw%2F2DS2EHyz1%2FngoF%2BCEAhJpc5%2FtvYk9163wWxphonPdp8moggYkoSCiw6vgnaoNwL%2Fkr1TjwiFKGAFweNxSmnttc8J6YTBT8jhCYABrye79j1BXPn%2FBilftJ9lnzHK4op6Ii9PZGIWWduBe7v9kF3yDCndCeqMpVU7M7Yxn0jZsQolRc%2FNeDuDDBpevNBjqkASy6aJx3sz9BUIfzQz%2B%2FOCE13ux5%2BqhkMnmKEa8kEZjFikSUCzOJ3rKBWNb6LwQIybHRcBrO5GI0lzY3GPCZRqzPPexPwLUYspKoncWdaUacluBHxyTHRRPT2JN1yc5YzndtrJVPXbM%2FOoFyXsoNGZJMxLTXK0qtulwu5%2FCcyl0dFmdHnguycFYsK35tle23dYx9OxhIBWeHHOMTaHvhEGmra8uJ&X-Amz-Signature=1e25c5e095b7603492c637fc6f6ef3b75d68f7e70608ed59c92da610ff6a5def&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T74ME3S5%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T175006Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDst52pSnLm4k2paSi3ews%2FQE91j%2FCQitFHeWytWl0KcAIhALvxfKCWJyu6kv5NtdMj6K7AyyigeUrQP5jqPN7BR65bKv8DCAoQABoMNjM3NDIzMTgzODA1IgyBSOpQkvL%2FFX2YmMcq3AMg2Tc3AIQBAaKEHb4GoQHn0C2xpAJetBGxzOFxvqyAsnxpc%2FVrjAd0SOFBU2PnNFXBedPvQhpEHq11N7qelWR82dq2kBNizcvcwBk1EUMreX5zDJvO8urLQUslU0K2fViuxi%2Fr%2BRYYIj2If1hoBqHdn%2B0dVhmH%2BrLzVakqfEp%2BW19%2BVdDtkftFKioMbv9iUk60j6%2B3EbrRGuQ36lr%2FQI7xq2SN9V8A62artYuyAKsYBcN7JslBgRwVcmGI4ABa0V1kVNzuIJ6iycfykEKAymYrN8Fgq90iXyJMX6FpumJC3AFS5yaawJXBWl7vKCo7btDs%2B06vbGrE3%2BrRWoDQIThFaKLJ1qYxb4TtOcxtMy4Z%2FY86f7%2B7JlJhP7qTZOAVHWXRYjy2tqvZPaptsJEeIk5l7rrR8qQmfztv7zlC%2BWLPL%2FME6Ie51mFAj%2B0pdCiNMYLj7ZS2ia587WsqQw1ZV3FfSeFKo%2Fcma9TMP1dziuIh%2FgGx91MTxbCSDGYNEE4ha7d9HuM%2BrpHtfmkRMeIaTwnIgYoZpiF4%2BYvmHbUjhpFhCKgvJCFfHsVh6hOREJzfPmSHkmUHnCBu4XxgMJXJQ%2BtXBRFwVc8F25R7kv%2Bzlge1gFdfw%2B2zVwD2ZuPivTCwpevNBjqkAfLlzGycLyRlC7z0kPHq10zmpMWFE%2B1pdRyxZTONQmYVGFo59l5pavyPtARTC5ubrnx%2F9JMLA0BxcMuq3eGQLJTi1UedFu7ZbUaZOAyM1qAGy0zSFP%2FzcgqSLUpFQfCaI5pIi9SwcDcprbwAARqeX%2FITE7%2B466dbWY8q7quXsv5q8th4xHH0XOmu%2FwBJjQbD%2BFzGJptuhYTA6E3X8hjYUWit2jBp&X-Amz-Signature=ea8fca1fd3914b14902d279ca58f9b8338ba525d97843950a48682d12d166e19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

