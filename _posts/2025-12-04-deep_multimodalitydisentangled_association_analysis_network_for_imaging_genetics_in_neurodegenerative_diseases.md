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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6DPEF4H%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxN9ol7ztfwKpJ0Lf6Fyn6LhSU7E4CjH5EX9AkvVSu4AiA%2BwbBrLOkCIG5pF9tQKdZSFvIJbixsqbGDSGPoCmBT0yqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZRwuDFh2nrBybZnHKtwD5%2Bs5NkO9Wilq8jwh1%2B54o6WfoqGgPh24XwHAIbeCguekVtu%2F0AuKw8T4TZawucQSzY%2BVpdatJXut2G%2B7j%2BavSLKLkZkvC%2FjuA0REafedLRs5ZYMBYiWFUGMYZDhQeQf30sksu29dPInkDwVUYNassuRi%2Bye84aV1T%2B5qmvdKxTUYISV9n8tMwM2wlqRMDZIz5XxQDIu4yeCnvGouWv%2Bk2f9lfDP7qFMoUieyBR1ZqGztRQQCTDAx2v5au0Ph2QsU66KsV3jHI726xQi2nobE8qBgPWn9xhUXT8YmPSZNXrchFl%2BlbnTWFdMfybzEornCQDbXNsufW4Y7IZsgQZNapYV%2F8nvLsQFiDDCIAl9yEJq0w9hOaYYq%2BWo3MUhwfPIECN79giKxZTliYlirCdprHhuQ8OpNUkLn9mDb4v3vZN5vtOcNjxQIzRAA0LIcF71mShM1qyx85nWUpiXAjgPW2hAsKqe3AxJ24jutc%2F2a8Kc%2F5pYcFyaLlwLIBFIhB2W4QQ1OrEayI%2F3iYBUz7ilwXvxrBXhL2Yht4mncYZjtXTTKUXHHKWOMl0v%2BYlHSFt9g1mWCoR%2FaNtCns9suOSMNwAmFpvgLwiE2q29KnFJ38T9tuai0JXl7v5CZ8d0w6Pq3zwY6pgFuk712cbe3%2F718NL0fmMJIcNyJpzAk%2BYkItE1aRa2WMzeI60oPZ9H%2FPuLetrhTrXrNm5R190NUXhzgbA5mNtpcMX2qGO7IhPs2zfZuo%2BB4nWYzqGpsII1%2BdnpbIu5%2FYh3HpF8%2FHmjQk%2F%2F33km%2F6Bh2RAH6EjHaLbysQYZW0oOJCA%2B1Ms%2BjJWjACKV7NFPaPIuAsQinbDUjABteWK0uVCgHhjlbc%2Fpc&X-Amz-Signature=294a698df64f2c5647c0f4fc6cdf7aba6e505905c315e466019bf95df36e99a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6DPEF4H%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFxN9ol7ztfwKpJ0Lf6Fyn6LhSU7E4CjH5EX9AkvVSu4AiA%2BwbBrLOkCIG5pF9tQKdZSFvIJbixsqbGDSGPoCmBT0yqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMZRwuDFh2nrBybZnHKtwD5%2Bs5NkO9Wilq8jwh1%2B54o6WfoqGgPh24XwHAIbeCguekVtu%2F0AuKw8T4TZawucQSzY%2BVpdatJXut2G%2B7j%2BavSLKLkZkvC%2FjuA0REafedLRs5ZYMBYiWFUGMYZDhQeQf30sksu29dPInkDwVUYNassuRi%2Bye84aV1T%2B5qmvdKxTUYISV9n8tMwM2wlqRMDZIz5XxQDIu4yeCnvGouWv%2Bk2f9lfDP7qFMoUieyBR1ZqGztRQQCTDAx2v5au0Ph2QsU66KsV3jHI726xQi2nobE8qBgPWn9xhUXT8YmPSZNXrchFl%2BlbnTWFdMfybzEornCQDbXNsufW4Y7IZsgQZNapYV%2F8nvLsQFiDDCIAl9yEJq0w9hOaYYq%2BWo3MUhwfPIECN79giKxZTliYlirCdprHhuQ8OpNUkLn9mDb4v3vZN5vtOcNjxQIzRAA0LIcF71mShM1qyx85nWUpiXAjgPW2hAsKqe3AxJ24jutc%2F2a8Kc%2F5pYcFyaLlwLIBFIhB2W4QQ1OrEayI%2F3iYBUz7ilwXvxrBXhL2Yht4mncYZjtXTTKUXHHKWOMl0v%2BYlHSFt9g1mWCoR%2FaNtCns9suOSMNwAmFpvgLwiE2q29KnFJ38T9tuai0JXl7v5CZ8d0w6Pq3zwY6pgFuk712cbe3%2F718NL0fmMJIcNyJpzAk%2BYkItE1aRa2WMzeI60oPZ9H%2FPuLetrhTrXrNm5R190NUXhzgbA5mNtpcMX2qGO7IhPs2zfZuo%2BB4nWYzqGpsII1%2BdnpbIu5%2FYh3HpF8%2FHmjQk%2F%2F33km%2F6Bh2RAH6EjHaLbysQYZW0oOJCA%2B1Ms%2BjJWjACKV7NFPaPIuAsQinbDUjABteWK0uVCgHhjlbc%2Fpc&X-Amz-Signature=294a698df64f2c5647c0f4fc6cdf7aba6e505905c315e466019bf95df36e99a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VH374U7O%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHTBOOX%2FdTJqHkDJiYQ8KfS3lbgcf4tV1eO77poYomjxAiEApZUdHVlyqs6ZGwOd%2FcuCV2ZOw97iE5MyH4gDDN7PyRIqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNaQRspitQ%2F58xYZBSrcA1WD5dfwqDHbqjujGxyfJRNPC1Iu3itbGxhwt8fClDXt9MN2wPMXWYSwYcAujQC5rl4yyPpMd8YRH5GYwHNkKzXjHec6S4gl5i%2BZBkPin78k5RuJOHRBfVZD2gWZa9%2Fcu%2FgPY7a0rzgw%2FjxXOEfvUUyAtNTEP6pqV2VjC6i%2FHX914fvdXyHKsfEvV2XJeNfOhDSQ6KqpAol92d%2BwWDxIPmncA2QWRWxvNhou6dzh7Se3hHgugYuK%2BSFfDe%2BpjeTK7lCnJAAMoPmiobCvcWsnzS%2Bfrl9lWP7QKa%2BWIcEFpdHVaX473UMNWZ%2FFzUwhkzDSxxcAaVtZ%2Fqx9n8wqOYDzf%2FPFg881mX4ithNu6fE%2FpC%2BP8jPP5CG%2FJYieN%2BXuvslOxPIKECEaY7kuQkDWW%2FrFDUlaJOHCYAZSqtwgXdcx6AUYI56PBPnUvFi03N39A2lAJbMwR9JYGUeHF04RNtbn2qw1bO51zmmQ9S1Nf3dQpL41%2Bu59JtKid8F2mEp5%2B7CmYYcCc6IaNbhA%2ByGEgEI07pmnUTe%2FDN8zDfyR57cJNkp1cKEeghyIERvGO7SDEVuFymZJvVOJLO1XnrkERzAMxrybWScpqE2L9wzapNKGWWQOLeYJ2z9KZbCiXFbdMM2AuM8GOqUBo3OAlM3nV9mjz%2BVj62vbyPIGPeq4zZSBj7GAFHqn9Y3suupH25nUvt0PlFOOq028Q70YQ3R41i0kGJx6Qx4H3DbR5tjdSsoeLI22gjpj6EHP2rZzE91CKoN6TIE6ICnBsw8EuLLLOLJekwtzCHzy8AAAGBYsrKxUiyWIc2iIzz0vgFfuZIobpNOEwZmLZm7Pi4N0zlY4UnJqIKpPOOi%2BSjfTnBqT&X-Amz-Signature=56de1012025109168265df543fb48617f6f7353c87cb067b4422518ef6af21f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667755T3XI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICfum5HFuNlEySW%2BduTkAOivbHKa%2FP6PxFEMYAcEiwpDAiAXSf5KAAwUSANX8Ub1DlU4sIAOcxREDhjjlcNIXwr%2B1CqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu4%2FQ4CguyHrieV54KtwD6azYKrcss%2F2m8eWJ0s5uBQV2wu%2FX1AlQalKy4r7ZXzWoNCIUyXA2dO%2FebeFkhXv5FCZ5mlx0eBEaVi5JNLTJlrIQD8OilW4fCDr6CzZGFwjI6Y%2Bz%2BltzhxbeLbxSEmZ%2FXqiomzQsl2tzZg1kUQlnrMcn1JJMMEuXTsMswmZL%2BSHNV1MPRGb02aBvPu%2Fsnr%2BsaZkiDNnW55sHYqNgbHUTLmnql9EQbie8k42Px8YX3x%2FOBhkOhrUKHj9UGUcd0Dkoq6GCd3xs15MYHDPdO6afi4EGn3MuenR7FQsb3qYGUutPN35Wj4bIZWOlIbj%2Bci6wIAdpoi7CnP0oELu6McZ17Jd3E9RKzi5hen166FqVvYhQT%2F363Ar9%2BD9Nz%2BiZnIRtzXeGG2nSyJZpemFTMAxGbS1V4Ix9%2BhqEoYU2829fLV91QhwPIdWmzU6wXKF6923xtqFnmrOOswry1V4iDEABJr3PIIEDOXIRge%2Ft9GYU0HUYvdmWf1EY6kVNJtHzpt7Mu0DlqeiCs8GItt1k2dVMkw8miwrBm%2BcXYAHeC6OBu00GoeoBICiCnloRrTYU%2FyCQs%2FjtnBn2fCxjgJPmcqovVw2x2apB7ZnRE8T2iz8eyUEuNfXO1fV5XeiMUJYwuqG4zwY6pgFjed3Sr0f6%2BwV3yZWE%2BS5p960fS679eX1DhOyrBtxLmWbBuVaZxvWs3VPiK8do4zfrr%2BSZ1rSma26TUbp3wCAhFmYTtspP6dPWnnOaRLtal6t5CLwJmhiRRrLqjR7AQsfTDSVQG9QnI7s5JQTcOJb5lz7GGHFFxQNQqzZrphic%2Blye%2FYt66BlXvPzRYAJ7Njtn7hf4%2BkvXq1VV6Dk5D2I8NhyZmQvy&X-Amz-Signature=35b71aff558832ac3d53ef86f70afd493d6b78e9745e5017f6749eba8ccd8d20&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667755T3XI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153054Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICfum5HFuNlEySW%2BduTkAOivbHKa%2FP6PxFEMYAcEiwpDAiAXSf5KAAwUSANX8Ub1DlU4sIAOcxREDhjjlcNIXwr%2B1CqIBAiu%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMu4%2FQ4CguyHrieV54KtwD6azYKrcss%2F2m8eWJ0s5uBQV2wu%2FX1AlQalKy4r7ZXzWoNCIUyXA2dO%2FebeFkhXv5FCZ5mlx0eBEaVi5JNLTJlrIQD8OilW4fCDr6CzZGFwjI6Y%2Bz%2BltzhxbeLbxSEmZ%2FXqiomzQsl2tzZg1kUQlnrMcn1JJMMEuXTsMswmZL%2BSHNV1MPRGb02aBvPu%2Fsnr%2BsaZkiDNnW55sHYqNgbHUTLmnql9EQbie8k42Px8YX3x%2FOBhkOhrUKHj9UGUcd0Dkoq6GCd3xs15MYHDPdO6afi4EGn3MuenR7FQsb3qYGUutPN35Wj4bIZWOlIbj%2Bci6wIAdpoi7CnP0oELu6McZ17Jd3E9RKzi5hen166FqVvYhQT%2F363Ar9%2BD9Nz%2BiZnIRtzXeGG2nSyJZpemFTMAxGbS1V4Ix9%2BhqEoYU2829fLV91QhwPIdWmzU6wXKF6923xtqFnmrOOswry1V4iDEABJr3PIIEDOXIRge%2Ft9GYU0HUYvdmWf1EY6kVNJtHzpt7Mu0DlqeiCs8GItt1k2dVMkw8miwrBm%2BcXYAHeC6OBu00GoeoBICiCnloRrTYU%2FyCQs%2FjtnBn2fCxjgJPmcqovVw2x2apB7ZnRE8T2iz8eyUEuNfXO1fV5XeiMUJYwuqG4zwY6pgFjed3Sr0f6%2BwV3yZWE%2BS5p960fS679eX1DhOyrBtxLmWbBuVaZxvWs3VPiK8do4zfrr%2BSZ1rSma26TUbp3wCAhFmYTtspP6dPWnnOaRLtal6t5CLwJmhiRRrLqjR7AQsfTDSVQG9QnI7s5JQTcOJb5lz7GGHFFxQNQqzZrphic%2Blye%2FYt66BlXvPzRYAJ7Njtn7hf4%2BkvXq1VV6Dk5D2I8NhyZmQvy&X-Amz-Signature=2b6dc5013ce79178472d5d1d7b9c0aa3cc6ff8a67eecedc2a7e8e3e9624bea2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ALBXEDC%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAu7VOorloy9QqNb5s%2Bs9DghG7y51bqFBqQQSdn2d4IVAiA%2BhBFSAPHfFZ0Z3H1xBDunqGv9qTq3SmK7J0tdpihoSiqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMFEq9w3WW4gfhwGTIKtwDEaO5AE1g8euBd0AA6W2xFefFbwHktC8EIF9z1x%2BoAikqM%2FIKd%2FOyc42m4O7AmMijFANzzQB0P1%2BIEzhftF0TSrbxySh8E2dRGvlPVEBCct3JoW7uiucKreqmlIA%2FzK6pcq%2BipdY85FIaTMJVo%2FmWb5kJy8aP9E44v3Vj7ff1YyGY0DJKlvSJ0KxK5iRd7HJubKg8h0HNXascs%2FsGU920QNe733hS%2FX%2Br%2BCQlELVJBASo%2B554LE1ecOB8PkMK0QIw%2BCzsNPUrY%2FxOwqPHkzxNcdbin5BBAgKhqzN%2FZKvPo1%2BbaCBzyWRhXRSBC%2FboHxqJEZl8Sg9r%2FLSaX7SjBueIV%2Bof37Kx3z%2FjvhAVMMtnKlRiUv4JOKmLC00cCGEi%2BNQQH4VTxETKH6V1%2F9CPBFR4OGJhOhFu2YANTSQuHWZrk%2FUk1CHc3jKBwWmrL6D539XPYaVr9%2FeOat60JRdgRKMcKEuUekxjgF%2Bew110irquzYR2zQwLpqpnJAug0WDbfbRWS9U0LNpMIDv9D%2B0Q0%2FO5JUGeOCkVnNgD8O3hvgQkbqJCepAHtbvOLpZJ%2F59VINg91VLT4Hs%2FTZuF72lvomKjtBHy02UiFqRGCtuFRtzFfXFyr18Ck1REZ8e3zfYw9ci3zwY6pgH9hCqUCYQRsNp5wT0cXqlPpmdFR7Luny4oKJQdDN980r2L5ElJxLZ5ibDAQQHcOQMc5Gu5ka%2BQx17RRjM4dgE2dGUfMqAhtrxm1juQCbesOTHDBFWZGH%2FBrtuhCz4pufVi3GdDV35K4QIYxUznngSzD4OtFUOUbRn4lJ12O1nLe2Y%2BSBIhJoqkXtEdU2BXq8buIgWpg5Cxy8E25v3q6HwmyyQ4eCQE&X-Amz-Signature=47d45db6362b0313a5ce313ec94dca7540524f3ce27184c290c541f175cf3261&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663I5UGCAY%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCISjGmAWL5SlWpWVrupuMmOmh6QA5bPQuyJTuXKNDF6AIhAM9e5SSaw2x6UfY58ZTbX29qKyN29JEiVO0vkOT%2FgceUKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxDhDfVhYY0xAt3TeYq3AOQB0grQEM1JMcMHnjyv7v6fVHf6xGjN4hJ9eYTjB0AjcMjuBk4L56GNp1CFa6OVdbaSwLb2kR7rjVQ%2B3vQgNA9RGsMgJSVt11Rnq%2FsBu7KCE6SvJRso%2FIrN%2Foa8AVtW08swhmJPKLbR%2BA0UI9phVbFqINuyJiGt0W5HtzVJWHddT6%2FVWKaKfWgiNO1oXGHRtGwQa7MMjael5sMdw%2BHUZiAI1U0mwq%2F7VXesPiwCOPKM0wMXr9wKm12YEINu0sB2Kx6tLmibZfK6mr0e1erQzqYEsanXpwUyM4RSEHtErZRNS%2BiNZP0%2B%2BaBA1ZOOvcxQjy1jFVpWISNws7Vjk5ridlPz4y6nixDkVzUmhTuz54r%2BKUlCmUWUBrNDnqzUxMvCF27SUT9ubSEUN7nd4oBGneI7zzNGDc05fhDXTb58qr56XVzjhD4cN%2BJZzqieQuWWU8gsA4z4Zk%2Bfocu5a83eEjnhMWGXmIHwct2R3Uhj2ZG7dxfgCxvIpriZhLjzOJFb%2FRZpCnZDt%2Fv7LURcUeC8HqDNygbbiOq0Kdv1fPnbFP0x3OW1oOkZqhR5td2X2XYhsCRLoUQSX7Nr%2BTcaAhlPx1pM9JDRJL0tl7hWBaNRd4pjC%2BA8b8F3F4xYs3U1TD1%2F7fPBjqkAYpwp4sWFojzV8jJoDl2CEJdQ9EGTfxZqFgq8jMWRcijdaaBGxeNDwvUTx8Tfn0G%2B6MD3or3Ldg9t8MR9KRONE1fkphR5J8YHoiem%2FC28mTEUkm%2FSpEeTWULwKyxRMakeNjJYTfHg0BpxEhedjNTzwatXXv6HdyhdBSOQWLTktuEmCvcIBSbORNw6ewhG3ddR2xdC4Oxf%2FRyxbm%2BkajPbYJkVogc&X-Amz-Signature=9ff9e1fb8b8af10c4fa565dbb021c1ea70d4c0855c1c20032ee70fd474b02893&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46623O2XF7F%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRRVXz4gXosoGE%2F41tA6KJOaKbapdRAvxFUk7R%2FpOi%2BwIgGkIW1xLnRGZC0OaFcALT7GeSBz0aDFH%2FrHG3y%2BV7N3AqiAQIrf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHsnsVf%2FIrzzfQAVSircA9E6x6tvtPIknqkaKD3%2Ff45Z7wsJfjvsbDh8BJzz3aa4I%2Bp4tQzknCKv8SXHFWXky7HVdJ1XC2KNQNooXRoNCNlEdH4B6gAamr0hMZ9xYSLJno3QUTdjUBw%2F9dNI6mS7nXcHbBv9Vxf7oCq4EMWoeoyRLbI1XUYWy6%2BsycwmxUABu0Rk80jHmDEIl%2FQIhvevvc1PC9KgXcN%2BnRCY1zn%2F8g%2BEi0gP6twP1rp6UfwVWB6brdI%2F1ypvFN%2FQSExxWbEtxJyhFZhy3bdVMG%2FNCVoYzOXBuO0NhUGXlKEn7SBbYMGE57NOK5fYnZ8R1wjqLMsPxBg088L5ZoqUGd41jg11PXluqRioQlzfJvwTlyqVL3mEyvApnRDCNuupj0mr0dc1y%2Fk7cWjnCFrbYRdCs1cBbJ946fENMnEl47%2B%2FVfhqYxx%2Bl3PoddaZlpMZnoMd9DNAINAOfakaoaEY1R%2FLLjKS6M3iRcO6Ze3qq8YBhA5hPTtKQY9osa2Ef7mynmKRG6yhgeYRiyUSsbb8K1RkGDmRKBI8lS04FNLzT7rNQv7vSdBcLvSLjY0b%2BHsnuIkhlOAXhBPt14zpB7r72LBZuoSohZ2Okh2oerUpcnrmB%2F47zmWUibSwTUkm9zsWIMxEMIn3t88GOqUBzjdZUZ6m5EyVjt0aOXCRkOq3mQuHE%2FXxWxMjnhQG7AgeZVL6NNbrSmhgVr6PU9F5npnEZfg%2B1ocv0OHkyoWDGl6dInaaFfVd18bkZiKmt%2B1iuVHSNXJn3NxsWi9OT9KFDiwo5pV4S5A8veT%2B4yKwkwhktOZG5eu8rWDDXV4j%2F5ZBAy%2FNPXPQUWovB9YHUdfITQEx1wgjjwDrpzvVB%2Bq51IswE%2F%2Fu&X-Amz-Signature=5180b7f57ccb2c527c5fbca01140431416abc16f63b89dbd243f6b2c2658e3aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3HP5JOX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAXETZSxhwdiqfjZvGceu8ArPwcfB1NLFOHZpKJh83oGAiAD0fMORFBdcT0yu3e%2FEzr7zSzDij1gp5Jlcoh6iv7xtSqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkojbis%2Bnj4lu2V2CKtwDt1XLyMeXU8dRA%2FAEe%2BlPXYAn8TkZoimITuc9EXEo4VTgS6DaeIx45rnSwRRGZYCzmQ2938rOmV2fmSUNSHlGB82xl%2FMTwt%2FoGSGDrro2b4WAIO9btTiw%2B1ycDeDtKEMn%2BD0G4VuSVgMkR35%2B4S%2Be1Rbw8H45zqx5pYxCfsYgTdWAb07rxdG%2FxTOCzFU0bYfiki%2FMz8mItynz%2FCZ2ojJvDjOfb%2B0FNUv89E9U0AtjQDhVUpFveN3dtLWRlvW%2FIzmv%2BBTM1v6PXx%2Bh370WMe8Kj9KyddnKvNqedZd1%2Fg%2BYfh9auxynI0WaUxwQmYhryZWHUO977saFS0Peu32L4vnpZRfd1r9Hw9GpIkk3Du8EvV3%2BnYjjgKito7fTwYZiTe6iVXWFQxuGVVd0wSYrqHlnWSm32OL9ySHpyiMS9iVEVvMPCq1d8LA4d419c76VYbPllv15mmLnCXYwzHzuR2wML2LiaSPf1XwRxBhM%2Bexz6LBWBnSXc66hqFknF%2B3WVDJfY73XWQCiIYOUBSoYw6mrgJ8dGJE%2FDHG%2FtAAzEvfRCfcgrzrRJy2sAOwOoWJiIikUIIupARQ%2FXXo2%2FK8WW38lBGsuR2JK01%2FVX9Sh3QKtU%2FgXGiOiAtK%2BY%2FbTXzcwvP63zwY6pgElqHKQZczzomlw%2BobAQT8pO3WOM7F%2FCtmoEZ%2F%2FeHfjQJGXbjfswYgZuPO%2BKckHz2mjyk30%2BjjRDhqMTs66PB42KeSuHd7VhC9vIk1g6hSRSJJnTn4aavq80riBgetzWwY4NErP2cnrhb6EXkOTA3e0BAmvyQaAlRPLkJw78LbikNK4dWsufdHa9OGueB3luX7ll7mW8ry%2BwyiIi6rR9g%2FT8CuRtPmU&X-Amz-Signature=d4af37e36192eab93803659b0f66b4dcf8d1154f493333f0c59483630a716fed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T3HP5JOX%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153058Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAXETZSxhwdiqfjZvGceu8ArPwcfB1NLFOHZpKJh83oGAiAD0fMORFBdcT0yu3e%2FEzr7zSzDij1gp5Jlcoh6iv7xtSqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMkojbis%2Bnj4lu2V2CKtwDt1XLyMeXU8dRA%2FAEe%2BlPXYAn8TkZoimITuc9EXEo4VTgS6DaeIx45rnSwRRGZYCzmQ2938rOmV2fmSUNSHlGB82xl%2FMTwt%2FoGSGDrro2b4WAIO9btTiw%2B1ycDeDtKEMn%2BD0G4VuSVgMkR35%2B4S%2Be1Rbw8H45zqx5pYxCfsYgTdWAb07rxdG%2FxTOCzFU0bYfiki%2FMz8mItynz%2FCZ2ojJvDjOfb%2B0FNUv89E9U0AtjQDhVUpFveN3dtLWRlvW%2FIzmv%2BBTM1v6PXx%2Bh370WMe8Kj9KyddnKvNqedZd1%2Fg%2BYfh9auxynI0WaUxwQmYhryZWHUO977saFS0Peu32L4vnpZRfd1r9Hw9GpIkk3Du8EvV3%2BnYjjgKito7fTwYZiTe6iVXWFQxuGVVd0wSYrqHlnWSm32OL9ySHpyiMS9iVEVvMPCq1d8LA4d419c76VYbPllv15mmLnCXYwzHzuR2wML2LiaSPf1XwRxBhM%2Bexz6LBWBnSXc66hqFknF%2B3WVDJfY73XWQCiIYOUBSoYw6mrgJ8dGJE%2FDHG%2FtAAzEvfRCfcgrzrRJy2sAOwOoWJiIikUIIupARQ%2FXXo2%2FK8WW38lBGsuR2JK01%2FVX9Sh3QKtU%2FgXGiOiAtK%2BY%2FbTXzcwvP63zwY6pgElqHKQZczzomlw%2BobAQT8pO3WOM7F%2FCtmoEZ%2F%2FeHfjQJGXbjfswYgZuPO%2BKckHz2mjyk30%2BjjRDhqMTs66PB42KeSuHd7VhC9vIk1g6hSRSJJnTn4aavq80riBgetzWwY4NErP2cnrhb6EXkOTA3e0BAmvyQaAlRPLkJw78LbikNK4dWsufdHa9OGueB3luX7ll7mW8ry%2BwyiIi6rR9g%2FT8CuRtPmU&X-Amz-Signature=ec924f185d0e319b6eaa0bd6819c7ad8da48d94aeb7a5e785c9cd6cfa72d3598&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJ5TO56Y%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCi3lIejAmljMqp6xyS9usfiKk4qpfmuqVK0fLse8zTkwIhAMw31d39t23INoJOzU1s6guLOcxMrVvBtgzeOF4dTKtKKogECK3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igxav8ayEBsBykfAkgIq3ANxIg2iSCnS1kFmguibbm9aaDMltwBvW3fLrmHTDAZ%2FDlL%2F0gowGbccdJrDQnkHg1b2KjeJm5MN3MnUIcptsSxOsSALnxq95VlM6gfIw7KYTFSOvEgbE5KYB15sKcBDhmPf2RK%2BFOw7W%2B1Bky83Ny15p%2BXQYvuAIDW%2BLhFP357oIPTeB7%2BQW1qrx1h0GyE9LzZkhdPSB5PWvrovZ92v%2BuqSCnvOmDVlDDqd14XjbOK%2Bknih6s9Gi%2BAmeTUOa1sICKGWdKxKg9eDUcz2gtVFA%2F13zr%2F74RYr0wPRNA1BatJ1rXuF7god8y4bpfIPOhWen7lkSdRnt6qWGzjSV3TxG8BMiXRfEnN1%2B9Z5WyyMe4UBUhTyrPU1F4lwh04eMtAQS5QpCInoEcitbba1blGtZI3I3pes8bYEgPS7qcRjIicBISupK2y1jG1bd223nHz91hPyGiSHU%2BKrs0gtMofxOxItnood5QhSJiNSKYjLNl7GtWFvtfZ6JURJ%2BL1g0YpU%2BaH3SDIM7mQDaqy2q1yEd4OZc7TYsm72MwNYcjVLmeeLWEM2ePxsryjh%2BeN0ctaBPrGZ4O%2Bu2GO9nEsAJ2ic9XmvwCxdVnT46Rsp9pLEbyM90Wt4cAlkweYKEkhkQTC487fPBjqkAZJuGsDPPHYg88Ki0DnNG8ksFLGyGR7NVEtvMCNvsH8tE8%2Fb89sm00%2FuKSuWvvRRQJepJBeShE17RGU5dbFahqVpcnb3TIsZP5L%2FAYyWun1d2uU%2FSduhBJMl4UQjl40l47vDCaLzvbtCBQFMLplgjqO9FiTUx6KtkMh9ZKaEynPBo3cr%2BA0Qv0yIvk3%2BCKGtcCpgv9NVOKRIevCcFfeMfF6oWQjk&X-Amz-Signature=6092f28ef82cbb70deea97a8b9369741ed5607c20df5bf6718aa4d0ad94625b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEVXOAN3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHmm%2F1%2F6INLNoq4mBdRuOcTDptGrf0rcxcYiZIY5AvsNAiEA%2FXKwp5mTI0gzJQits5acRgAPoIqM6wG55ViLvFA455kqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCGLsKFQuyFwcbmNPyrcA2y3DrQSpoP26%2FuJ8HQqGjJAXIHj33RJn8roONoKJbaEvr8u3dBUXtsulX1tFtubVzYmIY3dfQhxgysbNO28X8j9AosXvzGdCl%2BE%2BLCGlqQUyiqe00UynjJkUiuPmiqcDZTm1Bw7OIae%2FIvZUsbQhWpTgB2m1t5XEq1s%2Fe4c21sJG6AQ4Yz0S21yF3OLprQxSSODZx7b4tr8YgCzUPiUpGh%2Bjl2YZYEegt90OO6a%2FtNqiSZKTni15kK1HHTdiZYNF8SUJarQHdGitUtiEqGSM50yueAG8wqHCJHHvmCmM1l2mBpW2%2BWFKVCt%2FFcyq%2FGkyVRPZzxWsvTl3RziKA%2F%2F3uzl3sDKu3jg4zUBzBKL3X3WM8y8uwxfvUC4b%2BONTqCmiQGM5ZcBMU9%2B%2FBx4zUX5IdQjH3H9Tab0zaJ82bzps9WGIqLcb8yJa0iAYYxGGM3T1MiCOfo7QW2sYUhxRPfxwQSuUro3qAcdBd9YlJfgjB6t3cfS3JxX2QPM9G3MF%2BEvNcYztJZlBswlWwP92p9GBNHNux3rj3OGfnSb6T4F%2FVezdr3vmOQz1bB7X9WfqxM8XbtsDU2U%2B%2BbP6cLc4%2Fk70ExF7Cwo1XIt9RmXSiXiPgyko7ReJr9APjJmzglFMNTPt88GOqUBufWZ0VSGEAdYq8Npa9XlNrNQ2SdA9EUnj0I8f5LPyI2bewiGL2vHT3ZYiyOAHlP21gq%2BtSVnwmMJti1aa8xbKe6u3JW1Ne5dzYudlrd6SMeYSfqehSM5GVNpKsJxklBNgqYcB8PSRDD0M3ccukVARuRPSBOMorPvOb97HDHEn5juHyrPynYTlyPVOWGZYvLddM66sKgKYFmvETth5zqkDd%2FzGJwL&X-Amz-Signature=5d4118d1686d72733f89b7e332cfb4f907f085f7bce6c5758d3dcfa6087582a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WEVXOAN3%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHmm%2F1%2F6INLNoq4mBdRuOcTDptGrf0rcxcYiZIY5AvsNAiEA%2FXKwp5mTI0gzJQits5acRgAPoIqM6wG55ViLvFA455kqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCGLsKFQuyFwcbmNPyrcA2y3DrQSpoP26%2FuJ8HQqGjJAXIHj33RJn8roONoKJbaEvr8u3dBUXtsulX1tFtubVzYmIY3dfQhxgysbNO28X8j9AosXvzGdCl%2BE%2BLCGlqQUyiqe00UynjJkUiuPmiqcDZTm1Bw7OIae%2FIvZUsbQhWpTgB2m1t5XEq1s%2Fe4c21sJG6AQ4Yz0S21yF3OLprQxSSODZx7b4tr8YgCzUPiUpGh%2Bjl2YZYEegt90OO6a%2FtNqiSZKTni15kK1HHTdiZYNF8SUJarQHdGitUtiEqGSM50yueAG8wqHCJHHvmCmM1l2mBpW2%2BWFKVCt%2FFcyq%2FGkyVRPZzxWsvTl3RziKA%2F%2F3uzl3sDKu3jg4zUBzBKL3X3WM8y8uwxfvUC4b%2BONTqCmiQGM5ZcBMU9%2B%2FBx4zUX5IdQjH3H9Tab0zaJ82bzps9WGIqLcb8yJa0iAYYxGGM3T1MiCOfo7QW2sYUhxRPfxwQSuUro3qAcdBd9YlJfgjB6t3cfS3JxX2QPM9G3MF%2BEvNcYztJZlBswlWwP92p9GBNHNux3rj3OGfnSb6T4F%2FVezdr3vmOQz1bB7X9WfqxM8XbtsDU2U%2B%2BbP6cLc4%2Fk70ExF7Cwo1XIt9RmXSiXiPgyko7ReJr9APjJmzglFMNTPt88GOqUBufWZ0VSGEAdYq8Npa9XlNrNQ2SdA9EUnj0I8f5LPyI2bewiGL2vHT3ZYiyOAHlP21gq%2BtSVnwmMJti1aa8xbKe6u3JW1Ne5dzYudlrd6SMeYSfqehSM5GVNpKsJxklBNgqYcB8PSRDD0M3ccukVARuRPSBOMorPvOb97HDHEn5juHyrPynYTlyPVOWGZYvLddM66sKgKYFmvETth5zqkDd%2FzGJwL&X-Amz-Signature=5d4118d1686d72733f89b7e332cfb4f907f085f7bce6c5758d3dcfa6087582a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UFDFEI6V%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T153059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOT%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDwSETIc40L0P8Tx7BXsaIqkZqD3%2B0R4WyMbIMi9SGNgAiBpToDNmUeVITE6dw2xdh40XljeYgvakmfGljK2fDtmbyqIBAit%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4%2BleA%2B3lMm1XFhxIKtwDG9gT2ZjuWRdnrRVarASdgk3uZfG7U7aDEL6agQZ8HvGghvdskTGJDkV6TmiEM313h7BC%2B3cZms4dJ9aOZ5VFf3uaI%2FvBlhCTzMOFzxxdKLuFES%2FCUBfM8ERWu35FGRIq0u1BU4mGX5m2k22VewwpO14YV%2BTj2pcjaOm3xZuc3PXbbbRlvENgVmOyp0muaJOBPuKsKuqlY3XCl3kILxeq78BekLEHJ8%2B03%2FG6ZpnlgJI4%2FAhvp5NCNTSU4gUq1WApHdilCecwp98grg5qnKOu3soIwidqygNVaK8mOsGdAG1LUXu5pIpcuGQGOaIV3XEG4m9zO2ACS5BM6wI3wdj8foFOAQgFsMXw4pa3vGRqneILIE6mjpYsR5Q4gA2ElyRKn0ANOiTlG3lOaNViUXyb5o%2BofhQhpQb18%2FFvQOWWIYeDHNyOh7prUYIf6EUYDRbZfd4fIYSqi6VaL795iuL%2BKGaCAdFTa7pweXQAVOzzLQGCvL2a21ButQ54yDeNVjHEK3I6%2FuYPmeFvJ5%2FOaN5Ds4%2FuqivLAoxHOZOh3K%2BOT9GMGm4PBOX%2B%2B%2BF7i8Nx3IA0JlF3bPXXsg%2Bq8c8L8OGwKTUROxuA4JO0u%2FAGeIHN1%2Fnzf0lE3pGqHkmXoOsw6%2Fq3zwY6pgG%2FZ7r%2Bju8J6WxK6Epz%2BsEBOtqeMYJ17wONsZvtYb7N7Jf8Fr8Z%2BLhkvU%2Fx3p4bUjoe7AnPYbwVJVLJJt84LQiFevmonQKDzK6BHF7FGSkBqu25y6WJC3bKrCT61unq0IARbnFvP9eFQvbhW0JJceD0YldGHpESC7M9%2BFqbFlSQjvbqgoIuPl6NUrBe%2Bsu5ZaEslzHQrdMDjUoI6Vgn3YsDfTq6UYFW&X-Amz-Signature=b5f7f6d848de6e9b7ffa219e58542606a61d8f7835a5afe3f4d4b01fad660a35&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

