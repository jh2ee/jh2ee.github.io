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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN35CALY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIHQT2cZUsADwXFpFayxwpI8ivnOjIlF0XvtZXQHc3pluAiB23KuyZ9MGC%2FJQBylRCpgYjveSSicVjenO1O3rEWpFwCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMYjUuWIyNDfaqdbfgKtwDzNREzOqIECdJaa%2BY5VD1%2FvrLv%2F%2FJS%2B%2FGrN%2Bqr1rbJJGU7LVr%2FjXgKW4pKqJpG7BtuuSm0RcIQC4c%2BebixIcMrCw%2BLOPM9OnFfQEphCnnfF85tHljtsnF3ts0gzWhOnLP8iLh8zXKP7%2FHP3YMKu9kR3NRB0IYanJmPFr%2FNCTfao5O62S101boU%2B%2FuSiomTLiTn8tZn0ZMUVNSCGZ2SRc9LiQiU2W0YhIkl2WDqeWaJZJqapNpONiXL50VAv6ZCkzSc5W1Am1SdOGf1DglwrfsDK9%2BVMoh4GTFYdeXuBtjOQsJlNv%2FAcEv2cOiiJNqslD%2Br25TA0B%2FbL%2FPYWGxyOONYjCLR0rMIMDn06rchIQOqK%2B1SE3RO3%2FyV8BHa5W81P7d2gC2FxkcYYSrl0VufnPJbO%2FLzTCcOHZRB%2BMP4Q%2BZJFUvA8jCOMNTTsaEDYJp9GrlKbA8umWGwuWhbJUnZ5NTXzqFNz5RQGG%2FKkP88eqORzXOKNaddoctRidpw%2FWXgT9THsGnNGmGAq6G9vD9E1QrKhVYRXcNBtsxRP2GAZ9gKQN9a5%2BZU2Ihow6BpxW9R1yn0Y6BonrU3NECAZdqG%2Bzy5QYyS8VOtX9Wb%2FSmhG4k5Ysq%2F0vhdJbJOF5I1ecwwqy5zQY6pgF9XU6MvGyIiWvatDZWNXx4weFynwR%2BaKXdVMoQrdxCPp4Bk1Z4XLP65ss4%2BmkTlEIa%2FtMT4fmcDukhPkH3AhbNAgu4ICTCfX2zI102lfW49c76QXqnB3leDwqCkHpjsvcXPgndfBO0Dac5VB%2F7BtHTTGFgHMHwGuRJPbj1CBqdFoG2KT1iKERB1DllR%2FoAriIyKgAPY42a%2FpU3qHfsgkqePUaMJ0oy&X-Amz-Signature=16f448189ca33d58bd10ca6bd00a8602b338d9e8c3d9891920d64307cd9ea8d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN35CALY%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIHQT2cZUsADwXFpFayxwpI8ivnOjIlF0XvtZXQHc3pluAiB23KuyZ9MGC%2FJQBylRCpgYjveSSicVjenO1O3rEWpFwCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMYjUuWIyNDfaqdbfgKtwDzNREzOqIECdJaa%2BY5VD1%2FvrLv%2F%2FJS%2B%2FGrN%2Bqr1rbJJGU7LVr%2FjXgKW4pKqJpG7BtuuSm0RcIQC4c%2BebixIcMrCw%2BLOPM9OnFfQEphCnnfF85tHljtsnF3ts0gzWhOnLP8iLh8zXKP7%2FHP3YMKu9kR3NRB0IYanJmPFr%2FNCTfao5O62S101boU%2B%2FuSiomTLiTn8tZn0ZMUVNSCGZ2SRc9LiQiU2W0YhIkl2WDqeWaJZJqapNpONiXL50VAv6ZCkzSc5W1Am1SdOGf1DglwrfsDK9%2BVMoh4GTFYdeXuBtjOQsJlNv%2FAcEv2cOiiJNqslD%2Br25TA0B%2FbL%2FPYWGxyOONYjCLR0rMIMDn06rchIQOqK%2B1SE3RO3%2FyV8BHa5W81P7d2gC2FxkcYYSrl0VufnPJbO%2FLzTCcOHZRB%2BMP4Q%2BZJFUvA8jCOMNTTsaEDYJp9GrlKbA8umWGwuWhbJUnZ5NTXzqFNz5RQGG%2FKkP88eqORzXOKNaddoctRidpw%2FWXgT9THsGnNGmGAq6G9vD9E1QrKhVYRXcNBtsxRP2GAZ9gKQN9a5%2BZU2Ihow6BpxW9R1yn0Y6BonrU3NECAZdqG%2Bzy5QYyS8VOtX9Wb%2FSmhG4k5Ysq%2F0vhdJbJOF5I1ecwwqy5zQY6pgF9XU6MvGyIiWvatDZWNXx4weFynwR%2BaKXdVMoQrdxCPp4Bk1Z4XLP65ss4%2BmkTlEIa%2FtMT4fmcDukhPkH3AhbNAgu4ICTCfX2zI102lfW49c76QXqnB3leDwqCkHpjsvcXPgndfBO0Dac5VB%2F7BtHTTGFgHMHwGuRJPbj1CBqdFoG2KT1iKERB1DllR%2FoAriIyKgAPY42a%2FpU3qHfsgkqePUaMJ0oy&X-Amz-Signature=16f448189ca33d58bd10ca6bd00a8602b338d9e8c3d9891920d64307cd9ea8d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666ADVGQFV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIAIJHj47wMCnjn85zewnuxZiOvHX2euNhSQA3%2BBnQlOXAiEA72D7kmrFsHEPBr0tNkLzIAcgPVjmCKwabZmD%2FX57e%2Bcq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDBKE9O3pwtSGhxpuhircA5nir6OXpWUAxTXpSzRDteKhR4U0QdIor5WUW1MQE0WVf0oOmShzPnMILfzsRPv6MVjsHXY1a0f8DhOU1%2FJsxMCZPL1p6mnDXMhbCZvqUobycP7ohqKGN1mqr50nqLrhRbZT4XyyYg6j1WHycOc%2BW43EP5KcS2luSq5XRSo36TMjRGqQx1YzAUWWRkSDffov00QpMSD2gSo31JwU0DxojQsWxIhT781CMRT0RGcLlf1Iut8VK9gI1v5ZtBfw%2F9kU0pAgQOcROflijMPb%2BZxgOTUL5ZKxK%2FDLHbXK5iGvcZZYZiLpp1l47WPluYNpMc9WEhbsVQtZBgNPoN7UgsJef7JclkXdeJYzrJxBOIsCdIpi5gLmDRE3UCUZnl7lnTuR5IPE61LjB7w4pzmzAfFYzUJnTcB%2F5RyJr1E2CQBhZReFyPDGHBbUYwIkhBHHC5vSkoHMo1iID5XUxW928M4xhsYVUErVLkhLQonRUlKhoTYm8YjB1C%2FwWkyZQi5xqdSU9hiKmMnoV%2F6qE8oJxuQHOvvOl5OQRJoK1%2Fx7woXoz3NHq4YbQUVw5YbZLNIGzzjZqMKbrKfGRqa7CqadZl8RBP04IONMarytjmbvI9juJMgDdXYGZyiMHfKHhiasMI6tuc0GOqUB65djkKESnq4kL7wtMwz%2BNkdiqlopBAZh7RoCerz93TVKiQTw%2BtX19j0STueo%2B%2FnUyQ%2FtUy4TxpZI8wgsNIMm8RZMZgu8MrfwF6uv%2BJReTUJ7FK6a7U1wFuVaGiRDtNB4p0zjHsEevUta9RqiF%2BIQdcudYkZRwMkYIhOtR2lx%2FdYDeITph9p09BWTlyO%2FUkneZv9FBJdfqEG8vk7OF8F42DfEUwMJ&X-Amz-Signature=aa229cf0f689a9c021d1a6a87190b4128c5a212706feb1fb9d37a2af31918ceb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5EOSLEG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIGd8P8lJcas1FDNqbsjCAAXeMwuBIXLBj9uSq8sjvwooAiB3UatMsZwYtV3QL%2BavHlQ9hEvJj8JHzxMXom1fB0G%2B4Sr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMH04rVvrunxkLlezSKtwDBZRP5BvNrgtVeriVTc7GZ%2Fb8q484KYhTd2w9H9j3suvNxcbpIBJVmBVn2uo3vl3R56yuU6Ne9v0uxv1NWwUAHFlGYDbfj93ZzGqGUmBF7j7lRlrjwLZGJnqlT6GkxJFn1lzdD14v53v9ULbjAXiom6jxIFqpB0%2Fh6lqpAB70sN8g7C%2BigICE9XJR%2Fy2kOah6QyfwlCPipYr1R0GeO7l7X9CJ0mnE9NhcYen5JFQKII%2FdYjMEPkDDmxeChE0UdVoXU4Nt%2BWTQCrbNT8NV5hwAhIOXTGeK7%2BouInpmjk%2BU%2BMsBozwVgr4p6cV5eHhuVfcb2uJugMSAIVQFFljMZyKXTn2aCwSyFhbktyFtgxNg%2FLMzuewjDuxm6Yzh1YA6HfuBMFP8siqwZRYNH55FogEOue1Nn30MpknqfOexpwXnW2WsW2kjUSGnkz2l17oYLNUyoZGyRXWoo%2FSadtd9BOKKxxwMOsRqpCMtNCllN0AzXXjO3PmT855IY15%2Bo%2Fjz3qELPXSGFMKVR%2BmvufAl6IFBAFisSmrjw4lT9aTLJGNnZ94yyLtmj1hyXfPRxzGWk2YL64orNyKNSxkZ%2FaW%2F8BAw%2FwhizpRF%2FN8ZS3AXC3spO72opRAgS9pXncnQe5cwqqy5zQY6pgHm3E6dm9ipZPhcj5%2B5YuLA6RFmPFBXOuQbRt6gTJ6VPdGwzSDqyLEcpVmex7eQfqCMi1rGS9sAkLYbDUj6viEsXhJcmiIFuc7A0s1dI5sPvh725tlKJToI2DkKjILNNrHGPvL2NEIoYKyeVrDCQe3ajB0KYotL2X%2Bol5YbjH6SmcUhFbXOYgp09WrdjGoMMcqle%2FbQh1vj9UUeBLX7egY0zEt64PJy&X-Amz-Signature=9cd3453601d8863e8ee180e69bde586c5acbc274204c4d2c7ed0a1856fe15143&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5EOSLEG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIGd8P8lJcas1FDNqbsjCAAXeMwuBIXLBj9uSq8sjvwooAiB3UatMsZwYtV3QL%2BavHlQ9hEvJj8JHzxMXom1fB0G%2B4Sr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMH04rVvrunxkLlezSKtwDBZRP5BvNrgtVeriVTc7GZ%2Fb8q484KYhTd2w9H9j3suvNxcbpIBJVmBVn2uo3vl3R56yuU6Ne9v0uxv1NWwUAHFlGYDbfj93ZzGqGUmBF7j7lRlrjwLZGJnqlT6GkxJFn1lzdD14v53v9ULbjAXiom6jxIFqpB0%2Fh6lqpAB70sN8g7C%2BigICE9XJR%2Fy2kOah6QyfwlCPipYr1R0GeO7l7X9CJ0mnE9NhcYen5JFQKII%2FdYjMEPkDDmxeChE0UdVoXU4Nt%2BWTQCrbNT8NV5hwAhIOXTGeK7%2BouInpmjk%2BU%2BMsBozwVgr4p6cV5eHhuVfcb2uJugMSAIVQFFljMZyKXTn2aCwSyFhbktyFtgxNg%2FLMzuewjDuxm6Yzh1YA6HfuBMFP8siqwZRYNH55FogEOue1Nn30MpknqfOexpwXnW2WsW2kjUSGnkz2l17oYLNUyoZGyRXWoo%2FSadtd9BOKKxxwMOsRqpCMtNCllN0AzXXjO3PmT855IY15%2Bo%2Fjz3qELPXSGFMKVR%2BmvufAl6IFBAFisSmrjw4lT9aTLJGNnZ94yyLtmj1hyXfPRxzGWk2YL64orNyKNSxkZ%2FaW%2F8BAw%2FwhizpRF%2FN8ZS3AXC3spO72opRAgS9pXncnQe5cwqqy5zQY6pgHm3E6dm9ipZPhcj5%2B5YuLA6RFmPFBXOuQbRt6gTJ6VPdGwzSDqyLEcpVmex7eQfqCMi1rGS9sAkLYbDUj6viEsXhJcmiIFuc7A0s1dI5sPvh725tlKJToI2DkKjILNNrHGPvL2NEIoYKyeVrDCQe3ajB0KYotL2X%2Bol5YbjH6SmcUhFbXOYgp09WrdjGoMMcqle%2FbQh1vj9UUeBLX7egY0zEt64PJy&X-Amz-Signature=7bd8d40d296e45ad83f924acc1b907b44d0ab50fd31f20d78a2772eb008febcf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UWPNS647%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051347Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJGMEQCIA62j3V0%2Bd9Ea%2FCBJBZ824vW1I9VAudM71%2FEi%2FiSaIEZAiAeIDwScxspEZlUQpNKfob5A8cQyjKMW0dG4vXvsTIhRCr%2FAwgmEAAaDDYzNzQyMzE4MzgwNSIMECkic1WN6lRCJM6RKtwDC54JCEwnXHpwXyYCsaStm1V162QXEDeSrRb3ec8JJLilI5S%2F136AyOYtoXDeTWNUyawcHQdFKnx28%2FhJknXJvPr6yOePRNdyngc79EFug4M4MVUCGmeGk9SQqk%2FocYmqxChhrNQ7V8r3cZ6hkptIox0kvC8tVOSZbNX5kz%2FLT1gw6ky215vU6rlIuELiz7GwTipw9Jy37coNqUpZCr7oPcNKow2CYcHtqXdoDno4VD2DCQC7Q2ZCDOR77W%2Bz7S6YzOuENjB3sJUK4dquQg0qCGuEeJEeF0ymlpay4qQECRLODSbMeqlty2rjoyQrZKBq5eDZ3ik5dt56z8vUNb2EwnVjlxZc85t5OFLQ1JL%2FhjutEd5CBpDwsQzV8tyXQ%2F0V96yHOH0v2Atn%2FEgzFNderuODLt0MXYHnxXjpdlr%2BTnpxXQI1dsMp1qoNJRRFv0XnyrE1grZ9EV0nN%2B0d%2FrZcJ3zsS8%2FkDmHGY6bOyLYnKv89aT1iD%2Fg%2FkK4UbQ4Kon4P8G1lmZmdGc80S2SNquMS8T5ekkbdOZmQ%2BkuXscfUIij3wJMSpOs1krUq30jPIT2LSEkGjF7i7J%2FC5yj3MHBD52iuTv38mYAgSY3vSp1IQH9ifJMtNsiOPL%2BwPYswt6y5zQY6pgGR1ZOZ1T1IF5WQiWSLVwiVkJ9MeLMyUZ61kpdtPf3xh5nvZTtGC9mK591iN2l7naLvtXWgbyg4AJbROLzUeVP0b4OuNCInS61%2FLu5SfJH4FpC6E2pJqqSsaZy%2FC5Fja0r%2FhjxeXXHX9CfS6wdPH5cWaN%2BTe5%2Bet3E5p7N2KmxrmrfTBc8u1G5AMX5fwnorxHxlaVvUz76ORvVk5LYtdzF3yt8ZZ6%2BV&X-Amz-Signature=2ad23327ae602a65988392c1358c6c404d50ed78476f6668968e400c4ddbd149&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRHSZ5B5%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051348Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQC6GzQhtCsYDAtJgdFsGKfC5b6IMPfbWSkOaGTQXVmnzQIgfVTOyAs3lQr2yQ5PHBk5ByoTnwtro5WfIFgHRUKeqAwq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDLr8o5Y2q4gQoqGLpSrcA56vH1keletKRMoIAgXIL6ADXas%2FNBVCAZ62tkuwim10FBSKDNYKFNbie5wh8YtCFHuoF0AgI%2Bq02RZy2xscKZ3gpsIODLoUeMyCjdhXj%2B4q5SxzYUNVHGoYCIxCpAfLvRqx9Q%2BRg5eN7Pu6ms9hEH1oFOo%2FSHeBA4rAnEsiTNYZzIOGC5LkPvwoIB%2BnJVb89NKXA8jFrg4OwQEAH377BATIegb2nwNtn%2FlLBOoM9JN4mPvL4cCndQBjbJTi4PiCu6JtPjLv6Iigh4qPro4h46S%2FkRTMPoKrm2ffTVQAWuI%2FQUAk0%2BwJSZC%2FAiFr84ARsvEhkM%2BgTsONf6ak0f2LP8%2FAxcq5PZ9tIAGX0CtcieC4nGmTsFisDFK0hzAyLPYA8R9wp6Vgf7C0wJEPERvD6UBMLu%2BL%2F6WBwyCuaWE8D1OFGx8CuMY8dV7phAKgOJNmagjlf5ZDc6dqngWDOTpoPOVn56HLV927mcqVo68TAfxTRIka2X7%2B3crwoO8m1vf%2B3QYIeZ1ksfGVGzUfg2Pi8SMpJkfOwEtdXB20zwIiemITE9Z%2FDkgWC%2F4thVTchgPiIRBI88d%2B%2B9EQRyc8cCTtJNC%2FudB083M%2Fl5iu%2FTMPZb18gw%2FBpzai9XfUVtqaMKusuc0GOqUBZukx5dRBwZ7zmT5K%2BhscG70mwsWfUd%2F5Kh5cpERFQZ33MG%2FjX%2Br%2BKPzq3angdnOPharkfTb%2F04Gd%2F%2FgwZL6uxSSyXOAgxobOCcukgJSqcRdJZJldTPrOI1hYPXXNDYffeLCs%2Fo33XdQ%2BcwFXEnJ9GVSetdx%2FEEbwzTrmuWRq9L5J%2Bz9d2IES7Ziegok4GIPE2UYESDBd35bY1Xdd1LFJMZ9ofp6y&X-Amz-Signature=4076c017d532c2c75d759b62db1fce34c60458532f62b946eb57cba937e0db3e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQR4KULL%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051349Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIH%2B5Iu3rJ5g7DDCacCfhR6aC9zLz4HiVz2JFZqLXIGNUAiEAkQ%2BUYfgfNLsuaA9t7s2%2FbdEK6XVpr9HuOil4OW0j%2B84q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDIR3I1ShmZxQkdp7FircA6OnMrBB%2BA4RyNyyVB5esWamlgoug113BtvswiUFw4sPavvYVL6%2Fo5xTqbCBZ8Y4L9vU%2BJcVAvuC7Cx5z9FHlYxyVVOdBKGk5DLNAaPJXGAyt9NWIC2jnTmIrLlKZHAQ6Rq%2BxzxX7GlZ5%2B3dQe8CyVTrbOTJncO%2BT9FnskHPpqaHuG8ytI957qJ8Z36V%2BKXA1smeQRl4xubPPwmPIQ1a8zHjQLRNpNuX7vGpgT3Dr0bF0rUPFgWm%2F4cB99z%2FX2RCBwKIFM%2Fnq2Bi3Z%2BpczvmRyn02idPd%2BG%2FvG6TrPjcFepDYjg%2F%2BQ3vmoz%2Bblj%2BOLtclEOW7ZZCpKh53HWAKSHva%2FaaFGJslOUC41Vg6oDc7eDNTpSJ3MmVClu%2BLTH82BzWz5TcoPRBXCY7PqM%2FrY0yatNLEC5%2FRQNDUvh44utkIyRpFzzXF6lCvREylZeIUiTvPLqWZ4XO1zO5R3ZBAFye6ZIAfkSfE%2BC7hd%2BTEz3ovGiQYaPzhvkwBhEzkus2ODw4A%2B3qdvtmcamN0TxcIm78jOrw98yYc4gacUvCEwpuAu5szWqLSH5tkHikWzB8dZPAxUiEPsAA%2BSHDiJoIS4DrXU7e0vTQUP7V2P7nrjk%2F8zAxcjJNOC1nU1SuPcIjMPusuc0GOqUBC5FvxABVUNHmxDqaCuUCQ5Fru2Kw2kmNkziRdUwXDLh%2FLo5S4RVZXKB4MCag42X6%2BZD2X9dyp73VAjz8ZwDC8Topt9Txde%2B536K%2F8mYozFa54yTwoGcCME2CfbURTQDthlUU3FqQvvTkGS5cQzzLzyIJiC5YTdv%2F%2FU1n21EZHuWKr7TAsGYLe3t40fDYfUomfqLTgeex%2FoDmJWDPI9zsKETr9ny3&X-Amz-Signature=f261c4f089a9087aeecbda8d0e86bc336e1dd6678ba15220ec9ef4752466ed98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CVISIAP%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIAtmUMbmNDjvK6RwbqtLQbIoI57jPTo613cKVqWFBc6cAiEAyniJdiPQEo4cnF2sEivWgiyYcMug1U5jiCMJG7Y34egq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDDNxVWJdUac%2FUSDjzCrcA%2B1mrldIoBya4uKm0ZQzxUketCXrnEXQDOfimCk%2F48sLGYVimMcxJ01dGbOtSggyqo4s9Dkk4Eo4yQosQ9Z1DoDQd3P9LQhvJfStKZ%2FfFGtiDU7GFx6it8p16D%2F5ISS6PMOsgDhrwh5u2LpF9fi2SGButp2%2FWfLUDHS8ammiS1pBSXcDs3ZbxPDnskvnEfPZLef7RQxcYLSHL64%2BlIfxAiv5wHGZapRbsEF9Hpy8EghD0c1yUJr0bs6BJf0gua7G4OWoya8Uz%2BKDFRJ2K%2Bnao5EGWaREq4MSkLVQc%2B3DjL8l7O%2FcwNWGADNjaHJqx3jXoke1No7Tjc4bplyIKSEDgpk4%2B6S%2FiGTxZpjfoLEhdV2p6Ne%2Fx9GvQ%2FjZTCjdmuZFEjwWRX%2FPcDsZMfXKT4c7Bzo%2B2tSdGqRMa%2BfSKQlEyoo3cso59B%2F1n%2BtxN6tYLO5wP41%2B3rPUNeS72H5N%2B0%2B9kw9aox4hp8XarUMAvd3ddWofUf4HEeRitsfeX2YD2UAXQUm%2FSa7WH39OsGnPh2edFv7FoTulpBpORqx7kXgWwlPVZKzGvk7Dyce0CE22TV5RMyjvegsEYCtT4k3xn6H2Sd%2BPKmis53qmGjzqZ7iDV7XFDcIXvMZxMWzRZPw8ML%2Bsuc0GOqUBm6ts%2BNRpgHc7silsvAPR0SL%2BHt4tXGg55I79nh9QouE0y4KlqaLrTkUTyjV7WP%2BdB%2B1cmxvqfX0Z3MkXct4mnLyCV9OBwnaWUa%2BSbMdUzvCQmWrqRySzArykBtbCJTmIWDvAUPaxvl1MSYPn1OQez6cgx%2FOgADjqzk3pZgvpJyms4nGn2PfkLr7o51NvMDUQ79nRc4OJM77PlKB3HS81OZNmozgv&X-Amz-Signature=0d16d6da8fcca8030c3a2bd5bddd172ac72a5fd2aa30b6f0924cd3c7df801142&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663CVISIAP%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051351Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIAtmUMbmNDjvK6RwbqtLQbIoI57jPTo613cKVqWFBc6cAiEAyniJdiPQEo4cnF2sEivWgiyYcMug1U5jiCMJG7Y34egq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDDNxVWJdUac%2FUSDjzCrcA%2B1mrldIoBya4uKm0ZQzxUketCXrnEXQDOfimCk%2F48sLGYVimMcxJ01dGbOtSggyqo4s9Dkk4Eo4yQosQ9Z1DoDQd3P9LQhvJfStKZ%2FfFGtiDU7GFx6it8p16D%2F5ISS6PMOsgDhrwh5u2LpF9fi2SGButp2%2FWfLUDHS8ammiS1pBSXcDs3ZbxPDnskvnEfPZLef7RQxcYLSHL64%2BlIfxAiv5wHGZapRbsEF9Hpy8EghD0c1yUJr0bs6BJf0gua7G4OWoya8Uz%2BKDFRJ2K%2Bnao5EGWaREq4MSkLVQc%2B3DjL8l7O%2FcwNWGADNjaHJqx3jXoke1No7Tjc4bplyIKSEDgpk4%2B6S%2FiGTxZpjfoLEhdV2p6Ne%2Fx9GvQ%2FjZTCjdmuZFEjwWRX%2FPcDsZMfXKT4c7Bzo%2B2tSdGqRMa%2BfSKQlEyoo3cso59B%2F1n%2BtxN6tYLO5wP41%2B3rPUNeS72H5N%2B0%2B9kw9aox4hp8XarUMAvd3ddWofUf4HEeRitsfeX2YD2UAXQUm%2FSa7WH39OsGnPh2edFv7FoTulpBpORqx7kXgWwlPVZKzGvk7Dyce0CE22TV5RMyjvegsEYCtT4k3xn6H2Sd%2BPKmis53qmGjzqZ7iDV7XFDcIXvMZxMWzRZPw8ML%2Bsuc0GOqUBm6ts%2BNRpgHc7silsvAPR0SL%2BHt4tXGg55I79nh9QouE0y4KlqaLrTkUTyjV7WP%2BdB%2B1cmxvqfX0Z3MkXct4mnLyCV9OBwnaWUa%2BSbMdUzvCQmWrqRySzArykBtbCJTmIWDvAUPaxvl1MSYPn1OQez6cgx%2FOgADjqzk3pZgvpJyms4nGn2PfkLr7o51NvMDUQ79nRc4OJM77PlKB3HS81OZNmozgv&X-Amz-Signature=de677392a16826e97f4927e801b00bbbcdc60de5de52f3d2511ffb9b50ce78b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VASCFZDZ%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051343Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCICR88N%2B%2FMWfNU%2FhS8dzY8kK29Uos5G2CifkxDeHpBeEHAiEA0ToiyDTeWMgBSD%2FI8qQIVEco26aTAYU8nngS0%2F2pdg4q%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDAKr66jtPvOdL9yEkSrcA6lBycIQharzZh1GL74RqU9ojaPSCX%2FcivT7GwI1KIid0fiDKe34LvU5Dxuz34%2BCxwRqYkoZ7LKj95IxvW0SQSpwZ7JkorB%2BNDtOgpU2kUyc8%2Fn0TYvZ1VNXP%2BR3CDH3a%2FEUsgB7%2FlE%2BKkM4CAhCmnnuYql%2BWjXyJMx%2FZmtVKuNgGu7z%2BagFaH8IP1Zv%2BTzlBVMgq9RcjaCLAp%2FUEp%2B1QlSfLLZ9cU8PuznPN4WSpXFFgZvKYw5Zw18KktJ3z2TqmWpLmVOe4T1Nxni0cIBFITYLb0dek0LH1Dy%2Bz%2Bpb%2FErwT%2F1iInX9UBs74MEQbHZE0JKwN9AKfb7CkLf5yM5EKVeK7qZ5O37uh4q%2FGj7VIFKC2Ybwc8MQd1fcmWymSrabQ%2BpP45hGXkxV5GbWcIeHx8lwsG9K9S%2BaQ%2FUx6hGVRvpmHmJil2dng6Qr%2BQclmhLGIF8LDCufXhlxAPcva7x0ZUbQRFEPILNN%2BW5ebtPW0sTgFJrLGHz7y3z52pPGDA%2F4NHpj8lJDKbnCR9c8lHRSB8QznQERmMY5YcFzBZbLBrj3irWnhnHI2%2FmgX6wsjTOtwchwzygDDR%2FljOLvIikyl%2BpRAV6HHZaDjvtByJnuv9OzojbJWmaY0LMtkT27MNSsuc0GOqUBijZJEtpm%2F1t8otrkW7q7%2BLvX%2FLbbcgJazHWO%2Be95RCRSj5bqUK5qweAXWeSbuBCWtiZtTju5%2Bj%2B8EABwuzKSglUBuc3pRjtlZOzxX55lLsW9xZCcLetYUf6OKeCkuob8naZUmx3Kl9NGmVirGhSa%2FJ5IPzHP5KANyeppNnhpM4VPJDQ%2FK4x6iqjM9KWEKs05ET8%2BuSwi02YMaohpHm9ipLKUEyvw&X-Amz-Signature=e36c9d35325a9aab3543481b03d6a90ad79e62d26e7904fc476674d5e10b23cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGLYGP4H%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQC74JYjBtDHGuK6Vjot9qFtYZwLir5eF6TZ8CNB5y7HvQIgIfjKSG62N%2BLswaGZqY%2BwdKGY2qV7lnL5fmG3Ku2rQWYq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDE9lgLf2f0eGtW8BWCrcA%2BqHD%2BeSiKBtSTqPsRG2U%2BVKts5uBOlwmSdAt9HSfNl1afk7OhCu0wjAOEerpNYAkRZCHPINQv5GApiZHVd81TDip%2FJDF7IdmxxA9Eow2%2FQz5YlXOzSaBYkrd5gXx%2BC3jc1m0mOII9W8odiaVnh3ecF%2FAdA%2FHGsJ0PfqPL7S0%2B4ZyRMfMM9frNE7B7PYw0%2FjalAx8Vt5HVtYjyAuuZ1tif2MMVbSXDLdEQrxVZv3OBo01F3sQSd3H%2BELp2VsjvoT5EKmKFcaW355OfgNra2KmPied9XNDUb2Xb5v6K7AW7hCOK4BI6%2FzBGjvl%2BYQlWor075XjhbxUQ7GfV%2BZe8cPA%2Br%2FHMqJNJEuqpOiN%2BMmrZN4SllsUJr8s3Sh0kXfapHlMB4yd0KLx%2FPQ%2BhR1Y0bAav1Zbm7CGEQ2A2CO5%2FHGTAN4GI%2Fmz3ovqVfDndp8F0xrZXVCEvyeeYuz8kB6KYqV5Hx%2FycCFYpnVZkbilb3Uve3uP%2BOTr%2FTWBuO05JgiqniIC99sMJj4Yz688cniD0CRIwM%2FMBHLeR19PuUvqJxGDVT0QG%2FLPPdo6I5DttlyCgHH%2BBi0imBhVaOp0haUqnkyWrAG4kx29pBs09k4fSBuhHNMwQ3Nk9KbLoMvpcfWMOusuc0GOqUBLnIMvxREiEpyQb%2BGRPZeA6XaJDCWRdq3yObCQ6CAFm7KG5ZFPza3lS%2BMAZZG0tmwrAci0sFIcd1FqtYnJPjrwhzr0AO2vFGqrXsaaMEPoL0s66SHqp46vdEmddAco%2FQJeKsnYr7e8B6qb6Mxc0LP5PV%2BDZW3o0teU9dU5VjjaLhM2%2ByPhE9DkjD4JvfmFv5NDSegQej9AF785XV%2FzEZzQaGcgXQw&X-Amz-Signature=d52de6a1f03b5b451d2a1e4602c921ac2d8c24308cb8298e32e5a1a729cecb5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGLYGP4H%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051353Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQC74JYjBtDHGuK6Vjot9qFtYZwLir5eF6TZ8CNB5y7HvQIgIfjKSG62N%2BLswaGZqY%2BwdKGY2qV7lnL5fmG3Ku2rQWYq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDE9lgLf2f0eGtW8BWCrcA%2BqHD%2BeSiKBtSTqPsRG2U%2BVKts5uBOlwmSdAt9HSfNl1afk7OhCu0wjAOEerpNYAkRZCHPINQv5GApiZHVd81TDip%2FJDF7IdmxxA9Eow2%2FQz5YlXOzSaBYkrd5gXx%2BC3jc1m0mOII9W8odiaVnh3ecF%2FAdA%2FHGsJ0PfqPL7S0%2B4ZyRMfMM9frNE7B7PYw0%2FjalAx8Vt5HVtYjyAuuZ1tif2MMVbSXDLdEQrxVZv3OBo01F3sQSd3H%2BELp2VsjvoT5EKmKFcaW355OfgNra2KmPied9XNDUb2Xb5v6K7AW7hCOK4BI6%2FzBGjvl%2BYQlWor075XjhbxUQ7GfV%2BZe8cPA%2Br%2FHMqJNJEuqpOiN%2BMmrZN4SllsUJr8s3Sh0kXfapHlMB4yd0KLx%2FPQ%2BhR1Y0bAav1Zbm7CGEQ2A2CO5%2FHGTAN4GI%2Fmz3ovqVfDndp8F0xrZXVCEvyeeYuz8kB6KYqV5Hx%2FycCFYpnVZkbilb3Uve3uP%2BOTr%2FTWBuO05JgiqniIC99sMJj4Yz688cniD0CRIwM%2FMBHLeR19PuUvqJxGDVT0QG%2FLPPdo6I5DttlyCgHH%2BBi0imBhVaOp0haUqnkyWrAG4kx29pBs09k4fSBuhHNMwQ3Nk9KbLoMvpcfWMOusuc0GOqUBLnIMvxREiEpyQb%2BGRPZeA6XaJDCWRdq3yObCQ6CAFm7KG5ZFPza3lS%2BMAZZG0tmwrAci0sFIcd1FqtYnJPjrwhzr0AO2vFGqrXsaaMEPoL0s66SHqp46vdEmddAco%2FQJeKsnYr7e8B6qb6Mxc0LP5PV%2BDZW3o0teU9dU5VjjaLhM2%2ByPhE9DkjD4JvfmFv5NDSegQej9AF785XV%2FzEZzQaGcgXQw&X-Amz-Signature=d52de6a1f03b5b451d2a1e4602c921ac2d8c24308cb8298e32e5a1a729cecb5e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLIZXA5T%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T051354Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQCVO%2FWxlf%2Fygy0ovElpZ7LmPAHUGPK%2FJFqu90pL9SCpHgIhAKESVmETNsgOSxQpI%2Bp36VFzsnOUGLPBRL06qebZnqkSKv8DCCYQABoMNjM3NDIzMTgzODA1IgxBWnFpuuMRic3q530q3AM6ruDr0c2f1L5mS%2BpoeGJwbC%2FqDuj8E4YQFKh6VhemhJn6ZkPewvSAWX8B7yaW9MOF4%2BpL93sjvTpol2x18B%2FqBXD2xm8rTQtO5jb8cSY0lCtRYektaYQ4bqPgQQkYbFhe9Y%2Fe%2F2IF4dvzAy57N1F4vdZGRjH%2BxNB0hTHrS2P5OnRRs39%2FNwXULUIlBWpI9AFi9yVmH%2BSZLKWxq63beQx4LdDrMIlZZbuvBoaW8LZQs3BCcSOtCLtLlaMyeUmrlVwWRPf5I1rh8Ja9h6stddysWsg%2Fshws0FSFoWWy5mab76ep6pN6J1%2FwA59Gb4uKidP7M1QFkfVviWmqsFiTwpHW%2BJbQ3OdbITn8qeALuAhIqT7wlCvHBCxofvSuLyeQ8z83eEtnriNyJTtuQmQp8ypfA0rmhJPE3zEcukkSaP%2Bbnh8sIS3u81pJgtvXgH%2BCdN%2FvFEDwNrC6BDKU1nFXH%2F%2FFwvlinQDUiecS1vhAPf%2BdlAZXQw%2BH0zc8ELpqEWRVpx15HeRPnqI54NDvrO43kVUyVcZcutR%2FUqBzwyRkL6QCmqUN%2FdwNM6V6yPbAI6J4E7LF8pNkakwpX2oiglbSICX5TVxKzocJYWsmTDAMc2U02J2tmtjLMbTFyZc6VTDhrLnNBjqkAVuYtFrhqNo7layDmCcCvCpYL4xeQB6oM4IMLrh7TtDxAjUboKG6YM%2BS3VdermUqTOURXUCbco8LmTg47dprDBKOMSnoZfSTigXY%2BvEmPtbKwJisuzXZmB6vqDjQq2qUA%2Fnpba0zyDfO%2FgOa3Dy1I79ImD1bCNpvB4NL%2FSizw916GMKu%2BZrf6644N9dnxe87IEjgQSow79XF8cLCnkx3zCyuiVX%2F&X-Amz-Signature=648471e132a46f8ea0cb87a64e19f0b5e657992743876c8a7fba249e7dbe8f00&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

