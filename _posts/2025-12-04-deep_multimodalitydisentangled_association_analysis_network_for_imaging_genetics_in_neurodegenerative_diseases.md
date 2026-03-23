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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XC3K2IWD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhxFfwZmYWBHvfGJbGs7hRrElTmteMTUTZ8hk6Acb%2FQAIgRFqTSZp6pA4cBMOH0FmbR1x85P%2FOWHiytekIVZZYzs0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGZfT7AiQ3HATzhLMSrcA5ACo7vQsTemXBIwjUayJVKkJb%2Frh2px5PDF140UbawQQtklicq0Mj49WrgAvQA6XEcbU3CNpzSXjTyPAd2Z6e8qKN4tyxgk4uDwdO1146je2p3DqaL3UmZGNb%2B2HjaV3NW3Xbr821RHt410dZ6VU46CgiSO396auTGFwhqjSTQSZ%2FGYYb9VmfGurUYXIQhZiPDNZvYt%2BAsHFrRTpsb5N71G%2BwOP8N275LYubBc3ofp1zPZHbPUk5gnzij0XAZOmQ0GBOdHHLdsiIihA1WMTPZ17ZfZ%2FwHQ7oSZawR1RWXnraG35%2BEGo280MnQu9A2RAO4iZX7%2FcJuup7SXNsSlbNJm%2FAMvqfU3mnZSUrR1ponaMnI2opsa11pAOiDnlYrUfoFKjv3kDbTFFaL%2FF%2BIAQhH%2B28hIYb0yOXzfbi9BoD%2FYVIMMEqZcTdDGdpyffu17QRKA2kzDiIPMRbNx9PSqUDa%2F3YzpYlebG6ZMS6JI3KwJ3nGTqeXYUN%2BznPz%2F88LN8YA0OGaS4hYom8vemBP759Cz8aubCxsyF1IPUUuckSx12MO2TrjdJM9aNg6a5fKVK3S1lKXezH73E4m2Q%2BbdcUnS%2ByXZJ2apld3pHFhxNXFoJ4Ply8blQ2AqcPY9GMKneg84GOqUBxYNsreVjM49CRyf6r4igFuseCskuaLoDoT7Zjf9SH0pIEabciz6UY7Q3s9VnwiNZ8VYtIBogexS9cl61Y%2FPLI2r9DmsBqusFk2CIzXJo7TbIgJYheBS74tNVKYmL3TCJih%2FvwSdOsdxpWFGI8yrqwaeccsD57%2BhJDUm106wLbUjXRXV23gm6YuPLmpJCpN88d4cbNdQ83X7l%2FInSkgVngCVQID5J&X-Amz-Signature=647e9448e4fe3950464b39db910ba52e28be4072b2a8f88182cbc6267ced3222&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XC3K2IWD%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhxFfwZmYWBHvfGJbGs7hRrElTmteMTUTZ8hk6Acb%2FQAIgRFqTSZp6pA4cBMOH0FmbR1x85P%2FOWHiytekIVZZYzs0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGZfT7AiQ3HATzhLMSrcA5ACo7vQsTemXBIwjUayJVKkJb%2Frh2px5PDF140UbawQQtklicq0Mj49WrgAvQA6XEcbU3CNpzSXjTyPAd2Z6e8qKN4tyxgk4uDwdO1146je2p3DqaL3UmZGNb%2B2HjaV3NW3Xbr821RHt410dZ6VU46CgiSO396auTGFwhqjSTQSZ%2FGYYb9VmfGurUYXIQhZiPDNZvYt%2BAsHFrRTpsb5N71G%2BwOP8N275LYubBc3ofp1zPZHbPUk5gnzij0XAZOmQ0GBOdHHLdsiIihA1WMTPZ17ZfZ%2FwHQ7oSZawR1RWXnraG35%2BEGo280MnQu9A2RAO4iZX7%2FcJuup7SXNsSlbNJm%2FAMvqfU3mnZSUrR1ponaMnI2opsa11pAOiDnlYrUfoFKjv3kDbTFFaL%2FF%2BIAQhH%2B28hIYb0yOXzfbi9BoD%2FYVIMMEqZcTdDGdpyffu17QRKA2kzDiIPMRbNx9PSqUDa%2F3YzpYlebG6ZMS6JI3KwJ3nGTqeXYUN%2BznPz%2F88LN8YA0OGaS4hYom8vemBP759Cz8aubCxsyF1IPUUuckSx12MO2TrjdJM9aNg6a5fKVK3S1lKXezH73E4m2Q%2BbdcUnS%2ByXZJ2apld3pHFhxNXFoJ4Ply8blQ2AqcPY9GMKneg84GOqUBxYNsreVjM49CRyf6r4igFuseCskuaLoDoT7Zjf9SH0pIEabciz6UY7Q3s9VnwiNZ8VYtIBogexS9cl61Y%2FPLI2r9DmsBqusFk2CIzXJo7TbIgJYheBS74tNVKYmL3TCJih%2FvwSdOsdxpWFGI8yrqwaeccsD57%2BhJDUm106wLbUjXRXV23gm6YuPLmpJCpN88d4cbNdQ83X7l%2FInSkgVngCVQID5J&X-Amz-Signature=647e9448e4fe3950464b39db910ba52e28be4072b2a8f88182cbc6267ced3222&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHOOXFBO%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGFJHNIPCkuHMmqxHPR2aUuHjyT9UIjOIuXFGJA%2BBXfIAiEAkcPQ4KeiE3LHq7FEy4wy2SBe5TQfcv8zvCFCe%2B2lTQoq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHoJunZhUCN3bWeJ1CrcA3eHQy3VqTR6J1qtD39%2B4tvOyKGkdXByw5M%2BPlojloTRrjSmVTdzx0DQLMJoduo%2BVxBuXjfH%2B8zdcmcbgf4bJPGPF39h85E3%2FawQIH6Tmxt%2BpzM9%2Fv8FDrStDjbqLWIocBZ5ksfkvz1jki6YP8R%2B%2BJ%2Fh6k0TGYDuzZFDOao6smUwOZcvDylQM9a9iM7kgoXp%2BPbw3Go6L7Ex%2Fr%2Fbz4f%2B5SrEcO%2B3W%2FR%2Fq%2FdPXUcg9EjqUlTn08D%2BwJNFwrupyQLxOvCa%2BNYuQAO5kNaXDtyNbPw8LF1YZdX6MB8ODOa5Zgiu0z8ADOjhwACsJNgv7GnV0du4%2FdoHj%2F3fvlZxIUbEOqGc6AqL6AUuoxO1stccSBgOZs%2BTq2MiKHsc%2BZK1V4pQxvGZWOkpBaCaM1F5g%2Bq%2BC9%2F2VazVZ8pIC%2BDwyYojGOEM0QQm1Zd2KyQBI9g%2B7%2B615YENyQFCptzcqTwDZTEiNlM5ukLqU%2FMLNPdEHW4qBubsB7%2FA4cwUlWIaxnBkaFi1nf8N0VTvd5KAT9n%2BpXDkA%2F1NOaO03R70KbY9fXhKxEJbzuEubLyI%2B3rBYvRBpoDwLWBVYIPF3OMtSxLP5z7G6AGpofv5v399K3JKqxnBIJBiyJmONAN1mhKic6pYMKvfg84GOqUBhM3OwWWL38e8CTcleBx24%2BDarcgM%2FqnD6AUuvvysDufQE3ql6wa9F5iFiv5d93L0Yz2SSJCTzRkVCb40S2sQkA%2FkWexcQYuCxZJA%2BQOVk52qYdjblmqzWIUGUFLZxFXN4b7X4bC8WWUmyDNsXK%2BavqRql0U4bOrEbWyfQTeA4dt7Yj5dKPiKSxoHoIXs1vhDURhEEO3xmzbzmH0QMnNyP6ab%2F0ao&X-Amz-Signature=eb8a7aa940ee9ebdafc06fcec2edc327c52e1d10840dbcc781cb029f55cabe00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PAM253A%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCiSghvB%2FXSIR1WVW2UV9aIlbvphMVfU1PPTh9i0dRgAwIgAcN70TTsXGnminumKM5xYdu8friYOUsAuzu0kDi57r0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDJo7IALfOhwtETX90ircA2xM79FMlSMHBFmxHUbg%2B9Ec6%2FRxvdD99tGTilRQ8RtSen80GvQh8soqEOPUL8dC3srqu3AutpltST3paI6ykfIRIN5m%2FfuG5o8%2FGtfLkCF3h4ABdbOrmxCYUdDLYRcM6rFfCUxoihrc1r82L0VB4X3LcBKouquz6xHVPvGmdF9T3W0Q7G0CGsZh1FKI0FyQBsaK4UyvoEh0yFilAA%2F4mt1HGV4a4exjhwTM%2BBT3O03XT4wHyhXfsE8je9Xd3CbVtGFxuH%2FYDmnMCwbxJpKwTJaSwvXmBOb1wKYFjSkaXjOZlC3PGyTvfH5OYm1UigTrlx%2FRBZjBLispXBCFz179cY9D%2BYvefGh1HXDBfh6d5psFrrXysjRG5W7UkTyjGXorGJUn8MeJevh5DUMiF9M4AY6qt1Dkj8MtF%2Fl1LTHuR7xY8XJPkygY8E%2F5BuarHe4uh6aKL9QYs49DDZWiRI8G0LeLSV6L9Pqrh57gB%2B6HKpCX1kTr4PmNsjKqwsXOk%2BsJCv2fzI4Jzii5oUZhPWJqnGdnEh%2BmSJ6RSsZ1CPUiLjMzHLL8QwAAd3aw24CJM%2FK%2BEm8Q1ELnc3VrF1IaHMOoox8qiP0ETxXrLzAOfn1ZebtI0DjaeHrCU02pNA3TMJreg84GOqUB4AGffoiZs8spkIeuNK85FLvMvPGAW8cxJeYr5VYvWCGIrlnueAATs5jh1y9UbJ57AIDE%2FqwOHJrZLCxJldmv4tD7zxhrwDmDsfHm59gAASVHxwk4jM0qGSpAlyx7yyPW9xwAP7d4JFQOS3KjYPPJrlKgagtf32fjX8iOTv767YmQ9qi9tZKDiF4RwaP3DDpzFFrHNu3%2BKKnaJfTF0HSuC9yO489x&X-Amz-Signature=9eba574b0c8a9bffe61ea2a7864b13b80a8472f578e985c97f4f461326de87cd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663PAM253A%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083917Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCiSghvB%2FXSIR1WVW2UV9aIlbvphMVfU1PPTh9i0dRgAwIgAcN70TTsXGnminumKM5xYdu8friYOUsAuzu0kDi57r0q%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDJo7IALfOhwtETX90ircA2xM79FMlSMHBFmxHUbg%2B9Ec6%2FRxvdD99tGTilRQ8RtSen80GvQh8soqEOPUL8dC3srqu3AutpltST3paI6ykfIRIN5m%2FfuG5o8%2FGtfLkCF3h4ABdbOrmxCYUdDLYRcM6rFfCUxoihrc1r82L0VB4X3LcBKouquz6xHVPvGmdF9T3W0Q7G0CGsZh1FKI0FyQBsaK4UyvoEh0yFilAA%2F4mt1HGV4a4exjhwTM%2BBT3O03XT4wHyhXfsE8je9Xd3CbVtGFxuH%2FYDmnMCwbxJpKwTJaSwvXmBOb1wKYFjSkaXjOZlC3PGyTvfH5OYm1UigTrlx%2FRBZjBLispXBCFz179cY9D%2BYvefGh1HXDBfh6d5psFrrXysjRG5W7UkTyjGXorGJUn8MeJevh5DUMiF9M4AY6qt1Dkj8MtF%2Fl1LTHuR7xY8XJPkygY8E%2F5BuarHe4uh6aKL9QYs49DDZWiRI8G0LeLSV6L9Pqrh57gB%2B6HKpCX1kTr4PmNsjKqwsXOk%2BsJCv2fzI4Jzii5oUZhPWJqnGdnEh%2BmSJ6RSsZ1CPUiLjMzHLL8QwAAd3aw24CJM%2FK%2BEm8Q1ELnc3VrF1IaHMOoox8qiP0ETxXrLzAOfn1ZebtI0DjaeHrCU02pNA3TMJreg84GOqUB4AGffoiZs8spkIeuNK85FLvMvPGAW8cxJeYr5VYvWCGIrlnueAATs5jh1y9UbJ57AIDE%2FqwOHJrZLCxJldmv4tD7zxhrwDmDsfHm59gAASVHxwk4jM0qGSpAlyx7yyPW9xwAP7d4JFQOS3KjYPPJrlKgagtf32fjX8iOTv767YmQ9qi9tZKDiF4RwaP3DDpzFFrHNu3%2BKKnaJfTF0HSuC9yO489x&X-Amz-Signature=e9cc24d223b10e88badb43c19b7c9297095062419506d33ca5c165c54c7f9abd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SBKEQ45Q%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083918Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJFMEMCIDnA6h6lnhlEpbw%2FlyCYyMODcJ9ZJLNLaekMF1pviTFKAh9xcZ1E38OwRLVVxPZesxD6q8t%2FPG5U%2Fp%2BLe07jBMdAKv8DCHkQABoMNjM3NDIzMTgzODA1IgzTPUNQ%2BUtcAU006u8q3ANhM0ZAx72KnyWaI6yafWY4w0hF0lqn%2BOJO4Ag57qRK3Ew%2BQrhMgSneoUjqKQ9RBHgzF%2B1V%2FFbGmCH4gy6RJYwC5tQpQMlTK9sTLmRtXQ3dMMDUicaI3cnk%2Fsjwm2KG11WVAIYIgq0uNmzzDrSgVfK1oLD7RVD%2BjrCHY2QBb6Yp8ODF2pDzAGrwKvUucVL2k%2BYOODvFIFW08818kw5GQp1gUxIdHmyiur3yUwzfi%2FgGIajdHHw4WQZAmpy8A58UwHIrPA0WlzrxD13bOf%2FGU4b8W4kimcXrF6iVTioVU%2BRaPvx56Eg7SOLs%2BU9TofVclAGKI7Wj9zm%2FyjYlsNTjoLi21KpGH6Z9GJlPDiIWTl8XbAI31rj4TJYS1QCNoB9kf0r9X8p5UMNBc8QdXDSEjjH3na6vHRqAD15RRlLfQh8KtImI9w9b58V1KlOLDdluIUVkjdKjiSywS68rhrigPNzI%2Fs2xluvWUyUJMfs8%2FprTCETxyQ7UQzCQPUTmaO64l9HMzhxIi1ebEsRvitOvjlS6W5B6gXp4C%2BHdpgL8Z%2BdWYo%2FEbPWsWH0Rp5VzHjDbiLJ3gJooO4%2Bf0%2FZWdiyMth%2FEObEyISJ4t%2BqkJ8zT8cvefV3cwNE%2BnA%2FugJXZ3TDn3YPOBjqnAceaDsCqlx6lDOjXMyYLjQHEIBOruPjAHoTbUKfvzkInFKDwh3RAgJt8EEoZnK%2F%2F5ehkiJQdK3iYVS5NuKCLwnS8q4a2tF4X11x1Bffq%2BVnc%2BnYIgkBBmmhBCI%2F7Wd3grsRxRWA7u6uF7UsUzD9vkr81ijRzxldAS4N9%2B6Z8OUek4%2Bf1L2KmGdK%2FV1Pec6q0lcXZi5JVyiwjUGJmXiZ6NsG5NaH5x8bf&X-Amz-Signature=57710ecea738ae1d02c8111ecab7398ed553da53aa11b90fff379dcebe1f1b24&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VBPCDDNV%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDkMqZcWJSrDpEX1363FBnAYpQ8i%2FHWPw%2FRor9tueERYQIgAtk%2B934PJkNwkp4WI6%2B9WcxS3DEM61QE4bDsXdso2kUq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDGV2kYBASLvilYtthircA4eWe9dCPFGpz1LBOBgb2tWkLt3XT9p86Klg9B4Op48hJuoGa8FrIz8FIaxbnHmX0A5jJpeb4pVouhf9obUKyUbUvEUAgqObgE54kTWEi9%2FvNaNU0Dou7l%2F5wqDaXfOV3UVsc2IBuwKHOKQnBkCmpEwgRsYJc0FkZCqm4rPeRVkO1LqrdV2YILp6uvfVvD2yLYv19vel2UJSXIXmeM8x0wVfMlF8WDRtcDB%2F55PFtD%2BserKTVLLmdswVWRtm8GAvHKT9oB2L%2BPoyZqIW3JRYV2g4DeZDOhouetHo8MuV%2BPYSOt%2FKvxY0%2BWO9OdWF0PEdIX%2FHc%2Buaf1JDZsBjkCKrfK5MvKPwHTcy5ZZWLCaOmB%2B8KYQDeaNsdnuLjSJmEM8ysY6fXuxg29wcmaaCs8CghJ6hnjNQQlKCpGUAUF%2FSUGuyQ6y6SdK4I1h2xFgKA%2Bk3z0VmHvcPX6qYKh1QtJEon9dI2QJP2qt1lJOqaP%2FpxUTXWeYGGbEkSQheCs6VTKZth0XqOkRUHo1b7Y6iQzVWIiQFZjzZzdJ7ELJJkOVEy7syxS3wop5lC23%2FBzX2z9dlid%2F5s0rE4d0VDOsF8oDp3w1YZn4NwZR5b2iBmnxQQzoYuF4PaUT9H3FYsTJoMPLdg84GOqUBSYY%2F%2BJsggnOAyleTDwK3w3FuyF8xq5BnAPFYeAZMU0yk00fT%2BJm4a%2B4h%2FJBY3W0ADDDpbej5QNq8Ui7qGsYqSUhBVrSTI1PqkCPQwHIY6y%2BE88Yhx1C03zrfBp4T0qj4bo%2BEzCK2yKmGfVjGm0jTKyuctHx83Jpkz%2FwJNP%2FK7Yv9PCKkyLZG9WPd5eHaUsD8YHrTGFsu82YdDtaZ8k%2BL0OTYPeb2&X-Amz-Signature=edaced495dad139bebd40358c1469ac3a501cc770916eb7042af329aa9cddfbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D54HMJH%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDd4qJj80zXNjEQlXIkoIR1b%2BP6s9k%2FryMkzPA0l2GjoQIgRZQxnZXtrv5QXjnTFRjXQcETGpu%2BS3HaR4TJX2znD%2BEq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDCeC8sNspNbjaoyksyrcA7hKacldQU4fFkV1pfbsb3QDvKSBWA6Hek26Suo15qlWMZUb9E%2By6Xg4WU%2F9dx7GPzQHDw%2Bre2wKDFnlaZfwQDgivsO7oCf1K0nmNONYLSjCSzAXpxe0qutaO5AvX%2Bej7NzZv5tss8tIp1urQptXxHXtrAEUjRFNE%2FSJfnRXwQjc9Q1gwUw%2Fd0YIeASUwaCxDz5HmR5bJi0ZZix17OOSQSJZedxL8DUP3309iEfV09dO1tK1ulJttx5cN1S6Zp6Areu%2BMMJqFbLHEd2ZxtLV5iXJuGBRyXkAcyJwCyZ0lJDl0N%2BwC8rjdmiEqHEKrmOqmkHzTPnDVZysP4VtvFlaH4n5XOTjkS3Bt7jJhMZ0%2F%2BZ8gCe3Sn7I9I9mM%2BfYZTmiIg4kLnMQO%2FHLwazeo%2BSeE%2FJU%2Fg1aoaXiG9atW3rkJGKiRh8o5GUDxj5cREyRmi0BTOGrDwoFcLeF3hKquVwhG40iMTPweD2lilbJo6kg7amFkaOCKKCokGbHI%2BdiF9v4kiAhVbpGA%2FZJp3WqTcrQ%2FSj95tuxdT6IlRXLwtHx1t%2FAwp%2FZ5w%2F1rrbDMKySoZ9YrIMIN7wz55jpwv7ptEAkrpJ6Z3%2Bk2NIytdHAcoDiRR9fUF4rHLgBU75O5WO7MLveg84GOqUBVWLriOH8rMjOq2CX3c0Mjz9u7BZg49yAWimrRqAiLUgnCjuSkja55dhTxPfo9r0aX%2FIjKGQRdsjtU4%2FCMSOy8PlFNXoF%2BuugZGqdXNLeDd8zH%2FJ9z6R3W42GGh1ffLgZljwpY4yCRAFMJN5aIkIUHES2dCQL8JoujVToXDOVxRZOxOn9O58eNgMTBJT%2BuGP%2BnowvqK1mm8FjJceaYNlUl6q2k7jr&X-Amz-Signature=d69407f74554a0f455ed4ffd2f59862e46f8baa5f81dc5fbc8a86a8cf705bbd1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPUPBRJX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4qn1wCwjXQLWwnXAITWSiyp%2FfKRdJCjiyGKI5ImP7cAIgCv0hv8Gek%2FqOSfTZ6bgQPHk4Ox0UC7jlLu6%2F%2FsmnTrMq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHtMNXX7tsNDQZM%2FwCrcA6AKwMqvBhKHZf35sRHbBS9Zt6Rrwzj8St9Nv7wKKgxDOuDgTGF5%2FvzEQ7a%2FxNAuc4bBmXWKxM5U4nEnwnmpUMnOn1iXBwRjODrPxgXrnHRPdU%2F7jJkrfgCda1jCZ0bRFb7bRKw%2BpW1LJFaSJyRL63JRROCtWe4OzofVJSvz5979RubnOyJ3mx%2Brajl9jE%2FuP7XLR6ifz54Z7hErHJr9Eu8FauAv98H30UQLbwLnnabNBmADlxBaRTEKRv8dAPncerS%2BJiM9ixKNoIRZsRDGlByDlAswI1y%2FzcOTRBYgy0SEgd2XYFoZ3uzJdZqk6dGT8lUptbpHPiiG1mbKtigGVqPojHhXSs71Rr5DKShChT%2Br%2Big8PYD%2BxwzYoo6J22zJPvnRiTLpboFpxb%2Bm7J92TkxiLRie0CoLdMVSLFb0nHU2ywVgwr8h72SxBav9DrlpHebkq%2Fg7ZhpsKo8glms9VqteFXODFQ7EreFrpOpniK3sjvoFRruiLr3yjmqz8WFGZXTPc8%2BBrNtUvusSKAyuW5TbBkqA%2BuPIOdWU0zzJy09YaMgkF8NHuzi0gNHsXMPKYNNJ5uVOBeHPh%2FmUjmLgLPUFBz8Cop0dTz065EBoraXvoUPke8LekqqQwe39MNDeg84GOqUBBliUFBXIzM1yYLHxqadrEQxWQakYHa7a%2Bj18eoVDiySmFzWA%2FrW4pnZ%2FNvKTDIiotVY5Wl%2FAxlz1BXUO26WdeosjsxPxAV6Eb1i3aVAWmDBRBuC16x04i5F0PHbpCuXfG723NlDXIk%2F3GWK0j5GOOHtiXA7jn5EZhfGCQSNgtgrGSxGtHyJjksMXQ%2Bo%2FGvrQ1Z%2FfA%2FvfLZmYyEQMEMsQVjKbW%2FIL&X-Amz-Signature=bc47f9bae682af1ee0ca8b42cbf94ced72d92d0823a7e4b5e969ccc5b751de10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPUPBRJX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083927Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD4qn1wCwjXQLWwnXAITWSiyp%2FfKRdJCjiyGKI5ImP7cAIgCv0hv8Gek%2FqOSfTZ6bgQPHk4Ox0UC7jlLu6%2F%2FsmnTrMq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHtMNXX7tsNDQZM%2FwCrcA6AKwMqvBhKHZf35sRHbBS9Zt6Rrwzj8St9Nv7wKKgxDOuDgTGF5%2FvzEQ7a%2FxNAuc4bBmXWKxM5U4nEnwnmpUMnOn1iXBwRjODrPxgXrnHRPdU%2F7jJkrfgCda1jCZ0bRFb7bRKw%2BpW1LJFaSJyRL63JRROCtWe4OzofVJSvz5979RubnOyJ3mx%2Brajl9jE%2FuP7XLR6ifz54Z7hErHJr9Eu8FauAv98H30UQLbwLnnabNBmADlxBaRTEKRv8dAPncerS%2BJiM9ixKNoIRZsRDGlByDlAswI1y%2FzcOTRBYgy0SEgd2XYFoZ3uzJdZqk6dGT8lUptbpHPiiG1mbKtigGVqPojHhXSs71Rr5DKShChT%2Br%2Big8PYD%2BxwzYoo6J22zJPvnRiTLpboFpxb%2Bm7J92TkxiLRie0CoLdMVSLFb0nHU2ywVgwr8h72SxBav9DrlpHebkq%2Fg7ZhpsKo8glms9VqteFXODFQ7EreFrpOpniK3sjvoFRruiLr3yjmqz8WFGZXTPc8%2BBrNtUvusSKAyuW5TbBkqA%2BuPIOdWU0zzJy09YaMgkF8NHuzi0gNHsXMPKYNNJ5uVOBeHPh%2FmUjmLgLPUFBz8Cop0dTz065EBoraXvoUPke8LekqqQwe39MNDeg84GOqUBBliUFBXIzM1yYLHxqadrEQxWQakYHa7a%2Bj18eoVDiySmFzWA%2FrW4pnZ%2FNvKTDIiotVY5Wl%2FAxlz1BXUO26WdeosjsxPxAV6Eb1i3aVAWmDBRBuC16x04i5F0PHbpCuXfG723NlDXIk%2F3GWK0j5GOOHtiXA7jn5EZhfGCQSNgtgrGSxGtHyJjksMXQ%2Bo%2FGvrQ1Z%2FfA%2FvfLZmYyEQMEMsQVjKbW%2FIL&X-Amz-Signature=cbd0a96f0ed955555e8ed01335ea354a96ffd833073097ac80897833a273dbcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHTBWYFX%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083909Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIH5yrnGt5x5Kb8XUDL%2Bj7qub1OMAM0I57tqVhCI7y0glAiEA41iyoV1H3u6a1MPJGCsbroA7du7a6iyKVzffQd2ln9cq%2FwMIeRAAGgw2Mzc0MjMxODM4MDUiDHydDjL2%2F6jWFRy6%2BircA9sicBvqe%2Bi3YqaN5Mbw9CgG9jTIclto8wJIgKJ1HNQM5V475AEZriq2kLrz6BByMAtW0z01Vhiush1ROzXzN1G9DXLkW0z8nwJFb6VuVen6dewyy7LWkEl%2BuoXQF3fypg1HqmsnochhbebIoHeXP87g3TDJKqKLeNWdtA0R39oPZJVWB1LGn0ycDMD5Utry9N%2ByPvNS8CZXtxjecXVUHzUQXCsWj91YfCw79U6qU7c%2FZKpb6pdNAwDwQHmeldV5%2FM3DROkMsbmxoHXWz7e1rNproHqAsJ8jcJLtp6p3SIbbnNBITnHVIp5XmusuIRAiBKiGD3%2FdEvlflTfaPI8CuaWhkQfmQtHjQq%2FrpaGjaU63RnZ0A77uqLEG7ep3bGmjTpPb4sHx9zmv3saGY%2B8pDRJdG29ZNJgFT%2Fds4Navsz9pwT9K82VM9Ru%2Be%2BxFRVpitaMF9a4%2Bg1XEsXm5rZpo44C0NmDxQPNRfxWCy2Wk1pAHAh9lFfznGJ68uXd1mKTCr%2FJNL07KQg7a9kljpCfxhaX0g2vuxtm7l8t8TJ8O6%2FyRa4snEPysfVQl6PlEaTxVnpqe%2FerORkq0wmiM6nboU4dfRU1WPI5NC3KDa0TRn66Fz%2BymG4q2cO6ANlRWMLDdg84GOqUBNLp4JyJQxJh8a5b9KUpT%2B4t7wW85f2VVnwugwPBTELzw3XiOPobiWf42EvhQ9lZeZ4FhOkwH15gU4hEN7eIZfmLUjw1tocRTXq9%2Fd8QuSz%2FyeIBeZGLSIuFZ9iPYOFrcAdjfDYS7aXFwuhUL8VAksuABiUBeJiqH8wKEtDG96ksk5pCSI0I15PTdBZP%2Fcjo%2F3%2FuzENNL9Ns8AUGUyrKc%2FOdgMG1t&X-Amz-Signature=6ceeca058e0fd3bd5e8df0da2db670efd4928238639dfbbdd76685fb12139f1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U3ACFJZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF71H5fv8tVJsy3mt3VTBa6O9nZbwjgCNgK4spfCHzz9AiB%2BsW2RaHTyfTQhpEDtF6Vfh8P8nrMInkTXVei%2B%2Fi%2F5fCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMr%2Fnw5D%2FQPl2yq85iKtwDJdo57Ti%2BwU2F16S5UhfJEeoLFxLJ8T7Wx7X9EE%2BYRstrGzfnDByS6UbV7xVW9E1B5efQoKO%2FCDdO9E2Eyy1%2BX%2BjMlTZo11EkGxGmEaMsnpVYaZZTOe3lc5pjHo8Jy4DYAHlK1SjHu2IzMG5Ftpls4wdEBWrev9ePpcWrrVzL0sBf0y%2FXYQVsqbvxVCz6%2Fc%2FftRZBG7NfoR9PKy%2B754zH7EPpTer68m1eblbrmj8nm6akLnVmZxeqwzMr0NqQEnjAqaWinO%2FRi%2FAPtfm4T74NB%2BM4KQGBSW1D%2FaePGsIDbqiTJ5%2BBPKGZB7BJCA0rrR4ImsD3AfP8rTdr5iQfOpRYRr68GVSV5Y1Pmsan7seb0Hx9PHgQpJeY5D8RwOOxG970AmS6qOOMC3AJQhmyK6z7sDkn5fo4DvbXZqZxS0UrX1X9Zhf6yFWZL9KM9iaVJKZoP5ycYfaM0Q4XEv434142s7bFsFHMPoYPSAwR5qHCIbgbzYA6x7p1hwzPRIAqN6iGSQI4y0vuP0Ao7CFdIrQpHZZP832jabtdYtiVifnpK2QinWXV%2BsNsSTmxi7tsG3b8YlXwIHDHKmY0VYdgUAAn9cRA3peWTyTlx2JgGaujnjocEtuUKaazWURuXZkwsemDzgY6pgG9L7%2FOlNGrLc5diLs7E6qpIa7DsUAlYoE%2B3RUtajbE2R5%2BAw0dPzwxQQeN%2Buk4Sf%2FXGyvokYBk5rH5nDlJDJEuLgf5I4AGn%2BVR7ns%2BhRy%2FMuFnLUoPW92OsoL5xqB1X35kV2sRw2JE9nVTpUXYLhDG4szZS%2FSgpwPPpX%2BLzbIe4DOirEEXCXIOegbS2XZ4CblYyy7dFGdQEkUfEp2CegZnPtPAH64d&X-Amz-Signature=4c47ed3ca579baf5f77761f62815385d079dbc7c2238d0a077791b83871e7281&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664U3ACFJZ%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF71H5fv8tVJsy3mt3VTBa6O9nZbwjgCNgK4spfCHzz9AiB%2BsW2RaHTyfTQhpEDtF6Vfh8P8nrMInkTXVei%2B%2Fi%2F5fCr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMr%2Fnw5D%2FQPl2yq85iKtwDJdo57Ti%2BwU2F16S5UhfJEeoLFxLJ8T7Wx7X9EE%2BYRstrGzfnDByS6UbV7xVW9E1B5efQoKO%2FCDdO9E2Eyy1%2BX%2BjMlTZo11EkGxGmEaMsnpVYaZZTOe3lc5pjHo8Jy4DYAHlK1SjHu2IzMG5Ftpls4wdEBWrev9ePpcWrrVzL0sBf0y%2FXYQVsqbvxVCz6%2Fc%2FftRZBG7NfoR9PKy%2B754zH7EPpTer68m1eblbrmj8nm6akLnVmZxeqwzMr0NqQEnjAqaWinO%2FRi%2FAPtfm4T74NB%2BM4KQGBSW1D%2FaePGsIDbqiTJ5%2BBPKGZB7BJCA0rrR4ImsD3AfP8rTdr5iQfOpRYRr68GVSV5Y1Pmsan7seb0Hx9PHgQpJeY5D8RwOOxG970AmS6qOOMC3AJQhmyK6z7sDkn5fo4DvbXZqZxS0UrX1X9Zhf6yFWZL9KM9iaVJKZoP5ycYfaM0Q4XEv434142s7bFsFHMPoYPSAwR5qHCIbgbzYA6x7p1hwzPRIAqN6iGSQI4y0vuP0Ao7CFdIrQpHZZP832jabtdYtiVifnpK2QinWXV%2BsNsSTmxi7tsG3b8YlXwIHDHKmY0VYdgUAAn9cRA3peWTyTlx2JgGaujnjocEtuUKaazWURuXZkwsemDzgY6pgG9L7%2FOlNGrLc5diLs7E6qpIa7DsUAlYoE%2B3RUtajbE2R5%2BAw0dPzwxQQeN%2Buk4Sf%2FXGyvokYBk5rH5nDlJDJEuLgf5I4AGn%2BVR7ns%2BhRy%2FMuFnLUoPW92OsoL5xqB1X35kV2sRw2JE9nVTpUXYLhDG4szZS%2FSgpwPPpX%2BLzbIe4DOirEEXCXIOegbS2XZ4CblYyy7dFGdQEkUfEp2CegZnPtPAH64d&X-Amz-Signature=4c47ed3ca579baf5f77761f62815385d079dbc7c2238d0a077791b83871e7281&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46654WKTASF%2F20260323%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260323T083936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELD%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHb%2BOmE1c0Mpj%2FTHD2sHEz3SxLFF%2BI5lCOxgxRJQTGRiAiBtv7b0JEs3BUyfiK5BHcG6uyQiJ0qBbtj7HyDcKe7e3yr%2FAwh5EAAaDDYzNzQyMzE4MzgwNSIMsqL37irdxBMUudWFKtwDUf4sB50T94qZQGU0LGK2FAzQaI7nnLEqfiZpSrphdN4%2FH9BCnSqRgMlL%2Fb9YIMqwVMoWrjcagxyGpf7wPc0a0iP8crK0%2BjlhsOqYqZmyRUSmEodvN6MppmfBO7ebHC0bVUpmsgLC990dvastwasEAcz2HeerU0KKU6dZMdbx683lBCjZt6y61j3zt9IRxy%2FWzQj%2Bblp96yWEvAaM6IHG%2Bhz2EM4f5NplsciljsSSTxU0Szm4vkjeh5vNWCwvrpqZ%2Bbo4LeUt1grEkN75lxJdTnhagSmXP1uHIf%2FDje1ZgAoyg%2BXlzLMsR1JlSvTpo8DR9iwXbZjNb4jBeOnmYrhk9NDHSLTTPKg1Mv9jy25JsrXXa8KC0ocZDTanBB7FtTm7E7DdonMGGNKFjjee18G4I8xGoB3BpegaVOWTyMsrYmay5qsplVM0bGWTmyibweLYbJ3elIJj%2F%2FBOCFqi61N3pUQNmWF4A6Gz3fpZMVt7IEfOLYpxhvy%2FQfWy7QZvGGd%2FjOI7mKncOeawZYFGcfvqmNVE1J0Vpr35AtjZ3lrP7dYE0ROAhDYpjgLkdFRbd3fcobZECoWnOnE7dD1EvMEI1Ce68yJrORFqNAx7A5glQN%2FWBlmrOuy8VFbrzIMwn9%2BDzgY6pgGm4RdfeFszU82KQ2Y8KJFZEc%2BuYdPu%2BtOD%2Fkfb94HmtPxMx4%2BkvY1ch7mp0XQMOQqiaDxjfOWHJ9uUoWPejloHaRTr59e48eVEa06j6HcemYZQhG4jVA4XN0pbn06Z3mPz9teDM7Vj6AZEElK1C0qXLoPeiDwa6dleneQgHnQvqipif6A9weVQh8DDFv8uBM%2B%2F7DqyN3jZYLZDiPg9OyXyIwFMePlr&X-Amz-Signature=11baba7e4f2ce5bbcd749c3f04253e96f9499af402fbf0bd6396af256bb5abd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

