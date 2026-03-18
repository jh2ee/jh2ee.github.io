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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVMS6MFZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIAeAWhsra3HIwA4g7p%2Byx41sXAyn5AMMRF0%2B7ZvD41isAiAS93cLGUeBAUtA5NxU9cuaNPFTsxUD2Tt26KXX5kkIvSr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMT%2B0bLQpf0KzU%2F1g%2FKtwD7kxma8pfaB79I7jBSdaOqGophgnKCps3sYnxUCoa2B4FDDrR6xHN1UU%2BDHQNwZEOFg88zRe1s%2BnwvEdxWzzMzu%2Fi0noUjMhxhRvaczKDXXqMpBXd5HxyTwreGoX0sEIpODhSxr3JsTPzHSUPdA4GtoHUmxHL9%2BxULVEFcJfTswoM%2FT%2FdxFswAqTQueVf0p7OMMJF4Li4jPC9xZfy3Lx5gmuAijaoehrHKIj6iGgDc6AsnStc7FhXZNtm%2F2FT2S6ab8caFkAjIDaArkfGFeWzn3vjaq%2BCHBE%2B68r4L95tO1N5g%2FIPIOdVychRsc7jN6uVr4fwAUTpTBDrnp%2Fi%2FvDFqumPLHCD3OP5gXpTiIjc%2FMFbB6mVGVJ096IqN%2BAo7b7futV8n%2Bvps7aN1n9PpKpcDJ60CskFmNQ%2BQkZQHDNPnsqE948xQCrkFmqfMv2Wwn744YNdu%2FNRedxnvmih5powEiY33Rdp4dLdYRY%2BJ%2FrhSkcKOFjozl7IXk2vJ2R8NlBZE1Sa8maTYj6sV7HdIQo0gUIjTnvJrX%2Fe2xRcqqs0aEmK%2Bdy9VgwkCeD6wL8xKqmlHvY90Aph2TrBiBlKVA%2BLeUleFhly2x%2BpWRP2f6l%2F5UqS3EWXZ6NEAwzuzZ4wsfHqzQY6pgFfN97oanSk7iTDzjVoz6P3fMZzvYCQbApHVaN8yUkaC7TzJG411oceHy0Pa3foB0B9j3HSjfLvxXI5iupGjMeNYDCS4jJw%2BWFF9wu0X3dbdBns6rYaAtBmX%2FQEPIgSA%2BBPkKhigk%2Bi50XCnJCqnpu5oPXCY%2BBqCYerQ8%2FllTKTGwefsqCnXh%2F7GDrAFsMqTcHlQssdB%2BuZMUCxuntFSJkSZY4l%2FmEa&X-Amz-Signature=637e5691b6744913eb45a51f5a409439f34614f6b20e90a6ffa3d447e483bdf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SVMS6MFZ%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIAeAWhsra3HIwA4g7p%2Byx41sXAyn5AMMRF0%2B7ZvD41isAiAS93cLGUeBAUtA5NxU9cuaNPFTsxUD2Tt26KXX5kkIvSr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMT%2B0bLQpf0KzU%2F1g%2FKtwD7kxma8pfaB79I7jBSdaOqGophgnKCps3sYnxUCoa2B4FDDrR6xHN1UU%2BDHQNwZEOFg88zRe1s%2BnwvEdxWzzMzu%2Fi0noUjMhxhRvaczKDXXqMpBXd5HxyTwreGoX0sEIpODhSxr3JsTPzHSUPdA4GtoHUmxHL9%2BxULVEFcJfTswoM%2FT%2FdxFswAqTQueVf0p7OMMJF4Li4jPC9xZfy3Lx5gmuAijaoehrHKIj6iGgDc6AsnStc7FhXZNtm%2F2FT2S6ab8caFkAjIDaArkfGFeWzn3vjaq%2BCHBE%2B68r4L95tO1N5g%2FIPIOdVychRsc7jN6uVr4fwAUTpTBDrnp%2Fi%2FvDFqumPLHCD3OP5gXpTiIjc%2FMFbB6mVGVJ096IqN%2BAo7b7futV8n%2Bvps7aN1n9PpKpcDJ60CskFmNQ%2BQkZQHDNPnsqE948xQCrkFmqfMv2Wwn744YNdu%2FNRedxnvmih5powEiY33Rdp4dLdYRY%2BJ%2FrhSkcKOFjozl7IXk2vJ2R8NlBZE1Sa8maTYj6sV7HdIQo0gUIjTnvJrX%2Fe2xRcqqs0aEmK%2Bdy9VgwkCeD6wL8xKqmlHvY90Aph2TrBiBlKVA%2BLeUleFhly2x%2BpWRP2f6l%2F5UqS3EWXZ6NEAwzuzZ4wsfHqzQY6pgFfN97oanSk7iTDzjVoz6P3fMZzvYCQbApHVaN8yUkaC7TzJG411oceHy0Pa3foB0B9j3HSjfLvxXI5iupGjMeNYDCS4jJw%2BWFF9wu0X3dbdBns6rYaAtBmX%2FQEPIgSA%2BBPkKhigk%2Bi50XCnJCqnpu5oPXCY%2BBqCYerQ8%2FllTKTGwefsqCnXh%2F7GDrAFsMqTcHlQssdB%2BuZMUCxuntFSJkSZY4l%2FmEa&X-Amz-Signature=637e5691b6744913eb45a51f5a409439f34614f6b20e90a6ffa3d447e483bdf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DMNZQZO%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDK0Xn7Qd9mnNLq%2BQIjaemksxfnNf7bARI8yaD7VmHkoAIgBVDTL%2FsHmMKMLEQTI7grTz8Zf%2F5S5uSxi%2B5iA11OCMEq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDC0VnRNcRgzC%2BPoo4CrcA8ZYgNvbPEmczX2aUohVCcpxhZ58qKwiB1lkcjQv9QOpo4SYOyHhG91bRnCEgP%2FIrhgcJ1NTraUHR91l%2BlBvEtHm4Zee%2BF4poj38NSSR5hLAbphJLWYhMSYtHUNUCeoOgLjXWZrmv2Rmnz1aon4pKG4mqHPVujGhTMTDFP2iTesQKoC7F93j%2BFypV5u%2By5U8%2F9gdHlRXL%2FoX9UghNNJMOg8rZQ6dVZcwEXQ%2B9umWsqBzuBqwBlEjm35GSf9fYM%2FDyMY9qmtXkQE9DrgZKsS31gZB6mkwTDgox3c2m9nrB8EmLAqukvtu8cDpJHcPHkNzw%2FDqXf8q42XTRKj4Q%2FUbWLLsoq9bTQEHcXO7MuaR7EkWSp2aXKSdBCfABE4UnaKbgdRfL1CFnEMLBSQJNgQWEkLQf4G5exoOC43kw3V1zK2FeIiItLCYE5YYV7GQcpQZHbsIToVRLn09bwmn3r0R6BR4LEL3oB2bLSWChSIhJOjomddONMFcW4V9Ay1hrp8wf6TKzlN9Wqg5AMJuylyTrGFTQkMwUm%2BcGBWfgzdL%2FXS9MktCIDbI5iZfLuWaU22pOgHcEiHOHbpP5p7TMcqQ07XGksj15y4yxTVsL6CLTBU5MTC77ohfftDZ1b7VMMPz6s0GOqUBOgM5kY%2B9mrXDp59SjdPBr93BYlE7YtJSweA%2B3rr4Wyvx5LZBRfQPulTIFU9NjloBsJktT4ZoOXDHqtfKtJiU9TpJmckxT0n6534TmJ9IxaXlRMnpBZEXa5q4PD4AY0XJXFJj9ATQ4nkNXpRIhkcmYXMu8Cfqs56JXyHJnz3P4Y9CIFRqjMwV5wknd0mYgXdj%2BtFcSJa8qtOQUdwhu0%2BudFtsDzcp&X-Amz-Signature=5f89bf1bf8a88d5a30b153a7296aa1f01dfe9c310ae553240773ae4327617be6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSCIZKRB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIEmIIdLfqqfcMU%2BcqETf63Cu2aut84vvniNSQnZF4gWOAiEArY3r7JV7i4IFV7fXwFd6AH2zaA7IsCRsO6mboM2eDKIq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDNtErVUy%2FqL3oyGGXSrcA%2BT6iOQoayHCUHm2oiEJ9lwYbBE7JA4p2QiXuV4J6DCxGk0IbCdQQQgT9YH%2Bsx6hPtfw5BDIxgvnpagJIEC5Wu2pNaMD2dnyIdkd9%2BH5TZMZ9z1SX4BKwroN4Z5owVlPAZ6jYQuLsBK%2BT3ckzVSn4aLLUjP0jhple%2BGn%2Fm5%2FBSW1yUgmfHOgJzLvIUdfLZRN8o3Bgs4w%2BjBZSybIyl5nTb0R4uZGKfn2ITU%2BqPviNlIpME9uJ8uq2PyJgBXhOK2lJZFFhYg0VPGHF0WlW7u0TORlekFucCsyp8ynAp3p3ly4Z5PoTdJ0GHcBh1rMNsHzfiYVrp%2BNWJXYJGsh37DN9DR2q%2B4Q%2Fuwv3yLSgTvG81bw4nXeo66Vsy7dX%2BinW2DZ4q5x3vtxTSUkW6%2BXiSGf7Gs2gryj3WxOZCURaCAp9lumwn%2BDNsxWJH%2Fkcx%2BhDWVWJ8CffTM8L8zFgu2VasXhnfF5i%2FqYdX2XxCldzhaeJIeXb3mAzLHmz80evy07vD85Q6i7LTA9saKM21oBj1Z7SVY%2BM1pFi9smK4NMPb9%2FE9Z9ZHFLerl%2FSz9saxmAjwbkE5EcKdn9loDjdHjgPg8dDOwETgx9qGNOZTm86OX2szMD7mMZxUokqRkPrdSUMJH06s0GOqUB5n8mElZI81zWGBGOirHewHrPINnh1C5Qo5hTUvKWe5TyCzdi%2BZ4hFiAyRuS0F%2FdqzyBoAafBBLarwAaBYnyHi8lBsazM7SoZNyr4EVqF3HySbgxLI7mJkMwScLNQpVERYVSQ8TGXgGCS%2BXrZ3krO66iOP1d6fr6zInCue7uwpy%2BVH6S1cq%2BaFm8%2FSbRFaKZBW9eYLqZjm1asRw%2BUejH3Sn%2FZg187&X-Amz-Signature=47c473456035c3d13ffe5a69ccab862cc93c25cd81c2de92e5bab2846ce158e7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSCIZKRB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIEmIIdLfqqfcMU%2BcqETf63Cu2aut84vvniNSQnZF4gWOAiEArY3r7JV7i4IFV7fXwFd6AH2zaA7IsCRsO6mboM2eDKIq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDNtErVUy%2FqL3oyGGXSrcA%2BT6iOQoayHCUHm2oiEJ9lwYbBE7JA4p2QiXuV4J6DCxGk0IbCdQQQgT9YH%2Bsx6hPtfw5BDIxgvnpagJIEC5Wu2pNaMD2dnyIdkd9%2BH5TZMZ9z1SX4BKwroN4Z5owVlPAZ6jYQuLsBK%2BT3ckzVSn4aLLUjP0jhple%2BGn%2Fm5%2FBSW1yUgmfHOgJzLvIUdfLZRN8o3Bgs4w%2BjBZSybIyl5nTb0R4uZGKfn2ITU%2BqPviNlIpME9uJ8uq2PyJgBXhOK2lJZFFhYg0VPGHF0WlW7u0TORlekFucCsyp8ynAp3p3ly4Z5PoTdJ0GHcBh1rMNsHzfiYVrp%2BNWJXYJGsh37DN9DR2q%2B4Q%2Fuwv3yLSgTvG81bw4nXeo66Vsy7dX%2BinW2DZ4q5x3vtxTSUkW6%2BXiSGf7Gs2gryj3WxOZCURaCAp9lumwn%2BDNsxWJH%2Fkcx%2BhDWVWJ8CffTM8L8zFgu2VasXhnfF5i%2FqYdX2XxCldzhaeJIeXb3mAzLHmz80evy07vD85Q6i7LTA9saKM21oBj1Z7SVY%2BM1pFi9smK4NMPb9%2FE9Z9ZHFLerl%2FSz9saxmAjwbkE5EcKdn9loDjdHjgPg8dDOwETgx9qGNOZTm86OX2szMD7mMZxUokqRkPrdSUMJH06s0GOqUB5n8mElZI81zWGBGOirHewHrPINnh1C5Qo5hTUvKWe5TyCzdi%2BZ4hFiAyRuS0F%2FdqzyBoAafBBLarwAaBYnyHi8lBsazM7SoZNyr4EVqF3HySbgxLI7mJkMwScLNQpVERYVSQ8TGXgGCS%2BXrZ3krO66iOP1d6fr6zInCue7uwpy%2BVH6S1cq%2BaFm8%2FSbRFaKZBW9eYLqZjm1asRw%2BUejH3Sn%2FZg187&X-Amz-Signature=dac5704463d7d9156f2d6849c4cc4be44efe6da4cc52051096b5e82fb26ef341&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RVS5FF2M%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIG9jQ4E%2FM%2Ft2EgHk7gIsoDifQYb4g2pNitvHj6lqN6NBAiEA72EXv7QzcEkv4VigFpJADGtDJz1ccAyKb3uLN%2Fimukcq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDGuawoUvC3BLqK9ZESrcA9CnGqtCZDiX%2BfiqSb7EeD7LVJeoUmgT4SjZQF8ZpFOhYm79lHi%2Bb437Zco%2FKQrYbD0eDaS6cbttJTA2EncUIFcH4sG8ZAp66%2FaAGXKMcf9Br28BuA%2Fltndr8rhSLwqW4ur2OW4g94%2FATuDVQHgKdq5Z76e%2Bdrg9pq28q%2B7Fkya3vguIRWmGU5FNuegTH2Y3bT3zeZEqCQ6vXUbwbWKoRVTJx1QorLIX91THHdtHqF0QsyID1K1YJFrLYBxmwiGHPNKi%2B2YRUJzVNQOgTRAECXqttah%2BWPxSYQnweCQjuc753JT73GmX%2B5TZYU0sjn6qx3lTL9R0ElV8aQRNAE1rvD7YTZm8flJ2c4IBQe%2BeQWNH%2Fq7f320gajP0TmxpHDCXCklnTKDZgoap0biYCfOmsrYU0RJe6aYn0oFYdMoJlK42Rgheosx2%2FqmPQJy9jnthr1DQGhfbcsQrwPwydyFy09TRaVERfwjQxw2h5sWjB78evnOTuSNpx%2BGk%2BljyA9BWGGfUkrpGCDTMBQTO20TzfKZNnVlcNjT7wQsdUWAG%2BxlV2YxIKn3IuoopZ6izAWcINk4C6RziGSa5Yu0w8pAIjs3LgsCxd5Em2QJFaXf6Hd3nLSBPI6aisZCFFje5MPTx6s0GOqUBb7yijlbk49xILizy11mVWJvTPm3OFwZ0K8vkFfweTh3WR49fsy4Y%2BwjblfeQjx6CyEwtO9FpzWOYA0g%2FlD7TFRlwdyVcTcU5YA6SgATzN8MUyu0ysjgu1cmGj0rHriRFPUgF9xfMBnF8orYGpu1mlN5Vk9w5l7b0C5UvpSFVamSgE4AO1cJjqNNrcMR0SCDX75uoaioFEW86YyLnkvLOGvTnvl%2FX&X-Amz-Signature=1ab50634b2c11e96e82cc342cfdb2855abf0c5bda6af2d7252a94bd5c4f6ce07&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQFMC3MU%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155704Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQDyHIHxZT%2FvKwbV9zH6CW9rDjRnuV%2F%2FqZw73aaGiRinEgIgDcMGnpy49q45Iycq%2FVCbWKVpWv%2FQkXMp3TB441b%2B8%2Bsq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDK9FhrXtvKJOy2hIxCrcA3vJgBNJn0zHDJayCO3OhyOyN0818x6UWBVW2R3xAI0vOxSL0uVI7PdWfnhhj2yXrPh7Xk8CU66%2FUa8aNrLV6GDD%2FEiv%2BtGiCUTSlgjdEn1OZS8dOrNlWDddYHYODvWx6DYucEAa1zmJR0wZW9TQdEQaIJeKRtTdOoZz9k5Azuq1y2qQn5lRhkjYwJ4A3ugNWWxECoW49gpoMRR3EsPPSNDq4aZzbk9IMsG1GmgMLH49UZypRgk01GAa8uKAcs0RuuJ1vD%2F%2BEK8pOEDO6nZcdlf95mtW0qJHnqokp3GAwszMZkFwASo6Dtj2Fo%2BdDvM19uMHKCgiObk4KCvqCIk652z%2FZZMd4fwRmKxYySAl%2FjPrL6KzKyWUsNmiNGLpQVpnwwosl61K4sn%2FQJ2xz7ExJNZTkS4NLAM20JKOiZW5YC6PADw5430Pgq4%2Blh6w5dKyqoeAO9yzBDW%2FMmIGDBU6T2I1P8pLkZa429iiQgNRdhDwsGsGUIwkFbgzLHRLKJvcYiyJca4z4n93%2Fef6ELRx6DD7BrTO%2BNZckDQRUOYNAdJJfQ%2Bh1O61zaP9ldDZZPv%2Fx3vDenfatIt%2B2fCaRavt%2Bv85O5BW34RiqgdZZ9iTb5ArxcIPTc2eMT98ltJoMNvz6s0GOqUBu%2BibSC3L3p08qlUM9W8jBDVBPfUiWhQzKbDYeS32muyzDyn%2Fs%2Fn%2FkHEuTpvxYPsSPxTAWWptJY3waLANrTw9TARR8b5tPr1NB0%2B%2FxryETTPt%2B4rbNrqOxWO8zi%2F3cRaKPQpLPxajE%2FcmC96ZJDHd8yIZDbesDC%2BcnHy8cPWt%2B%2F1jIYVwxgzJ1iGogHpe%2BrBljWHP%2Be2UmnxPEQy%2F1cogcw4YydFk&X-Amz-Signature=7727708551104c19049a9a9f635bff65770d5656001bffe245772d6f6f1195d7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RWF6FWBB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCpKSPjwDRdtHT7E7pu5xpnraRCd%2F%2FoGuhYJXb%2BUstNvQIgWl0yR5ZxOYUU%2FLsycgrsqrsGBSpe6zuPWxOkv1LeyM4q%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDNNdUcgxgvfwzt2PpSrcA7esApWJQXXlbNrfNjmqkSCfGFzgQz%2B7dSXXnl4jGoaiUw9R1PLxTSy50sJrbAZc2GVUDa0p4ouNzIQgKDb8qBIYMTZtSklRIvGiKIc4XHuVkbF4B2ZbDxkYYZgV6XisL8y2DcS8RMU19nXD9XLqgJgwoeCMxizAioAklm%2B%2BBxhOLf%2FneUlVjcU58VJX838erlBA5pnZTWJs4wBSjOekBy3fhLiVs2PrrVxN2yJ0Im5rlJjhPxtTM89UuRNWyByGIsBeyfLy8rHRgKg9QExjs4vuEcVqLwJUorrRtLT1WFqSq3gZCWr7L9W9lny71QB83cZUxMGTUuZue7V5Yk%2B2HGkxvFpXjbqDC32fOR1yULNuVsvZlGJx5nX1KjthuulQjUisa2WD8e0agQxJ3ItQI4Ey77l8gpPf5s44zI3ZODlOOwHDxP5nB%2B%2BBYSwi32Dooq01P9XfP2hCG5OxL4FoN%2Fj1Xbsn%2Fe4ckiX%2B7Y9jURonqBP4MsnfH7dUOm1kksEXLUfBLo6tt8ZO86HFKFmdpdPwzUGjS1KYfyncrgeupQ41au0J%2FZ6d5PtnBoiPYQdXb6VRr9qO5TBRh9g9JdD2G1RFsduyyAfRrB05DVrwuDgxGSCkkNbEXpdfhtjWMNvy6s0GOqUB2%2BRfEaknna4Nsn%2FizK%2B8w%2BFPszjc5eRRiC7288tIeGRMa5pDXL%2B%2BRXcF9JHyD8NXf9ZQXtXFlo2IMal%2FqHHg3XuPCbqtomz%2FqyaBoJjFeYt0jfh5tmBfWY8CsqID%2FdllyxSxjse%2FkBZhGavvvkO9%2F02t3UPGqYItp90IfZ90yNRyfS7LzPw3AJaIkzvM%2Fox9nvzbxrUf%2FB2Gy1skZU8Vekt7jQkH&X-Amz-Signature=0a8d299eb608ca87811fce9a60b28ec800b713f0eb9c2cf8b5ad7eaef2b0c96a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFLQYHRX%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIEziiPiQxhLyk4WZNA7wxGrZPSxf3wruE6dT75ShTqOWAiBdQKX4EH1TcRfaynL0lklstCcgppX8MRMdYlbb5TnliCr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMKqFmj1SDdzi3LAzCKtwDfOJMNvjaPshR7KrOseTGTc0nI%2BHC%2BjcGooaAGKMAKm02Lmk83pXLUFKRT6oQmTDM0KuVH2SBzjS3m1%2F3Sll8PYFdm8BFj7ItLMTXPL8PlUEclmrfV6G0dKMufnvHRiN2lGOrjilrKCLx5p4CXj9vOod%2BKZO2AiBzRYR0aAke%2Fp1YEvo5jCG8E9vthQ%2BDBCfkMctVzmajPOTB0%2BhWfL3U85p%2FhHKTVTigIV6OHqH60WL601Hw91Ik06Sz4VxUkdInVGPXZYks9ghBKRC0ht8M5N8%2BFccf1Xk7mcDqEwKYBdKhHi7pA3fEMsgOKoob5TqOv%2BVgnewq%2Bpo1rrMOWfEoLLKCworEJ1dW6isadVqrBSXGxiln%2BwGUYy5iZU2SUP9kB5MNP3TxjQ5YEfNK8c4mR4CeqVUUgy0t9ky97%2Br87bDbjpZ4POMXlOS2xYRTdpIUcdvYphGdcQ7DP4txvMIDkRhXfN6vZcWUxH4Fap6Jgu7AcDAVclJ7N1lG8vvSxottD3Yvnp0x4uqPglt2Aw9nn8IqenspFesDiCQrcqI2bUEFNbUtZnxl3VdPYLqtJMrSvIj%2BTkLJ1dDZFKhVH%2FtF1KSV08aqjHQQ3YntQW4cVJueSNDKhpJqppcY3dowsfTqzQY6pgFsP4aPmCZ%2BN%2FBhrj4hE%2FIopvznXZNEdL2jqYuunUVeuZKGclRT1zRbr6qCJGBPOv0aYBkXs%2FKRcspOCVBUOW3kh5Xb%2BKmIWvbzYdNPvUbbSzgWyazJRSBUQvdi5cXYJ5jP%2BoCS2NqxxEhwVdkY4NVYvc5mZq9IRTO4Uk8bVqdHZesPDrFaB%2FGyppuxNKy885rhAdJtvFHIgAczkvq8KcP1ffNHtmq7&X-Amz-Signature=36d1bd0065aa2a663c155dc01642a781cf3ac7d25b61f6a182a023152c8e89be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFLQYHRX%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155706Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIEziiPiQxhLyk4WZNA7wxGrZPSxf3wruE6dT75ShTqOWAiBdQKX4EH1TcRfaynL0lklstCcgppX8MRMdYlbb5TnliCr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMKqFmj1SDdzi3LAzCKtwDfOJMNvjaPshR7KrOseTGTc0nI%2BHC%2BjcGooaAGKMAKm02Lmk83pXLUFKRT6oQmTDM0KuVH2SBzjS3m1%2F3Sll8PYFdm8BFj7ItLMTXPL8PlUEclmrfV6G0dKMufnvHRiN2lGOrjilrKCLx5p4CXj9vOod%2BKZO2AiBzRYR0aAke%2Fp1YEvo5jCG8E9vthQ%2BDBCfkMctVzmajPOTB0%2BhWfL3U85p%2FhHKTVTigIV6OHqH60WL601Hw91Ik06Sz4VxUkdInVGPXZYks9ghBKRC0ht8M5N8%2BFccf1Xk7mcDqEwKYBdKhHi7pA3fEMsgOKoob5TqOv%2BVgnewq%2Bpo1rrMOWfEoLLKCworEJ1dW6isadVqrBSXGxiln%2BwGUYy5iZU2SUP9kB5MNP3TxjQ5YEfNK8c4mR4CeqVUUgy0t9ky97%2Br87bDbjpZ4POMXlOS2xYRTdpIUcdvYphGdcQ7DP4txvMIDkRhXfN6vZcWUxH4Fap6Jgu7AcDAVclJ7N1lG8vvSxottD3Yvnp0x4uqPglt2Aw9nn8IqenspFesDiCQrcqI2bUEFNbUtZnxl3VdPYLqtJMrSvIj%2BTkLJ1dDZFKhVH%2FtF1KSV08aqjHQQ3YntQW4cVJueSNDKhpJqppcY3dowsfTqzQY6pgFsP4aPmCZ%2BN%2FBhrj4hE%2FIopvznXZNEdL2jqYuunUVeuZKGclRT1zRbr6qCJGBPOv0aYBkXs%2FKRcspOCVBUOW3kh5Xb%2BKmIWvbzYdNPvUbbSzgWyazJRSBUQvdi5cXYJ5jP%2BoCS2NqxxEhwVdkY4NVYvc5mZq9IRTO4Uk8bVqdHZesPDrFaB%2FGyppuxNKy885rhAdJtvFHIgAczkvq8KcP1ffNHtmq7&X-Amz-Signature=d28fa0c8f20be20af4b94b9ef4080b0de4cc2513f418bcf39822da3fd7e49d82&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WB64QSGL%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJGMEQCIHuScxQJNUPP58vUdcWf3%2FYOa6yod1TTUPG4iiSaGqJ0AiAgRTzGeK6vjHkLADDHzxyMgMLrzKKLRHweZpUuIZlsxCr%2FAwgIEAAaDDYzNzQyMzE4MzgwNSIMHJPNaPoja1SZUQ8QKtwDaR3OZk3uXqql9fZv1staMqHB%2F62rtPqNs6Z4HbY0OAjLZfI0%2BIzavpzm1jef40JW9Zoy48SjR7V9Zk1eNmWJfmPYP%2F%2FMEpuLItXfw3CkebKteH7kXKZUOY3MWEHM4HZgqaCB0cYRXwOxLyqswe4LpLOJm6wIwLyhY6qZ44n6zOlf094bBnTep1ADcUnqNRrN1KTArG3CiYWP%2F46AvWMDhwghIkU5Wy3FGbHaPT%2FGtIU7wBo5QPX16LQ8WshhZb1A3esqKVjnL2A3LUX0gPKb9tHiuM3yhszO8IIDlHpMxIarLa1W5nLfSD2%2FW9SzBnNarCjSAqqEoNlBMBNBmrC3an%2BoxFKFTC0liCQVtFGMsLFdzFA9CwdTltKPJ9jDn8JjBWX30yzdSONPRSxmIKTkMfBh1h4LRzNiTekYQ53o9%2FoskaxQ9htusdzXSihtIdnmBz51P4bDkpe6lauTh1cyb4Z19Yv4XW17wjIQAFrKIkTYl9qh5A6MywYEdpSMQSnDRTbz6mdZ1F0vDretW1n4bgVkq%2B1abRM2ISbKhi0y%2FsG%2FlqYOZ6iRAvH3SSQ%2Fwzs3GOI2cAbG7nsXSrmVMzNi8st2e%2B6T4uMkb4z2P53sNep9GdGn031ZhXQWW4wwtvHqzQY6pgFh%2Bz7IH3OcPqYf6bTTOPNruFvrRHYIOaXFIxuU0RIOJOAf5Twr98c3%2FL8XWFaNAnA2zC5lxYF%2BtZAfKe59Rz75NEHlJtKuRpFtOYFSD7DB4upAHM2Tpn6OUiism8J5mfVc8RlKfOYeliASXFg4biYPN%2BGtyzOE%2BYDW9tHdPixrI8cRoLuFNuapy87QGlhfCuV90b%2FBqU7gspm1ik%2FEIQaStgP1nrUS&X-Amz-Signature=7316dc6f333ef498d257c811c740a7e6470f1a0e364d7ccb8a3cdee4fa7da0c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX7G6XVB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCa4DTTjdVs3T34ICCvctznyy41zzG6ZkshYVOVIwwdrQIgUN3SIf7%2BeJzvQU04G8KDwxxG69bH2kJVmSfMuvi8ixwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDIVJMnjoBNL8WIYWBircA1PksqxFGX2lF8DPdOCwXKkO4umCfMNJLybI%2BeNcrd3FDuXxDrbCW3pDD8JPn071us6kyKUONgmCmz0AJNvGntbV04bqaGE4O3RWQ86aFgqj8Nn3ONHgOCB2hSSi5IVeplArJ4UvKkpzKSMhpb4%2ByO%2Bi7Fsa4kZ4TD5e%2Bo7Ws1bj7D%2B%2FMtfMyw5DrESx5StA0XoTkq1KMeqW2ciu056HGDcnjEj077DvtiZaAIM4c1e2qrfxuSQBV2eBcONMykgDHVwwcK8af%2BGUyTKWYaOV0J5wA7h3bGzFqVQQDRz31A7pOYVsRicN8FPHjdgQrYjOUGvc%2Bmp%2BmGJGMiq7L%2BE%2BSucZk1zrkAX2M3zO4QrJYCmex7bwVxgiBEws6r2HlXobAMBzMJ1njBcXg1%2BekaLF6xo6iB4S4dGUMItrQNvYq0S6zyPOHdiNBnXFy9sVhDYPmIp46NngGqiJO9vxyXiBh%2BdXo8aL1rV2aHLjkHPyOkqnRY8RteKfMjAEB8vHdYn%2FFyE%2Bk2hYQ9IfkG%2FtqOoJn4QGBPqEmcv%2BTES8wpaHbDqEnUucKaHBeSMJTXFrjZK4jqddiQd2kPoA8tjRDvSLNFHUn%2FpxzVHmhQe%2B7TNV%2FKMtknWYSpzcJxmBF1D7MOjx6s0GOqUBxcJ%2BIBpppb%2BE7P0Es8%2FrmziSGbUUJkKUcknwnW5J%2F%2BVX6Y2RtjAHug%2B5N3bosXGN7qSv1Q3VGnUN5q8sAlSqMn2Zg9YJ%2F7K%2F8Xl3bSM90VT%2B3rhPI%2BXNxxkceoLI2gdEi4wDtVH1Q92hQTd6kl2FGc0o%2F%2BTyT18lMkLCm3F49cx2eYiX5ALf395irbSKQ8gTWmLYWci%2BU4ThMjmVUvl2x6thMaIf&X-Amz-Signature=4e3e815ff5f154999c8c7be2a54302f337553a79dc20db9bb4e492310efa7c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UX7G6XVB%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIQCa4DTTjdVs3T34ICCvctznyy41zzG6ZkshYVOVIwwdrQIgUN3SIf7%2BeJzvQU04G8KDwxxG69bH2kJVmSfMuvi8ixwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDIVJMnjoBNL8WIYWBircA1PksqxFGX2lF8DPdOCwXKkO4umCfMNJLybI%2BeNcrd3FDuXxDrbCW3pDD8JPn071us6kyKUONgmCmz0AJNvGntbV04bqaGE4O3RWQ86aFgqj8Nn3ONHgOCB2hSSi5IVeplArJ4UvKkpzKSMhpb4%2ByO%2Bi7Fsa4kZ4TD5e%2Bo7Ws1bj7D%2B%2FMtfMyw5DrESx5StA0XoTkq1KMeqW2ciu056HGDcnjEj077DvtiZaAIM4c1e2qrfxuSQBV2eBcONMykgDHVwwcK8af%2BGUyTKWYaOV0J5wA7h3bGzFqVQQDRz31A7pOYVsRicN8FPHjdgQrYjOUGvc%2Bmp%2BmGJGMiq7L%2BE%2BSucZk1zrkAX2M3zO4QrJYCmex7bwVxgiBEws6r2HlXobAMBzMJ1njBcXg1%2BekaLF6xo6iB4S4dGUMItrQNvYq0S6zyPOHdiNBnXFy9sVhDYPmIp46NngGqiJO9vxyXiBh%2BdXo8aL1rV2aHLjkHPyOkqnRY8RteKfMjAEB8vHdYn%2FFyE%2Bk2hYQ9IfkG%2FtqOoJn4QGBPqEmcv%2BTES8wpaHbDqEnUucKaHBeSMJTXFrjZK4jqddiQd2kPoA8tjRDvSLNFHUn%2FpxzVHmhQe%2B7TNV%2FKMtknWYSpzcJxmBF1D7MOjx6s0GOqUBxcJ%2BIBpppb%2BE7P0Es8%2FrmziSGbUUJkKUcknwnW5J%2F%2BVX6Y2RtjAHug%2B5N3bosXGN7qSv1Q3VGnUN5q8sAlSqMn2Zg9YJ%2F7K%2F8Xl3bSM90VT%2B3rhPI%2BXNxxkceoLI2gdEi4wDtVH1Q92hQTd6kl2FGc0o%2F%2BTyT18lMkLCm3F49cx2eYiX5ALf395irbSKQ8gTWmLYWci%2BU4ThMjmVUvl2x6thMaIf&X-Amz-Signature=4e3e815ff5f154999c8c7be2a54302f337553a79dc20db9bb4e492310efa7c60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46663LUQBVT%2F20260318%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260318T155709Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjED8aCXVzLXdlc3QtMiJHMEUCIG45zy2oBaQYII%2FnEvGWgjspNc5paWlK%2BFJ9eBruXHFJAiEA6nKoe8WkjckGLQnvdk8I3CoMfTkhk3h%2BnFyaCOuCpIwq%2FwMICBAAGgw2Mzc0MjMxODM4MDUiDJ92agloayymO7dxgircA1L40cmms687jxLe1nO5WqoJuaa47ptenU%2FL%2FDOOZZTfs%2FifiZX6%2FVz%2FAPPoJQOpZ2ma%2Bd%2FVn40%2B2CVhNVNAzj5nzQWF23DGOuJ6C9tivl9jywsPetgslSTn0s7yEje6f0NoeOHkxI0LK1tllQiAG3hW8j%2FSedgJdM5Cewh9zBfdHYt3kLdQdSMKTxLX50HW3npV84oDnaclJX4mD9uvGarM358Xl6qWooeTgDTYx80avqUgDPp29uk6Ffpyl6%2FJ15oWSkGnBU4SuzmqL3wLj%2BfOEFXi0WCFZ7lL42NPg%2FekC%2FsgTGw6V3grdESmqyPToj5LRIiWejSquSv%2BIfgdP8oxQ9OX7ZwT4DuKARl91DMJbqUSlEmpVUdqwTK9gbf%2Fcjwjrix30Hj6gx%2BCg359zAgk9H32cjbrNoa0ymTI5e5C0zEfPmXBNv7u%2BofX0F6gPxq8tro%2F0wS4JNxrmtt70vqzEFAkyNs1RiVflIRIpVJ%2BHifWK%2FXtVvRuuQPTJ6g8UhPNeib57eJyL%2FG7im7Leo2ddlKQYD1d%2FLEZvuoKqpY8%2BKZppPwBt6gKfnYqTIaKoe7%2BULo0SGGSCVgtdI8dYVBBVwMaYIngGVn0Gd00fkxp5uSJ6yfLrTuw4aC5MMPz6s0GOqUBy%2F5Ob56UeqS2VGSOKh8yTjdtEfBb%2FEq3qlSvr0Un5sqBwvoW7arahpgFWGQhmVNaAFmJrBS6YEyoaevfvlGud5nO%2BnU0xPaTRkjK9sYPPnpxb5B%2FDIz2CSuVHm00TUk8nb%2FEK83bwB9xVhoxwrn7qeTsaY6g9TzXOgmI%2Fk%2By9fLaqBKXtGFCDec%2FyLmAscC8efQ5aKqQ1WTgo6e7ySmyNzLUB3IW&X-Amz-Signature=5c09d70fe137bbb21f22b024467c91ce794d7bc4c5c09b4b00df3ed0638c0499&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

