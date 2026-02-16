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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYJA3BQP%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHdIrdpFE53lRr6YMf9yuGsg9U3sU1xOav7TXcFH%2BMOSAiEA1OywSIS%2BXvPdY4Mv4Zgdk1zhWOqKk5hvohjpoHfiIJcq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDBSic7SpDbdmylKpgyrcA9Pe1eGNpBYbdBOvMavla4Edo8qw5owc3uQksd52g46oK4OZNrS2cfWk8i3tkgfALQuaEOSWmFaZve8VJ8kWbfNXfTsnRmGZD3%2BqJdPhPlrn5mRhLORmauPKAXqUHLoD0Q24%2FpKjpPHUWd38LjLgGcnxpaBcGGgKUgB%2FRpy6LlaVTX2to%2FdxPTw%2B08SpCRyM3uW2zkJ%2Bk8E1k%2BB%2B2RUiIZrT22BWvweatksSgfKuA4xuwEgpioc1t0z1I3hE2GmhzQJQ60Sk158RDSRnv3xFN01qbt%2BRNTgM3TtW0uWy%2Bdd5tul2cnaxvhWj9%2FcGkmSfBEHEo11w%2FKn28Z7CqEeOceLlPu1kFohFspb1wdvtRY7eg0eN2hPEoIBJX%2FnhNypbPRJK5G4q%2F7lyTtoMwjLe%2FvY%2Bnwd52%2BDaoWJh0JxVJT8Ye%2FN5Cex%2F0dTJEd8f7QX1kwRNQRfGNVw84YtLm1x%2FmkvuRXL2RvRPcYIRk%2FB4RT6RXeZ0PvNkqE2bvzpy1KD2Bz3RLWFDNPmA8po2TP7i2SP5v%2FQ6LLC2awhqxeZ9flVY7ivVxwuxabIlnTvfM83lJZUCLg24wmszKa7nOvxsACKHb5lXZj2s0JdzaNqZaU61QpqnMovi%2FyEUaQI9MPXBy8wGOqUBIqewyTjaVTZfjsoFFm2QNie%2BDz48n%2FbJw3IT2GXjyAFtGWWEXLzxqThwaAVc2%2FUv9EKsOcd4qicb44O%2B1iPKllh7msus3Ogyr3l9%2BM247hb5NQLnMurv1F21%2BRcRZ1k4VZPX7csXFe4%2BcUERM4RWaxLcDenIIqSgfwaew563oOemcr1vbN2W2%2B4lNJG%2BVDlnI8rLHMQUcLsgVqMSGG6A4GlgpxNa&X-Amz-Signature=e8d34f3dfe0fffdaaf5719aaeffd827cba80da277480b1c11993b5fbe1ccfe15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYJA3BQP%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIHdIrdpFE53lRr6YMf9yuGsg9U3sU1xOav7TXcFH%2BMOSAiEA1OywSIS%2BXvPdY4Mv4Zgdk1zhWOqKk5hvohjpoHfiIJcq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDBSic7SpDbdmylKpgyrcA9Pe1eGNpBYbdBOvMavla4Edo8qw5owc3uQksd52g46oK4OZNrS2cfWk8i3tkgfALQuaEOSWmFaZve8VJ8kWbfNXfTsnRmGZD3%2BqJdPhPlrn5mRhLORmauPKAXqUHLoD0Q24%2FpKjpPHUWd38LjLgGcnxpaBcGGgKUgB%2FRpy6LlaVTX2to%2FdxPTw%2B08SpCRyM3uW2zkJ%2Bk8E1k%2BB%2B2RUiIZrT22BWvweatksSgfKuA4xuwEgpioc1t0z1I3hE2GmhzQJQ60Sk158RDSRnv3xFN01qbt%2BRNTgM3TtW0uWy%2Bdd5tul2cnaxvhWj9%2FcGkmSfBEHEo11w%2FKn28Z7CqEeOceLlPu1kFohFspb1wdvtRY7eg0eN2hPEoIBJX%2FnhNypbPRJK5G4q%2F7lyTtoMwjLe%2FvY%2Bnwd52%2BDaoWJh0JxVJT8Ye%2FN5Cex%2F0dTJEd8f7QX1kwRNQRfGNVw84YtLm1x%2FmkvuRXL2RvRPcYIRk%2FB4RT6RXeZ0PvNkqE2bvzpy1KD2Bz3RLWFDNPmA8po2TP7i2SP5v%2FQ6LLC2awhqxeZ9flVY7ivVxwuxabIlnTvfM83lJZUCLg24wmszKa7nOvxsACKHb5lXZj2s0JdzaNqZaU61QpqnMovi%2FyEUaQI9MPXBy8wGOqUBIqewyTjaVTZfjsoFFm2QNie%2BDz48n%2FbJw3IT2GXjyAFtGWWEXLzxqThwaAVc2%2FUv9EKsOcd4qicb44O%2B1iPKllh7msus3Ogyr3l9%2BM247hb5NQLnMurv1F21%2BRcRZ1k4VZPX7csXFe4%2BcUERM4RWaxLcDenIIqSgfwaew563oOemcr1vbN2W2%2B4lNJG%2BVDlnI8rLHMQUcLsgVqMSGG6A4GlgpxNa&X-Amz-Signature=e8d34f3dfe0fffdaaf5719aaeffd827cba80da277480b1c11993b5fbe1ccfe15&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNJZ25F3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103624Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCICAFaLM6vQPWofkZadl4BPUs87%2FMgLj4avH2ZN67yjvzAiEA3tqQdvCgIXcqcOmYZCXrm0axAjvaPqh%2B6rJdbJ%2BmAe0q%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDATiI%2BchZ5vgyMdtTyrcA7WftCozu3Lu9y8fl7pjC2xOIij5rh9cSsNldZOiOP0O6X0YCzKb63CXKBz1NkRwt9KCqU26xrD%2BeGIBS1xDxWZ4LGwYwToj4OdywP4C4BHME2N8HUrb3NP8PLszfbMOxpUpcdnKJUER%2B1ozX9I%2BUKemoKeU63TlJOZdayoZylVeIgVInJAa0RSisLTqfrki3pnxuC7fHXpL5WwuOjjqtbwD23Kh8D4rh%2BBp31kVS%2BtX4OU1kP%2B%2Bse8Y8oJ027Ejyd6JPt%2BDA1suWmcMz4780Hrhv%2BhIMwp2%2BQdPniB9BMMSyg9uxEH8XQPYv85ZCSyEHcleNB1GGXGp5Ykwgk%2Bj2D3ppc4EvFbibK%2BzWJzJVr3yZwEeIZfZMiTO755eIRElb3J3lwIoOdMnO0JONm9KjP6pHbopjdlF46r9xOdA2Q5vVcwCEQy3wZktirFm%2F6NWDBUhoO7D4Er37cLZMvFAT%2B%2BBuSmLOg%2Fd0zQiG5XAJ2fpFm35QJlN23nmWxVVAScjeSpH0AD4%2BHaIc%2B5vlFZ3FJoLTBg9qnsZcfwZ10431ohKt3MfAAMUCC%2BxxVdaAM5JlmldYoFHzysyq%2FQ3zJyBTDAW7HGIna4EFVTaiu2wkMEwAdEYUUYGSZxiLC4eMNTCy8wGOqUBjh4gYReghi%2FDqe5Z4Q9d7%2BlNxpwDDi2HRv7uu7Cn2CWazDb5SkfNimfYUk6tI11TTfcEMNrGrx10dFl7e69xFnDLA01gJZko7CRZ%2BQlDebWLnx%2B9v0DEGkXBFyU0tJVXrdwivjxnaK%2BH5tQCVxDAM9vEti6ylsdumsIo9Xe%2Bn%2BaxrL%2FVBUy3RY88A3n%2BFqaBr9aI%2BlM19JoCIlrycMzfsGcx41me&X-Amz-Signature=220dee7d9c7853611635d6b789b043e4b8dd1d81764bc47070abacc3514fc378&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3TULZ2L%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIFBj9WXwZmJD1WyeGrVMtauyEYUV5t%2BPLaRXtvc25K8KAiBX%2BScth%2B7%2B1cvWxPloNadCd04FR1RGOkBAtCN8q5bfNir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIM7BjpzZjuVrnoGdsNKtwDTlXrzjPl4Boe7tPGVYfPhZClNlWxPgz3ML3vOH57g9kvMENv9Op5cyBQw3dxMNKFTLkUxYCamQZ3%2FXmiuP1uVqFUpN3MtkLMYyXesqeVSYOq60FrYcYinfmxSsVj7I9Fp9sE4dW%2Fz7a4wJi%2Bxtv0Y1pMJnzvXjJoTrmveVfkK3IDp1Ry53faFApYl%2B5ZjgrWiOlRcKm29648w5ribcGpoYOerpG3nLkyB9dC0q4PCspFwx2bsIpqFT314rqaabTbt3RLsVDmY3z2zt8%2FcDakhC2%2FKEuK1%2BepRYPG2OdL6TaL8bRsQQx5qR2WiJ%2BAWSnqGisQuzthLL%2FJDpyw9pFfw4cu1euIg9Yh2xeSiEnXRC4mdGGN3HWt%2B8qtVX%2Ft52WXPWlJjNKHNyWbnf1xt6HB7lC1JvDOBMJ8IBcfOLRv%2Fpiu41KoYeEYo1uRhHtJwW3zEtbRP%2Fg2RRvaSGssqkrr4H%2BbwrGEQhCCkyKzDPzt%2FYBQOx%2BoLzNkjlRa170J%2BCgc9dXW1mc2QcJwTGekTWM%2BurhdqM1of9vKoxgx2pZn0zGq%2FMeYOzbjTt7tkHTaJfVMRk%2F%2BxF42xHr013yiWhrMBT4VtS9H2zOBq9w16Yq00KXbIo5ZwpfIY83CdmcwwMDLzAY6pgFaarq5R2inZYfDZ697wyeVo8oXn4F%2BikyBPP3%2BE1Mpcaki%2FwYEq1bzhkX8OACP93wME0iOR3Em%2BDBfmOpMycSfMmCClPZvkRcakrVQWhCBw9kst2engWQuYRBXl2ByEWBw2wo%2Br%2Fy%2FOKVn2nEzqFoHfIB%2Bc0NJWpppEINz9xjQ12dGp1U9DgG032HiH9SMderI%2BFZee7ZXOIVMiSeMULKQfRvTs3PD&X-Amz-Signature=0e448d16da2a8ad0653f3ab41dfcb70c6029e49e4f1a396fe4cbe381b5606b70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3TULZ2L%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIFBj9WXwZmJD1WyeGrVMtauyEYUV5t%2BPLaRXtvc25K8KAiBX%2BScth%2B7%2B1cvWxPloNadCd04FR1RGOkBAtCN8q5bfNir%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIM7BjpzZjuVrnoGdsNKtwDTlXrzjPl4Boe7tPGVYfPhZClNlWxPgz3ML3vOH57g9kvMENv9Op5cyBQw3dxMNKFTLkUxYCamQZ3%2FXmiuP1uVqFUpN3MtkLMYyXesqeVSYOq60FrYcYinfmxSsVj7I9Fp9sE4dW%2Fz7a4wJi%2Bxtv0Y1pMJnzvXjJoTrmveVfkK3IDp1Ry53faFApYl%2B5ZjgrWiOlRcKm29648w5ribcGpoYOerpG3nLkyB9dC0q4PCspFwx2bsIpqFT314rqaabTbt3RLsVDmY3z2zt8%2FcDakhC2%2FKEuK1%2BepRYPG2OdL6TaL8bRsQQx5qR2WiJ%2BAWSnqGisQuzthLL%2FJDpyw9pFfw4cu1euIg9Yh2xeSiEnXRC4mdGGN3HWt%2B8qtVX%2Ft52WXPWlJjNKHNyWbnf1xt6HB7lC1JvDOBMJ8IBcfOLRv%2Fpiu41KoYeEYo1uRhHtJwW3zEtbRP%2Fg2RRvaSGssqkrr4H%2BbwrGEQhCCkyKzDPzt%2FYBQOx%2BoLzNkjlRa170J%2BCgc9dXW1mc2QcJwTGekTWM%2BurhdqM1of9vKoxgx2pZn0zGq%2FMeYOzbjTt7tkHTaJfVMRk%2F%2BxF42xHr013yiWhrMBT4VtS9H2zOBq9w16Yq00KXbIo5ZwpfIY83CdmcwwMDLzAY6pgFaarq5R2inZYfDZ697wyeVo8oXn4F%2BikyBPP3%2BE1Mpcaki%2FwYEq1bzhkX8OACP93wME0iOR3Em%2BDBfmOpMycSfMmCClPZvkRcakrVQWhCBw9kst2engWQuYRBXl2ByEWBw2wo%2Br%2Fy%2FOKVn2nEzqFoHfIB%2Bc0NJWpppEINz9xjQ12dGp1U9DgG032HiH9SMderI%2BFZee7ZXOIVMiSeMULKQfRvTs3PD&X-Amz-Signature=a86cc12b2c6dcc961720c8d250a7a1d57a0755ac679c123976eaa957c0d997bd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZMWIQGJ%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQDIIBpnU54oF2ze9mHbrwC9amzpiJzTMBEjq4C722AwqAIhAMecvZ30%2F1ElRG2ibAnkIOumzNXiRxvZZS%2Fx%2Bpgz7D6JKv8DCDIQABoMNjM3NDIzMTgzODA1IgwvLqk2vYPLM7jci9Iq3AONQ1M1fZh58aJDg2BymP4Z%2F6DQ7IiPUrI89jHCFqRqMKS8749%2BBf%2BqufDhrqkyYAkvgdu425%2BsQMdExxq2VVd6B7jxHMrXzObc%2Fh2fShLeuN31Ksws%2FKzu%2B7U2MqCtzNZJ37JSWpO1ATdBCArqWW7Nv8VB818NdDj%2Fx82bCbjg6Uo4F9LQyRcN%2FrmR1pnCe65R8KpIzgcbYCmaNb0W8V5DKMOqmhDTvO1w%2Bz%2FGRZt7%2F5OoiaVphyrBL11tl8jlkk3EXqKPnv%2FoF93y9yYcRPDVCbycNAiLnDK2mENbaJ4TPim3KZWTuV9kwMxFZ2x076VFSdoAWSFyRBfK4B0QNHQ4viViKyRlYULjv4XttRJkaCTh4jDjtrFvCUhtweEwoq%2FK1Fj3e8f75Hy6mqmvqmRdlh2SuJkNKLIl9AoEqUuDh64IkJHvBRcn0ICMdCQZxNYuP6d0DmFupW%2FicfPnq%2B%2BgHcfMwPtDnBXnbYQ2zIjSpnmj0snAUf8Sgiz9e93NG%2BvqgIPnPuyM4Jv4MmotvZOnnQVyDWtGL0dbe6S0IeI%2FqvJa1m4Dk95JZWOXG0UQ9XroPAJxSq6T4Dg3NuM1AoUzxKMLWeCj0dj9HC6Tjb8Za4crZ7uuA6JfoGI8jzC5wMvMBjqkAXl2%2FV4EoIEJeiFhuXTvQptnuoZ4tXK2V9OIdbf94hE6pi4S3wQqBn8SdrvKOLPVcpOYs%2FFBUKSeK4ujFK9PPDEBhIv2DABJnJNfUcBeoxLn98F%2FZieI%2BFkg%2Bbo0j9czqAiq1t3hSr6F6O8DSn6jVrdZsDkEFb9zOXaQh2iBbGrbSHynInvpmd4aaGMO7%2BrM11g22Ec9oZbmGmT9LA9mN%2FoT%2FsyR&X-Amz-Signature=2684af7a84168161be83ca858fc60c8a73ebbd86a6c52b0ce91dc4ccdadc00be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HJ6A6CD%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIGmfqOYCkkQYly6JSMiw7WNUvmIPSVbi5KDKWCHkJrXaAiApN0AMW7e%2FMQVx%2FFEXbxQBsMI0I0%2FrmjvdqCpPLhJUqyr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMxPwL3Wb97b99b8o5KtwDclMH8tEwqBuh%2BoU71cgpwRww2LdoubEmKdsi%2Fkorae8lakXy52NJmqYubzmDtvnjeySjhOQ6xsWy5nGnTd5FZmZcGUoexw5ZIxhu1WcRpoldg%2FBHJcKeGSYXbAIF9mR6eaOGvUeu%2FxgVtHdDfRVFd0ItqeDhwsUAkxn%2BrztJbKMllUkZcm3WiEdz7C9M14bFv4AM5RzjSabpK8qG0ZVhARsYu6thGw1vJRuGshVzBvTsG%2FJmiRDM1Te0wXbmUZDA0OsExxTC6nGYZRLXWSldC3EPTgpdv4WxcLMP06q9umRAl4m3J%2Bb%2BCczufPsU3z637mxm9mmjocMm20HVC29JsZWrwvWjAfCQ5q5%2BiTR802AWY9rrt0PGl%2F%2Br8RRm0b0nWFxdCbRbCo15SebqtmvYIM8BYR0JssNgaaIyPdZpu1T58rJUcHeLKy%2FSLZIKNnI203%2F05KQra0V%2F9qAR2UYc6xDhHeIi9rG3xilpyM9hfY8yMjzWU3HhntnfIdvt6RiD5VWsJkcViP5NScBlYb2k36vkRVGSydueIgCbJMoU0f3ET%2Fho99S7deOV%2BDlKeKKo1P4Rw19PzhdMHQD601YLJlBx7eD45YoaSR6vEYfhUg56Lf4nE0k%2FkwTBwXAwosPLzAY6pgGAjvyUYSSHVCJGYnWFWwpWMeOO%2FWxzUaS%2BpnkF4Kfx5mWOonbgp7BF6JVJ7wvh8z8uL38g9sJ8yWQMX3agmO8mzENd%2Bbbi8e1N91kauii53WfxI1DzdGyUoUZLhmATiL15dUa29C%2FLDE1Osbq4UHq9i8NSAfjLp5%2BlDQaOgM0gsSnQKBDfNs3WQaFmMVtnzS0NPik3umZRb9msqqMvCW61Aje4DnhI&X-Amz-Signature=7a4b4beb64f490b2e05d53555d93697a4416a8afb5b7075971ee4a8ae474e637&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WDMFYPD6%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCLNeKoDnZNIL4XFVFKANotOqOEe%2BmeMCp9S75A8M2KKwIgenFGo%2Ba4HBqFmxt4nOQVQUQAnim0adR0WdmLANVBaUUq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDCeIl%2BjyQRgugjFtbSrcA63SX9hvruiKJEAPnixhjfGWpCj42tOP6XtCt4ywoKN%2F0mOKK%2BMOcae5mvVETzpR7cY%2Fg52yUFzANEUrsj4PhwHAw78t%2B9%2BGiVALWZYi9N7mUfvWl2lUXcuSV%2BrWrXVhgI3XGroVl0UL2%2FzCT%2FwtS9KLXuSUN5U1vkyrqkFNnbm%2F1VBt93QR7QsQLws7QGTVKGfN6gCinLb2kWu3v3UDTDN0YnyWYI5ObB8cf%2FumNR7hwUZnm9Fm7kHC2Om4onJCrEYcmYzr4Uq3kKJAvIBdHgb3y%2FzfLXGbGHSXSJUaGvf1RNzBkgrSZyYABkk3moykBDWieUWeV7ktmkJLGr8lw7FeQPjKtY3X64fu%2FqrCXzFq3IVW5skfTQCdxqBmwO1Yz6AdcfDl4mpu3vqwrS6ja7A%2FzZXZdnRJgT9K%2FsIW77ScvlDBkCgFSqrxkfI2tMUgz4Qf3ZHGHBaz1WIPKvrHuZwowKprl1rc3YDYWYkZgFTgl6Px2ArSy8mjam1saWHz6lLP0KNhUErZVqjmRQhL4pXyG5vN8sb1UlbTP1i1VGc2j%2F8zS1Eo8OLJgS%2FbGmAkTcbEdDVF%2BAIGjijDAhKQsNJrXw6uXSrgHENDtK9LrefWE6ShrWsu3JHxLq92MI%2FCy8wGOqUBNw%2BC6Eii3oRO2b0L2Z3lj55JpDsHCBzyxvR7SNEnI6VgbOOd0s0MuJppmwQfpyiNNF3gAH3v8YO5tm00LZ7hnw06V7nNhtSV9mqurwnJ1UKnXUQF9kDaBfXRx6bXZg42deY6JJDCN%2BAKW%2FfP84%2Bagxyq%2Ba2o8jlQH%2BzHAX4Ury1nA0EN2ijWXTO5gj9ddpqlWYmYCDjkW%2BXDKJFEwnsR%2FFfGmaB9&X-Amz-Signature=00d58c78fea59f8f19d3c08be08090eb995e56ac1d68976d8be88e43613dbdc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7W4HNAV%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD4FnZG4QpqFFOSAOt401eQwqlI3j0djGuExGaLk4CsuQIhAOEyC5iCkQ%2BDM43YU3XFWqcYtrHY5F6BJs1iUQ3FOnkjKv8DCDIQABoMNjM3NDIzMTgzODA1Igx%2FdnPWsPkn4j%2BQ95cq3AMD4E2uwm1dv88W%2FIJJoeMLm1BfGXDjsIEtE5ceyuGEDUx%2Fl%2BzDvf1s1vdy2uIV8FzuX3cy%2BwziBaP3FWEsPShuP%2FRr5F0qLTyF6viTwMyYwsHgp9EqZZGKRBvZobG9nYTy82Ky3vxRUR4NtpUyQ%2FVvMCO%2B090XdjTCYiLOeVuwSqSroHnjxflURF9kQZqDgQz3RmOAWONyPI2BlFmXyU5TZXuJjTP3ZaQ6eZG9uoP9SBSYyMoJce%2BOkp5TYFcYn5QmnOYGRQQV6woRMcvTBnrLK%2BztUwgIKDi%2B%2BsffILFlQ82JEnivDEKU1UnM71vox9oqdPwU910sewsmuEoBNhQlK5W%2Fgnk0c%2Bew9EsETwCMSkgbfX4cOi6TCEkTMcPXiijy05ovXPyemgj78%2B1vdtWndWWf6as09sqm%2BUtktnjEnFwr4UQU%2BzHdIsEXOPb3nOeYlB8ryJHPDwtMxA1ZME%2Fn2IpYAzW9OQSxiIVdthRgPn9RKcIphCc2KOAcrSH4LjzbpkiGYSNQEy2XYagvE5kc9vJJLFCCfuJLTmL9%2FsVFura02qSp6jgixHmrNTjhotrgpvI6zc3kpHDJiwTRl6VYgiSFnCqJ%2FXy%2FLM0IKaN%2FsqpF1OBtLUnfIzUYjTDEwsvMBjqkASjW9nZpU8ihtQDYFSNEP15RtnElE8omhQUw1jgFlNWsHuR6u%2BoT%2FxsjpsUSMGkheQJDDkcNQ7eUmxJlJUggLgj5N1%2FEH%2FuxB4YQnKgjx75f9AXvAfQ5Nv3tZJGexF%2Ba7DzDJ0r4UHxQJobJItj8TgWCjZeLVf5mQI9d3GicbqoawfCzNwvVw5kWwiC0i6Mn2qKK68SDWjQoldbeZHUfCZ2eCxon&X-Amz-Signature=095803841631b29f9d8899a9d659986545e2ae540419c41425d26254344925f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q7W4HNAV%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD4FnZG4QpqFFOSAOt401eQwqlI3j0djGuExGaLk4CsuQIhAOEyC5iCkQ%2BDM43YU3XFWqcYtrHY5F6BJs1iUQ3FOnkjKv8DCDIQABoMNjM3NDIzMTgzODA1Igx%2FdnPWsPkn4j%2BQ95cq3AMD4E2uwm1dv88W%2FIJJoeMLm1BfGXDjsIEtE5ceyuGEDUx%2Fl%2BzDvf1s1vdy2uIV8FzuX3cy%2BwziBaP3FWEsPShuP%2FRr5F0qLTyF6viTwMyYwsHgp9EqZZGKRBvZobG9nYTy82Ky3vxRUR4NtpUyQ%2FVvMCO%2B090XdjTCYiLOeVuwSqSroHnjxflURF9kQZqDgQz3RmOAWONyPI2BlFmXyU5TZXuJjTP3ZaQ6eZG9uoP9SBSYyMoJce%2BOkp5TYFcYn5QmnOYGRQQV6woRMcvTBnrLK%2BztUwgIKDi%2B%2BsffILFlQ82JEnivDEKU1UnM71vox9oqdPwU910sewsmuEoBNhQlK5W%2Fgnk0c%2Bew9EsETwCMSkgbfX4cOi6TCEkTMcPXiijy05ovXPyemgj78%2B1vdtWndWWf6as09sqm%2BUtktnjEnFwr4UQU%2BzHdIsEXOPb3nOeYlB8ryJHPDwtMxA1ZME%2Fn2IpYAzW9OQSxiIVdthRgPn9RKcIphCc2KOAcrSH4LjzbpkiGYSNQEy2XYagvE5kc9vJJLFCCfuJLTmL9%2FsVFura02qSp6jgixHmrNTjhotrgpvI6zc3kpHDJiwTRl6VYgiSFnCqJ%2FXy%2FLM0IKaN%2FsqpF1OBtLUnfIzUYjTDEwsvMBjqkASjW9nZpU8ihtQDYFSNEP15RtnElE8omhQUw1jgFlNWsHuR6u%2BoT%2FxsjpsUSMGkheQJDDkcNQ7eUmxJlJUggLgj5N1%2FEH%2FuxB4YQnKgjx75f9AXvAfQ5Nv3tZJGexF%2Ba7DzDJ0r4UHxQJobJItj8TgWCjZeLVf5mQI9d3GicbqoawfCzNwvVw5kWwiC0i6Mn2qKK68SDWjQoldbeZHUfCZ2eCxon&X-Amz-Signature=14568f725f838b151d9205204008e18154765d315332faa63cab71041eaafb4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664D62HWQ3%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJIMEYCIQCGHIvFeftz2WUoLfTgwUYWxe5XBwGZZRJz%2Bv9rGRopCQIhANPYfM1uM0SdNqEWNQF2GWYEi8lMoLD6zaSw5uNUMW8jKv8DCDIQABoMNjM3NDIzMTgzODA1IgypZkaQT7FRXHUNByoq3APCITqxtFGCS9oKPJls64SPvaXolNc4%2B7YjRp18YYrroMS82yf21TYsaELedFnTMxF0gAhZ4i0DRD42WvDnBQstt0JHN4hxLpgdzuzu6NkP8fynpKCVXqSAwjZM0rdtkTKYhdOo6alFxsIPi7rWl0zNdMh7ZMLazoqMtIlAhtwNLR%2FBgcsM4b2EFHYKE8C1R8IGTECpVITT%2BbouF8C7RVP67x6dVGXh9wOxIierMwP1IiwVL6z%2B24gQ%2Bf4EmVXwjtNxvgGIqbxu2TF7Pjhh6z1XimimBcmh9NFpUmppnFGD2O7e5VqQ%2Bpog9KYigtZFA6B7I%2BL%2BIaQs1FxOSoAFCq1BfPy8gMrHekPSAsvScA8qGdIWmHL9GCwPIgFGYmyTbTB8SpOwMP3TOJ6ino5tmcYKKJIVJYEyRg1cbFG%2BFCGppBUr4qF93EvJtKlV54sheq296P5oj97WQGet7I4lEuXIUj7E02quFSDj%2BILSBugYz%2BNkCLc3a%2BMm8wC5D4QeeHHekqSppl2en4ugc5%2BKvWI7rIwebcJGZwbJMd9mL5Mm1c2Xc6Y%2FL%2FBqIHU%2BMWPfWnbFKYyNXmBTVgheObjai8%2FvjfmWTvDUSJ8vN%2FNWdrwUX0KMbNeh3EgkUsRJ1zC6wMvMBjqkAfsgl8wIgZlOPXiNjre1S%2FAXDByR%2BPJ6Zwf060Jn1QUx%2BYHwups2%2BQrWfzjiEa0GU7tD8gjj1BNzRVcq4GyhGbrGBpZEQSVCOmvhDT3S9XAYyXc6SDuowkUuk484Vfj7KhEF9fyZ63c5pfRoMF%2FnO7Zpfnfs4iCVASq3FmQRPQ7WS5EXqSPKX38bQuFWlX8XEGVhYW5NV5yGu0IX89OyjkXaWC6l&X-Amz-Signature=4118ed5e66566a405d5268abf1ae6c9880c247c4f9896ab07a401a931f21676d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L5BZWCF%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIB%2BSxkB2QytclI4MhjVBLMHoMMa%2BdujaegJNEqfQYVdIAiB0zQ0QJMYVAyPv6sTNxW8nk5ta36Je2UsfnYfcUmN28Sr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMiEJGve7HJJfs39mjKtwD%2FiaJSnxOtAVw57WMxIh3ACIVXYobH%2FB0SU%2BYZBEHl0fpSGKxmhgZ5No0hHuCAtXO645EVtPA%2FFQ3%2Bl1YkvcpDeaHER1Q8k152mCC3JmAOP9Y7ck62gvg1tHIqjO7MmX9JC%2Bx%2FFk4IST241dWZHiRybDiig0MuZ7hDjpc%2BFfkT6e3PHgEChKJXmjSTk%2FQP3OF02XuUZMxsiMYVelem2jbXPLtKNfZywwAVrMMC4YKznaHj0DC89cNf2MV4MKq2XzXk6Ut5zZE2SCJ%2B1lZfyjpg4qKrigvPsvrOWGA0VSEPahNoYFdUiMKZ5uicCR6F7cH%2FGyChY2beYKptrU8XCxObbXRGL1b2AGy4mPG7pe9xcdLaJ2U5qe5zKalAH%2FXSUa5%2BJOQNwsBomFb%2BSSVHE%2BuwIdxHUM8UWNMBiRI833xcZQYq0bZqvqIUsDwgIa9t4Ek8gqb6ivRE0mDX9OYwi6aPY%2B4V8nrzW6hGY3D%2F%2FyiWzCMcNqC30vYmf7TYPu4lJclgaTqm8BBT%2FsDh8OBGLsve%2Fs2QIzv2h3Hg6oPTW0ktvTdYMIHavjpNwG6t3amh2GoSjckm2UUao6MQMHpkcCCmzNW2cWmVcqJmx7U8EqrqrtH%2FMKgq9I3GLs7kMsw0cDLzAY6pgELeExCQf1XtkfjY8b65SgKbvxvZkvh7rnHc%2FUf2FtUW0Ba9LpkSXwV28JgHv6%2BFuG%2BJ1TVcavl7%2FU1%2BP7kKd%2Fbv9RwpInQrP4tZto39uXsCVzI6zgbauAhdHQjaSXGNe5f3zsJ1rkWfbSZLXeXnajacb4k%2BGpqs70KBo5C3l%2BuHl3Zzm%2Fe4kt8SPPhVUbGrVwJ8%2Fb9w2Id7DQ5aDd0cL44pjtEnhC%2F&X-Amz-Signature=6c6f1fd7e78f198ddea25f57ce252e16a579e933fdf5e05f33fb93a501f360cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662L5BZWCF%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJGMEQCIB%2BSxkB2QytclI4MhjVBLMHoMMa%2BdujaegJNEqfQYVdIAiB0zQ0QJMYVAyPv6sTNxW8nk5ta36Je2UsfnYfcUmN28Sr%2FAwgyEAAaDDYzNzQyMzE4MzgwNSIMiEJGve7HJJfs39mjKtwD%2FiaJSnxOtAVw57WMxIh3ACIVXYobH%2FB0SU%2BYZBEHl0fpSGKxmhgZ5No0hHuCAtXO645EVtPA%2FFQ3%2Bl1YkvcpDeaHER1Q8k152mCC3JmAOP9Y7ck62gvg1tHIqjO7MmX9JC%2Bx%2FFk4IST241dWZHiRybDiig0MuZ7hDjpc%2BFfkT6e3PHgEChKJXmjSTk%2FQP3OF02XuUZMxsiMYVelem2jbXPLtKNfZywwAVrMMC4YKznaHj0DC89cNf2MV4MKq2XzXk6Ut5zZE2SCJ%2B1lZfyjpg4qKrigvPsvrOWGA0VSEPahNoYFdUiMKZ5uicCR6F7cH%2FGyChY2beYKptrU8XCxObbXRGL1b2AGy4mPG7pe9xcdLaJ2U5qe5zKalAH%2FXSUa5%2BJOQNwsBomFb%2BSSVHE%2BuwIdxHUM8UWNMBiRI833xcZQYq0bZqvqIUsDwgIa9t4Ek8gqb6ivRE0mDX9OYwi6aPY%2B4V8nrzW6hGY3D%2F%2FyiWzCMcNqC30vYmf7TYPu4lJclgaTqm8BBT%2FsDh8OBGLsve%2Fs2QIzv2h3Hg6oPTW0ktvTdYMIHavjpNwG6t3amh2GoSjckm2UUao6MQMHpkcCCmzNW2cWmVcqJmx7U8EqrqrtH%2FMKgq9I3GLs7kMsw0cDLzAY6pgELeExCQf1XtkfjY8b65SgKbvxvZkvh7rnHc%2FUf2FtUW0Ba9LpkSXwV28JgHv6%2BFuG%2BJ1TVcavl7%2FU1%2BP7kKd%2Fbv9RwpInQrP4tZto39uXsCVzI6zgbauAhdHQjaSXGNe5f3zsJ1rkWfbSZLXeXnajacb4k%2BGpqs70KBo5C3l%2BuHl3Zzm%2Fe4kt8SPPhVUbGrVwJ8%2Fb9w2Id7DQ5aDd0cL44pjtEnhC%2F&X-Amz-Signature=6c6f1fd7e78f198ddea25f57ce252e16a579e933fdf5e05f33fb93a501f360cb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SDATYS4J%2F20260216%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260216T103628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGkaCXVzLXdlc3QtMiJHMEUCIB95KSyI%2FFdVPbZ6QplI3Myf4us%2FBkTefgqUFM1P4vtAAiEAo90DIa00m327aZaazOzir5at%2FwSa2LOWTX%2BLQ4Ial6Qq%2FwMIMhAAGgw2Mzc0MjMxODM4MDUiDJ%2FJLKhBP1TvN17L1ircA96VEn1m1evVYjxaPaQh1D5K0SllT5avSx0D5%2FcWgKjdxxW1SXiEYTvg2S%2B3BnOvB31G%2FCWoWO2L9qhJX0XEd0%2BCZDo6my7%2FuqTM2TlKGo6S0m%2BI4OwQYNtG7lqvopkKbfjuvyY7BVG%2FZQiFangtjHXsyAxp%2Bi8TnUbZijR6hyvJvlqv8a1lrTRkBH1zOU3HxOYGWq3LHjg45dHRnLXjcIomT%2B3AWQH6KzGr0dJkpLcaLO7%2Bw%2FlF8tFOvS5Y4N6KQlHYLGm0suCWYUL04pQPQlNcHy0W4wYUkp6k64pwJaPneua4SuS%2F%2BdIGgAwO7sCniunbabAAwIXnCtI4GaSIOrJGxHypkOwhsJX0J5pZgD5x154ZO%2BzIlyqGjjxa%2Bgr1tq5Of9EurcZ%2FnWKb65gQN0eq8Y601OBevbApQgKMaah%2BgHeLEJcxU8dCjce1Vnm%2F2EbTe%2FVr15O39x4KEOlQHiNkYtpRqaHprmWOHcGG4UUVtA0%2BIl4KCCCb%2FJ7INRTfKpDJOSysKqLHoie3CLN8G8jYCNYBNsWSDXbwRS2m11Ic35uGDKQR1R7TCiEKwQxoei5vHHZH342EjET6Xrjfk%2FPDUBV0sGYVQlGoxoZbczLGKa1sriybgV1dub6iMLvAy8wGOqUBYfCf3etIT3ZE8reHD2OlnJC%2B%2BM3jMzDq9UTay2Tw1idFdZdb4XtnnIljBs4tRya3M2n2r4e6J7mR64ni%2FXlvxTRxKnG0C2hXL9dSj0G0A2aCjo7a2OVIQQf%2FWiwfsS3LWVs5zX6ArOjZpe8XEPXYji7tjyQGc3%2Bz2J8Ng3QRR9h4nVYl9K7BqUlVdj0RrYmOBlbkqbekm6F83lk90AqsjrP02yMN&X-Amz-Signature=7ee33c5c9569e10a4624364fa5a1bbf808cd1e06e725c7864d3581acfd3dc468&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

