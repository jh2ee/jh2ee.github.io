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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4T4B3UH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBDDrzD633%2F2yHjnaSwgYQpWdWZxOYRHELGJwlwEfyVVAiEAl8%2FBo2WCpheQVdYgr0hjULwv93MZJP7dfEEwGAum3OMq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDJfOWsrj2Xk1LQZGdyrcA9rAkS4OyAD5Hyl0fzY0XksPFq1TokHZokgzB4cbU6msRJCZHhMau%2BZw0JH97P3P7te%2BUQD0jXwdzOZuqnzBCoPrSrvBEWSmtssd1D6vVeHIqc82uS2fsrNwYRidZ%2FjJ6g%2Fmb7yjv%2BqairikUdcLpPbxziBR1hi1zjwK0PdjZNPFkdHLbsZCxJrc%2Bpb7CQVrSUgJlMebLiOeBcBVmvqm96zUVW4Wau0rHtVYM3K%2BtBBcv95naElIzK04ucCqDqcJOohvrzR1t3fNHWRpqTolAep7Y3D3Mx5X9F%2F%2BY4zoHF0DkRq2DM%2B028ny%2BOCKF7drBjOWpsn%2FOdjFg4x1KaZjhIVTfC%2BNzXmiCt2xHwdzLwK1kxp3K53T9cVKIxYdmfuCQb0Hb09JhoCT0ZwmGabOy6R6e3%2B6NkvkwCe9kRh%2BgfdaPXb8Jh6OxhhNfV7%2Fois6a1PmpNcpqkSuZSo2k7vRBIJmc6H3LjT5Cln2MKSRDQYkAh9%2BFc4PA4UWfiBv0a8dnTMlaEBtxSRFwPC%2FzUDQx%2FomYOHHVD3JKmp6bWO95iR1DgRb%2BX7UoeieoFc80N%2FkBszuCzNzz5ZDdosfQQE6OFzQsSvxEP5LekhXYGYj7rwOhu%2FZwO8%2BPliKB8MTMIHC08sGOqUBoA69meJxqufYOK0uuLkZvBUP2H9IaygPcA4TLRbjM58XAuF61yIhqEmrItj%2BxF91svKx88IpmZY6axJbFk5BByBM42R7mDGFBE2wJtclLYh4wuV6YstXddzVY6BTTqURbK4N9xJL%2BgRpqbQi%2BEZxp1WopF9JJSzg74Bvc5OK9%2FFpPIELPO5u1wmEow7qqD%2BnrSue9QdlO7kDwg4ZQI51%2Bhvu6E8l&X-Amz-Signature=ab70060a1f2e3da460fec83ce3edf5ae938ddbebbcd130758c95981aebaf18cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4T4B3UH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIBDDrzD633%2F2yHjnaSwgYQpWdWZxOYRHELGJwlwEfyVVAiEAl8%2FBo2WCpheQVdYgr0hjULwv93MZJP7dfEEwGAum3OMq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDJfOWsrj2Xk1LQZGdyrcA9rAkS4OyAD5Hyl0fzY0XksPFq1TokHZokgzB4cbU6msRJCZHhMau%2BZw0JH97P3P7te%2BUQD0jXwdzOZuqnzBCoPrSrvBEWSmtssd1D6vVeHIqc82uS2fsrNwYRidZ%2FjJ6g%2Fmb7yjv%2BqairikUdcLpPbxziBR1hi1zjwK0PdjZNPFkdHLbsZCxJrc%2Bpb7CQVrSUgJlMebLiOeBcBVmvqm96zUVW4Wau0rHtVYM3K%2BtBBcv95naElIzK04ucCqDqcJOohvrzR1t3fNHWRpqTolAep7Y3D3Mx5X9F%2F%2BY4zoHF0DkRq2DM%2B028ny%2BOCKF7drBjOWpsn%2FOdjFg4x1KaZjhIVTfC%2BNzXmiCt2xHwdzLwK1kxp3K53T9cVKIxYdmfuCQb0Hb09JhoCT0ZwmGabOy6R6e3%2B6NkvkwCe9kRh%2BgfdaPXb8Jh6OxhhNfV7%2Fois6a1PmpNcpqkSuZSo2k7vRBIJmc6H3LjT5Cln2MKSRDQYkAh9%2BFc4PA4UWfiBv0a8dnTMlaEBtxSRFwPC%2FzUDQx%2FomYOHHVD3JKmp6bWO95iR1DgRb%2BX7UoeieoFc80N%2FkBszuCzNzz5ZDdosfQQE6OFzQsSvxEP5LekhXYGYj7rwOhu%2FZwO8%2BPliKB8MTMIHC08sGOqUBoA69meJxqufYOK0uuLkZvBUP2H9IaygPcA4TLRbjM58XAuF61yIhqEmrItj%2BxF91svKx88IpmZY6axJbFk5BByBM42R7mDGFBE2wJtclLYh4wuV6YstXddzVY6BTTqURbK4N9xJL%2BgRpqbQi%2BEZxp1WopF9JJSzg74Bvc5OK9%2FFpPIELPO5u1wmEow7qqD%2BnrSue9QdlO7kDwg4ZQI51%2Bhvu6E8l&X-Amz-Signature=ab70060a1f2e3da460fec83ce3edf5ae938ddbebbcd130758c95981aebaf18cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R5CQP2GL%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160049Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCID%2BiVhsZ4UmyKrOz1mfwcKF%2Fd9Mm8J5px0tHzktFkl%2FeAiEA%2Bz4vi8HugPg8MbRF6bPYpyOav9tlHqA2R6ClaQ6kR0Eq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDPtpUOc8SqG0TvML9SrcA3vmeUWzNoYlc8z6GcoeARITKNEN5R3F7ROIC6W%2FaAE4%2Bi%2F%2FLhywTrKlRL6uhKjKBXOVnU5nmibaI0NG1J%2BiN%2FYSQ6%2B9ks0OxXlKi9O8TWalhirTElqABLxWT5Axf5%2FnBp6yK%2F%2BXVYNBHi1Bfs%2BFV2OEKb7oLp7pQ35yp7CXxNLZGNhqNdrl3gIO1l9fbZ0IlKXE5xiRhRvhlqlVLIQ%2FeMyQwRxnpgy9529W8fizfux9eqmFPFs3bJExsshCMZD4UK7vzldpxOgBHDGbaJqknCHO2khkoQCG1LEU4VAsre4IygMrtM%2BDLmeRGqcpen0nnbIIb5p2aZNaQjcWDxMCsYExWZKbeh2KtssG7zyAASQleO%2BVmvYqopBePJu3qi62a2SapyMcGw1eHb6aB88GBVEFct5K%2FrEKk9kORR5EinBGyuUT5zf2XsVcDKsbFCLOVFYQ%2B%2BhV9IqbQ7fLE5EPybKws7za5pjzdTySC1s8ejfeVuQtTGWjiHELsdWptSxVF6MgAvjm6eD3XV0%2Fw0TsxHPDkoWQ8d6JEv%2FkE9LEouXOaBSHpi%2BX%2B%2BPTGtQXufMAFT5IFduRcL0XB3twHccMvAhhnEn10UDlMKae2Rlw6oEG6xcqsnTcrWUrI93gMP%2FB08sGOqUBVcOP9JFyiOHpBRhk7%2B5Fw4z8VjUWx8fnpAZt3LMKDoe8pLfim5Bp3%2B8xmG8l1CBKNqboeObQAnztevQ2ardX2vdTu7NDfKUW35Bsf9jIT6uEUCjuZnhbcPuUw0eGSow7Gerp6YSIw9ovjomcIA9VrswiMQxiMoafTf%2BPVnenVb7zDM7LPQDcyJw8YLb3pPHl0GtUlVexXgzHyQd02DF1RTvfGjbZ&X-Amz-Signature=660420709fb9e5ebb34b2faee87143ef970a3bb18292bfd0d4e41a51422aa47d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGMVHFUE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEnXdK8yEyqk4TqSTzCf8u9vh5aaj9Kvj8Ic0uN3De%2FiAiAcidr8IEYSNKsDbrEQ%2F%2BjGjnQa1ySJXdexRgx0ExKE6yr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMmbtcj84BCp1TJvmaKtwD5swtUMh3qpT8sLMjOOXTb4CfEdBzToowbovU%2FOK%2Byl%2Fur4o%2BLOQ3St2cA3sDrvRhbP7YPYcLY6b3ot0fguUa9SWKS6PMjLKqXI%2BoeiP0Fy3FB8NoU4Qsb2aCQ%2FRnfevnsa7QYyG0CFVlckgJOfIAOJo2fCc4eRsqUoe%2FMZW2Z11Je6vi0fzYNMJ6fYlOEUIrAp2eFWT%2FGzxBjOzlFLWbBGwt0z8ybW9dobJQ%2Bo0cnHgoAndDfPXJ8HvBTJYTeaH3TBiJ8gD48oqLALIquu%2FrcvFFNCNdsuvRMbdGt8GDtnapyXbl6uHnhMJxn950dVH4Pr1zk4yUzBq9yfuxaa6Q8aRqVovDGbkOZbaD%2BeRbLKNiUQCh3lVQWndv%2FIdcPGUxuwchjIWPNM9vT0rBLAc1H4Njb4Tb8Xqp1uSjstRmic6%2BK257k3XFm8nqmI21DeeUWsZyhwEyIlVbhCrX5USastYPAbzCGJRcQjzudz%2FnKGct1yDJg01bijWSreifK3nN3UuwfNV7YAT9zhY76vbG3y%2Bqb7UWCl0FJvqOOznnw1%2BI9WDzDV7NFXKNFmKRt4v0uPE8nZ%2BFgT%2FNFrx6UhSyNfHSxRL%2FQ6Jau6eF%2Bck2F5jiiR0GDGk2HICKVSAwp8HTywY6pgHbCR2BY4SEc9R24CbIMDPT4KNMW2jmOAr2peZO7kgSWtBXNVR6lO3bKse6l0Awvnl%2Fr5qJPFwd4WrrozPvAzU7b0nMJbdxhnhAonUtQgwUbZXI%2B2MyBJJ4F%2FJP0c7JDGJrSbKcSHqLxvp8TboKX%2BcR8WlThO5UkKjhBagBi93ceBeI%2FEt1BTmSa5tgV63XpzYnniSUzJdKnwSLzaiM2f77Dnvv9GQk&X-Amz-Signature=278f0327548fe5db2b2d02eeb914c3d906eadfce29e9d171deeb45db90d84f43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WGMVHFUE%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEnXdK8yEyqk4TqSTzCf8u9vh5aaj9Kvj8Ic0uN3De%2FiAiAcidr8IEYSNKsDbrEQ%2F%2BjGjnQa1ySJXdexRgx0ExKE6yr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMmbtcj84BCp1TJvmaKtwD5swtUMh3qpT8sLMjOOXTb4CfEdBzToowbovU%2FOK%2Byl%2Fur4o%2BLOQ3St2cA3sDrvRhbP7YPYcLY6b3ot0fguUa9SWKS6PMjLKqXI%2BoeiP0Fy3FB8NoU4Qsb2aCQ%2FRnfevnsa7QYyG0CFVlckgJOfIAOJo2fCc4eRsqUoe%2FMZW2Z11Je6vi0fzYNMJ6fYlOEUIrAp2eFWT%2FGzxBjOzlFLWbBGwt0z8ybW9dobJQ%2Bo0cnHgoAndDfPXJ8HvBTJYTeaH3TBiJ8gD48oqLALIquu%2FrcvFFNCNdsuvRMbdGt8GDtnapyXbl6uHnhMJxn950dVH4Pr1zk4yUzBq9yfuxaa6Q8aRqVovDGbkOZbaD%2BeRbLKNiUQCh3lVQWndv%2FIdcPGUxuwchjIWPNM9vT0rBLAc1H4Njb4Tb8Xqp1uSjstRmic6%2BK257k3XFm8nqmI21DeeUWsZyhwEyIlVbhCrX5USastYPAbzCGJRcQjzudz%2FnKGct1yDJg01bijWSreifK3nN3UuwfNV7YAT9zhY76vbG3y%2Bqb7UWCl0FJvqOOznnw1%2BI9WDzDV7NFXKNFmKRt4v0uPE8nZ%2BFgT%2FNFrx6UhSyNfHSxRL%2FQ6Jau6eF%2Bck2F5jiiR0GDGk2HICKVSAwp8HTywY6pgHbCR2BY4SEc9R24CbIMDPT4KNMW2jmOAr2peZO7kgSWtBXNVR6lO3bKse6l0Awvnl%2Fr5qJPFwd4WrrozPvAzU7b0nMJbdxhnhAonUtQgwUbZXI%2B2MyBJJ4F%2FJP0c7JDGJrSbKcSHqLxvp8TboKX%2BcR8WlThO5UkKjhBagBi93ceBeI%2FEt1BTmSa5tgV63XpzYnniSUzJdKnwSLzaiM2f77Dnvv9GQk&X-Amz-Signature=6ed12b2ca7f47a723f33c3197daa86a6c4f612c6f31363b543e56662171ed763&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWPCQKLH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQCofrPGa7pBU9wghP5Kqz3hrmDywPsAC1Z26ccFrq1h1QIgRUFDMxBGWx86dIh7wUzudBy6h0HIKwzoDzZUngmGvtIq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDOreQw8fbEWKFRPGeCrcA7L2qps5k8ukn96XHYV%2FCqdtYhNMVhZzwNZY306rVwsPSxGzCK99wVSfiDyr9WUJuECJxVnc2Wau%2FOuTJUFAzlaaAxeckojzKq3JLuzFjyIeZUAK5lyhVuAhbKduK6%2F8Jt6qTlLPBCkXfhA%2BilIu58kLw39zotmZTD%2BDh8%2F2%2B%2BZcj9NynXMEygXB4%2FZvtTQCRWGSaepJKu4yk5OO6XdvJv0GnWvUJYMC7c2mEPDg1TdcqbN629244LlH3oFXjco7aAghpDYzElM63ynJK9lcGKOBsDi9N%2F5w48bkbV6hxGJhKfPkii7GKlJMcoeE%2BLImkppB3NewSWGHpCnVVpzxrcY2CvzfI8ajz%2BKXRjxjdUO2hx5R4pv2fp7WT7W35vV1b1MUbwOeS3b3YoWcTBC5cIsijeBK156Y4l0CRFA76ERAB9rysb%2BhL353t6SN4Mw23BUPQF8j3RcvWAYpV%2FxeWD6BFskSWtK2hGdAdXOoFYEfQh%2BDgHkCMaxIPFDQb9qxC93q7q0YoVpy6K0u7UdtpJS0obb3aqkBt8jxlsnaS8dc%2BFHqa0Uhj9QKVy%2BQBCDT%2FMfUtIl%2FNToaECjie%2FtVUb%2FMthgGRVTzRAhNuGBbL3Pbpl7%2B8TXhNXlgZn40MJnB08sGOqUB%2BSYmmyDn9gHMiAXSJPUixjT%2FkA71ZFFKtTGxUpxALsx9u6nR5VdW%2BPiEl%2Fy0in653BvKS6qRCTEM1Hh1D3eBaRU8VGhungNzeXjpklmTEpl3TDF05vDleBTYXkReEo2n6CJIemRz7B2VFgd6hZXNjykPZ%2BG95wxZqD50ZwO%2BZhuIU5oHWcAXJJ70UVwt6I8m2be16Q%2F%2F51S534gA%2BZTT9xW14JKt&X-Amz-Signature=b069f68552da6f8282df3fd8b9d79584acdef5a7a71358228dad01b5a0efb82b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662GO5ILB6%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDYT5Co2RHaIns6Fwn8UqToHwdD5Vf%2BBE0GgboPN9rIpQIhAOVWXEgjzhQRmDkSq3mSsbW5vXN8T%2F6ANDJi4QqHcRLQKv8DCBAQABoMNjM3NDIzMTgzODA1IgyjgGjblrFIQrMK4sQq3AMCzoKmTIxeuaZDeNnNeLhFrqipTZUCH%2BsqfRpgbXgTARdoy%2B2Z6Qeu9J1UG00Yi95QEnT107mHPDItU4Lva%2BydHX8%2BKC9NqlgjGhleekGLhl1rHbgNFxnr5Sjv13O1NRZ4sgFjjKiPg1xAjlgh4l6zGFNiJiSmjcXRl2MFyjPHeRQ920shuj%2FZ4NdITTWZVDaSz%2FLMhDsTm%2FYEgucD7t5MVy0CuZzADD75lJ6QFkK89dMZvHWNXQ2%2BR4B%2BbE0yLoql%2FUAmP9pip0KmgHT92xGTSNeIH4C3jsj5OboAKvKe8IknCodTe7jWN8fzoVy1WXZ0ZvDRcJm%2FG93F9r19YL3HfnP5xJ%2BE99g1TznXpHN6yFKGBIkchYiBIxvaJb%2BlUmrVvleiNxupTOtaZxKJXF44yvaDdrayU8R8fNwK1OTZcm7bP4%2B7ZkM7Q%2BI0tzhtP4LQnfJF%2FC1AYFRRkRmxFKIk0s6GCOeftjBGpf7G%2FfIf6s6vfQi5lhT3jeA3%2BZgzbAMQcofF8TQxxqrhnIFZP2iQGxbxSd%2BLu29PifuXnGgDpYmP95hNI4HU5vM%2BDuMypnlxo7irEj8bEx5nwRcHjlMX5PvRsAQuuI7b0EHGitV2kyw89kD60lCawXo4gzC8wdPLBjqkAbxPVttjHLvel2g%2B%2FC8rpgmSVtoqnksl8aWTwUygN4EHtrYqjb%2Bs6qmftAnzLLecMtGgJV5kOM8L1FKsKmpgi%2Bcz5T7TqXlu6ccABGO%2BjXQCJA9hGGcBPtBUrGrIMrHFNkVMpK%2FaVmeYKNxUYdBlbkKs6ZvCvfmAkxOJSPZg64Vkm1OmKoDljJjEQSo6qV6BxL2GA%2F2792832HG0FvxXDJdrNdzs&X-Amz-Signature=389ec0eae47f35bef0e8674d81cf4529e89c53b680ac95cc83ac81ffde922cd8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCFP3ZWY%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160056Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIDuuz229AJoc5IVcAtF2McV8sdnRzqJPiXMdCwdZ3%2FiXAiBBctFMSQGpOw7d5Km%2Bt%2B39vBsnEhcW6QlqQJ%2F%2F8hf7FCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIME2jrYWWulzPgJUxtKtwDB%2BQ2OdWuMUGr9dcwDowEvtsOg1VD7esb%2FL9dpS13E22Ns5IazF7h4qaFTY9pj6Hd%2FEJos34KumVwoJ6YSNuFQ7P%2BIzTTVu04g%2BTcrJIWhM2Y43DDJ6FQ7GPPHINpDRc%2BFohlD7YtIX%2Fq0P%2FPvmINUKeA1UKKAAknqMyTPqg9eiIzLo4vSHl3MiS1MnkyK60IaOmYPyxTysxJy0jX1Ey%2FbLPWTDlqEDHC0IuYSW1B13HkAjb4RKlBACWO2tetk1nQl2iMUQRgtfmpevRXJoXWUgHN%2F2eDSqlu%2F39vR%2BOU4rPm8voZeb0i%2FFJUZyUIV8pmYRwu1FKxSODJQ3VXPFuzauhVnUh5LmzIY%2BFQqp03IsRqcSATg5G2nUtnQJsloyH5ALy%2BllKxxwK%2FlhXPr58vexlqoAJGZXxfo59itMfZzWSuNp7RgIAeAfYtHfGtYVVZ6luiX%2FXCyUaLnES9XGaC1vJt72IAuWYVMDpEfxBQ27jCDH29rr5aHXoBqW6nSyk%2FM6lfEklweu7TND3AKcqZyS2CG%2BHPA4k%2FqqT7zFqyeZl5orukfKRKhVRbLsHHTzlkPwFTFvzpSVgBfIt6GIkrcsGXS1Nj9ZSUFrl8oo925S1w8%2Bht%2FM9yC2XLAiswy8HTywY6pgEQCJ1SEZdTm0lJmHHU16M4MqLriIc4Mo8CcfN8LZWbv%2BHNK14iTGmkga%2Ft7LQKiJz76nlM7gmEJRFUI48miRcFPZ%2FuixZI8i5i8lUUyH6y9e5sd1BLGbjcEMMqhMkKaB1JEmPiasZERvJwq7TA5oklGk5A0KfkgWe5idWZkC39pQuVomceMigMEGiMEU7ZaeSC%2BYiY%2BSOAV6W8D7HLHOKve3Xg5PUr&X-Amz-Signature=c3a1b6ec2e7d2721a8679425a2bda57ce7e34c4cea66a39279e27155ab741711&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NEJYUCP%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQDkySjDcLHBk41BeU%2B%2BvUZwvHfP%2F6rRxpqpTlcvNF%2F2AQIgdjbRast%2FBXLVZmxWFxpLUhMRpg%2Btyg9kouPBsWGkEPAq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDGLdELWiI9DJX1yrtSrcA%2FIKkZYfGYDv%2F60oQVSVVaNrAdG6n8v2Ix8xL1iM4uQR6ZdGShpnwHR4nKw3CGjH5J3yTf3bggrDcyCrtBiqr5GDYTVsyTlCNBnvFLzwbXZWIAXTLRUobpIhYjWEMQPIbdUjHWwvSE0UQbD8MYnZLuoe12xmm8pUxnlxcgXLKnfzzwCrrsriMl0FL8C%2BXtdf1SXhGvnP8r4i%2B3qGFP6N9Yvs7HijEdoAMvzXtU0xi5CigCrz70dB%2BtaYHjo2UCr7dAXD1KVtwyku0jC%2FC6lNfbRLKWiFStceIkQ1chCm%2Bvc%2BwYGRJDqU4LTfutWTH%2Bt3c3QMlsMJ%2BD4OQnxeTI2G%2Bi8%2BKWmH62L4ZZFzfXf0CqDZaTOMBt7jH1npqouQ1PuGzpWrGL55P59IGPiBZrXTLbTA7y%2FYF3mGAWvDQgqsvkW4rnJ293p9nnO%2BWC4tKmGXuMmLaobuiuvMQaMvHMaz%2F5ZNiEmvUsZTXksW9iQmDjcCHNAfHGqRqqBZg%2BIdyxUIbmSV5lbSOVjv1a4EWJRwt1TivgKNOey2RBT0DKTxifcACmOIWBm7n85n62ZyTOhKzwrqevrxNli%2BWPva3fcN9jbeiu89nfVe5ZjWVgICgze2RHE8YLEvjR%2BFV5dAMMTB08sGOqUBmzAG6zHNkfK8Y5Jy30ZCYdvenGg1cMuRClynMvvA6vHC9zYsd1yInp7mQIP3qevlxd3K3Bug1VX3xG5Xjh5mtNHu%2BV00B7xlJKs4CMWWeNEaOyZ18pRLSwds1ufBwCQjZxBN2w5ilnu8jxNqbeTrICQHWKNhMOd2V97u4CxLUf1Enf46cAoQId033uic7sfGWyD4ruoXrX5XC%2FFPX0pfekNR%2BuhW&X-Amz-Signature=d03d5b972cc269c49218c96f052cd48441a6a1bedb2c6b0fd590477985ecb1e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NEJYUCP%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJHMEUCIQDkySjDcLHBk41BeU%2B%2BvUZwvHfP%2F6rRxpqpTlcvNF%2F2AQIgdjbRast%2FBXLVZmxWFxpLUhMRpg%2Btyg9kouPBsWGkEPAq%2FwMIEBAAGgw2Mzc0MjMxODM4MDUiDGLdELWiI9DJX1yrtSrcA%2FIKkZYfGYDv%2F60oQVSVVaNrAdG6n8v2Ix8xL1iM4uQR6ZdGShpnwHR4nKw3CGjH5J3yTf3bggrDcyCrtBiqr5GDYTVsyTlCNBnvFLzwbXZWIAXTLRUobpIhYjWEMQPIbdUjHWwvSE0UQbD8MYnZLuoe12xmm8pUxnlxcgXLKnfzzwCrrsriMl0FL8C%2BXtdf1SXhGvnP8r4i%2B3qGFP6N9Yvs7HijEdoAMvzXtU0xi5CigCrz70dB%2BtaYHjo2UCr7dAXD1KVtwyku0jC%2FC6lNfbRLKWiFStceIkQ1chCm%2Bvc%2BwYGRJDqU4LTfutWTH%2Bt3c3QMlsMJ%2BD4OQnxeTI2G%2Bi8%2BKWmH62L4ZZFzfXf0CqDZaTOMBt7jH1npqouQ1PuGzpWrGL55P59IGPiBZrXTLbTA7y%2FYF3mGAWvDQgqsvkW4rnJ293p9nnO%2BWC4tKmGXuMmLaobuiuvMQaMvHMaz%2F5ZNiEmvUsZTXksW9iQmDjcCHNAfHGqRqqBZg%2BIdyxUIbmSV5lbSOVjv1a4EWJRwt1TivgKNOey2RBT0DKTxifcACmOIWBm7n85n62ZyTOhKzwrqevrxNli%2BWPva3fcN9jbeiu89nfVe5ZjWVgICgze2RHE8YLEvjR%2BFV5dAMMTB08sGOqUBmzAG6zHNkfK8Y5Jy30ZCYdvenGg1cMuRClynMvvA6vHC9zYsd1yInp7mQIP3qevlxd3K3Bug1VX3xG5Xjh5mtNHu%2BV00B7xlJKs4CMWWeNEaOyZ18pRLSwds1ufBwCQjZxBN2w5ilnu8jxNqbeTrICQHWKNhMOd2V97u4CxLUf1Enf46cAoQId033uic7sfGWyD4ruoXrX5XC%2FFPX0pfekNR%2BuhW&X-Amz-Signature=c6ac38d355c728ce12a535494f20ac2c174fce9ddececc7403b1dcf87ed410a5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466665CK7SN%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIDxHenbs%2BlHfKKdxg04%2BsN%2BHhvm2HKYWjHi6wnmIPJyZAiB%2F%2Fr3rdGEuUoBINnQJiRuKO58KHXEQZ3BIg9blVj9QeCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIM9oGdwYIka7S7GwZ5KtwDqSpj3kkNDlGoeP1tmEXf5Uo2Y9E1a1razS8zZCXlItubTEaXR%2Bl%2FCcvaJmoVf3gnXklcRzWiPQtPwGqeSYJBvDLED1uLkw73ArdqIU8N71AjrAyu0SeYQSiubiODM0Gqe9sxhfSlUJ0rQ9heXqCbRoZyyiHR%2B9xLW8XgBL1DRXM8LzWNJ2at6Q9iLJdPOiIu9HD1y57K5zbNfE%2BgbYF9TIbGoKog5Rm8O8zE3b5ByJ%2Bliy%2FW%2BMOrxl2%2FCUQLlmbwZxSkpXA%2BFJmrIWLkYqNfyejYqu1viSA8onOKeBHteyREQN0fHzUmdu0LYXYjTyQLH%2BPO%2FzlAhTulgFZRsrDYIsMv7xPKo6j73klZ0cziF6d837FchgIagv9alJOU9tnwpTqMdB8%2FgUm0CCcHb7Np%2BIZNyKEWHfmnwDSlSx0FRMKXyq4rWhF%2BJM%2FxQfRkHLZ9rlomr5YN0qI6pql%2FaHn1WjJyN6lHoCXT8U9R32qUXG%2BdejUEEKlJWAElsV9i9eCA4iFOd2VfBO3RNqX2BHkUqiWKCP2OhETsxpofG5u42%2BMraQe3pS8TgaX8UT1osvUYMotJbu5WvcIdb4odJxeHvFKlx9%2BxIVJJVN8hz6oNicuufXapvUkIgQJRngcwnsHTywY6pgEnU32xQuXb1Ao%2BsMIWrkOza4CxUQ7pVwqNA1ZHjr7YH%2B4pq9CU6F9Xm9BiEG%2B6Cn2FpEEiX9QlK6NFQlcxXT7URySCcDqRXgNm%2F%2BVuaDxchScdbYKh7LygwKoudhuaKnXJiY%2FcnBa%2BYYC5y%2FrrSvrCx7huiZETl%2BuchUXAtaXWS3%2BLhFk%2B3oHhCAbBIGWKo9UlO3UwESOIMk15zxYl5HFrz%2BR%2Fn%2FA2&X-Amz-Signature=ec48b3f971a446c60c8f268d65eafa66e8da40214c345266e56affe0d9ecea37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665E4ZDI4R%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDydr%2BbPKmxTkzwMzbJuWO5WeLrZgdmqqdFHwr%2BeBZspAIhAPfJYXovwrQ4ogX2cO4NyBzTtvLMWvB5q4nkkC8BvjvuKv8DCBAQABoMNjM3NDIzMTgzODA1IgwGmE5xoZwUla2%2BVFIq3ANxzFxLLDBK9CJlPsdf9mfCgh89JR%2BkuFfbgZj2HNuAPQm%2BD3hlBZcJ7jjzO4vl5qjBbYZc961FX9U6uGaIinBiRbA%2B8TZCZLoGs4MHfA4vgbg2wxDMSIpYfa0LebBM7qlFeGJgi6GwR%2BhZBtFZFPyyDnikl22ekU2SLoaObiHevp9H3ZhcVmKfU%2FkMo3x%2FTzXP9G1Z2vJJ51NF85zjVUK9Ybx2mu5gdKDEfASsXWq52dwKCgNM9tBg4jN%2FWGGKfgqAqYe1wfYQ5M9yfzfeSntWYxGOP5AZ390I1Ru7zCUQdbBrOvinlgCddlS%2B6M8aGgSnpcN%2BEOsa6S0ZwA7pJZPFeVVQNbhyGo%2BxqH9GUCCIgV1s3%2FXyqUrFDhkZN%2BtFjAB4ypQa7Px2zYYD7%2F%2FKG8Wo86A7YWP%2FUxJ8AMVw7QK7zcabmNV1ob9OkSHnED74KkncPurtJb8aa%2Fp5C6hVGDZ4EOF53GGXIuOmX89cZdMZZEJCJNi96GP6PPvqCtojt7JwTD12Q77O2OD8ueN1NrGkZIJ0Zo2I34leg1zllJTgjmG%2FQiQMk%2BZnDGDsemc9Vpl6OWGLfv2aX8O5yxSFOK%2FEp4ERnOsOZVfs0u8lwEATR7fiq6OsrpIU32t4hDCWwdPLBjqkAQ%2B2zcw%2FI6che5jqHbOQNoIBbUFgDdtzPtCWcVh8drDrW8Ez1veghtrJ7P8pqntrWYEqoLWmAzFF6gLD%2BP7OQOhqB2zlKAEQyk6i7ipNWWZr8uvePIy4LQakYjcmgofEBwXaK4XK1hmjkmIFzHY8Gq%2FpuhHEu52F97sC1dalYF3IPO65DWvs7z5jMmTZR%2FXwd4ER5Ww%2BxPJXLcEhDChHM%2BmWRMQ4&X-Amz-Signature=e1218135e2b2fc49938e733638762e23b76ac154444aabca4cff0ad0238002d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665E4ZDI4R%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJIMEYCIQDydr%2BbPKmxTkzwMzbJuWO5WeLrZgdmqqdFHwr%2BeBZspAIhAPfJYXovwrQ4ogX2cO4NyBzTtvLMWvB5q4nkkC8BvjvuKv8DCBAQABoMNjM3NDIzMTgzODA1IgwGmE5xoZwUla2%2BVFIq3ANxzFxLLDBK9CJlPsdf9mfCgh89JR%2BkuFfbgZj2HNuAPQm%2BD3hlBZcJ7jjzO4vl5qjBbYZc961FX9U6uGaIinBiRbA%2B8TZCZLoGs4MHfA4vgbg2wxDMSIpYfa0LebBM7qlFeGJgi6GwR%2BhZBtFZFPyyDnikl22ekU2SLoaObiHevp9H3ZhcVmKfU%2FkMo3x%2FTzXP9G1Z2vJJ51NF85zjVUK9Ybx2mu5gdKDEfASsXWq52dwKCgNM9tBg4jN%2FWGGKfgqAqYe1wfYQ5M9yfzfeSntWYxGOP5AZ390I1Ru7zCUQdbBrOvinlgCddlS%2B6M8aGgSnpcN%2BEOsa6S0ZwA7pJZPFeVVQNbhyGo%2BxqH9GUCCIgV1s3%2FXyqUrFDhkZN%2BtFjAB4ypQa7Px2zYYD7%2F%2FKG8Wo86A7YWP%2FUxJ8AMVw7QK7zcabmNV1ob9OkSHnED74KkncPurtJb8aa%2Fp5C6hVGDZ4EOF53GGXIuOmX89cZdMZZEJCJNi96GP6PPvqCtojt7JwTD12Q77O2OD8ueN1NrGkZIJ0Zo2I34leg1zllJTgjmG%2FQiQMk%2BZnDGDsemc9Vpl6OWGLfv2aX8O5yxSFOK%2FEp4ERnOsOZVfs0u8lwEATR7fiq6OsrpIU32t4hDCWwdPLBjqkAQ%2B2zcw%2FI6che5jqHbOQNoIBbUFgDdtzPtCWcVh8drDrW8Ez1veghtrJ7P8pqntrWYEqoLWmAzFF6gLD%2BP7OQOhqB2zlKAEQyk6i7ipNWWZr8uvePIy4LQakYjcmgofEBwXaK4XK1hmjkmIFzHY8Gq%2FpuhHEu52F97sC1dalYF3IPO65DWvs7z5jMmTZR%2FXwd4ER5Ww%2BxPJXLcEhDChHM%2BmWRMQ4&X-Amz-Signature=e1218135e2b2fc49938e733638762e23b76ac154444aabca4cff0ad0238002d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W6XBQRYH%2F20260124%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260124T160107Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEcaCXVzLXdlc3QtMiJGMEQCIEQn3NRf5uOLFsuUFOVtJsuSXZ6%2B49ujJf5LJaKDPFDbAiB3DqC7p6IH%2BzrigwFEFjuMBeYUxZ%2F3KMq6ga06gChKkCr%2FAwgQEAAaDDYzNzQyMzE4MzgwNSIMoy8m5vBZTzzTNNWyKtwDCE8Wnxu2TB0J774jBjGsLiuMCgDMRN3%2BZFfl0dh89jZPSESwPT7KV6RuvPAzqRSHiRRVac2VPqHYZtZbpJwd2jkQKCpHiAsY%2B3pzeDEI6NXRbBBARAhBxKNQ%2FVLA9yrTCZAyGbwZgGwNw91YR4hH2%2B2zmM%2BuS4nXz5OcNgRsa173DZ80hVOnJSzRaRJJNbqlX8cFeAexY4jB%2FSPdjBr8PaITQzB6nm9TNd1fGlTmrHq8qhO3OAo8oj4tkFRIKUnHetxFCKk58IHRsa3B3rBVCMZ6eJGr3PGw%2Fzvr7vB2dGZWtiIgknzOgFppappcQDxsAfYGP8lcEb9zym8QoSOVts4pOkB6%2BfYq425IpPalmzB5mSyCH%2BA2nhxpnP3F7CemjZnV3Ny2amKcMin4Jygu6gBFuuKmZ6TwePN5C8i%2B26BQTkfOXkXiumLh1fVXgPCZA2nwEHE04MQaMGTYCq5Q94iuK1ArWwWHh6vUlhXwNzqEe74Si3fH6HA%2F%2BPmrHypiSqUx5%2ByuMwv5tnskcCJW26OpASY19iYMyX3vsMlA7ZS4DLuC8SQ8KyCWPtkxrr2kq5ziz1VHRpLwOz%2B759aWXaminyM%2BVxcCN5m0ESFZM9a4FzCfYYHGWxmn3Z0w5sHTywY6pgFBRihnyWNVnPQRkPL7ZhtK6gSlYuWFy1DrL7gQCu1daPTVEupULxhyNKHVuUSpkHihXLu5e3rvyUYwrY0Ea02Z0%2BIuNp%2F1o7Yku0Ls0C0O8BGKjpMV%2BhLpUjx53YW6l0viBBfjsPLGEbPujiBfbVnWnqdOPctmZRnAs4JGG9jRwvao0MAnJA9RVXZ6RA8f%2FM4VrNY%2BPbzLn1n0WKdUbMX6ICRMkDOq&X-Amz-Signature=aa044008cebac05d81653eb46b36dcbe03b2c5ae65d64e1f3a85969cb4323725&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

