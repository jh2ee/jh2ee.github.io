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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672KA6VMA%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCoztRAtDdnLiLJhgLxbYcaENO3f8JQuzHpUw0QHuI2PwIgYUivzbeX%2BbfjENI12v0Y6M4brNaOptScmJpXhx03h%2FsqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLk7bAyRH2xsV3QgSCrcA1g9buzRv%2BxOPk98G63ngU3%2BrPJpJ7sDS3YwfgF8Mu9b9aHhR259ULHegDJdN3DPnvodA36OJ%2FCRJglRrmU%2FGrK7COUSez5mpTWYg%2BWqJqooAH29bWD%2B8Q%2B4H5q54%2FeENdbxg4EP1RzXo%2FSjB%2F4QG5xat2R8d2hriqhrhJgAPAF38rQuqXmH4BC9NC%2Fqt0xydyceS8%2FSXps%2FNn5dmksutaWRMNnS7vbgBd%2F%2F4MwZD2psgSM0QwgeZCJhuuM2m7zwwgtHBZEJO0rzTlFYTb7uoZeNcMMpPUz0SyKPyfN%2FBmNL6jP5zUspVB96ScWVAmR2IDij3ZT2Y4vO1nLIurDTqCGKnCXCCpFm%2FI%2FPksFATdreoyFL%2F8%2FlqaSMnz%2BZ0VR61Umc%2FoxhOKYQ4Prkl72%2FkXIfUMsZS07fi4HR2Ha9dHhbzrHK27IBfhlVxBSIXwM%2FzIB6lejk%2BP0WkbwRMLmHi%2BgEAeSH0ll13BdMGIjfnusoUS7LsCLKMU44dzT13IXKXwQ1jn%2BeoQ01U49q5K38JefgGFEKkSqEDdkrdgSaUNe3nMuY0ij%2BOvRwI8BAo%2BoSe4NfiLgBlUdBhDjnBGEWeE1xtwEwtnZ0gazJnC34ji0DgTK1y8rY1cIk7LLjMOC9r80GOqUBV7im1NI8DKPgYEowJPfWMbfDka0U4MET3me4mNMjlKIJvcYyQfytpIcxlZqyL84JtTlMSVbYQnVAMZ63mc22rXLZxUiRQTMuGLoBIy0JWq2cM8mM5nYKSAo45R9qLAUeISeTQKO3tIqx2VLMP7tH3cUlDtGjz7OWFfGM5tcrHCyHi0gnU8Gscg7cHSTIb6IyaLOpR8Fp2xYFhL%2BWLiYL9nipcjtJ&X-Amz-Signature=a06827a00dbf0c78b7625af2f318a08046b2b7855710f6919dbdc342b4ba4784&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46672KA6VMA%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQCoztRAtDdnLiLJhgLxbYcaENO3f8JQuzHpUw0QHuI2PwIgYUivzbeX%2BbfjENI12v0Y6M4brNaOptScmJpXhx03h%2FsqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLk7bAyRH2xsV3QgSCrcA1g9buzRv%2BxOPk98G63ngU3%2BrPJpJ7sDS3YwfgF8Mu9b9aHhR259ULHegDJdN3DPnvodA36OJ%2FCRJglRrmU%2FGrK7COUSez5mpTWYg%2BWqJqooAH29bWD%2B8Q%2B4H5q54%2FeENdbxg4EP1RzXo%2FSjB%2F4QG5xat2R8d2hriqhrhJgAPAF38rQuqXmH4BC9NC%2Fqt0xydyceS8%2FSXps%2FNn5dmksutaWRMNnS7vbgBd%2F%2F4MwZD2psgSM0QwgeZCJhuuM2m7zwwgtHBZEJO0rzTlFYTb7uoZeNcMMpPUz0SyKPyfN%2FBmNL6jP5zUspVB96ScWVAmR2IDij3ZT2Y4vO1nLIurDTqCGKnCXCCpFm%2FI%2FPksFATdreoyFL%2F8%2FlqaSMnz%2BZ0VR61Umc%2FoxhOKYQ4Prkl72%2FkXIfUMsZS07fi4HR2Ha9dHhbzrHK27IBfhlVxBSIXwM%2FzIB6lejk%2BP0WkbwRMLmHi%2BgEAeSH0ll13BdMGIjfnusoUS7LsCLKMU44dzT13IXKXwQ1jn%2BeoQ01U49q5K38JefgGFEKkSqEDdkrdgSaUNe3nMuY0ij%2BOvRwI8BAo%2BoSe4NfiLgBlUdBhDjnBGEWeE1xtwEwtnZ0gazJnC34ji0DgTK1y8rY1cIk7LLjMOC9r80GOqUBV7im1NI8DKPgYEowJPfWMbfDka0U4MET3me4mNMjlKIJvcYyQfytpIcxlZqyL84JtTlMSVbYQnVAMZ63mc22rXLZxUiRQTMuGLoBIy0JWq2cM8mM5nYKSAo45R9qLAUeISeTQKO3tIqx2VLMP7tH3cUlDtGjz7OWFfGM5tcrHCyHi0gnU8Gscg7cHSTIb6IyaLOpR8Fp2xYFhL%2BWLiYL9nipcjtJ&X-Amz-Signature=a06827a00dbf0c78b7625af2f318a08046b2b7855710f6919dbdc342b4ba4784&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V54LO3MX%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101044Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCg0DOQ5LQC%2FMVOqFi1nEPAby5Mdd2S47p5hhX0tS19qwIhAIWdZSMs%2FqgNYI2B3vxg3qnZ8lka7h1fhQZX1yD6IS%2FCKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzX64uKpFNiC0NfFMMq3APH7yWRrGpbv75JimufWxXtTX5Fvrrd7ppDtH7XMYkPkEi31TuOPYGjatZESH1orMKdDwR7shgqSHjyH0tEZtW719YKtsz7ccPtAMXNf03AjUbmbwka2a8f7wErvsT9WGt8AcfoDLHI4uwe%2BXnpd9JLRjiIuJwKOyZZjDGf81Uf3a29BO4wX9Z6yGT2m%2FwcY2DOM86MQjR6iQz1cDwy63SEWO60c28%2FAXgdLNxQ4N%2FrF35a8b9nMxHZt2bU9a28n42CLGr7mOz1k6nBGnZ16Tj%2FuF18%2FicM37SQfsqzR9UoeONdQqmcHkQGJtwNX29dt%2Bpjf4Il0RcBjVjgjRUVhij4FF9%2BHFUaH7SPRRVi0NkZu2V1X0QMepa48C4vbHWA878OfatmcvBh8hnUbEL9Y%2F4Yz91hJsGFWZ0sxNQUeX9MblPIwqZQ44QUexLlZpEHxIP0se32QDXQU6zTywsNAfQ1WDNTZmfbuUIqwrpffUV5SkNmbr64GILnwhWGb6bqvDz%2FJTtXOHOVi8ZqzTMiApzT3eJxamDP9ARl2E5k9khKFbqxvzAwu%2FCjWAO7DY%2BHqRB4OgUszEy99tKpNUIqWmo2CD2xG9tOjhed%2FNqFObYvJZtK362MMmTWmDJrxTCMvq%2FNBjqkAW9RXL4kA2GJY6cP0mt2o5m%2BtyPDrnQK9uKrHSo65YqV%2BQpeOmpQbpFwJ02C5r%2F4J%2BDS3iXpminFCicznTpVXESHRQTSS7%2B8PT5w8qTjdny52nzimAifbKJCDh1NWEUa8xCHKxxv%2Bkv0fMhiSmZAcbkGX5Ya56s1CTFx2RzdYtbugaXVaWHdqn2eAL1hwxxPC98VrtI%2B%2FDYSISP1ojUXw52v5zOE&X-Amz-Signature=ddfd130976ca05ab3cfb78acb3abb593f5ac771c50a7497f2c00127c48639759&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XWDCHJP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDfLmXFj9HyIPv3yijwuaeMf5M3Vqi%2BHUxBKSO3J7yHswIhALUweeX12DJm5iA2P5F9g9P9Zp3T%2BFzBYeQAEC6wQ0VKKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwxBK000FN%2BDznVkyQq3AMQbdYYXOajLlhwZGCAPms4H%2FU5swrkI77biZ9mHOqsIKPlSro%2FipPZ4L8fWF2yCLGjZsIWD6RaQpbXnQ3Qn539jqRdhRsrOQf%2Bv5kjVaEcRr5U4BeVIdxWvWXCaJuxzek3io6ecyWNd08UmT0zXSsF5Zuj05dT4EtSEihLDMcYWorcD0YB0w3DsHFI54KrXSKiOeG9pOXHEVm9E5tqaZB5jm9PuHbjMUHro6nI3YL3ZIIyGwtn5GT%2Bh5bEHHECW22VjU%2BE91AXEOSzSq61TnWQTSWhM5w6%2FwKNhmSlsw7Awd4bRD6Wpg2FM9zpaz1DaGJb26JafxoklPepe8GEjG57LA4PcfweEGH5dQQgXAPUF6i0lKGfiiN%2BlANuZ0jgp3qzTuO9AssR5CiCZWEvH2KP92BPEhRK8CO2Xdfy8V31UZftRAT49ycdld7KUigei0LZCSHmO0WQIwOVfoXWvRtX%2BbgMbqaO854qc4e%2FCr5UmrwWcnz5sPLIA7NNoAof3bhyfS%2F1pUqI2Lctt%2FJFGAkCKi50sZ6DtJIyZ62z2NWFrRtoJL2tn8AT%2BTbu3f%2BvO3c3vFDBY5C1uuNBw%2Bge2GtgPDOyhKIXKoNmdJKdqwUlYgjB5sK00md1CB1nVDCMvq%2FNBjqkAY8F%2FDs5d6iBT4OdgIcLQxHwX0F70kipX7PuYCkjZL%2FynYIzV%2FXii7HGx1HXdv8NeMWKOLOb6n9JC34sKRjJix1kTtNRNDa0XvxGwHX%2FJHe%2Ff%2Bwgzrn1tVkSPj%2FHMoLAdYEqvueyS7qfifS3Xjsdb6UYpi2g%2BtLXojQ5EAAoJOtn%2BQG4ab%2BG4qM7ozaTFF9lInuoyDgOGccFf6v6rWTGT5liJg7A&X-Amz-Signature=27b4599d96c92531658a20337162a15a3d2ad31e7c4a409149d355ca9ecf6008&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666XWDCHJP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101045Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQDfLmXFj9HyIPv3yijwuaeMf5M3Vqi%2BHUxBKSO3J7yHswIhALUweeX12DJm5iA2P5F9g9P9Zp3T%2BFzBYeQAEC6wQ0VKKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwxBK000FN%2BDznVkyQq3AMQbdYYXOajLlhwZGCAPms4H%2FU5swrkI77biZ9mHOqsIKPlSro%2FipPZ4L8fWF2yCLGjZsIWD6RaQpbXnQ3Qn539jqRdhRsrOQf%2Bv5kjVaEcRr5U4BeVIdxWvWXCaJuxzek3io6ecyWNd08UmT0zXSsF5Zuj05dT4EtSEihLDMcYWorcD0YB0w3DsHFI54KrXSKiOeG9pOXHEVm9E5tqaZB5jm9PuHbjMUHro6nI3YL3ZIIyGwtn5GT%2Bh5bEHHECW22VjU%2BE91AXEOSzSq61TnWQTSWhM5w6%2FwKNhmSlsw7Awd4bRD6Wpg2FM9zpaz1DaGJb26JafxoklPepe8GEjG57LA4PcfweEGH5dQQgXAPUF6i0lKGfiiN%2BlANuZ0jgp3qzTuO9AssR5CiCZWEvH2KP92BPEhRK8CO2Xdfy8V31UZftRAT49ycdld7KUigei0LZCSHmO0WQIwOVfoXWvRtX%2BbgMbqaO854qc4e%2FCr5UmrwWcnz5sPLIA7NNoAof3bhyfS%2F1pUqI2Lctt%2FJFGAkCKi50sZ6DtJIyZ62z2NWFrRtoJL2tn8AT%2BTbu3f%2BvO3c3vFDBY5C1uuNBw%2Bge2GtgPDOyhKIXKoNmdJKdqwUlYgjB5sK00md1CB1nVDCMvq%2FNBjqkAY8F%2FDs5d6iBT4OdgIcLQxHwX0F70kipX7PuYCkjZL%2FynYIzV%2FXii7HGx1HXdv8NeMWKOLOb6n9JC34sKRjJix1kTtNRNDa0XvxGwHX%2FJHe%2Ff%2Bwgzrn1tVkSPj%2FHMoLAdYEqvueyS7qfifS3Xjsdb6UYpi2g%2BtLXojQ5EAAoJOtn%2BQG4ab%2BG4qM7ozaTFF9lInuoyDgOGccFf6v6rWTGT5liJg7A&X-Amz-Signature=8b859a3eaebba7e1f8e3b140e3cbc14bf1372cea3c25ddc498521cc302149c34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UYIUTLLP%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIAqGmy7xkhQ0Ngnk%2BtkK4yE%2Ff1xcajnxak6meIAZFkicAiEAm9SndiODiU%2BvPlkEi6JjXLaS7rHPg4L6nOw06AsY10kqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPdV0wT2aOsxWOfS7ircA1ya4GnDwrH9PlPKk9qpVTMTt76w2Ob3wCwfVS7guFuksZ0EyUq1vTdGw0%2BOjdqkV%2FiTCzTptWDmzEQgsygAl9smwN2avglWgm%2BSsnlhdF6GKy%2Bu6TwPlu8g1hnvxJVgRJxcrqHAvqIB400SN71FFqbzeVlj8Nl7mO%2B%2FqwFGYjunWDKV6NigAy4U8Y69kOHAgCFtB7vlobbSJrLz5NdId7jS%2Fp3FUb8uvW7epjEPEOgcGsP%2FIpnzHKMXYJWtKJDWBREzO3bbhgWeZcICyOOi0daK%2FY57NCMpmg4Xjz33QoK5RZ4w8pIbOalFjCHiHcO1ixIk34M6fOrijAJlqqljGkmAaDQLtMWsG1HZAQkvGREl7qgnszc7DUmC8efPPEqbpjbpTkAPmH2nr5uBNTHXCtJLvcmz8Kxi1oxw5oHMKuNA%2BzcMeEvBbXezVHr5tykYi9Y6fGS5qnOlq5oxWaXAMYF3nztH8sZduOFjK%2Fpx1N4ycP5l64HBZC5xGLodI13BTXAqG4hinOcyGkKaMugTk1ztReRTc8iBDQPGfAzcEhqGv%2Bo7fwRVDdKs2DM1Jzf2JrKbzaN%2BqE57aycUnKDWxgAloGUVemblV9oHQAmaFU%2BLdkQC3sP0Zh6RuL7gMIC%2Br80GOqUB3V9RObSMYHeJCW%2FvapOr3URfsacf5rtrFtub2EOuNp4uyNTkH9NL2xcc8c1AyD54rRVXOAWKNQ%2F8%2B61tecjLLiKTInvl%2FWhlxgUXituOgYWxgvlMtWdDxiem%2FDR2Ge5iazPFTRQDyX%2BxYiReP4c7rUatYdYJAIvcV4nkT9GTWMJQtRKhzIJ%2Fhf6FkaVS0ek9ELPtD5vonWAStSmxV94XkDIsaKRV&X-Amz-Signature=8ab775252634d11605eecab90683d5e84b5c9d9561933a7e6592fd2734eed506&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QVKJJGHR%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101046Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIGmrk9MLtdcDbzsteGtftvvC2AquyNqUBCNms6lL7YiRAiEA3JGXpF7oVWdakIqWrueH1SnPW03dVN3TMfXbvdUm%2BzoqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOSB52PA2dVXVdhzvircA8nJ4xnIEX%2FWB%2BfqIMbvBHMxd%2BCj3GwcsLcdwoEWc3LhFlixbzvxxQvsniUu2%2BCO8iVm6cq9lfFex%2F8B4UNPaUc9bBYStvk%2FsZHb173wdGJ%2BN5zPIoAaZaQoGa4ExTJ5BE2Tj9%2B%2FaLvsyXOKXMgBswLUgXPaMYGDI89XGGV04hEEY0nMR920a%2FCr%2FSi0X4VIasr0hV8wFowuFWoH7RO2Bc99qV57JY8FVWfMuLbFDahpXgxYpXNA%2F3cNbYd5Wgqq4%2Bqw%2FaMNcyPTPvXi8O33OQGGil05M2A4%2BJ%2Fxi4Go50zpFMa3MjQstygGvwmMury3U3BesJ59ZJ7DDrGm08DP4UPOx%2BsPU8xCSjRW4JzMbvk9j0OjoEshWaJmvuMiVyTqI%2BzRi7x%2F1zSAKZ2QHrZ6aQwGmokOavMR%2BkBX6G7lf9A6YkI6KrA5JRY8o%2BJTqzBbbpKHbi5QMzAMFTcxwEvnlbvHLmOo37tX7bhX1bwIrizXZ8Osk8TXx4fUwE9YWxAtoFH5dRqD%2BXO1xACrxZ%2BSar7B2CBXTSk%2BBvLYBYydYoxMMJUsWQaQR1qflk9UcUR8V14TIn57CIgQvY9yehs%2FBXnBqJuFK8bvsOtnrSWpfEX1mTFeZmWrwXhvxk5lMJS%2Br80GOqUBa0jme6SrqV6E11hdEMeJwKOzRNspu7gLXKG%2B2HVB%2BaTqxlhWyadFKBYe9G%2BaN6DE7XfwexMO%2BPQtDWIFycXye1E%2FHYXKsTYrWn7Gnd3FoAFlsw8wvooi6FZsPku1pBdrQseyZZu09NEGZRf%2BIY%2BeI2sCHPi3nZh6ryZDKN%2BDwbN9oPrBWaFvcHjoZ6keiFQNpYhLcTSnJdFbogyP0vjGZg8G0axX&X-Amz-Signature=413808a3ec9b8696ca340b744f6e79cb88c6039a34ad94de81e4056f953a8acd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665DITHNV6%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIQDryfNiPeVSIYws96vEbhX4ypOO%2BMlcSFr4L7YprVJiPQIgKn3r%2BRUXXwq12cYybXnxJDrHyOpJ0SM%2F4mM70ANgpKgqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDm94uK%2FZf7stq%2FvYyrcAyZnhIItz1gjfr8sXzzX6YV2k%2BJeiP2im8Co3B8xYoRPKoKIbP5Kz5S4aIfBYKFTDwFpBkrwYiCph344djIOmk1xcr%2F1E8FsDMQlyazMI4lnDylP1KOz%2BUnc%2BMO2v6pVMS%2FMiw7KVc68ahKLYQtXEm%2FoUQkkIwsN3CBDZw2hQG1bLj2dS%2Fwp3wadHms06paEksOcSCNTwELjJK2FQDKT0wt0Voucjl4AsRv4Tr3PyVx%2Bvz5%2FLwjYoBaL%2BhsKJ5ml2xsbKAbUpWr4OLMUmugPE9oEy5LRZentzxtbli34XQirda6IFVbS7GZw6ivKpFhnTu5AXIhsHjONCZLTwWzutcFfZAcZyiw4YT1OUW6CffOyoyxEQ0fR2TG6T2BMJFO7MksCo0n7lndhlUA1Ns6daP5SS6M1iaIUjQ%2BSdV%2BbWytN4JVkG%2FstY5eBryIv9Y7B1235d3I%2Fyu22BW5NOATRc9hiVUny3OrZtSzay1XGD8BNzQLjLgWCsjEFtlYniftv0LUfu9wtq63rHp1azE1ltT5s%2BpCQ1nrAAVymye7CqyTOoqz4a%2F6ZbMjpUQgu5AH%2FIgpwC2eOKz5xnLspmM7zAyrEcZ5gPqpJB6cfeQ0pBhrF5RimYAelpLN6xZLXMNa9r80GOqUBxgHkGqHEEd0OlVCZ8jjs4tmxy%2B454zWlP4ObUaJFEG%2FfrK%2F%2B95YGOYlkhuUgmyz3hvydbOtx%2B5gS0Qn491i3cOjPH1LFLaBmm6CF6%2F%2FHFnAfNVSdsc7UUceCva6crqHEpQW7LmILFIxH5VUV%2BDdZIGGimcpD1%2FmU3%2BDwUAbEtAdolB0Ylc7TlgyQ4hY9f3Cgs8aR5FwhSUioyIEeKEHEbuQdN0QI&X-Amz-Signature=9b678f01e5f2327c344d09c6d86c3a5d698dcec95e90c6db46703603970ada8f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOKLIHQT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCMYDs8GYPaxuP02JPrQKijbE2PBhEpiG6yUPqcRsx92AIhALfGPKG6SUDaeN9fF3A839TB4%2F%2FPEahcsg2PqGD1lMNVKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWCi3loU8NERV42IIq3ANek5E7wXmNRIpSB7JZmuK6s9Q7PEox7lxWqo8bXxCcpYFlphQE%2F73btegP7DUcFtaSDAybg4PYp4N%2FjBrJbaF8ZqiF1LPNpDAKUW9ZhKPStEHz7JP61Git%2FND4tGcLBSHYzJ2r%2Fsace1Ku83jZHbaOzBfK8f2wnSL6D8fqlLtUp8E0EsEzMDBEtfKsVTIK1Fgy%2BSBC9Ec%2FSHtzyikBqVfn1Nen3%2B7lzFABxttjQ1PICSCMKP5UEfBzqltrV%2FTwzoGJc9lOnhSKsFNFSxvoL%2BBekNuq9NvB8ccsMewf5GZTcQsEKrPnOuUB9C5AHarGfkxPIJ6euFgAbwv4PxSKouPcdbk2Jr6FmFS3d%2B2Sg%2BPcVHhd3vb5FQJY3ykUPmxLbdGtqnBCeHHPT%2Fsq5Bl0e2GTfz0Zsk17C5FPybYsAfnHqS0BUcbSb2z1TocXbscmJTE4wejdTNwUHGBSJdtngNcB7tSkcQ6izp9aixjgg3sOYVhLh6wAR5Hg%2ByVs7lJ3EvxUbJxMlmJHFudPPu7wfLnB1LLm2F16%2BncV2o9tQrNP7VOTKV9kyMGD0uAVVEu%2Fw4NRV32kvN06gJH81EUPyq4Ki3yuzVdXEK0xuy56gFCA3uuqRIWYK4wJnXKssTC6va%2FNBjqkAalPsB9T8BKUKDVfw1WlM%2FfxQ42vi4658jFBD21bY9Bhu0B%2B4iCfl%2Fa%2FvTW7ED6Z6dbp4du0QPTOW8JRD8xrUalDVWu21DRFQfurW5CU2xPwsQobt9chYxW%2BCkoeEc6Kf1YURSuiKXdMi6eGmO%2B0UTbdzV%2BNxmP7XOvoiejN0rEtgHVcrOtPEyeQ0hgfqvOHexkB%2BNbDh5dJpeJ4uaX30H2suMR9&X-Amz-Signature=7349fea2be435039133d0c06def16581b7c54e44ceb222ffc7abb23ec64228e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOKLIHQT%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101048Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJIMEYCIQCMYDs8GYPaxuP02JPrQKijbE2PBhEpiG6yUPqcRsx92AIhALfGPKG6SUDaeN9fF3A839TB4%2F%2FPEahcsg2PqGD1lMNVKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwWCi3loU8NERV42IIq3ANek5E7wXmNRIpSB7JZmuK6s9Q7PEox7lxWqo8bXxCcpYFlphQE%2F73btegP7DUcFtaSDAybg4PYp4N%2FjBrJbaF8ZqiF1LPNpDAKUW9ZhKPStEHz7JP61Git%2FND4tGcLBSHYzJ2r%2Fsace1Ku83jZHbaOzBfK8f2wnSL6D8fqlLtUp8E0EsEzMDBEtfKsVTIK1Fgy%2BSBC9Ec%2FSHtzyikBqVfn1Nen3%2B7lzFABxttjQ1PICSCMKP5UEfBzqltrV%2FTwzoGJc9lOnhSKsFNFSxvoL%2BBekNuq9NvB8ccsMewf5GZTcQsEKrPnOuUB9C5AHarGfkxPIJ6euFgAbwv4PxSKouPcdbk2Jr6FmFS3d%2B2Sg%2BPcVHhd3vb5FQJY3ykUPmxLbdGtqnBCeHHPT%2Fsq5Bl0e2GTfz0Zsk17C5FPybYsAfnHqS0BUcbSb2z1TocXbscmJTE4wejdTNwUHGBSJdtngNcB7tSkcQ6izp9aixjgg3sOYVhLh6wAR5Hg%2ByVs7lJ3EvxUbJxMlmJHFudPPu7wfLnB1LLm2F16%2BncV2o9tQrNP7VOTKV9kyMGD0uAVVEu%2Fw4NRV32kvN06gJH81EUPyq4Ki3yuzVdXEK0xuy56gFCA3uuqRIWYK4wJnXKssTC6va%2FNBjqkAalPsB9T8BKUKDVfw1WlM%2FfxQ42vi4658jFBD21bY9Bhu0B%2B4iCfl%2Fa%2FvTW7ED6Z6dbp4du0QPTOW8JRD8xrUalDVWu21DRFQfurW5CU2xPwsQobt9chYxW%2BCkoeEc6Kf1YURSuiKXdMi6eGmO%2B0UTbdzV%2BNxmP7XOvoiejN0rEtgHVcrOtPEyeQ0hgfqvOHexkB%2BNbDh5dJpeJ4uaX30H2suMR9&X-Amz-Signature=496b4a622410ed8d48386029febbc8c7a35fc1d77e6c360be40dc57fe91895c5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667BH55C3M%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101042Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLXdlc3QtMiJIMEYCIQDfph1N2eiRZ8nycYvuGJ8SW%2FqEcU8CYEMJxND2MLCouwIhAOGAbwLDaV78yFaraAkgja2nejwWRskTqIWWZFoLXtZPKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxqTjZIbbJb0QAp4b8q3AMKuFJBLNDg%2FwhGAiMOzV9aW7%2F3jA2G9f6eGNx85VYPt5i1jMKWQ3qch58v92fm0DJk1cEo2%2BWz3xN63CQecoM7ids8EqR74%2BLamGGDPDOzD13G%2B8I0%2BL0UWEWqYDNXByrimQkLY7B1E2BWhAzATm2H%2FnOMsaE3LBoeHrs24oM3lqy007JtajBfsuZJhZTqng%2FJwXxHinRNOt31ls%2F9ThUJMljN3c%2FI4s5isg9Hr2mijhP7XPAWOhHOBl%2FKBIJIQL%2FoWlMFAD8LfntngY9KyymiInZ8qxh58Fu6qQASXvcIhK4f%2Bu9brR4meYSg75E%2B18RgJa%2F8SgsUGX29Grd8sBy8BrH9F5t4adiaZ1wT997ykenEUQ0CRgSCGZU1%2B8C81uowksnxCX9kCznc0f8XFGy9LKcFhWfP5HFAYaX5b2upikv9Ew%2BrchEH9RGHZL2q6ZY46NFrMDaR0EC7M2yshd1ie%2BcAOg9gbazeuPzALNOOzgKCC9VSqDVrlIgR0PivlK2kmnWiHnp%2BU1OvRIc4JnpYBD%2BQz4Csa%2FOEFvnJkSvrujM73krZUm0H9qTBuCpKiJEStDrIkwZAveAipqfKXBgEJWkJe6%2FEPGYDq4rgxkSWCFtpQu0lMIAnO6gTXzC3vq%2FNBjqkAXhq2oLW9ddB%2Ba4AZlxhBTRzYC5T9NuM2AfykMWWFb%2FIJ4Q4yUHRq4y50wT9qV00BRZowMeTbIqJhW3EhqoXRbKkF8e1OKidntFJ9DqUgE%2FE%2FhwvumX1%2FwMAqaNOwcNRdheEZDBuPyj5Okpj9FEQwzas%2BW5ZXti%2F9C6OFB2DUCMwLAIVPayHrDTunGHmurTfT4nR6J4WzkawdVKLYuMctl7FVcx1&X-Amz-Signature=3666acf2d9471670c3ea5d4eb0f65d4ca2e386969a785cd2cc6a2e8aa25bf546&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAXSUQSK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIHyRHJzUklND3yWdykYne2N8l6M4SIIbME9PJiFq292EAiEAlsrCVtrsW8vbIuKpLfJLVo8oo6JS5rOhiUGb%2ByFRDPwqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGhcZQaHYfjcm4EQ4CrcAxzju%2F3tQ4QFmdrW4HwvOFvlQpe%2BFGnIClaACnyaGrRzd1YF6km9g%2BZoxDl2pvwni5D%2BTlQBGKz%2Fv2pAqkbVtbRLa%2FDy3L79yAxh9Se1%2Buq6wDk6TstZYixpuoQkZXjJc%2FXwnTamgEP57hvzXHx7Isc0aFoj3qL35m%2BqtiLqkS9VS7kYaK%2BkUWF%2F8QqB95qcfahPZYX5iqKm773gp3Xn96WdmHbsqF2UA9dS7BtGWcJ%2FP3Oo7cgQB0tfmFXR2Gd35WX%2BqZyq1xeEe%2Fcii5CxJjlrPdaiSYpZxhpyNP%2FKrw7%2F%2FZAQwZ1y3atRXPtlqGPGHtuRIZWX1uyu%2B71VvlWgF4j3Pth%2B7ZkO0UTzHrow7zplG0fsUI8fEOyeLLRz2G7iYrtnF1uOKUy47KYEsAsSKTX27prk%2BCIQqFPJ2O6mD%2FKaL9xsJ3JleHlGZxjtb4LV9j%2B2AkeK8PZn0SGwFpLH1jdkuewhL1k3C4MxeACqHPzycA3TScUOoB%2FFR1qpTZ6GpPLHe4hfRad2ti08jqo%2F38t%2FXVBwSUP2Zuv08plDKCRgdtE9qE0sYc774y0UJacpbvZgMXYnvfaLpKcXPgHDq1cz%2F1iLowvcOez%2F%2BvmcaTkAO5z5U%2B07AA0mIvM9MM29r80GOqUBZi0461APZt3GJOagB6%2BBzUW1TFGWnV4plSa%2FDh%2FL8JFxfMoGzs59fZo3FB8RtcG3lnLK4ZT5HSKZlup3lxKz5o7E7bmvL%2Fmg35k8rc1BpNafPt0%2Fgus333avim9fVClfhLcAxFzCSyEPbqIhOAFzZY7nMlMfn2qISQl4ueONzRe3%2BMuA8HyHC7RHQPKqVZVGPSDqjXiIcT0UXVis1FDE41k0JZ%2Fq&X-Amz-Signature=1bc0b9147ae0e61c2556cc159e9286decb3bacef40237ffde88a77f91c30bd5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TAXSUQSK%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDAaCXVzLXdlc3QtMiJHMEUCIHyRHJzUklND3yWdykYne2N8l6M4SIIbME9PJiFq292EAiEAlsrCVtrsW8vbIuKpLfJLVo8oo6JS5rOhiUGb%2ByFRDPwqiAQI%2Bf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGhcZQaHYfjcm4EQ4CrcAxzju%2F3tQ4QFmdrW4HwvOFvlQpe%2BFGnIClaACnyaGrRzd1YF6km9g%2BZoxDl2pvwni5D%2BTlQBGKz%2Fv2pAqkbVtbRLa%2FDy3L79yAxh9Se1%2Buq6wDk6TstZYixpuoQkZXjJc%2FXwnTamgEP57hvzXHx7Isc0aFoj3qL35m%2BqtiLqkS9VS7kYaK%2BkUWF%2F8QqB95qcfahPZYX5iqKm773gp3Xn96WdmHbsqF2UA9dS7BtGWcJ%2FP3Oo7cgQB0tfmFXR2Gd35WX%2BqZyq1xeEe%2Fcii5CxJjlrPdaiSYpZxhpyNP%2FKrw7%2F%2FZAQwZ1y3atRXPtlqGPGHtuRIZWX1uyu%2B71VvlWgF4j3Pth%2B7ZkO0UTzHrow7zplG0fsUI8fEOyeLLRz2G7iYrtnF1uOKUy47KYEsAsSKTX27prk%2BCIQqFPJ2O6mD%2FKaL9xsJ3JleHlGZxjtb4LV9j%2B2AkeK8PZn0SGwFpLH1jdkuewhL1k3C4MxeACqHPzycA3TScUOoB%2FFR1qpTZ6GpPLHe4hfRad2ti08jqo%2F38t%2FXVBwSUP2Zuv08plDKCRgdtE9qE0sYc774y0UJacpbvZgMXYnvfaLpKcXPgHDq1cz%2F1iLowvcOez%2F%2BvmcaTkAO5z5U%2B07AA0mIvM9MM29r80GOqUBZi0461APZt3GJOagB6%2BBzUW1TFGWnV4plSa%2FDh%2FL8JFxfMoGzs59fZo3FB8RtcG3lnLK4ZT5HSKZlup3lxKz5o7E7bmvL%2Fmg35k8rc1BpNafPt0%2Fgus333avim9fVClfhLcAxFzCSyEPbqIhOAFzZY7nMlMfn2qISQl4ueONzRe3%2BMuA8HyHC7RHQPKqVZVGPSDqjXiIcT0UXVis1FDE41k0JZ%2Fq&X-Amz-Signature=1bc0b9147ae0e61c2556cc159e9286decb3bacef40237ffde88a77f91c30bd5d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664MGTHBGF%2F20260307%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260307T101049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEDEaCXVzLXdlc3QtMiJIMEYCIQCBnjRjl7X7E9C4%2F%2FMrQsLhgOm3%2FLoqGt1SmdJsagYMPwIhALw23hJRXKTVjOAe9WpTpjuWEqmsjd0oL5e%2B%2BHkKR46gKogECPn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy0b0g%2BmGVsBmGCrkIq3AMCUYUWk4yKFMudakaA%2Bx9gvXDfFQTS%2B17pcXY9Iq%2FrKx6qv5XMpBfMUr%2BryAi5v%2F%2FKLesHmCg98LwB8WWbGwxZjILY4yNhmZGDEmpXf6zyl81LSv%2FTb6iIsvH4trXSCVvMv0xoqY4bMDzvNbETB6wCa0waM297rDiUjxiZesASM0t860cAEZda7Q9eIG%2FVwtX5Ql3PN7SP6ie0OcTkyZ8M%2FiNHL2wZN6mpriSkIIfrhAHjXq5EbbO805NKi7J5hPMn6ON5JjbbBYn6bQfaRAD7Oo2K2xIuV2%2BiRcc0%2BEBi4%2BXO9NnEya3S9AHwiofwdiQrAQOJhuVMw5oi%2BzyKwB7mP7vYMxV7ZMls2Jv6chDcC6oEcxovtqopxeGHkBOsKwZULM7Yf875Gx1XKcLnBg3C6Z2XYGKmkzKOLWIkW2q%2B0ZmdK2JnqnSXwfH8sSghHEB8VZkByd9LRdeOT4lXkNAuQDCdpZWbt%2FwczJ9ggyTOqCtolMXAqMgM0eU96GfKkOVawuD3LnysrNTKQfIGeXHSNUyRHnI7ojiY4ajBwV%2Be3lDkvs0pG5gGyiiUPL8NnFfoi1znMj62RzAde6b23KUK%2BXmHCkIlL02RuUZt8CEkdT0A3q5sySuLDneACTC%2Fvq%2FNBjqkATKeD6HmIqsInJhv92QF4ADQ0ZWW3BFz4xsQVQJCkZncfkRY596RFiokcSSbjZJX4bfdGTFLYmppxWdTWV2IgU%2FP58m82cnWwFmYKFKyMBt%2B2zgbHC%2BxW4OWVImU7HS2CVHTXlpiF6mOzfZonvfQZypnVq8Nfckomf1eIMkjpJO5wSNoFUPJbSI5LCAVboC9LIS%2F00A%2BatSDApRwz1Ra4y9HlKKX&X-Amz-Signature=8b44efa8c5eb117d65c8f5af13bad6fa5fd1409132921ec1aca66ac6b2070e3d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

