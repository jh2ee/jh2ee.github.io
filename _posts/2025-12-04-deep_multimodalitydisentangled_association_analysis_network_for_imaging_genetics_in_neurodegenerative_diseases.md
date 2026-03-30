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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MTADPJC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCm7Dbq9JxQCPoQz88Si5m2fjM6EMlIdCR1p0OA7HeSyAIhAK%2FqZyJlkZbSasdilCxQXmUrRo9S2m%2F8KyGtrbIQdmwZKv8DCCcQABoMNjM3NDIzMTgzODA1IgwfJ%2BPIEmCN1hnLuxoq3AOEIJiD0GzAQvrjN%2FKDbGc5yU1%2BodQWL3Tujj0KIKIxaIMD%2Fd07x0p5J73MKMrdJPFTsHIuQJU5x%2FVhofZDMcA8FHVDQekJbBAx5wz1IEJGk27plxAaJILSPIVA%2F1oWRF6aAN250U7S7eNMfcRoXjYhyvI%2F7Uv94scaNNqk068SlNWz4xouhJxVeEd6tMmG0Pj28xwWrrp4IXT3cEl1BQHiDx%2FNTM1KRh44YIJhq2hcUBq4rTPwW9hTwWb3JYymRCGEY2pRyPejUH9TZ4yER5IMdffkjk3js2hwohlDZ32q6zHeQNZnQD7Lf%2BO7eGUNtjyUBBO8fWuzkCMRFdBh55xJdf4NXPWgmybExSRN9gakE%2FKrsnFdCKtf2IkiBmVuiF1kjhpxoSGjK1RSvushLBLrAdKNF89lgTfJBRWwtFM1BoXsygrHTEAQiSLZ0C27ZnMhE1toUtN3wW%2FRGgcVVjco1UXzC4x2cvQ9WRSU6MxYzwhMaMaWJFQxTQjAzHMVx6PioYMzCAfsVIIKWo7Q0zybLuY4g0FmBPmmoBHHQoR0kl%2FwQcGKnvvw5x9jgqINiPYIlB6A1Y%2BknLTz3B1ylMVxeUhyPf82cS9FJMa58on6nhsVLDo2hahMnhtYDzC%2B%2FanOBjqkAcvWv7%2FNdpGciTvfonq%2BtIe%2BZ%2Bn%2BO86CWnl5lNYH27%2BBKZ76HBbZImxtzNXylek7FRGC5Gm4gVIDxj1ROT9s%2F6wo0Bh5k9qEwLyLrhWWXh3GTG3uXx7Dr%2BHEv2e92txUhohul20PTp6%2F4ttP4LOOOWwl%2FeAxQrhiULST0iRnIQiOCk1gGCNn5kEENGbtTPGt%2BUtn5n89RN0JhTY889UaLmJlQjfF&X-Amz-Signature=61c1ee6d6b803b4cb6b401032eedab005535096ff12646867c0293b1697c8eb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MTADPJC%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCm7Dbq9JxQCPoQz88Si5m2fjM6EMlIdCR1p0OA7HeSyAIhAK%2FqZyJlkZbSasdilCxQXmUrRo9S2m%2F8KyGtrbIQdmwZKv8DCCcQABoMNjM3NDIzMTgzODA1IgwfJ%2BPIEmCN1hnLuxoq3AOEIJiD0GzAQvrjN%2FKDbGc5yU1%2BodQWL3Tujj0KIKIxaIMD%2Fd07x0p5J73MKMrdJPFTsHIuQJU5x%2FVhofZDMcA8FHVDQekJbBAx5wz1IEJGk27plxAaJILSPIVA%2F1oWRF6aAN250U7S7eNMfcRoXjYhyvI%2F7Uv94scaNNqk068SlNWz4xouhJxVeEd6tMmG0Pj28xwWrrp4IXT3cEl1BQHiDx%2FNTM1KRh44YIJhq2hcUBq4rTPwW9hTwWb3JYymRCGEY2pRyPejUH9TZ4yER5IMdffkjk3js2hwohlDZ32q6zHeQNZnQD7Lf%2BO7eGUNtjyUBBO8fWuzkCMRFdBh55xJdf4NXPWgmybExSRN9gakE%2FKrsnFdCKtf2IkiBmVuiF1kjhpxoSGjK1RSvushLBLrAdKNF89lgTfJBRWwtFM1BoXsygrHTEAQiSLZ0C27ZnMhE1toUtN3wW%2FRGgcVVjco1UXzC4x2cvQ9WRSU6MxYzwhMaMaWJFQxTQjAzHMVx6PioYMzCAfsVIIKWo7Q0zybLuY4g0FmBPmmoBHHQoR0kl%2FwQcGKnvvw5x9jgqINiPYIlB6A1Y%2BknLTz3B1ylMVxeUhyPf82cS9FJMa58on6nhsVLDo2hahMnhtYDzC%2B%2FanOBjqkAcvWv7%2FNdpGciTvfonq%2BtIe%2BZ%2Bn%2BO86CWnl5lNYH27%2BBKZ76HBbZImxtzNXylek7FRGC5Gm4gVIDxj1ROT9s%2F6wo0Bh5k9qEwLyLrhWWXh3GTG3uXx7Dr%2BHEv2e92txUhohul20PTp6%2F4ttP4LOOOWwl%2FeAxQrhiULST0iRnIQiOCk1gGCNn5kEENGbtTPGt%2BUtn5n89RN0JhTY889UaLmJlQjfF&X-Amz-Signature=61c1ee6d6b803b4cb6b401032eedab005535096ff12646867c0293b1697c8eb8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VB74KYQQ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141616Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDk8TA6af7YCcazJK67JlHeqCvnjr2Hqs%2Bh5R6qGGWI4AIhAMGGCz7KQUW5cJlJ4kOayeim%2FQ2TUtms0eMXLy9Hoq28Kv8DCCcQABoMNjM3NDIzMTgzODA1Igy6cO608eWABb9GLnQq3APVbjQAHR2%2FDp0tgmCWC6%2FJm73pUcjGyl3v0e28QZDoIh9PtWkQbScREEo4ozbyzgafPkAt83tOywQNdXiu1oYF5hCidAwsq5w7C3zXvc4HRnGMl7shv%2FFOMF%2Fu24JAduJ%2F%2Fr1hIs4b%2F20kM3bTGveZxADMvQ%2FUmPWMl%2F8IhgaNaIi2Km2wSMUGAQTG4TgI%2BBhRKZln6gYN%2FE5L9P15KY%2FVEQoKMnHFPut9QzgP7Wkma61fFnbTPwbMdZX1PNSWvEraHjQcnOlW0p5gNJ8WU%2BiPx092y%2FxtwwqIBStQm0HI5TOa9ufjESxWwuQYgJvJcynhG2SXAZy%2Fp83d%2FDRoe5VMwAPaHU90SMM2f9zftO5aOQzUqLxTvaiM7ih2s9DEQefW2MpWS%2F4TzIwS8v24K%2FZLuA39b6cMeK1CDEleyVlicavVgM4dq9JB2uSYMvRM84hGONC%2BKrfBIn341MhET6C4tYew4sh5Y5xD8EUdajh1%2BG8yby%2FvvewBuiginVRUNrFZQxkjX0XHPHwKCqVVzPHFGFPzpiIpFrryJCMXwSkB0elPlMqtCPP9s%2Fky9WFNQWn4FCNy%2F0F5Y%2Fxa5D7reBRQfMuQa6c4Ew5pjOZmTBaZcBJTTzxfrn%2F%2FIRmc4zDu%2FKnOBjqkAQYddoXtjCszU07%2BGPFRC%2F2LIkbT0txV%2BIh%2BNatiJam%2FUDLvw12l9DSFOKSSGE8veGPPbZBi5xW1k9GF2ZCjLem4DE0UzlxC%2BmGZm2dtn1a9stVmCcmNECcf%2BqE5KTAEqKi3ryAKh361hBFhfcSvqQ8MH6nXfMKpj%2FReHDsBm4tJcN2SbzgwAF4ab7zW%2B3CvNI9Bd21d0BpfrsI5zJWSqkvECB0R&X-Amz-Signature=3a683aec3f00aa27dc0cc9110ce6727f5c381b2f2c1e209d46da5ad46e4a2dac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWYQZEGA%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIE4T2Zgy0z%2BGCBJJiqI%2BWVJBkZX6Q1F1J%2Bg03lNiwiirAiBML5Pexfb%2FsuczMscrzXaGcRkGA6i6DgTSktlmCJJpMir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMyirJoruqn6hmM83IKtwDTvDSZBlgPDdW45yZHiUPgl0y9tfIATbtkiX6YRlRW1DyhiDBC9ofHWgzar0ocvUhfwCLXdwezh5Iru5UmjB2V%2FHiOeDBgIUhTisL8hspcDruKCdAzQSUCvYZ3eV71y8Gdg5n7LG0dMHiNYUGmiFIvLm7fkGMuVr5I638vXsYqtEzt8ju9tjpADv%2FaYCFLR2HRgEOCj6do4omfL9SbSs%2FiM7JGT5pp5ST5D9AYMxlMfGdqEiJbTOQf7nY4aVU36t4jMrZsjvH2ErFpn4rsPNtNeVKnynnGuSGolVEBu7c85tsjLF5Ox2cnz0CKz4aijltgBO94qIxoabUUMGgz3W59hRmksk4ccdGI5uuMMyZHOKVbWIAbswqZ%2FMOapatMJY5Fbj3RCjErDcGhgHbTbkADm2j12h4lOVl6psKQrB1by0N%2F33MyQ3a4q31JrH2naKG0tjCSMsw%2BGLK%2FY1cG8sy5axK4wJePrbkdYTMxdGjrbt9Ry6wrytg7eRdtZgWGo4OzokMLmNDPLV9E5vWHpGnZwM%2Bj70CMRaRzY1GFETSk%2BbYq7fn7NZ8Z0OoFWWznquiS4BJhPJbdHMWcsKKQeRChnvJvP3JHOr0eQvr1oOvtnpSRhcko%2Bpt4MxC5qsw0%2F2pzgY6pgG%2BuHg6hOc6bBsYy%2F4zZaFp7Kdg571F2T%2F7f82RqE726ysjYZ8NjOVSDvII2VKXJFH6ounvAB1WaV5J37iaJaj%2F84TCffgCK1XVzsE6WoZNrQVSRmBLffuSlyv6kO2FObRLCQR14ItQ5s1JtZoJUaIotXJKzrpaUycbhepyds2CoR1cYJDKdfiXeCzituLo4QsNX60Ts%2FFY9mcVec17Sq%2FRxIp1z99o&X-Amz-Signature=d1078fc16dff6de5be5093c18a6a97d653b2ed9208a55d180dc816f5cfe2c5ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWYQZEGA%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJGMEQCIE4T2Zgy0z%2BGCBJJiqI%2BWVJBkZX6Q1F1J%2Bg03lNiwiirAiBML5Pexfb%2FsuczMscrzXaGcRkGA6i6DgTSktlmCJJpMir%2FAwgnEAAaDDYzNzQyMzE4MzgwNSIMyirJoruqn6hmM83IKtwDTvDSZBlgPDdW45yZHiUPgl0y9tfIATbtkiX6YRlRW1DyhiDBC9ofHWgzar0ocvUhfwCLXdwezh5Iru5UmjB2V%2FHiOeDBgIUhTisL8hspcDruKCdAzQSUCvYZ3eV71y8Gdg5n7LG0dMHiNYUGmiFIvLm7fkGMuVr5I638vXsYqtEzt8ju9tjpADv%2FaYCFLR2HRgEOCj6do4omfL9SbSs%2FiM7JGT5pp5ST5D9AYMxlMfGdqEiJbTOQf7nY4aVU36t4jMrZsjvH2ErFpn4rsPNtNeVKnynnGuSGolVEBu7c85tsjLF5Ox2cnz0CKz4aijltgBO94qIxoabUUMGgz3W59hRmksk4ccdGI5uuMMyZHOKVbWIAbswqZ%2FMOapatMJY5Fbj3RCjErDcGhgHbTbkADm2j12h4lOVl6psKQrB1by0N%2F33MyQ3a4q31JrH2naKG0tjCSMsw%2BGLK%2FY1cG8sy5axK4wJePrbkdYTMxdGjrbt9Ry6wrytg7eRdtZgWGo4OzokMLmNDPLV9E5vWHpGnZwM%2Bj70CMRaRzY1GFETSk%2BbYq7fn7NZ8Z0OoFWWznquiS4BJhPJbdHMWcsKKQeRChnvJvP3JHOr0eQvr1oOvtnpSRhcko%2Bpt4MxC5qsw0%2F2pzgY6pgG%2BuHg6hOc6bBsYy%2F4zZaFp7Kdg571F2T%2F7f82RqE726ysjYZ8NjOVSDvII2VKXJFH6ounvAB1WaV5J37iaJaj%2F84TCffgCK1XVzsE6WoZNrQVSRmBLffuSlyv6kO2FObRLCQR14ItQ5s1JtZoJUaIotXJKzrpaUycbhepyds2CoR1cYJDKdfiXeCzituLo4QsNX60Ts%2FFY9mcVec17Sq%2FRxIp1z99o&X-Amz-Signature=c2c2c7426ec12e8cd9019648ef822057d18f6973f5dff827b7f07731e2d46b1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U7QFBZKD%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDm7vGOAF1iJiQjc44xqe5PaGSPY4XuV6KC4lRu%2BQ5qpQIhAKSf50nnWNGupBgN6g2IwT8ZB1CQUtejpxztsKDZZVWiKv8DCCcQABoMNjM3NDIzMTgzODA1IgxJuqsByMIXNSNGrmoq3APpbhG%2BhH2x4sGW1qDof%2F5mGGGJ0p1Bltj3JHptIIXiMERHcniDUbN5f5p4%2FMptQPCL8hZz2Z4B6l%2B6gjeNBrAjWwXzmvcX7o0TjI32RzrrNB2lrn9Pw4uP24O2VUOSjcE%2FEoxgiwH%2Fb2IZ5eBUdyzN3jAG7t0rt9RUgM3KGm6oVMQoZCgd%2F%2B4QM%2BgKtQSJYd7DSlC53lNx7O7U8b9CSPkkh7OHTtbaOZchp6indznvR9C6yE2brGMSB5%2BIpiFn2cLUnoONUQjX8K%2FmwbNkYsMvgMNniRAr4iz8Ix49q1LeVgn3WGrcXtBFNRwm0zsXzP0Dit39ZaYtOl6A%2FzafgikhE0XNlapkEAd8EPfvsW158crlApI5Er272d8FdBFvCMRjDLz7aYiFnvzIKxHf0vDEIWvINn1fOUpjypJ3shS4%2BgkKp1a2IzLcGWRbUdV8Svysnkgm%2FwoScIbgVtcWZls%2BjJmOL0KDUI0TIDBIlxdgTXNw35kGBbMsemMnVHlvUciVnaNjni2T9Zpr6O0gqu2Xhc7KNFwKcIwVC%2FUMgvxllQqgdp95XKs%2FMMHV%2FvBBFbZuZqWPgnqSNDgrR7DkqI58Zv7dAH3%2BQEU2sIBQvkBVRGIidA%2BR52Y%2F77rKqjDR%2FanOBjqkAQH6UpLukk0ecUrIesXbfqGP8z84WTpwJlEg%2Bt6GWWHWaIAgLhLhyt10rmWCwHzzcluLLLsnFVTwmAyBwFo%2B4QuAbmO8nPNBDi1DscnM1plt3ySVW6SENTwB%2FeflsOXU0UpUGJelQF53%2BkRN5u8HaCqTifdMHKii8aRoTD1PgBd5OiYdMP7xp6ArUiYmAbULEM8nyC29FBlN2DPhjhM6OW%2FTJ7GW&X-Amz-Signature=fd8a94d83e3793d216e74ce4f2a0408b500827154f70edc60d98b3245b70ab02&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665RBGI275%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141618Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCjzYI%2FBW7pnA4t3xZml49QTJdIcnr8mg2Y9yDxTlTqDwIhAP6VmAWH3KwonH%2FdVpTu4%2ByIub0BNgyegkA%2BTVIaUP9dKv8DCCcQABoMNjM3NDIzMTgzODA1IgwNrNy%2FagsyMCcI2Nwq3AMW79x04YsSBnbqwR6Wc2shBb25%2FeJbZFsWjgzBI6jYbaHakJ7dOtWoT9xz%2B06ktYsK2ItCDCe8F5ShxdqIQSmNOX%2F0m7LJkPfTHu8mOTQETXJO0Lp8CmnItBrwDjWWBEkPFp1qL3shI4IFWAZ3fxtgEY3Kr7PmqgoHid1U8PiOgp1hiPfwXaWx5FceCQ4cCVMKsPSlmSzP5uIREDj9FiceECKDYAUbjVkpYp94pmJ3UBRAlKM7V%2FlR1RpmdKRrMr1493nPtZq4d0ddH9TDcO8au7WsXngLQI%2BllCotnL11YNXz%2FERcWTYna9%2FRMlVCRIkCYYNdEloK1mkVP29J311TRsgDJfXebmNKhkvq4HU1Upws31Apb6X7X%2FElaVXJPK8GYafaQWJQwZd29CeSKEiu5XqitAFXBjhcVhmuaf4QEBCsDGbdX61SSAC8%2B%2F6cl6MvDtsVFgK5BsP%2FKslhDBdbbaC%2BlFY1eK5f8gVmdMDenIxFszPk3vk48ZJXYjd4zqX59zlIpZSvfX1WuM1VhPlfSRKaHdMjOHccbTvc1pxPml1eAIpFR6lbqW5%2ByHIURLIYIM4xN30hrNNtUeB9qjNCrY5yfdZjO6o%2FHMmwJONcatgAkUjKtxTRrIJxrTCf%2FanOBjqkAf%2FmJ362QTZ1fT7WMvAUrKgquYfzUIMxUr67SLZs2OlD99E%2FSsikALwtTi4f9d3EkK48IIXJ3EoS0cCQbBYJWgGj7iYT%2BBkWaJF%2BzxrP2Wh99%2FeePYZ25A0nXl0H8b9D4SPsi24OoeC5Ky12pcvX0MRY34WoLUhmT%2FvewaQxxveTOmwTT1QLeCRaUn3VZ29ApQaRhGPuvbB7AFetEoQqdD0j6val&X-Amz-Signature=62aa417e51fa3aeea17c94eb8d02d9d68a67314da74d799f5fad42df03dbe315&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UHD6ZICQ%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIB8DPr4V6IFw%2FOmGp8E%2BvqzVqho3Am5llrO96nXqEl4BAiEAlICMiYZ%2FcSO4Rwy7Avrwl9O222nA5s5CFFXeiU%2FvcDMq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDI8FhR0G9THjlwbrQSrcA%2Fppf1p%2BnVAzk5EjqiLlfMxsAvDNzpqc0cu3Me2PllohBwj3Ehxl0V%2BkPIBfiXFPFHpXBrpaxfuxGtuZJ7Ov%2BKBoJCpMaS1fbdKokHgYaxU3k2NcglxOlsCqeG74YLMco%2Fhw0FV5W3OljtJuKagrAvaZcP9DlTkyS%2FBIaTWApoqNPvSRVFnooaSdRZWRWCV0HmoYj5fjIHKzcjDOrwZdqkNRzaW91c6v7EEO7rSyvPsDQkSt3%2BSCKOZgT3QHZvVZD64RRkqcihnI5Cbw4%2FRuaIp8Ym311VUbi%2F37Q5gZhnxrCZuY2ZQ3YdlCYdtjU4EGKKOfxPg14gVOoUdg%2Foz5bDoQpaAb%2BZHV8eo%2Fk94whb6dWp7Ka5Fw0sOHsRGsupeNF6G%2FOx8x94r%2FS6PedGplcNiTqrly91z9z94Fvnqkt2USoQAa0SzrRUdhB7gXi9UcpP4N1y%2BKwJuEztvPR5nc%2BvrPh3%2BYsYnu3cHYYL4sAtu7HhCH4IlRh5P4T4Gh9zyEgy2QsOoUBLgGWFWnRPWodBEzvI2vpcmpybmbR5OCpuZzabD5eCPp3mv%2B%2Fopk6Cvn9uBAnnJzADVauQQ5aFa7elRGy9W5iWz%2FLLjrHQO326gSlatK3knbdIfb1nPbMJ79qc4GOqUBU0UJJyb8urjig9r2NwpEpfQXlo49rpBSNksSWVu4zbAeU7SL%2FKFfOREkcFrbH5bdAdYGy%2BFFesQ6TfSWLsfH9TQ%2BfKKx3TIPRu8YRcbf13oazX1%2BEbieIbU1kIYz9NgbKgH1IBNYcyF1r9spLkKpjhaU%2FzMX6SzoXZ8ZmqwEp7exWsLmOVpbfrjr8%2BNko0yeRN0SbtqWAodPteKE5hryMWmUtjvi&X-Amz-Signature=205d68a133a8610c00a8dcf9303a2fc38b68577afc8d02dac50ae50efa80ab65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XM2ATJHH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIANmihBxj033Cjo23i%2B0iKQ7ucSeJywVE8lA9o%2Bw20NZAiEA40ukG%2BtlwBo44XYkEcB53oOVbYIcNqazvRMPerGuHIsq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDAr73fy0ZvUbdBdgwSrcAyOHpO1IO3IkoxslIC%2Fx9llML9ZEPhQWOlYb0ybUJ5gfk%2B1qI%2Fv7h8gDdzR1ShRmu7y3uGGYQkcgJ9PpYFcJviP0s8HepJhCpJ9JyMEEOYS8SCjkBPtXQmUZsp2eBdBHaT9DCodnT7arH5XwXo29VgFUbAP%2BzNqAbikQZeEuWIbRGocnpXhJACd%2BAdSrGuz0jV%2BUXABJwkK47ponNIada1fp%2FmW2gSszFkCJP%2BJ%2ByV1FWouTL5q51UQVXAe1eSchAR9vYgIhYEJ5InZEtrpOZwWWZ6Rk0HNVPHZqe8etQy3Dj5NeT1bgTjNG1NvkBLlHqsutrdNFNYpls0ZIEJyy4yfYmaPXM281ertALDWxBBkrV7DGDgLXPr1BymEfT%2FAOG%2BKU19ZeY4weX8TEK4%2BWK4J4ZbGwOLlq6kPrJyCxhxhQaWJbcBO82ZdGlFe7VLmpAzuAWKiMDaOExcc8ZHUFi9pWQTQvZWvIOkcQIEvPtAv6nmhSxt%2FcE1ZFywCDhS9lBXM7HZeU%2F6CEeZ%2FW5F6EoAv3OIwOPSgO7RnInr3Cc82NbTCuE7NZjc55bshhZCp5ObZk1SgW%2FKCEcu73uHgtXKWyz6vBhfROUZsbxYYG49Cjty2zbYx7eJ9uO2qyMKH9qc4GOqUBmjyn5gPjleNyMskiyOgpr%2BCv2nfECBI5bH3NkS%2BHkzS2gWLYXo3o%2FpbtLe6UapkimpD7IXwqUTdrwlMjshmtpdEa2OIyOhJeO27z%2F29y0SXP3szV%2B0ok1n8CoFNoLniXNYdvCVjwv4NhZ4syBs1kqJnsW1cinUYTrZ6Ut9GgwTKCtsttxvDr8T%2FhQqSFiUmBMLh71OXYMT64feWRZs%2BSG0UuoDJA&X-Amz-Signature=7de91a10e49ac8d7ef99d939d147835b6ba64ae6c7d9b8d3a65fc2474ccd39e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XM2ATJHH%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141623Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIANmihBxj033Cjo23i%2B0iKQ7ucSeJywVE8lA9o%2Bw20NZAiEA40ukG%2BtlwBo44XYkEcB53oOVbYIcNqazvRMPerGuHIsq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDAr73fy0ZvUbdBdgwSrcAyOHpO1IO3IkoxslIC%2Fx9llML9ZEPhQWOlYb0ybUJ5gfk%2B1qI%2Fv7h8gDdzR1ShRmu7y3uGGYQkcgJ9PpYFcJviP0s8HepJhCpJ9JyMEEOYS8SCjkBPtXQmUZsp2eBdBHaT9DCodnT7arH5XwXo29VgFUbAP%2BzNqAbikQZeEuWIbRGocnpXhJACd%2BAdSrGuz0jV%2BUXABJwkK47ponNIada1fp%2FmW2gSszFkCJP%2BJ%2ByV1FWouTL5q51UQVXAe1eSchAR9vYgIhYEJ5InZEtrpOZwWWZ6Rk0HNVPHZqe8etQy3Dj5NeT1bgTjNG1NvkBLlHqsutrdNFNYpls0ZIEJyy4yfYmaPXM281ertALDWxBBkrV7DGDgLXPr1BymEfT%2FAOG%2BKU19ZeY4weX8TEK4%2BWK4J4ZbGwOLlq6kPrJyCxhxhQaWJbcBO82ZdGlFe7VLmpAzuAWKiMDaOExcc8ZHUFi9pWQTQvZWvIOkcQIEvPtAv6nmhSxt%2FcE1ZFywCDhS9lBXM7HZeU%2F6CEeZ%2FW5F6EoAv3OIwOPSgO7RnInr3Cc82NbTCuE7NZjc55bshhZCp5ObZk1SgW%2FKCEcu73uHgtXKWyz6vBhfROUZsbxYYG49Cjty2zbYx7eJ9uO2qyMKH9qc4GOqUBmjyn5gPjleNyMskiyOgpr%2BCv2nfECBI5bH3NkS%2BHkzS2gWLYXo3o%2FpbtLe6UapkimpD7IXwqUTdrwlMjshmtpdEa2OIyOhJeO27z%2F29y0SXP3szV%2B0ok1n8CoFNoLniXNYdvCVjwv4NhZ4syBs1kqJnsW1cinUYTrZ6Ut9GgwTKCtsttxvDr8T%2FhQqSFiUmBMLh71OXYMT64feWRZs%2BSG0UuoDJA&X-Amz-Signature=d148278e43f280e8ad3ab29175dd0c83ed629beb88ab1a3a17aa2d3734e7e44c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z3K24XLN%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141602Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQDJEM5D4arTVis6RtiSqEue0UleMmal9ZO0KY5n9KmxOAIhAPh9DI34nsDHvKtFgpSm1bNgJPNkxrj2WcawAwO8oL9LKv8DCCcQABoMNjM3NDIzMTgzODA1IgyQpr0L1fznsf408NEq3ANnkP7EXivT5yHzaOj5IV9YSr6%2Bd5uuQyRAGfIMpoQx%2FppmSKQGQJZN9HfPv1HUqRLPnm7aIV8gtjM3kXcaN6a8FBzDO6h2%2FVsRYulmSrOgpU5HE6T536LH4Efz%2BnbnJOPubMJMra2PDqBBNXA98U0dMn0DFO%2FgT67gsxNVN15i0XvfRj7yj5BNjdQCsP%2F%2Fwa8QWAgHUS7fPnhPs7qHb%2FSXf9GvRvAUZmFI7EkAoZmXdSRdS2pXfrVKn2gL3nix5crPAyrR8BwKnClykL9QmSLpdZ%2BQ%2FF6DKIHM215xrOkhzJ2WIxqLHKvEctEKVsgxnmLMGwS1B8gz4kJ72yxM0rSKetPSnkTLAActKG3z0Cf9rA6C0hbdx%2By2ue7riy8FS3NglArVT7mh2crnrdgLdqTZHedtiGCbGe9yLZEHjGVhpwjoqkxALq8yHzrJ%2BO7panFmWR71ctxppiaC8Y3BNUxPJpsFPQyEE2CB60yKCve9xd5RiKit4mS7serHPJufcuQ3OlSnkAnHmFMd4rL5iLqkGOBbYQnmXKLwudBVfUxZ0LousDiYzfXqLPokYimBDyHgcrFB2pUfoaYZAdvqrQl8Dlx%2F0Whiq%2BIxMk6BE8zqS0sfvY3%2BXqinfZKZuzCV%2FanOBjqkAYTLzZ5pdyJAKUvCnQzCW5EmWW%2FbtcnE7PlyhMKzWZNu5tUbjPxSuexhx7uhY3ytYCp1zxiKFMikpa6gIYWJ%2Fq9wbjTePs27kGk3PATWjCTOsNZW1uXQEWLrn4f0%2FY5TQzG%2FcX3Qz8ipKw1hu2rNCaWU9OFKpfVY57JbW4wyxoz8MnbBZ%2BpJEe3JFx1Bw0HwtIBQosW0SpTdCnit6%2FQsXp%2F6iDWG&X-Amz-Signature=b074467c553971aaefedacece625252c5e6e3ba3f7047dcdf1eb15d231bcbca7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665COQECKB%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIBnaxsI99U0ftMcTY%2FHT2uqdudGnJn8pinsAL425DCJPAiEAnoEad4q6bWGCVJnAyTN9FZgy%2BNZzxiRGvA%2B0FiyOMv8q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBMG7jpsLntJRCNf7ircAwfQAAzpro%2BhHkfv5eKMZ5r9Zc%2BAHhsQaPB6Yt%2FUiXVSjsXPhSaczV5FOi0nknSUps6JnqGtCNRCXhbOpXDWp8V56fxUzg5K7%2B8IrjSuc4qfhVZbLDNCTIVqTkNc08z70oEmPnD4VRa5wXEAh90WllSGHUuN2J6vlx3DVnVKzX1Hi4zQkDvBFGRItQry9J980r6qLfiKNTKXOxu6NGLggojsO4NUFv4wIjenDB%2BOt1oNX8pqeXLADjk9A7jtn8mQr8NA1qbQAENiSJBgx5%2FtPodiWHQEZcL85ZFQBAbJqR99qw0F2La6%2FFEYywxouyEB6cyH29Z2lwunP6GicR6SMP80W4pLO5iSkdls2rFX7e7N4kG6axN7qS2ljDfVSmpJPb14JvyldmGYtB58G6PigyPyfNnpfc8Q2Vw7H%2Ba2MXCXRnUdu2b7w2mNjUKCxed7XVDFYbDJQdHQgilT%2FV50urJ3NM7grNtcbyDUZKhguCg3LrsGwpqyahFHu7JWxra%2FA8N1%2FhR3hquFLr59LxCTNm0kItdC0lGwWHlIiSf%2Fj6fpueXUc99V5a2wP2Ru3FbnVoDq9njFyd997xOqVNRQJKTbW9SCnwoVI5V%2B8t7AYfbyE%2FL0Js2s9x%2FmzdmDMLn7qc4GOqUBmuRXqh%2FuToB3o%2BBrHWARa0HzcDxDlwBHNOQlwn2%2FOz16JExCwrD%2Bo1H21TQ0lEp3ou%2BoMNX1DwJdrqNOFc79vzRF%2BASIbE9o9mFTe8Iqm7gBdoVYMpWA6T4JmWApRIydd0Z8S0gbQmzs%2FjU5ypy6cwSVmCRD0%2Fy0oUGvZ504qTeomiMyfRFR13LbooDnGJCZwys1hV9Q4qkUIQJLDxbhw4FFkhHW&X-Amz-Signature=da8f7fa0b1eb1a047ce905bd6685a098231a1b2a5e739344e94f339f76ba01e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665COQECKB%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141627Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIBnaxsI99U0ftMcTY%2FHT2uqdudGnJn8pinsAL425DCJPAiEAnoEad4q6bWGCVJnAyTN9FZgy%2BNZzxiRGvA%2B0FiyOMv8q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBMG7jpsLntJRCNf7ircAwfQAAzpro%2BhHkfv5eKMZ5r9Zc%2BAHhsQaPB6Yt%2FUiXVSjsXPhSaczV5FOi0nknSUps6JnqGtCNRCXhbOpXDWp8V56fxUzg5K7%2B8IrjSuc4qfhVZbLDNCTIVqTkNc08z70oEmPnD4VRa5wXEAh90WllSGHUuN2J6vlx3DVnVKzX1Hi4zQkDvBFGRItQry9J980r6qLfiKNTKXOxu6NGLggojsO4NUFv4wIjenDB%2BOt1oNX8pqeXLADjk9A7jtn8mQr8NA1qbQAENiSJBgx5%2FtPodiWHQEZcL85ZFQBAbJqR99qw0F2La6%2FFEYywxouyEB6cyH29Z2lwunP6GicR6SMP80W4pLO5iSkdls2rFX7e7N4kG6axN7qS2ljDfVSmpJPb14JvyldmGYtB58G6PigyPyfNnpfc8Q2Vw7H%2Ba2MXCXRnUdu2b7w2mNjUKCxed7XVDFYbDJQdHQgilT%2FV50urJ3NM7grNtcbyDUZKhguCg3LrsGwpqyahFHu7JWxra%2FA8N1%2FhR3hquFLr59LxCTNm0kItdC0lGwWHlIiSf%2Fj6fpueXUc99V5a2wP2Ru3FbnVoDq9njFyd997xOqVNRQJKTbW9SCnwoVI5V%2B8t7AYfbyE%2FL0Js2s9x%2FmzdmDMLn7qc4GOqUBmuRXqh%2FuToB3o%2BBrHWARa0HzcDxDlwBHNOQlwn2%2FOz16JExCwrD%2Bo1H21TQ0lEp3ou%2BoMNX1DwJdrqNOFc79vzRF%2BASIbE9o9mFTe8Iqm7gBdoVYMpWA6T4JmWApRIydd0Z8S0gbQmzs%2FjU5ypy6cwSVmCRD0%2Fy0oUGvZ504qTeomiMyfRFR13LbooDnGJCZwys1hV9Q4qkUIQJLDxbhw4FFkhHW&X-Amz-Signature=da8f7fa0b1eb1a047ce905bd6685a098231a1b2a5e739344e94f339f76ba01e4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RAL2EOCG%2F20260330%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260330T141628Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCIzNzmRKktOondMhkihNM2C2LBvIRovkE%2B9Sbos0qRewIhAI8vBnO06ieku190cSEpqpsPyL7Xx73qpJ%2BgF5w5w%2FtaKv8DCCcQABoMNjM3NDIzMTgzODA1IgxhHIBIBQ3H92eGG0Mq3ANPBIOZmcbc8G7w753eT28jZpgg2skxMB3esobIEwlPjM3n1XnQ7RPHoxuvW7ffiAGgV46YJmmU14OX%2FGXxxjMiqwBt0e9Sle%2BCES4bTHtHTq7uEbW%2FTBQs4918hx5%2B5Nh5a9tpdYuZ%2FhRv21an0vN293fjRQIldv7U3VIuZRHIO3TEhGvDrd0jX3MuatfNnvnwmRr5oNo5rr0O%2BjIsZKw0TiAo4wVkQ%2FJ4AdLINhTOZp96Eg%2BYf0OTL5aqDFTlVtrn%2FijJSgqXoBEvge4jRxq5I3dR3UrW%2Fnk2pIPp6WPqgBBsFOzQQ4H7B6Ys2c7w3e6sseIcENa7P%2BIxfdg5NokxnOSgVerQo4pAC9oTWyhmPuYzpSZ6pg%2BQtq4zut9s0HOfnWU2UIICqcSUwEbVZJuhevdgh1YHpjROk4PUR3cVUX8Sh8pnVi9DVKPUFZcw4I1LjHz%2BbUkyqRr%2BKf1n%2FeHxL2VGbjBD%2Bs182Ozl9%2FS8OjZnalm6zPZ51mxAKMna%2FJTR17YNvy8KlSMnMfBKNW2wUKx9yY4BszNBHDPT%2FYJRIQ7GIsw0Y0gCye4R2T7vEwtZ7mnRbKhIKKo5vL8GVT8sB3XW0WB9tawG1ojhO0DwOf8PP6dO9DauNRdyMTDp%2B6nOBjqkAaqPvx3JXjDZvLG591J%2FOqf9kOhIVxtb8gMmRxRUuF%2BurYF57DwXtNY0nbQJON%2B4f1EknftPMuO2%2FUATAcUvkMdatg7uDBV1JP7C841eQhTMqO1D5XauNOy4oYl%2BSx1SiQ9uxjW%2B4%2F9PndZhLygqq3ZHXkg5CbrcbtnRdjqrBD2xLcgomF3nk7VrptQPJLof1l408fWF4fkvVdO19bAHMNScZzU4&X-Amz-Signature=008c4588c654b0671fe3890dbd886c04929bf8bd336b74fa6664e27ba2ec1834&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

