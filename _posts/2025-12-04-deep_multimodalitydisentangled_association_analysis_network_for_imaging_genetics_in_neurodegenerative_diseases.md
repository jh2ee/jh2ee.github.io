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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6XOSVJK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCWtaid8epu5%2FsCJquEguXVOGCWUzzDmAPohcYx4%2F%2FDogIhANLDdj3iflTdrcbLTRW6B2JjHZ40XALMW3X81tEd2qPHKv8DCBEQABoMNjM3NDIzMTgzODA1IgxIBPFj0iE2c2WeuDAq3AN0%2By2YcT8gLMnLbWqSmVoSgfczbVCkFNOMascTWQeGfUvtApoNeQej0j%2BjB54MIGBwMIEMS8FDD9qcdnbqkhywACSRcOiD%2B5k9Huz2ff7SazkBzEb4ZmOe%2BFU%2BsBm%2BhvJAk7FrHZY8ZxDdKOVdtxIqkvZvnranpkmAc2cXSpkmwLIysRmFubuVLI9wUbl%2BA4nQj5OEuNgRCoVmGHlcNPQzpVBTsSmslJj6s9nG2STXL3j0da5sq6Mu%2BWPC5hXWgRHdQ7va%2BQkXOLYZpKSHbM6IBaMv6f0cfUYHahVumRdo9XJhzjOdtkXsAejQ%2Bb%2Br5atbYg3v49ZehVHp%2BPLKfe7OQZPk%2B1mVbnVBKVbI40fOWF%2Bp4hIXE4EhwRc4wq3NsZWlrMz9Qetg4iIy5%2BlTct6Ui076PFEN0ODGaQlrYDs9j5eO7x8Efz9wxb1YBr7Otd9zbRrx0olihuTeoerGooJ8GWe8A7GA8S%2BHj%2BK1uu4jKGqeUgJcN8reXOLYT%2Fak2QHrSumBEmMwM2GrNDx1TdOpaUxOPERzk3UpiezBHNUc8XGl9hANcJKXmRVeQmcvdwS7y8V%2B0aJj%2BbxPyH8TCcjis8GrnjVLsEs8t1mGrnyH3ObDnWdZWB283ayHWjCfm6XOBjqkAadb4gmUT%2FPgsGeLGCjUjzMSrMoz2RcINf1jqBuaZi6DuMrwt4Kfg5s1uUu9dfslW3GNNB3ntNsluN3CLgx20tdFQrhHmyw8yxvnAwbT4xF9lM1s5Y%2Brq9t%2FknhmbVI6JJpdq6M%2BphlDr8v5UzkS26%2BCCbgdx1zIxyQXCiJwiEqIvrsp2Uf%2FOyM%2BfjS1%2FWi7L%2FX%2BlmYEIJlTbi%2F3SpDPEFr8mDV9&X-Amz-Signature=1589c686d7b557b7b108a39e1b0b2c66e26dca9c97aa267365d45b66844a2ad0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U6XOSVJK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161915Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCWtaid8epu5%2FsCJquEguXVOGCWUzzDmAPohcYx4%2F%2FDogIhANLDdj3iflTdrcbLTRW6B2JjHZ40XALMW3X81tEd2qPHKv8DCBEQABoMNjM3NDIzMTgzODA1IgxIBPFj0iE2c2WeuDAq3AN0%2By2YcT8gLMnLbWqSmVoSgfczbVCkFNOMascTWQeGfUvtApoNeQej0j%2BjB54MIGBwMIEMS8FDD9qcdnbqkhywACSRcOiD%2B5k9Huz2ff7SazkBzEb4ZmOe%2BFU%2BsBm%2BhvJAk7FrHZY8ZxDdKOVdtxIqkvZvnranpkmAc2cXSpkmwLIysRmFubuVLI9wUbl%2BA4nQj5OEuNgRCoVmGHlcNPQzpVBTsSmslJj6s9nG2STXL3j0da5sq6Mu%2BWPC5hXWgRHdQ7va%2BQkXOLYZpKSHbM6IBaMv6f0cfUYHahVumRdo9XJhzjOdtkXsAejQ%2Bb%2Br5atbYg3v49ZehVHp%2BPLKfe7OQZPk%2B1mVbnVBKVbI40fOWF%2Bp4hIXE4EhwRc4wq3NsZWlrMz9Qetg4iIy5%2BlTct6Ui076PFEN0ODGaQlrYDs9j5eO7x8Efz9wxb1YBr7Otd9zbRrx0olihuTeoerGooJ8GWe8A7GA8S%2BHj%2BK1uu4jKGqeUgJcN8reXOLYT%2Fak2QHrSumBEmMwM2GrNDx1TdOpaUxOPERzk3UpiezBHNUc8XGl9hANcJKXmRVeQmcvdwS7y8V%2B0aJj%2BbxPyH8TCcjis8GrnjVLsEs8t1mGrnyH3ObDnWdZWB283ayHWjCfm6XOBjqkAadb4gmUT%2FPgsGeLGCjUjzMSrMoz2RcINf1jqBuaZi6DuMrwt4Kfg5s1uUu9dfslW3GNNB3ntNsluN3CLgx20tdFQrhHmyw8yxvnAwbT4xF9lM1s5Y%2Brq9t%2FknhmbVI6JJpdq6M%2BphlDr8v5UzkS26%2BCCbgdx1zIxyQXCiJwiEqIvrsp2Uf%2FOyM%2BfjS1%2FWi7L%2FX%2BlmYEIJlTbi%2F3SpDPEFr8mDV9&X-Amz-Signature=1589c686d7b557b7b108a39e1b0b2c66e26dca9c97aa267365d45b66844a2ad0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663ZATRZKV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161916Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIFRrxml17iQRj0HnUC0ob9%2FMIc7PSPCEABGdUrvgiWO7AiEA6Tm22kTmW1HXsM9ge3HLYlYt0YCgzo4PORN4iFH6Vkcq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDGjBAXZdCiOxbMq4zSrcA8Csr7euFC%2FSqFCQek%2BXlrz%2BpMT4rFB%2BXhTQM7jyF2Uv%2FCpg5hPoUKsYo0Ljethxs5elVFrUa2yAw6BqdGctN1DPnZERHO7TlyxZmuw2JwFiZOjfReunllUYL9ceMYfhwmpSCPHSwAAb5qLUv6Gqb3yl2pN87xsRtbpco1DkCd7KCnTsuMv3v8c7KGTZ4GjilLqicTGOa8DyePKweGJZBUfbqZFiI%2B3648Jn9BNtBSUEdtNN9uT89hyRBh9LGOUMvkKu0rJY0nMYSbavgwJh46Ltk46haJqs9ECxbGbxufFp%2FNWRE%2F3OFZUoFkTJcak8hoPpPgBffrffWVv%2BaxhQUwD%2FGopC01GHnzTBeZohigi2mi5H6uM3Q6kJwKGgyS3ZtNERUyvAgnNwq0bJYuLACilPq4i%2FPghOM9ovEFQhn3cg1z1AiERlastM%2FwAmG53hXj2wjdsl5Au%2FgtXu0rKku1lyYLKnVsm8%2FiVJFfExyWSxu4LHmigFWVrfKCk%2Br%2FohiTDP3fBq8ymeL5HGnJKyaWOdUCEKZCpqUHSWSW8wI%2BYdSNi%2Bsu21NvmlPArL1mk0exmWdSQQqtM%2Bxqh2%2FKUyocfEAV4ip24rcraZOWmKqYAQN60NsjPEhdkpYJ9tMOKapc4GOqUB%2Fjp1LVB%2F2cuwNQFYceMk%2BbUymQoS3WcsaZueKS0f5MJTDbk2r3gq7KK7FZ0sD0a%2BUDCzSjKfQ18VEd%2BUkGAaPI1ksPefV3rPuqqO5IJpuw9S%2BLW2%2FRrnnhm%2Fm3%2FvEvgXB45MBhSF0eITyl8Y77GoLB4uwFiQ9UmV6xjwUFKwRedkNcgXQ1wNRvIvsUWOeg8F2IQZpWk8ry4HyoQaNFoAUXMaBgkW&X-Amz-Signature=fa3467e83bc3aacd98956309bb058ad0737c42580f11c054c79e2ef0c30d25da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KMETFMD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDU51IV1mE4%2FjnVJV0ss2GeQ%2F80K7zzXI7WBW0smzYjqQIhAJOg15Ks7B6g7r0pwuhdaPatUJanp1G0%2FIAYg8adB92hKv8DCBEQABoMNjM3NDIzMTgzODA1Igye4Mo4Q3offVWCDg0q3ANlRUz%2Fa4qW6nCGkbwRcCkrmoxChx5poAhR3gzUNxQr3CQ0iDdXR%2BonGwYu14pK%2BzdjLJ7S%2BXH%2B58jWFC5kdR7EalXOKGRNdWOrWh7lr9j2bUNmoDnb%2BDwOlevn2yoYhOFLxe7fra4LjE35Lcm2jTRp7HVPNBrJRiUnZgliCI%2BaElB9G6lY0xO%2FGxW%2B1GJ6jFQW2JM5GimsUXTZYSjwjxI5aCcOOJxKbVCyZ73JYZigl1AMbqybcE2%2BmoxSu4kj7ENhBmEE%2BQR0cMqKE%2BHr462fJzTz56DFEhAeYWE84Tn01nFlPlt8fxDLg%2F%2FE9YwuGjqHng89VRBtO1664ZrM7o1Ul9jp6jrjMFcAgk0%2BTnU5X5BH1PTyklmnyxeWxE1ba2%2BegANhu44BOxJxtTsZMqs%2Figw%2F8ILBX%2FKRyUygCgM5ENXwD2dH9s13AXGBG3VVMGULkyFo%2FE5j5e1udchYWnMzdx8VKUwNV47OL09XSnxAPtrP9Uuz4warW7WouxV8b97duQ32eABIM11g9fmp3jGLnWAese%2FWkN3tsVLrHE%2BsQhQQxoRAQtSNZ9iNGqBNXxoSLtaTiozKvTA3HckGFXbkJhpckV%2FEKLppsuPk9GlyooD9R%2BwYpQ6nxvK8VzDhmqXOBjqkATPH%2BiPEXTWajGkGuLcDCkSPpO6qYuE%2F5%2BbwovZ54te9FB1j3yHFRq5DevlESZsPawjDb%2B3tnANC7pkv%2F9TlDut%2FsaBCpdyuoKredTQrIfviDVyeLqiUigpO4AlT26QbX4xaOM8Z2pClLM1jWbQ37TG%2FhgcWzODnLdcJb31AcuvG4AF44nu%2FYieiN2%2FBAf0FHkyrqe7LDmg3eEB3t5%2BSbAZomh6x&X-Amz-Signature=17a14c2d4d75292bb5ae5700e4671bea4d64ab198ec3cbd2764730abdbf64007&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662KMETFMD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161920Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQDU51IV1mE4%2FjnVJV0ss2GeQ%2F80K7zzXI7WBW0smzYjqQIhAJOg15Ks7B6g7r0pwuhdaPatUJanp1G0%2FIAYg8adB92hKv8DCBEQABoMNjM3NDIzMTgzODA1Igye4Mo4Q3offVWCDg0q3ANlRUz%2Fa4qW6nCGkbwRcCkrmoxChx5poAhR3gzUNxQr3CQ0iDdXR%2BonGwYu14pK%2BzdjLJ7S%2BXH%2B58jWFC5kdR7EalXOKGRNdWOrWh7lr9j2bUNmoDnb%2BDwOlevn2yoYhOFLxe7fra4LjE35Lcm2jTRp7HVPNBrJRiUnZgliCI%2BaElB9G6lY0xO%2FGxW%2B1GJ6jFQW2JM5GimsUXTZYSjwjxI5aCcOOJxKbVCyZ73JYZigl1AMbqybcE2%2BmoxSu4kj7ENhBmEE%2BQR0cMqKE%2BHr462fJzTz56DFEhAeYWE84Tn01nFlPlt8fxDLg%2F%2FE9YwuGjqHng89VRBtO1664ZrM7o1Ul9jp6jrjMFcAgk0%2BTnU5X5BH1PTyklmnyxeWxE1ba2%2BegANhu44BOxJxtTsZMqs%2Figw%2F8ILBX%2FKRyUygCgM5ENXwD2dH9s13AXGBG3VVMGULkyFo%2FE5j5e1udchYWnMzdx8VKUwNV47OL09XSnxAPtrP9Uuz4warW7WouxV8b97duQ32eABIM11g9fmp3jGLnWAese%2FWkN3tsVLrHE%2BsQhQQxoRAQtSNZ9iNGqBNXxoSLtaTiozKvTA3HckGFXbkJhpckV%2FEKLppsuPk9GlyooD9R%2BwYpQ6nxvK8VzDhmqXOBjqkATPH%2BiPEXTWajGkGuLcDCkSPpO6qYuE%2F5%2BbwovZ54te9FB1j3yHFRq5DevlESZsPawjDb%2B3tnANC7pkv%2F9TlDut%2FsaBCpdyuoKredTQrIfviDVyeLqiUigpO4AlT26QbX4xaOM8Z2pClLM1jWbQ37TG%2FhgcWzODnLdcJb31AcuvG4AF44nu%2FYieiN2%2FBAf0FHkyrqe7LDmg3eEB3t5%2BSbAZomh6x&X-Amz-Signature=0ae2d3d2a3cd997f2623e8317490b4ed82d8a732e713fad3d414e6ae3cff7c62&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QOCBY5IO%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBIEtRB1PyoOROdfVmN9FFrMHZvbOlWaEdN%2F6sbXEvEmAiBxu5osaGgoTJzIYQmECt1hNAIDWKdQl3Fk65tt61BbVSr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMQiVuPQ2Ca5KkUJYHKtwDDj79T21VuFIGUSZMMqpb0%2BsztjKA68tiaWM26Yi3SlXLMRnfT5NVAkNtwlEx1o39wTIQ1OPtHC74Aoe8BtEoMqVGrmE4rzVSl22avp%2F8PIUl%2F7sACzdKV2OVRqhtxGZ1K0F%2F9MkJ5ujK6nAxpA0IBg3vtAF0%2FO%2BrXQcEXUR3gnWb%2FAkargSGIVrEPI4bN3SaEAI5%2BDLtGfRLfZS200dotpbT44BeLkkANn1DvXHOs8bTFAmotnXBEkmoA2z%2BnrI7Vm5cTF8KKH5pEP8lXfd%2FRBV72DWvo2UtRDTx5El3CIf4LqFKu3v1s3VpyE%2BzQ7o4Pm6K2jPB74m9nBdsc4Cy9i4BMbAQF7DxuDNNOfJshD%2FJlq3f5ll9ag72ygNvvOkNnlOJMPdpp6eCapSB6oWw8Ygo%2B6gPBA%2FV47t7Mby8qCvwam7P0UmW1yxwFOkPbazY8uQmaJ5HP4k%2FqTFoIqJaIlHjK5SHB8SvlHN1IyIQs%2Ff5N%2F5JN5U%2FVUPaTi4lqhrCr9EaqD3c61Y2waJeT1c1lGLZh6483m98mhzzmUPjB%2F55xcpZ8k3n8YyBPBRDDeboStcxkrUhTZqq%2FfBw1MeWCm%2BRZIAGbWb9C1Qc%2BQHZrF8iLGtt62Xn3ZMCNfsw7JqlzgY6pgHrZylZTHp9z4nG6s3Bkdtkeqjw2oYB1aWXRcYXyfiWwcUwcKf4dItHzoeiCXyfzpgKqTa1x%2Faj7xRzfUj18me3QTrJ%2BfADyoNq7B1YCotxxqzsmNAF3%2Bgz8GxxqUbENbnNOWa%2FaCNvvauMlqWHXDexdzZtuzql6zM91%2BH0D4Bsw5ngneCHHJgxzQvzkdl0I9HQjlFroJI75uP7HQFiPlb%2B0RnUZtV3&X-Amz-Signature=b6f03572ad0643c53bddf6997174813dbc98f6b75f5bf6aba2082175754394fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RS6KGJOD%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161921Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIQCVtLEyo6IxXTjsjvA1k5ZnMtxqnIRAP4GViLhqSy3U9wIgBsQ4dOJVHD18x%2BUQty7yPx5LmCDMUSiaNiqK3czKma8q%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDDktOBsOliJVpSVXLircA67UxvU9UjIzM40qrSxycZTDcVhfO6x0UdqhbDtgaqj1ULkONtXXK%2FAwQ5rmg4nedo5ayc%2Fa%2FpsQ6%2BtUnMnTVumb0ZpB9q%2BByGs6%2Bucx5hYbujzn5Whg5SCiZwgduPESJrdTTAQuBFIuVQlzi%2FQPlDp%2BNjY%2Byr2b4hdQM%2FvBa1e5XSEm9BJn5GslHApOchJbYWzRduNYbE9hQ%2B2SlEZ3gQhefjcLukeyXTcldB9fZSblWZ8G3AY2ISVJiauXtyV6wJqmeQJ%2FVU1x0wX4jMcOtFWJrcZdg6ke%2Bn4T8Tl9bv6VHDq6f9utjN09QqbO3nZt%2FNqOENeUuGMEnUqAesX5MqEi7zPeZKk319YrMbvIVokQoom8XvZNIekX65Kzn%2BBK0Lp6HuXZnhby5DtH0Ojn1igvgRRx4O1wnc6UFrhE2%2FzJH%2BZcXxY1TlaIk8o1AAdfv7IwO6XTtdrIyXAk5u7J%2BOo3AQndbCAwaAXj0gbz7SNNEATpCoTLQxtFMAPd2QY0AY%2F2Etb73LKH64WQ4isIyG6S31ZW%2BB692ir0DVumSKf%2BbtottreQ2C0sv1Snj7PUm74wE9b6JuTUpHOkRKrpEGU5DWY%2BoeZox7n8P52SpU2bURANwMHEqlJ1YwtgMIecpc4GOqUBRHcLDmwGeLFIzCt1ofNLPCC2SKZT%2B1OtR7hs8qOlLcJi1RhG6AQaFAMeOVPxB1QKaRIJQaPgmHqDRzD%2BH51fJcWzGvNxR%2FYJWz7vl06iHxESgEx1IsenvSYHHpGlXbjX%2BaTMoR5ADdjV0ZX6P07D71PH%2F6%2Bp7rVDVC%2Fr6cLWAh7fxWwssB5Brp22TZ6IiVrrTRzlhfwGDrqFxIRducl%2B%2FzLQlllc&X-Amz-Signature=5dfe844dee1f467b8159918058bceea5444b4652a8f6fbbc87b4b42510ef3cc4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VICZRALK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161923Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJIMEYCIQCTGtnmaEPsludpo5hKOJfZwiEMk4VpKMT3DNUIKtFb7QIhAPYMOY7UP1SJ6kKg6qt44Db9JN2B7UK9CWZKgmm4jdGIKv8DCBEQABoMNjM3NDIzMTgzODA1Igxr%2FT1e8B8VKG%2BqgUYq3AMUqCPzjiBUH8HVCCEooF5zThbpxq3JvPujwiGc7EM8OyXQ6e2s9vcLB97b3hjkh2B7US9I77Jz%2B%2BYORqzxY3HCUhiGg5%2FTmYJA51xirinaGh2Ppw828MNNL%2FB868%2BDkKRoiQNfkM2v9zse3kcYJxoq8YVEoEdM3WUXVkjlcCQcgQbM%2FamScK1IckZKZu2x%2BDJV92f%2Be1JmX%2FjGOYmdDX7UHge3FR%2Fz76R5c5Xt3zC7wjHZA0XAOu32zzkkF1z1xBhYploUgcfofXEgyiQ1Kauc6xAir4zxiMfrHoXiFdytGMivp20bNel1VsjXLZXbdnu2N2IYgQnVoIOzJ3qTwBqKVSM3QT%2BSgm18lMzG0EgQDzyp6FwmszwW3AvuHZCMzD2DxNuTGVJeZuOLXA0pU3JPyzTRCXWMMHjeblAvE4Fb6OD2%2F1%2BUwKSUHlYo%2BiF2eqs0NEEJt3lmOVqykUSTff1VllC1NAar7B1Qzr4A8v0T3u7m9Nxebs3F7m3AUPXQxwTSWgjgQUIl5G0kM2Ndnw0hHXCkOY9ClbL1noQBD990LXbwR8m4OeX5rvf5FJONMXyT69Afy1DV6i4y7zjiCaR%2FtWh7O33zYhCZvcP67VBYx0W7Eu8NPrLSZHdV7jC3nKXOBjqkAfxQpiQMCdLu40%2FSVmBJTxMZGs8gIElrsE38mT5NPvNrAngF4pGyuDmjvjS2C0qR3Ql6XjwIa5cg97%2F32L%2BB%2BGktu08Y5ZEBTRVJZOnC9qH1NDVzRGqU30H86WTjVFzqfj3hePTzoHJesznm8AJZwWkE%2B4t8a7FKE2FkAc6WE4YwnkU1D4wpOYqcShG8jm9yYHJ8F02PEeQHVaZHyMO4VFsIspG1&X-Amz-Signature=8d2c15d5415872c247adc6664c115536f717b6d088219dbf670df607608af66a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BPZE3WV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCICJ%2B0vtIuqZPPosNG75yN7ta8unA%2FX%2BrFRSYHYJyLRR8AiBl55i%2BrczvNT%2BFlVkvow2yQIjo45njw3sGABNIgSuknyr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM2PLqaapsGuH880rhKtwDkOTWqD08SlgGMr%2FYEHdwp4f0xU1f2BTUUa8yEVfcGeX2mIkTLECZ0R2LOWHrXzfnsnenLy7K14RcCBAF5UnxsbycIEotr43FtFBtM4WEZ%2FmuswQ2M37tBeBhg1yIzP5FuLg9wwkiEAP5DDSTZe0ZUQ6ZJd7MlBoGkgCUbPy%2BAZS%2FMv6BIsN%2B8rQ0If6WHrCVudn%2BCTGHE8pakVGO1Te%2BYSGsVmHgCS75T%2FZgYoyMcsYETg1t33pvCvP9vVkWCRMDdCqYj4X7LZ50UyZA7Lng9%2FFAHJfjjnBCT%2FJwduSDb90Q%2B%2BlL2wMqH2hEiuFOH4WRZPQamz6lPy3HRcKEUH%2FrdKPgoE8iAbS%2BDbQXj4C68oOzArMNVBwyP1HZ9UzhMDfOKMq1%2BuianZWd27JvP5WWgR4LOM6UjULi22f3prPXchpI%2Fy8h0kq4%2BeEF%2BtHglR8NhujwtQ9XXi9%2BLYJ3uU%2BWdKq3eRRPnGvSAziyDRwj2SFjbuNsv6kWz%2BLIfTLp83VzEWkAgGAbIarL3VDo%2FSLRdKSQoJZAhlGe%2FjKRCvnq9BjqHgElciJaAHLFiIEyIBw8HOeRDcyKw7ZNV6QCvoJ5Njom83LgXdFJ4mCTC6PZTpl%2Fy4oooIRnryT%2FObEwj5ulzgY6pgFvBhZAmeXFWJ6BukZnZRrsrMckEww80MpKvltRom2NPVMmzSUNJH33KPDNATyf8kr0eugfyhpxDug7mYb0n3Sd3Iqx50M2WNaLcxAgLoVHzYJW4yjgVsf4EL%2Fp6V%2BLWZtu58FvHHqh%2BOX9V5QOdJmLnU5zLHvSCxyYlfkwxearHIga4NYVel082QFy3RllA%2BAfOVQB3%2F5W3BNiEuEZl%2BMm6kUF9OBS&X-Amz-Signature=74936b49920c43943e55e99a17035e1bc20f58e6f5ea3a4454f6b330c8d78a93&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664BPZE3WV%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161924Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCICJ%2B0vtIuqZPPosNG75yN7ta8unA%2FX%2BrFRSYHYJyLRR8AiBl55i%2BrczvNT%2BFlVkvow2yQIjo45njw3sGABNIgSuknyr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIM2PLqaapsGuH880rhKtwDkOTWqD08SlgGMr%2FYEHdwp4f0xU1f2BTUUa8yEVfcGeX2mIkTLECZ0R2LOWHrXzfnsnenLy7K14RcCBAF5UnxsbycIEotr43FtFBtM4WEZ%2FmuswQ2M37tBeBhg1yIzP5FuLg9wwkiEAP5DDSTZe0ZUQ6ZJd7MlBoGkgCUbPy%2BAZS%2FMv6BIsN%2B8rQ0If6WHrCVudn%2BCTGHE8pakVGO1Te%2BYSGsVmHgCS75T%2FZgYoyMcsYETg1t33pvCvP9vVkWCRMDdCqYj4X7LZ50UyZA7Lng9%2FFAHJfjjnBCT%2FJwduSDb90Q%2B%2BlL2wMqH2hEiuFOH4WRZPQamz6lPy3HRcKEUH%2FrdKPgoE8iAbS%2BDbQXj4C68oOzArMNVBwyP1HZ9UzhMDfOKMq1%2BuianZWd27JvP5WWgR4LOM6UjULi22f3prPXchpI%2Fy8h0kq4%2BeEF%2BtHglR8NhujwtQ9XXi9%2BLYJ3uU%2BWdKq3eRRPnGvSAziyDRwj2SFjbuNsv6kWz%2BLIfTLp83VzEWkAgGAbIarL3VDo%2FSLRdKSQoJZAhlGe%2FjKRCvnq9BjqHgElciJaAHLFiIEyIBw8HOeRDcyKw7ZNV6QCvoJ5Njom83LgXdFJ4mCTC6PZTpl%2Fy4oooIRnryT%2FObEwj5ulzgY6pgFvBhZAmeXFWJ6BukZnZRrsrMckEww80MpKvltRom2NPVMmzSUNJH33KPDNATyf8kr0eugfyhpxDug7mYb0n3Sd3Iqx50M2WNaLcxAgLoVHzYJW4yjgVsf4EL%2Fp6V%2BLWZtu58FvHHqh%2BOX9V5QOdJmLnU5zLHvSCxyYlfkwxearHIga4NYVel082QFy3RllA%2BAfOVQB3%2F5W3BNiEuEZl%2BMm6kUF9OBS&X-Amz-Signature=b4ed11b936fa7b759dcf2b7115ab26465cd080a5c86dab38b245d5bffcaf35ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZQVA43D%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161913Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJGMEQCIBGEcAC%2F%2FJFfQ7m2gSb2ZCEMBdvU9oHgVtmJuxQSCeo%2FAiByvctYNcu7EjZA8A%2FR77iJiOo9MAXHk3Sk%2Bm85oRcASCr%2FAwgREAAaDDYzNzQyMzE4MzgwNSIMUBahsYAYFBsruzqOKtwDSdGArOIj2QGE9OKkJBIuSDeCcj2kXzak2XZ9Uzr3oY%2Bx9QzneHQpJeU3alq3MCiUoae0a%2Bwe542kavxeW6QyFj4yS4crSzqQhmlMRNo1ucdldyPD5V7YSskVCE64g2d3KuD8k4ZhpfWOJoWp61nRlFZF0kekTL%2B0Xqm3tBOxJaWeqYLiy151lYLmdwi0Ne%2FUjcgvuJiqGGDZ1j6OYvXIt1tEzzlIaCf0zTjb5M2qn2%2Bs0XlgyoihmTiTjUwecxSCpeZjJTLtw1vV3LsuIBitg9f6iqT7bI6OejwBq9%2Ffi5hzTtbcsCi78fFAaFCenUsO06CYcWoJ9CxcODTYPDdlL7vNL4SfsJTZFugzGINXf0U6ScmXVnjtPLq0afUKgdkYKK41SnJ%2BMNFqQ1xdUVqoP9zVtbspqmmLwo0aMPynGJpN836mtV08eFepu%2BfRKMZeDREOWhDoJHp5IAabfimeoE58qV3qr9URZGzBTFYLXYpAILTcuZO%2BKqU%2B87Fs3f2E6fxtqylo1OKc%2F7D7izLSDh2gWRRby2Xl7zwCirn5Y6Ge9NAfESunv4F%2FvOI6R6aXS5uOh9CXKX3FjUBwfH7%2F%2Ff6ZSLRiCYHevuSucy1TuSN1nEEZaHgqy%2BBq2tswy5ulzgY6pgGBpAPG40i3%2Fz7KtwmJV1bMPXeaBWu5LwZ2lQs4HeRyyutV79APNbZhoBUfGuKo7A99vhRna7nAb2oi%2Bz30W8WQhB4oeYfYGRvumxQMv7wF4UbvniG5K%2FRu79s5FqE4mXBRRcy03KiZZbrOZuASeE6PiRNZBy7KvpOo1PMsRdIbkKcZwfQVt4D6XU0nZXVXt5rC2SYJOy8MvSzhbU9c%2FC0T%2Bj33EB%2BY&X-Amz-Signature=e3f85c36ad775ffed8f8131d22c8d83d7b518300ad1df189a0cbfbd7910da449&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V57UYSGB%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHRvvD9Ry9eNWovX%2BT8EfpUvDu75cXPv0IIA1gxJkAqSAiEAhCbSY2tC22g4pDEJqMDWWWJKMXya5GlWPpquIrbgeZcq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDAJ73DiaSCNxA1nlBCrcA6yr3eC5%2BCmqyCROcYfR%2BJ5JbdeFR%2FmQUsjw33Ipzr1RbIX1Wcg7bYy9tJhDJPA2nwQAq8tpKjV2EJm4kAZlAprA6B8gb5schb6etjKw3mFXTuO04ViO17iApHgT%2BNOuBzCT%2BPJS32ktxn0lisyB5T%2FcFA4YhQNqBqw1DV2NvBGkE6BiWRkyCT6yTnZ%2Fw5VY9phS4LoyqtC7l1jKNoYYG2E2BzDRZ6reGrXY4FmPdSiHlVbzyyGAgQCCzoPGmbkXjlacUtVKi7XW%2BT3rNQHRNfpwLR7xD1gW1CfUyN%2FvWQoynaKKJSpbLrLyY1oB0R%2FhrxkG9zvsiGYqyXp9dj8SwdoUQ42Q%2F6Q7iXAjuIst8JNbGzVJ03Gu0H28dsMX7%2FLCDZDmOu86tFkxxG3%2Fy6FmgHaFQEA%2BhOfk%2Fvqy7gtRu6oAil3QCZ%2By7j%2Bx3TZm58frq%2Fq2%2FRQgnTOWnLhldJWv1ArpZi1l2G01f9SFIiQKcTSJxO2h8Ftmu8SGxzZylvaSyzSUK8ZFZDiySNXcvNUp%2BdJbjR3eawBPO%2BBXW0GTJxNnwsyd3ZGY7XPILRNO8WWYBcJ3Zz2fhjjc2Uh8Rd9CP436BxbTAjdmDaMy4SKGZYW3VaAJZFlO3eGx%2FtkTMOWbpc4GOqUBbC0BKO%2FF7Rd901fN2FdvNMrLOVY9P5XxVWBZV3uSDi0vVYwbdAFrjFmQ5nkquMNDq32doOBpAude9eNdoVtpp%2FbZBCBS3%2FEbrVqCKmlHbzSK1sQNvNijeyRxYVVSj9bNXLK8tcbmiZ40KuHZbrSPfwEB7S%2FkstYOZqDLTPvP%2Bxw%2FBqJ3YMlUgBa0l%2FMDgKKX%2BABAmdFJhr3S0oTpBMTAd5QoOfks&X-Amz-Signature=bd92635404f55e1700fc7f0715c086bc0616905d33e332b29fc21f4ae2f45f3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V57UYSGB%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIHRvvD9Ry9eNWovX%2BT8EfpUvDu75cXPv0IIA1gxJkAqSAiEAhCbSY2tC22g4pDEJqMDWWWJKMXya5GlWPpquIrbgeZcq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDAJ73DiaSCNxA1nlBCrcA6yr3eC5%2BCmqyCROcYfR%2BJ5JbdeFR%2FmQUsjw33Ipzr1RbIX1Wcg7bYy9tJhDJPA2nwQAq8tpKjV2EJm4kAZlAprA6B8gb5schb6etjKw3mFXTuO04ViO17iApHgT%2BNOuBzCT%2BPJS32ktxn0lisyB5T%2FcFA4YhQNqBqw1DV2NvBGkE6BiWRkyCT6yTnZ%2Fw5VY9phS4LoyqtC7l1jKNoYYG2E2BzDRZ6reGrXY4FmPdSiHlVbzyyGAgQCCzoPGmbkXjlacUtVKi7XW%2BT3rNQHRNfpwLR7xD1gW1CfUyN%2FvWQoynaKKJSpbLrLyY1oB0R%2FhrxkG9zvsiGYqyXp9dj8SwdoUQ42Q%2F6Q7iXAjuIst8JNbGzVJ03Gu0H28dsMX7%2FLCDZDmOu86tFkxxG3%2Fy6FmgHaFQEA%2BhOfk%2Fvqy7gtRu6oAil3QCZ%2By7j%2Bx3TZm58frq%2Fq2%2FRQgnTOWnLhldJWv1ArpZi1l2G01f9SFIiQKcTSJxO2h8Ftmu8SGxzZylvaSyzSUK8ZFZDiySNXcvNUp%2BdJbjR3eawBPO%2BBXW0GTJxNnwsyd3ZGY7XPILRNO8WWYBcJ3Zz2fhjjc2Uh8Rd9CP436BxbTAjdmDaMy4SKGZYW3VaAJZFlO3eGx%2FtkTMOWbpc4GOqUBbC0BKO%2FF7Rd901fN2FdvNMrLOVY9P5XxVWBZV3uSDi0vVYwbdAFrjFmQ5nkquMNDq32doOBpAude9eNdoVtpp%2FbZBCBS3%2FEbrVqCKmlHbzSK1sQNvNijeyRxYVVSj9bNXLK8tcbmiZ40KuHZbrSPfwEB7S%2FkstYOZqDLTPvP%2Bxw%2FBqJ3YMlUgBa0l%2FMDgKKX%2BABAmdFJhr3S0oTpBMTAd5QoOfks&X-Amz-Signature=bd92635404f55e1700fc7f0715c086bc0616905d33e332b29fc21f4ae2f45f3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X63HFM3T%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T161926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEgaCXVzLXdlc3QtMiJHMEUCIDlOvpoHKo1MTj5w6TOga5Nh9DnJ5tZ8nWYmElvkf4FHAiEA0A9XXrMziYc94n3TnkOd9YN9gkgk3t5wec9IF6wkq9Aq%2FwMIERAAGgw2Mzc0MjMxODM4MDUiDEaN0crsFYsLdssYZircA1lvnxP1W3Cm9i3mrPZDhmvx09B%2BuPu%2BC3dYyP58J7wJm0MwRM5E7%2BEH9liz3pz%2B31mBk%2FyMHZymJvjfM%2F2zz3kxvmbT9k4dJDV9CHqK5NhBHZokAZEsWvB9EbzKWDSIFCFT9W5oTvFZwaIoS%2Fm6u4mn3CVIkvzZWCv6pMyVJwQbbeXtTY1%2FuPOrWnf6NQ3OR5tcretaY%2BhabRRvJLzZWB91TVnGnf8J6kLSaCTYbq5Xsuhmr8OzjYoDrTZCy%2BnKsDNbHOoB2lGW4jZwCYbdaVfS4sLfGpOsQiRi84kotPJFfwy0Fz7nJZ%2FOgO9kkT3arynhhD9Y6UY5ZKMv3A%2FARRCqEOeSn9H39yJIr4lul0EmAKzT%2Ftq%2Fpuf5wdGJojIN6GxBGCiwAhJPOMAQcLxruyFpAIRfZsHTyW3VrkTDxeadYw5BVGmQPWZ0B2dLMNEqcqlYGA%2FWMQXJIiWy%2BBqdTMSk13J3vLQ0HqSPvo75dlMDwtrRf8bVnEkXrbc%2BRe5yWeWwT%2FYqXflWLg%2BOFJ0sBRuAhZkG%2FuNUduHqYlerH1mfkYaVQ82vJZccmq%2BuMl8ttw%2BXyCtQZI0W4ajrPg1IJh6asqG%2Ff%2B%2BFJDM38qjDE%2F5hkvWNpsudSDyMiygxMMWapc4GOqUBcwJY2s99LSQa0eelJXmYjQ2FHs5G24q%2Btg09yGZNVKs8q5llMmhPbCx%2FrIroaAOLkKjNV4XpACzY4HU40lyXvQPKxDBy6EckthwInH3RrkIEPEgcKa9v0gBlU8tXGO0mUu4jU82YgbMXu1g%2BERYu1QMp9QBB2BvJJ0PrZ19WBHOpo340PxJmJWKDcMojJVpIin70gyvCLN1TTwe9Qe8Z2ja5JMu%2F&X-Amz-Signature=0f5d48c2e2ff9c236fb135217d0867e5e90067751fe89b1a8046406ca8d927b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

