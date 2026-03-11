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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRVIHTV4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF7oQmdWUzdZ0VwIlQYOL9v78pmUF%2Blf5XZ9tmBd3HlzAiAsAxziTuzG2OJIP2CiaXt5fdLOQ5JmmSY0SPvnMyDqYir%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMtNnoZRfSnVXxiS37KtwDtiH7f2ytKNFm8KtUDZ%2F2GjHvUAo7RIbCNDrmVBkt1mU7jJmisKJtN12pFHq9ukB%2BKIuXaorO0mntjEXFfGbOpsFKkyh%2BTVRXKseOPdOEjmlSwr7uwKMRK2HqdHqMyrdm4FnaTk7jFcLZvenwSgHF9KZsL47yhpAmDcm1uGEj%2Bflvnvh2ulVTG1vwQT0fngqIo6qWAy5HdkiVHYKv%2BHOrhI3ik1v9j6h2vbHBNtBC42YEpTqNRsKdf8NlHbXyPRrvRKJ8rZrlZB%2BWjSJc3sTTWhX8tfLTeevGiarjPvpAyyR%2B2g2zNLg3w9IGRlWi2WjfjnPE7bZ7xm2CTzqeRGQzqEdJCKIzsghDw5Tw%2Fdn%2BjtUVC9RFNZ88IEeGj%2BfiwXr7RTkxewrFdQgOLRX5oUCKhcDxUDcNGG%2B2RGjgkyjCGjcKlDhWDTR7JMy0mbgJHNVIg7ATZE0oDxGY02xgAaF075VAIycUUcfH2HapmOykPiSFahL0Fh1TtvRlYFrMmsT2onT9BK3%2B3BoWtAwYCDvCj%2BPIqSculCqud8WofRw9WfFZFvO7jVN3rxDql9IEQXGSPD%2FN5kG%2B1PLOgzSXNxU638HO%2Bf3%2FHERv7iejYvHXWxcXKPzDtObacoIgOAQw0dzGzQY6pgEBCw%2BzI1VaFZ5gNu3Y%2BqLj7hm8bN1Pkb3GMNU%2FmAo0t2O24iUSt7ZP3Vzm7rd3UFXeRhP38B8W3YRDjhSEc5ZULdJC8yHXQ51Pm2sMdtc5gubPgqciBzJZb9FgjZjEpeBhUwBiwu3968GLE7ibNeq%2FoH0Uf1lScC8OMUs8U%2FSOpTeYPWd486YOCd6QmdcsyhdhTeuNu6J1WmT1io82IZq33WjcWKAa&X-Amz-Signature=323ef5efa1010392db6753560b19fc01a173df4a6ddec3e0209a03f8ea97def5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VRVIHTV4%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF7oQmdWUzdZ0VwIlQYOL9v78pmUF%2Blf5XZ9tmBd3HlzAiAsAxziTuzG2OJIP2CiaXt5fdLOQ5JmmSY0SPvnMyDqYir%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMtNnoZRfSnVXxiS37KtwDtiH7f2ytKNFm8KtUDZ%2F2GjHvUAo7RIbCNDrmVBkt1mU7jJmisKJtN12pFHq9ukB%2BKIuXaorO0mntjEXFfGbOpsFKkyh%2BTVRXKseOPdOEjmlSwr7uwKMRK2HqdHqMyrdm4FnaTk7jFcLZvenwSgHF9KZsL47yhpAmDcm1uGEj%2Bflvnvh2ulVTG1vwQT0fngqIo6qWAy5HdkiVHYKv%2BHOrhI3ik1v9j6h2vbHBNtBC42YEpTqNRsKdf8NlHbXyPRrvRKJ8rZrlZB%2BWjSJc3sTTWhX8tfLTeevGiarjPvpAyyR%2B2g2zNLg3w9IGRlWi2WjfjnPE7bZ7xm2CTzqeRGQzqEdJCKIzsghDw5Tw%2Fdn%2BjtUVC9RFNZ88IEeGj%2BfiwXr7RTkxewrFdQgOLRX5oUCKhcDxUDcNGG%2B2RGjgkyjCGjcKlDhWDTR7JMy0mbgJHNVIg7ATZE0oDxGY02xgAaF075VAIycUUcfH2HapmOykPiSFahL0Fh1TtvRlYFrMmsT2onT9BK3%2B3BoWtAwYCDvCj%2BPIqSculCqud8WofRw9WfFZFvO7jVN3rxDql9IEQXGSPD%2FN5kG%2B1PLOgzSXNxU638HO%2Bf3%2FHERv7iejYvHXWxcXKPzDtObacoIgOAQw0dzGzQY6pgEBCw%2BzI1VaFZ5gNu3Y%2BqLj7hm8bN1Pkb3GMNU%2FmAo0t2O24iUSt7ZP3Vzm7rd3UFXeRhP38B8W3YRDjhSEc5ZULdJC8yHXQ51Pm2sMdtc5gubPgqciBzJZb9FgjZjEpeBhUwBiwu3968GLE7ibNeq%2FoH0Uf1lScC8OMUs8U%2FSOpTeYPWd486YOCd6QmdcsyhdhTeuNu6J1WmT1io82IZq33WjcWKAa&X-Amz-Signature=323ef5efa1010392db6753560b19fc01a173df4a6ddec3e0209a03f8ea97def5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663VHAASJV%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGZHu%2FQ%2FggBg2Rs4JOst7QZfFVMGbZUm5lV%2FnRrS5d1MAiBfCNZNB%2FXRmoUYuU9uqd2c4DMm83Jmn7S1b%2F20NTarvCr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMajvKgjzaVmX0VawXKtwDy3Mo2gR7NPjVnTZzrJz2FMpbMKqtRIkhoXq1nnLixdfrj3sZ0R5nN6s8kXBhV6IMxMzGWG3pyKq4R1iX1Ly7F2Hf1OjygBnGmBw5of0WIGGNN5JM5W%2FnVWoXajw%2FPFy6r7JMmUt09hb9Ms3ff1FAH69wSuVmAB4hfTfYrZbyN5PfeHHCGVOz1mWHSCgRY7EhMzb6swg43YcAmfcOUAfurVJNrBi%2BzfVgP3QsWD1LANorj1TZmECICgZZ38ZaBt4%2B4IoUHarAKMl7QuIJbkUgStJRCsqRwUkEp%2F3KjdvZWIWTvie1YKhiVw5AD5zxIUzC0OU6NzJcWCp4CG6awywr1xNlv%2FAlbqCAmrM9MA7lrC5J%2F1ouEQeVJ2rpvrHnodw7tI52ZmafHCH2JN55BlD9ATQ7dNks4qR5srWL85GroZhCO2dlpX59UuYUqhELzIYOUaX%2BGBlZ8UklRHAoG5x8hQCHQ7610dRJ1t3koE5crDSSAMagKsMz%2BBbTr0C9qPaN9K4V3DRPklHblnNOHq%2B%2Fq6Z5UOoThFbbDw31I2jQ8%2BMgdcv50NbtzcZ35Y7qRpN5yesnyqv4Ra9FZdvEvsVt2Ota9wY%2Bv4qker%2FySSXn6uZgPkUWC01k75KqIxUw9tvGzQY6pgFW5DALOuHygbYYIOqn7hQaxud1GEzrgNTTOk%2BDmtG9VumQFd5fC1pMXBELEh5vaScGLFoiYKdzWziqptbVQYCjltESTNl8WbK6lXGDJvrgjQC2ecZNS5XaP5C%2Bk%2B7hJPlJUnihunNyvqq2GCkyw96zJEpQipQIlRfoQgzk3L6S0d2n41WRDyep%2F9XSbaH9jwCDKM1KQX3Kgzk%2BNzf5Fv8g%2BWSXkh84&X-Amz-Signature=fb9d2b44d6338f38fbd5a8fc4b4ce76770c84b28af263803860f3a5456fc049f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX6C4SAU%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClEhJWEP9BdN56X%2BDfWnE3%2F6yC8PtkwMZvqNxtgf%2FygQIhALis53JqeUfy0gL2OUYzVc%2B7Q3JPForB4Ib9zt8CxZMWKv8DCGMQABoMNjM3NDIzMTgzODA1IgyXgRTcSMKvSDo6Mhsq3ANsRPuex7jC6ykTqZ4GXKeR1RMRgCll%2FIlCh1tceq7z8qBvyrwjG2VPwe3hsYLQAO7FfNUB4O2BR8rAS2Z9%2B3HUCGAmwSTestKZXnhmHjePRVjuGgjkzwPATQPsubiqK4CyS50vWu0pIeOwVc3h1ELVV6uTYGFVJDSmbYlODyoC%2BjZuQY0X6QSCtae%2BSSzdWow56zxiyJOBD02SYOfBZfhIOm%2BKX6qaAJFCcVmxKVDOGemK25gwe1JLLvwh1hnZeJO5CR1Inm8mA%2FbAujs6dP1ca596HQiUPby4M2Pteajut0r46NAfPk7zU2sS4y7rl10KlOxdC549qW9APFa%2BG5kJKqR7FimCH7whCvc2FFkIXZsImDJXXKg5nxtTH0i1NfZYqU8PkMWNKmVjyAe7O1jsPdYbB%2Bsj9oJHC6Bj6knyfesy1XcY3COZpP1MHmIYSMuK0ptdxEzrWXHej%2BwGKDbDXH31sQT1ROvPs9zpFOKmdHgS9ZwYuwC95k0FD5EFP5gkzHz5IMNwEJ71vkDoqFr2FCtBSVn3YMJcJ1krLorkdEQg%2FehoNXhjOxqZwyc%2F6cWw0HDUQHufBaUI4oIjplqjKLvJb%2B1FF4WMTz34tEwNpU7O3q9cl%2FLlDSVbxTDr28bNBjqkAQI7uFUFsDrkf4f0xVd9pBm1UyynwdHqihJsLjSu51j%2FGsLutRypDqvbS1jseQPwnvmexXpmi6fgI6raSLMawpfsENm0IqCy8lWhUO3wWSiso%2BOueCBxhXOHbZJyECq3nEReVtKdSNZ%2FET2804CX8Vw%2FX%2F3PHxrXrKlyW9gQDx1RFqjq8OfzQz2ViJo5XnACUFuM6U%2Bdaf4u%2BAXk7Yu2LvacZJ6a&X-Amz-Signature=046ad8ad0e5891b02415a68266762b9b96f38690b368461b3472cba2e3dad29d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VX6C4SAU%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQClEhJWEP9BdN56X%2BDfWnE3%2F6yC8PtkwMZvqNxtgf%2FygQIhALis53JqeUfy0gL2OUYzVc%2B7Q3JPForB4Ib9zt8CxZMWKv8DCGMQABoMNjM3NDIzMTgzODA1IgyXgRTcSMKvSDo6Mhsq3ANsRPuex7jC6ykTqZ4GXKeR1RMRgCll%2FIlCh1tceq7z8qBvyrwjG2VPwe3hsYLQAO7FfNUB4O2BR8rAS2Z9%2B3HUCGAmwSTestKZXnhmHjePRVjuGgjkzwPATQPsubiqK4CyS50vWu0pIeOwVc3h1ELVV6uTYGFVJDSmbYlODyoC%2BjZuQY0X6QSCtae%2BSSzdWow56zxiyJOBD02SYOfBZfhIOm%2BKX6qaAJFCcVmxKVDOGemK25gwe1JLLvwh1hnZeJO5CR1Inm8mA%2FbAujs6dP1ca596HQiUPby4M2Pteajut0r46NAfPk7zU2sS4y7rl10KlOxdC549qW9APFa%2BG5kJKqR7FimCH7whCvc2FFkIXZsImDJXXKg5nxtTH0i1NfZYqU8PkMWNKmVjyAe7O1jsPdYbB%2Bsj9oJHC6Bj6knyfesy1XcY3COZpP1MHmIYSMuK0ptdxEzrWXHej%2BwGKDbDXH31sQT1ROvPs9zpFOKmdHgS9ZwYuwC95k0FD5EFP5gkzHz5IMNwEJ71vkDoqFr2FCtBSVn3YMJcJ1krLorkdEQg%2FehoNXhjOxqZwyc%2F6cWw0HDUQHufBaUI4oIjplqjKLvJb%2B1FF4WMTz34tEwNpU7O3q9cl%2FLlDSVbxTDr28bNBjqkAQI7uFUFsDrkf4f0xVd9pBm1UyynwdHqihJsLjSu51j%2FGsLutRypDqvbS1jseQPwnvmexXpmi6fgI6raSLMawpfsENm0IqCy8lWhUO3wWSiso%2BOueCBxhXOHbZJyECq3nEReVtKdSNZ%2FET2804CX8Vw%2FX%2F3PHxrXrKlyW9gQDx1RFqjq8OfzQz2ViJo5XnACUFuM6U%2Bdaf4u%2BAXk7Yu2LvacZJ6a&X-Amz-Signature=c9b46e71c5ba0a2c6e1be2158b59bfd196269d2254e6383ed041e34c2f3c7485&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNA5JNMG%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID1kwgjUBtZr14v1XLhNGkfEauRt5RXxKUotnZrFTWJ%2FAiEA9%2BLITptBntC9mhAhCOHbKNMO3fIS1EMVPuOMY5SRDikq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDHdLnS9wWn5M%2FEvWLircA0g7Q2C3dhCbjHt7KmRNlpzAzEUT5lCtaYP0%2Bmz7Vd7vmqb%2Fi6Ug%2FhCLYDqBWID%2BvUIAELAMwJt7DMBsobVACKbv50U7bblMDOmokdu%2BwkDbUjd1WnEh4fX7Qtp18yzOICSidzpDoF%2FjHxEjUKXj%2FMGDyQ%2FEpkww2jL3EoMc3pds8KtU1SifQrZFq930NJhLBoyad1B82PJH%2BmKZr7hpM92RhHB%2F1aMcFiYw4hQVxxhPir2NlgG%2Ft8tKT550UTkr6icruxchC75QF2reIPlCIaFAAbXb1SLauw82Qh7Fb10i%2F%2B4AuY%2Fyp0NFfn7w2faXxGn2O%2B4eNT0bO68NV1hhvFhQhhSQS0NT3w28iIc3TRYq1nXGSEgZxVnYP9AQ8bYgQuMJAT6MtE%2BpDKO5qEbOZ1diW25vztJkoFFXJx2R%2FthSD2L%2BY0d%2FmN9N1HKTiinW7mDDLjMX8rtKvb6eEVA5wSiAfxIclg%2Brcd9M1ph%2BOg6JGc%2F27bFlPFMNeGgFEmoF4wub2H2L8zRwsv0gvo000JTMZ3coYqqaUoIX9zjljSUsrbfSQQNUuGXv9iLi90Ur9QgiiFz9oSP5%2BlX2dRWGnLlq7EdY5u6vViEh0RWu4iSsFFPVGPVRNyyOpNn7MPLcxs0GOqUBHOvYBTYjIIzwjmmHwbzumCwYLzrlXXW3%2BC51H6qFqk6nLIc7VSJjUreFj0T7RxfDkyGLHNJSe5LBeO5Um8eR1jHXlNByEEsjEO4AHWwXjGUW31p%2BF3YoE8%2FyLwk9RSuJC3U0nvSv2T7nUaO7fgJCG15p1kV96bbh6chpFdiwqXN4ICioEPQ2qKspZj76lK9W%2BJ%2FccxehKYbogpHI5sLBmKU4kTVP&X-Amz-Signature=54fefbea1a889b66466f3451d7d4b78c0d26c06588e63721107848ed02057c58&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RG5SAXTT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCkQZRU1ikKJ9PasqQqNHL9JBrnugmnQgU81fbUaiNTrwIhAM1kFcBt5aqLeYKk9KDMNcyjf6LFu7JBtl5j%2FqDU0wTeKv8DCGMQABoMNjM3NDIzMTgzODA1IgwLMKJmieI%2FQ8ABIeQq3AOhhiIDIPHBReZhAcgudyByTbIJYSdaocc1uhKiCSznyNpvPiyn%2B5FfVk4Ri1uKmiiv0G%2FZBNwdIeMwi2llz6KaunFhOfEFiiJ%2FCTZjMxR09jkN8o4VxOCMClZsiDUVJbWnzNH65YzJEUk%2FzC9BE%2B9JRJFYN5pQrLkPE43KuHxsTS%2FbAX4M97Yk7gJe0t4AkQotZuoHhUyGJcZRBToHu3lHezRlZfcid%2FBOdYpF%2BXlqDBnMXKfdheraQgxjlo3oFnr%2BfWHABAUDiCz%2Bes3ieScA24HKcNYR6%2BdiTinP2%2FBMqCg%2BIZGrgwJknpHD3RdbbvtAZbWujqqYzmGEPKjhR8q5kfJgV4KRyMPb%2FTTBbUXztlo8H2KWgPDRJQazvymBtKbqhJ%2FAgd4TY7kOUG8bcc5WbJLZpzWp%2F6CUCWTbzXVV5zhbpZi5h4WMWCBMKENLVu2%2BwFVepmpdtlPrLr3nVwOyc2BaPVcWUWjoBVtoec6FmD2s%2BFLwiPZO5cTVqZucWx%2B6085zHyv7aoTAWCNS%2FhN495%2FcOY7OdsfBTpHBV%2FxhLHxcpBrHf7SgQXoGkGmxtoR%2ByGT4lmplRlEZpmWjoDvI34q1AL7EAQL%2FjKMzg35o4gavjhvdg3kfEb10rTD83MbNBjqkARgxNoAH9c356jKHWAY51Uqnz3tISghiUx%2BIzGRaXAMId2AWi8TQrWXV8v7gNFHDSPYOQHul%2FF%2FHConm%2BLRt9opOw5I4najUDaShNcxprNqp7tWENOnkIz6KealQSh9XhJjH5AINx%2FF61E87eIW3xPh7q%2FGxxc6ezbdSAq13mQFXuhgVzyyB6R7N%2BaoV4eausrAgGeIeaWdBRJIRYar8aSB88blh&X-Amz-Signature=e0ba758b26714e8883321542c0a32996b685360417bfdd407eb3b73cd476a721&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662QBXKMR7%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBb9h5ElMWW3QdznDbTLfMbiQJPxh3tzb9d8tBX5VsfSAiEAzMHsxbDXYKxsnQqhvS8upf5Q5t9F61nzkc9IFaQWllQq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKfXyfUsPBiIr4WFVCrcAwuuddCYbVQG%2FEqw5xdxJrRsZy9g9djKwOfsqUPbbXr8au404Zeuse7NiqoYYk5sfcHoUaG%2BDUpnKd4IDhCDe%2F9M9Chxn%2FKYGlA2NImeT3UNgloEBGsWaPfehz22Kx5naT1%2FMlavVFMn%2FHpJx1hLmQKiO0wDQSRszfyPsIvJMmCuAcnxoEik89MUQj%2BaqSXbmspKEbPdq09WDFRch0igariNie51Tv8lVWySuErgBadYq6oI8q5pwdGjXKdxSQBb8BoU80cCgclyu8vOqpyU3l2E9HLTspQ24hX0d9SG%2BZVaSW2vPcZtbSKlQXg42dxw1qZWukWwGefI8vfx5pJSu1PbT%2Bh4mOnOBw33sGx70pIfwiFd3%2FICuCBZcgV777vpAlcFA7gNuTAAMjXdGlbOr5uPvXRaOqxH62%2FeF4%2BcHVBchyLBkkVW9sPWXC0xwpBfPpalMKXzFV8pj3Qh%2B8HyuGR82MlT0evZwXzB7EUKLJDhAzSf0cYBm4sMUHF1QCWm5zoe7aOLXAv3WnHc7uC3%2BAEW4A2ZZf0kIZ8QJUMEPahQEjRvVvtKeyPTMscXeSFtA5xrE6eAg4rN4ExJ9ocIVEZdn8GPYFqPHm1sgXTPQaighIWiPgXS7gS7OOvMMLHdxs0GOqUBfZilVEnQkUtOsToslqKn5qKErIjHd9B0SfD6O63PFoVxmuXd8hXSY7RLnFnZhivEYbKyCCsdxlhoN99FcHB%2FOMqYAJGRnigFk9G6ajwOfm36dxvN%2FdttjhvRYDQ9ye6mrvQsQgQS1idf6vFAaczdGxe1CdbDoKrluDwC%2B9uSa7PNAr4xTl4SPvItJo80zF62pPGIrimIIcOXrq7L06%2F3ptZIIkcE&X-Amz-Signature=f45ce233137e661d8600e636e245c1ee74f00612036622c222e1cb818b3fdcd0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWCU57I5%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1%2BGh8Z%2FwwO5UhqPRWiNrGJEl1RtdwGa6NZ2ymL1HHogIgQQFUk0Gb4GFmpAb4Fj3qybHsSRxvlfuZbY6PHUqUgPgq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDD3Rd6xBViGo%2BNjTCSrcA8ygVrQ5L7LnyWBCiQZAHBaZVsgM9kf%2BcaEmHx08xADyqbGHDxLcDk9Du1E8cWQobx7UbZoRrmuDuZfazgH929iIfhyiOA1QPvLvMmB7FSSAzEK0gHQlMHuRTk4z1AWDPuyYbIsigPFb%2FRqq%2FPT6lULcRsZZGrhDETJWA%2BQ18h8WJxJym8TB%2F7NUdV2l7jNTsO00QooaAiityVZGm9YD29gRV0VC4KWVnycCY%2FyYpOx%2FLQpTw2awn59qpDHF8%2FQv%2FGhIaRccU%2BKW%2Fip1kauA9yzcdqDm%2BBguOloIwj8JpFBT0kFpkHj0G0G%2FD7jqZ2HPbckFVuZ8yEwYChqXmQRWfhWZIjFWtgoEC%2FzWHE9nYQ9wTiLzR5VlftboZIbRohRXsME39cfePNF5Wg8wDeyUMrDLheXpNI0gZEhy4%2BfSFA0vO2DaD5RjcTtOlWzPxPOT3ThjhvnhlAMFSikyo6MejUY1U14owfC0fRhoZPqBWW8X65hQX8XdXmjnawwkvwLXOL0MaYhJGGPJ0S1KriYa5jUwPIHx4gzpuB8lSrWDLnT%2Bwb%2BFnalDscwrWLF15%2BD1lLQ8IYBGnTqimrH%2F6492AD6EaJ7RPO2ydqeVkn1E186x%2Fcjz03Cfd82RiaN0MO3bxs0GOqUBpS6lctcI%2B3rnaYKcjtx9yVffmvwYh4odYJnyIYyS0QOZjekRFiH5JcBFK9cEFYxSiM4kxPwVSAJ5tg%2BfekYYCMPUPJPMN%2BEWrWd1SCsQCv6OpMAwu6fSOb7Sm8E91qTZFMAVed1ZGDqB5ZL2ACmnnJHIFUJcYSLSeN%2BX81HsQNJb0wGylWNU9cjd%2BA%2B8g%2F%2BHn2hLE5CUCwDiz4xrT2W2AWMTWOgU&X-Amz-Signature=32865bbd170f93a0ac01fc3674f1af703ed7e0ad014547fe71d2eec5189093ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWCU57I5%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183608Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD1%2BGh8Z%2FwwO5UhqPRWiNrGJEl1RtdwGa6NZ2ymL1HHogIgQQFUk0Gb4GFmpAb4Fj3qybHsSRxvlfuZbY6PHUqUgPgq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDD3Rd6xBViGo%2BNjTCSrcA8ygVrQ5L7LnyWBCiQZAHBaZVsgM9kf%2BcaEmHx08xADyqbGHDxLcDk9Du1E8cWQobx7UbZoRrmuDuZfazgH929iIfhyiOA1QPvLvMmB7FSSAzEK0gHQlMHuRTk4z1AWDPuyYbIsigPFb%2FRqq%2FPT6lULcRsZZGrhDETJWA%2BQ18h8WJxJym8TB%2F7NUdV2l7jNTsO00QooaAiityVZGm9YD29gRV0VC4KWVnycCY%2FyYpOx%2FLQpTw2awn59qpDHF8%2FQv%2FGhIaRccU%2BKW%2Fip1kauA9yzcdqDm%2BBguOloIwj8JpFBT0kFpkHj0G0G%2FD7jqZ2HPbckFVuZ8yEwYChqXmQRWfhWZIjFWtgoEC%2FzWHE9nYQ9wTiLzR5VlftboZIbRohRXsME39cfePNF5Wg8wDeyUMrDLheXpNI0gZEhy4%2BfSFA0vO2DaD5RjcTtOlWzPxPOT3ThjhvnhlAMFSikyo6MejUY1U14owfC0fRhoZPqBWW8X65hQX8XdXmjnawwkvwLXOL0MaYhJGGPJ0S1KriYa5jUwPIHx4gzpuB8lSrWDLnT%2Bwb%2BFnalDscwrWLF15%2BD1lLQ8IYBGnTqimrH%2F6492AD6EaJ7RPO2ydqeVkn1E186x%2Fcjz03Cfd82RiaN0MO3bxs0GOqUBpS6lctcI%2B3rnaYKcjtx9yVffmvwYh4odYJnyIYyS0QOZjekRFiH5JcBFK9cEFYxSiM4kxPwVSAJ5tg%2BfekYYCMPUPJPMN%2BEWrWd1SCsQCv6OpMAwu6fSOb7Sm8E91qTZFMAVed1ZGDqB5ZL2ACmnnJHIFUJcYSLSeN%2BX81HsQNJb0wGylWNU9cjd%2BA%2B8g%2F%2BHn2hLE5CUCwDiz4xrT2W2AWMTWOgU&X-Amz-Signature=41a1dc25d31d1b4c2508e2f65f82bdfd996d3cacb350e7b924c903aa62883914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R2FWINM%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183559Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDIilMc0ga1OH6z0q24HkFMroaeWFnW6I1Tdjy8A307AQIhAKUJF3dsm%2FSFv0Ww3f0pD4PnGfoRZqGMAPRGIQdicLn%2FKv8DCGMQABoMNjM3NDIzMTgzODA1IgyeYVxD%2FGxt9pQHgb4q3AO5q3Di72V5XHKcQSUcYyqRwCvKXNtzjzIFSDbNSOa0K2BNnoHDKenmuB5dkuMHg13zjt0EbsLfQKf9advWozxMEqgMoZ0e7X%2FJoc4wWtIL26Jn3qB8kk1BYWeikkxcpDtp6lVuB3Jr4H9OPA7jbZ8n1mBaxKbMTPD7NPftsYv8c2DGXmZk80pLI%2FQuZZVSMNvb2u5k3htrdnGtN3rY1epUMvmDH8ddoeuz6ANpUmbxaRcK3VoMSWzPcybsLBsPEwlgJEAuOE3OoG2jD3G8FufGUbvzzcScJWDBnGLbfHrxr4nngbKUfwYF3N0cpcxeQycFa6hrJSDfg%2FbZTumopPbEeuJO26h6rE70oW2rJj%2FrQYQ6ENQ9UH%2Fcp0W%2FwR7eL6G7XwxyH560QtHbD4u7xvGQRz8KD%2FqLBx5jXgwZMs6spjo%2B%2FtYNMPtppo4Go42aPC3DZ8XDbCVKrhHZlZ3Q4loyD7a9%2Bs5x9wU%2FME%2Bvd086LpLXIDLSjZ6BLtf7Ir%2BD4totKMI9GcIZuA2s82P7J7PvIxw6ueJIUqd1RpirJkkg2uMSxwYOolbpCCmBumYOReoYS2Gae%2Bh3CNpB3Exk7e02M8PqgnPPNZYKgGYtOrAoT%2F3rOqg5wqBzxHgXbTDw3MbNBjqkAaCxFR05G7ZG%2FSsDiLRHPwA3O1fMYDvgM%2BCNmTaDLolhOuolzrVWJvnLWxD9fmu13ZHCAExD%2FxCExzBU7ou4vUdmZv9Q1hyxg1ap9Y13yH9oCaipC%2BVDwK2%2BNqD3IUtMGBBs1Es39PvfAy2zpv6IPtqXHNYa6%2FXDA%2BPuxF6O%2FlVVbm11ZS05onJMRbSXlYoC%2B6mk4qSD4sVHji4r%2FzjrSE7A3uF5&X-Amz-Signature=eef776554612931c66eedb70cf38705a00f0c2c5fe2f51dcc9c90b994fca204a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KYF44DF%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC55zb5JZXcejvhrr8kUuL8iPO%2FPc9tAuOU%2FT%2BQoOhlDgIgRgo6V24SKESmi%2B%2BpQoy%2BYcjoYyCEz8Awo5%2BsEsurz7Iq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDAyOcxBJRXFwpJ8L3SrcA3gBAOd2Ox%2BJ%2Byb9uDsHkoUEbC%2BevOA5chE2ujgtZ1IvOdQsTv65h9SWO2zAxWGmQHdsg09XK4%2Bx%2B34eDp4%2BcUOAhYNHDzPrqmCfeeEWB5nKeLtu7pmmu23aZAlarIS7XtFuiwLFiqz%2FASIlqzavFJLWpfBIfUCRg6T9i%2BgorPOfbTyTHqhiwUVqLEgFi8UE4tHVxyBk1GOzOhS04NFKT9aeLBw357tn5K2RfGf01kMJXGgNDToxmHGN9BQDKJk7zHr16fEEwb8NVc9D7XQ0gW4ZrAE6h3qAGto8vQP0mnk2gG%2B4OyHbRC2qVx%2F6q1LYURcgG9jcLx0xj5QRIlKA4obrw2n02fXZYguVHQG0slHunAJedHNj9ahZtF%2BURIgHBKT53BG%2FuoTRkWyoZ8JDqKAQijCZZzz1U5YITxxcg1%2Bs5ztG0AlA%2Fi9MumFgmf8f6nSbCYEvhyQkU1ePt14e2u%2BtCZ9OCBu0pzHNSs4QXaoU7ywAjClDOQTDmiB6VR7iBrS%2BpmDsDIcu0D4%2BqHItlxucw%2Fa1C%2B25DJpqBaTGNqoz0053rToouL%2B6Z6k%2BZDRgnswvyq1NUQijLGbmm51%2FU0GL95l8jK1p9d%2BAD6MEgJGL6%2BMrNpQBt49ELXYqMO7cxs0GOqUBUx9pLCwxDTTfxHOyDx7KHcglhvLhfdPc%2FfSdtP%2BeNpmZ1DU5AOxh%2F3vOPYfpBgPHgh%2FF%2BxNboUeKA5OlMXsATDKu4oD4rXpzNxKU%2BGRHx%2FLgInuJTJedLH4J91HS9KgV6vPDQZHKmz9DNQg%2BOCkL0hJgVLET9Fiew8I7PfTGDffN4D%2BORs3T%2FrSdAVrvBb%2BdmRRzHis4BtyjfxVEo%2F2JM7U8R3EX&X-Amz-Signature=792d20c83bbe419996b1aed938cddc535a3f57ba17078a100554e5864ae3c3f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KYF44DF%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC55zb5JZXcejvhrr8kUuL8iPO%2FPc9tAuOU%2FT%2BQoOhlDgIgRgo6V24SKESmi%2B%2BpQoy%2BYcjoYyCEz8Awo5%2BsEsurz7Iq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDAyOcxBJRXFwpJ8L3SrcA3gBAOd2Ox%2BJ%2Byb9uDsHkoUEbC%2BevOA5chE2ujgtZ1IvOdQsTv65h9SWO2zAxWGmQHdsg09XK4%2Bx%2B34eDp4%2BcUOAhYNHDzPrqmCfeeEWB5nKeLtu7pmmu23aZAlarIS7XtFuiwLFiqz%2FASIlqzavFJLWpfBIfUCRg6T9i%2BgorPOfbTyTHqhiwUVqLEgFi8UE4tHVxyBk1GOzOhS04NFKT9aeLBw357tn5K2RfGf01kMJXGgNDToxmHGN9BQDKJk7zHr16fEEwb8NVc9D7XQ0gW4ZrAE6h3qAGto8vQP0mnk2gG%2B4OyHbRC2qVx%2F6q1LYURcgG9jcLx0xj5QRIlKA4obrw2n02fXZYguVHQG0slHunAJedHNj9ahZtF%2BURIgHBKT53BG%2FuoTRkWyoZ8JDqKAQijCZZzz1U5YITxxcg1%2Bs5ztG0AlA%2Fi9MumFgmf8f6nSbCYEvhyQkU1ePt14e2u%2BtCZ9OCBu0pzHNSs4QXaoU7ywAjClDOQTDmiB6VR7iBrS%2BpmDsDIcu0D4%2BqHItlxucw%2Fa1C%2B25DJpqBaTGNqoz0053rToouL%2B6Z6k%2BZDRgnswvyq1NUQijLGbmm51%2FU0GL95l8jK1p9d%2BAD6MEgJGL6%2BMrNpQBt49ELXYqMO7cxs0GOqUBUx9pLCwxDTTfxHOyDx7KHcglhvLhfdPc%2FfSdtP%2BeNpmZ1DU5AOxh%2F3vOPYfpBgPHgh%2FF%2BxNboUeKA5OlMXsATDKu4oD4rXpzNxKU%2BGRHx%2FLgInuJTJedLH4J91HS9KgV6vPDQZHKmz9DNQg%2BOCkL0hJgVLET9Fiew8I7PfTGDffN4D%2BORs3T%2FrSdAVrvBb%2BdmRRzHis4BtyjfxVEo%2F2JM7U8R3EX&X-Amz-Signature=792d20c83bbe419996b1aed938cddc535a3f57ba17078a100554e5864ae3c3f4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XQMEEB74%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T183610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEQfnxEIQ79nYp2omsyjb6LZZ%2FKabpjFzUZ%2B7bYLJCf7AiEApjvVrQ4vG%2BFy6jtGPyI6SDuocOZ6JNWHru0rsUTId%2Boq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDI4%2BCrPdk9d1sb0FQSrcA7%2F9AMUaDEtoG3doegk5Rph8urHGji9FuQGy22Gii4haI%2FGuBgG%2B2sGq0OT6uZTrwtZTI0ybMv2FmvV5vzJ%2FZTGA7s47W%2FHl6spzEKTmKaHsRXULgzOLiFSYyA1rELidwh7ieBGvpely95b4y%2FDBk0f%2FnjzX%2B01TqpA16UOGIzQg5QeS4Q8rjnroe885Mis50Oi4GPIZSuMoHjT43SQNiTFgv%2FRxAWEbVrvv6a%2FrEpXaDR4bJdcMVJzSqtY15ziO52vGGUmazyi1CyjsWN36rb9mYrnq18806pmWCjsmW1iajfZBmQ9rHS1ZHHqGbdTw%2Bv3qGq2W5XmuOSujf9Md8qBT97BwYRAEflu%2B6OitT8bxiEzyK4U7IQnlW5FxPI9VVXG%2FV2x0pV1SPUow%2BsVfkutYthb3klXiXpyt5MliaoCFhd%2BbcL17ZlHfsG5tujYU5JHaiM990vynJlbciLVitOMTu6nZ1FKBRFMHVHzbolt5ZOhdfbXXFu%2BhH4a4nnJqR7Q3nI6f7PoUPML2fi7nw2nDhSDFLXijkR3g9559WP6ImJ0iaC%2B5dy6%2BxZw6KNHVIvu9AcytLym3J8RWnAH46HoDH4E8VghOcuZqWH1ufgXeynmjeYW7P3vMdRPTMI3dxs0GOqUBlE3ncOBDA2OLQli5QzXwry1PVq8AP%2B5nTmWxnX8yaSGlA67lPJerz6ezoFQ3OA5o6SHK0InWROwpyobuX%2Fn3HjIbFdvqNVZYH5AaY112VBmEMAywv6qZVyzqlUVh8rue6Syu4nIMSg%2FWijDYw%2FhY2Nq4ocLDLHg%2FaCR8EuIUCf4Ewv%2BhXNujPbOk%2FAcpuCCCTeSILvw7tkrWq5TcZkCdxxoqiwm5&X-Amz-Signature=a7c063e1fc49253d48e5ab978130ede1b8841d63c7d956c36e42a967921c2a6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

