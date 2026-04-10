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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3FKSNMN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIC9Ln42DivRiDVe3krZ3NotCVal1El1oUXAP%2B0pZXbrVAiEA2snWQadmXSxkFDSLYNZf%2FLaPEWi1usTQQFGGBE6t61Yq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDN6C5DakmQz1hlDt3SrcA7Vz7i2YDUgB6W%2FPpqk1uKUNE2UmjfAqK8Fsv1qOHUaBYJ3LVjw%2FUOYChPjzJjKHiq%2B5XS7ePq1JVbsIp8OHER20n2umQw1hvkr87gWufV2oX471JNekB35qYwevvsxEsZiQnaobehtyOEorFwoKVe78NRytkuBykKcHOO3TH0TUncuyVkQvPIawJTUzfl%2Fus7n1sfhaH%2BDN%2BQNlltDfOZrrLymRgWhoM6b92OL7jnDn9o0AOtCJfqnXBVEgk%2FTowAbcO1gotgqQIyXIzjZvlD2mX7iTJztfCshCYCY%2Fbo74bhcHFNGMKL089IkewVI%2F%2FHn5AKcB0lYewyWdpd6DUZRvkSZpM0PNGFMk3DvBfG39qfRcNKvnr6vDgF6%2BEVRR9IMTY%2FxsaT3HcziCjM301GMnr9snKO6dwrEHbY6L5czu3vMLCsscu95Ha3LdWUempex6bdOYGt8VcpoYXqhxYT9VKbRKV10%2B5PICiuCiAqHYAxwB2cW5gGDu7Ksm3o4tMzIeQv%2BedbrsrSLX7UsBBmoa0HsjPsX7ov1YTJX6PsIseHf1R%2Bs8UGswpXlMncx%2FqMmNnTxoNgRDW08e7eq4%2BmpsuiA6O15L%2FAeIfm1WAJm8FuudjrVW3I858PrsMP724M4GOqUBqJ76wEQ4TtRnQk93jdSWOiAeNxe2CvCqMKtVQdqlEHEaK8UeqTjotH0paoxNPpNFFJpAoPhBL0WwE7VlQ%2BRj5kdfQ6BR5nBOo8xG9DSgDKhVHocvrx%2ByNcro1%2B24%2FWdQfqX3TD9Zo2r7dDSALThkwE3FEsy1kF9C2boBK1MqxqF8mg81fTYBNyUqPgFQnkLYLDCJ9peut28gT%2FCg3%2FugWchDXC6R&X-Amz-Signature=82fc3a8e3133c1cbabbc5df3fd3d60e26051be79b9e2548d62cda7e7b6510bad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3FKSNMN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010707Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIC9Ln42DivRiDVe3krZ3NotCVal1El1oUXAP%2B0pZXbrVAiEA2snWQadmXSxkFDSLYNZf%2FLaPEWi1usTQQFGGBE6t61Yq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDN6C5DakmQz1hlDt3SrcA7Vz7i2YDUgB6W%2FPpqk1uKUNE2UmjfAqK8Fsv1qOHUaBYJ3LVjw%2FUOYChPjzJjKHiq%2B5XS7ePq1JVbsIp8OHER20n2umQw1hvkr87gWufV2oX471JNekB35qYwevvsxEsZiQnaobehtyOEorFwoKVe78NRytkuBykKcHOO3TH0TUncuyVkQvPIawJTUzfl%2Fus7n1sfhaH%2BDN%2BQNlltDfOZrrLymRgWhoM6b92OL7jnDn9o0AOtCJfqnXBVEgk%2FTowAbcO1gotgqQIyXIzjZvlD2mX7iTJztfCshCYCY%2Fbo74bhcHFNGMKL089IkewVI%2F%2FHn5AKcB0lYewyWdpd6DUZRvkSZpM0PNGFMk3DvBfG39qfRcNKvnr6vDgF6%2BEVRR9IMTY%2FxsaT3HcziCjM301GMnr9snKO6dwrEHbY6L5czu3vMLCsscu95Ha3LdWUempex6bdOYGt8VcpoYXqhxYT9VKbRKV10%2B5PICiuCiAqHYAxwB2cW5gGDu7Ksm3o4tMzIeQv%2BedbrsrSLX7UsBBmoa0HsjPsX7ov1YTJX6PsIseHf1R%2Bs8UGswpXlMncx%2FqMmNnTxoNgRDW08e7eq4%2BmpsuiA6O15L%2FAeIfm1WAJm8FuudjrVW3I858PrsMP724M4GOqUBqJ76wEQ4TtRnQk93jdSWOiAeNxe2CvCqMKtVQdqlEHEaK8UeqTjotH0paoxNPpNFFJpAoPhBL0WwE7VlQ%2BRj5kdfQ6BR5nBOo8xG9DSgDKhVHocvrx%2ByNcro1%2B24%2FWdQfqX3TD9Zo2r7dDSALThkwE3FEsy1kF9C2boBK1MqxqF8mg81fTYBNyUqPgFQnkLYLDCJ9peut28gT%2FCg3%2FugWchDXC6R&X-Amz-Signature=82fc3a8e3133c1cbabbc5df3fd3d60e26051be79b9e2548d62cda7e7b6510bad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJJNUQL4%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCTOxK7s3ND2%2FIpT1DWK2ol0odWVUXSIMVZubH%2FlcH95QIgGfmFkWCiVu3Oml7F4lcdEIb0CcRXE%2BAfgv8f0AnVn0Eq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDG5KxyXiyj5%2B%2B8Bi0yrcA2R7oHHTDnlsmi8Jb%2FZvIzCx6rVdacljGQ%2FNgSUcpEkYgKfot68CUfrVm%2FL8iqK%2FunU5XOljHnMJzx4njy6WaIX7r5KRy943jccGFOrhh47mza43wicU4hJU8ZHLYbo7amzdVYnFc3BEoZCCVUALFo88wZhI8A6n7USrnjj5hArF4u4GYJgFqUGYA5Cfdobvv%2FK82VI9FPIdOgMxTKitOYshOttM7faum6gm97EAp04GLdZszo63msdP7eNe%2BzVnTk3huJuMfncd%2Be2HLtXTM%2FSd0fjPnQMcoKz6qWQWPH6T2Q4pOBuRDu5JmJyWjV3tACQpWazyhG4lKfvK473ZjyqNzN4MtKdmBxPNlXUO83WrupRmo5ixjBfDBsdO%2BMEdHEfHb9icya%2F0NTmyaEkH6mWLPnSloNbz5VASferPB1Xk5BmJu3H6NtoOYHntx4k54b5krutUgDFdWFj1YJlgI6oYB%2Fa%2B%2BKFCavy3SXKZ1rtU0qz32vOQf8gHLd31zpElVvphGLX7L1bq%2BMPm3vkg2uE9aqs6Sq%2BmXzJD6URdt1h10pm99Q7nydipaHoodrF6gtGbGbE%2F26f2Hmd2tsQs9C1qPE0TufAvF1B0ChkTWhJfxSawLKE%2B86wfiumiMI%2F14M4GOqUB2FYaL3GJPyReUsbwHJEKpVlYkBwHihPLvTZnJ0HBfGuY5bsA7DTp23tgPsJl99EWSm7DzKLYk6WNqksIEeqJBcxwFV8ms8q3Yd12mH8PTTFZthPn8EqMajrdfor6E7kUJwaH3bATBk0mO9N96HdPw7lQenczgaqsDmKUkj6Op7XIEvddzZxqyMdfoGQ47cyMZInCbxJJpeVXZnl2oEtYb%2BpkZAiR&X-Amz-Signature=8069c5ede1a1006c6a4764d34993d26ca4f217bac806b478fd25d763e3e3f3ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UCZLHOA%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIAcDJWIWtLIlR8jVWHtKmyr4cFKix4Xoce97ZBWquBMmAiEA1ugn2iY3VPOxyF4R5a%2Bv8je%2Fzq8eWndle7EILeP7BEMq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDJXXNrNjX3begPqvwCrcA%2BxYTBN4MymBhX5XK9qVpBBFPPjfgy%2FsVu4TfVX%2BmZW7YnCtYsW9rocHE6NevWEeGCWjNzzru0plAZXsq%2FopGIJOHLljIupET32QsSsHSEc7DlNksudbLQ4kb4pYhgsqd6QIYyA07oh9roMrNAyN0Sxy7Bs9rBkX0sIHHStycc1VSdbjHhmh7QB36rwdmXSEdeX50dp3Rj65pSpGXf2UQBq8vSvMsVIl3lhPB86KG73eQbKZRQkR3SLe0suCJU42X8XhB8RNz4yv%2FpOnDRkTv1rd2LMWJgwhj%2BLk32bscmNyoYdu03kbBkPhzVi4LGK8Z3lR%2FH1bcboZZ14g28FB87YkNgXGwTErjV4T4RPUjh3lGJCEY8mwC3qZoWQHypgtMMkND%2BsxsWp%2B0RmJU1NCHq0XXFC%2FCAcO%2B%2Fehqwh3VzvBbLrF8a7inm%2BYRoO3YsHeH0VUCTeMmWALAMK7CaR%2FqL%2B7DT8KJ00uoDmKaxRPi59isNImOtDO6ZxvY5XmSU6Af1ZHhEMXb3yTGogc63DkqF4HSgq9eHF%2F7Trj1%2FbWqT%2FpryfM3HqjxtsuV39R7h0cfKxcGj8Le3tE5eQ3vu7ZV1XxwzWmRBSPYFrNfIvBLaFiLqzy84dpq%2BUznc%2FRMP%2F04M4GOqUBPqEtwC0p09dyGszR95GNI%2Bk%2BZ2LjrL9X8hBXXCcW4d5glNDvpWYSrLQX9ORvWvMa0%2B9MArM%2FYIFHapBxOTWwectT1Jv3oywwAduWSazlsH4p7j460aXtk6YVKmNLF1y6YQC6WgChH8nI9z%2F7GPEiHG1swVzA%2BuUdFmQEYMjBNAHtdZN0mQUs6qVgOhvPgH6%2BhepPAEWHBaMdA6GR5NF%2Be5ZOrPKg&X-Amz-Signature=3fb0811c8783407e1b665c96badf5d2515713e68aa46e7f7804a66f1fdecc7a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UCZLHOA%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIAcDJWIWtLIlR8jVWHtKmyr4cFKix4Xoce97ZBWquBMmAiEA1ugn2iY3VPOxyF4R5a%2Bv8je%2Fzq8eWndle7EILeP7BEMq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDJXXNrNjX3begPqvwCrcA%2BxYTBN4MymBhX5XK9qVpBBFPPjfgy%2FsVu4TfVX%2BmZW7YnCtYsW9rocHE6NevWEeGCWjNzzru0plAZXsq%2FopGIJOHLljIupET32QsSsHSEc7DlNksudbLQ4kb4pYhgsqd6QIYyA07oh9roMrNAyN0Sxy7Bs9rBkX0sIHHStycc1VSdbjHhmh7QB36rwdmXSEdeX50dp3Rj65pSpGXf2UQBq8vSvMsVIl3lhPB86KG73eQbKZRQkR3SLe0suCJU42X8XhB8RNz4yv%2FpOnDRkTv1rd2LMWJgwhj%2BLk32bscmNyoYdu03kbBkPhzVi4LGK8Z3lR%2FH1bcboZZ14g28FB87YkNgXGwTErjV4T4RPUjh3lGJCEY8mwC3qZoWQHypgtMMkND%2BsxsWp%2B0RmJU1NCHq0XXFC%2FCAcO%2B%2Fehqwh3VzvBbLrF8a7inm%2BYRoO3YsHeH0VUCTeMmWALAMK7CaR%2FqL%2B7DT8KJ00uoDmKaxRPi59isNImOtDO6ZxvY5XmSU6Af1ZHhEMXb3yTGogc63DkqF4HSgq9eHF%2F7Trj1%2FbWqT%2FpryfM3HqjxtsuV39R7h0cfKxcGj8Le3tE5eQ3vu7ZV1XxwzWmRBSPYFrNfIvBLaFiLqzy84dpq%2BUznc%2FRMP%2F04M4GOqUBPqEtwC0p09dyGszR95GNI%2Bk%2BZ2LjrL9X8hBXXCcW4d5glNDvpWYSrLQX9ORvWvMa0%2B9MArM%2FYIFHapBxOTWwectT1Jv3oywwAduWSazlsH4p7j460aXtk6YVKmNLF1y6YQC6WgChH8nI9z%2F7GPEiHG1swVzA%2BuUdFmQEYMjBNAHtdZN0mQUs6qVgOhvPgH6%2BhepPAEWHBaMdA6GR5NF%2Be5ZOrPKg&X-Amz-Signature=0175c54e966f050dd121d0410b02ef73f5eab00dc6fb61e29536ab9cfbe4125b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662FNLSFZM%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIH7keQ6cEE9o0hbWfFU4qVJxDHPGxmIVYrOxlZmSFTbaAiA9tiy3wNy7aVilbr2eH7zcm7drUx7IAwZnEyWG%2FbUZkyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMjRi9x2Vz6h%2BivFDmKtwDnFg0eUshCxOyF0bnO2%2BG%2FHY6rymXHPbd3qY3LnVG2RdxGB3DcHK3CzydN0%2FOMcOeg4n%2ByiNuCtxskGTrftbgpYoW1np3Q7yzgjpQrLrBCKmPJFpb8xQqEwOZ9cBmQv0q%2BkbEFA8CqO06bv4p4e%2FKTNvbqPJ193Org9x%2BnNXTZo1vp5%2FNK2ykRPLh2BC1YzAfdJc7R9bbi%2F9PifpMaXlc3jlE2EA3vxnKGxuqXjE4HewfAxXROdHQQvIWRAbllg8GfJk8rCbev%2B%2FLMDb6QHhFJKe%2BvcSkoQTpoy03vsBkI9i6XmMUa4moVnKP5EeZBrnsLeW3weZFZtr%2FtH5WNx9VUJ7KUwx6Gtqcg90KD9idPBM6pTRS6lu0CWcKPb1KaP3QHK2OKYKfgbJRFpVClDb87oHuGsXORDb8B32IklBEF3mlzjK4yKJi1rsePNdGXK5y3C2CmRbFTzSP70zmX736rBHakFv6sISK3oICFP%2FmLsKImaCicE%2FRywyKmqI7rFU8aR%2Bz9YuiQGQ0X6z69qmfEYTdXpNKWdXLeyMpVwzV9eVHGngLDkLIP49X5q6RGwzRJnoHdQx7NevXwlNejBLtharkH4T%2FFSOdBkdzpk7ltUWSqJvGbZU%2FExNF19kw5PbgzgY6pgHAHoLfPnxV0wAo9zbDFhmBXsaESWYyT%2Bbr45rGZNM0pusRvhMGdVRpJDzKvRivI7gANzx6i0ilg8z2p9aNnif%2FwwggUNwPvD4bjPVY0RtBa0dkNN8Sd5uMq4n7AhmnZPrOEYz%2BQVnsS3vJvLZNh0s45Kr9rDp9Zbufb6F7GC2CzAcnNVAfywDaxEzwHqrph4CG7DtQuE3p9HGkexnN6TqXCtFoI6jW&X-Amz-Signature=60d86fe5cac4f3fed547070bf8f14336a24918953fb30b658049fc12c4824457&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJOR5WES%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIFyPA8w7g%2FBEgCK7xqyaJ4cyLoElctDPXh2GFzK2qjzmAiBZ0xeMX6pxYphw1UptLzWeyZ750sGmbjmebB66ofTIVyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMGunXt5wFB2k%2B%2B2NNKtwDzBVGoCfdokA2WwOQrWxtUt8B8SiE9CzJC7JJWw1Jpbu66%2FGCdQw5n%2Fb69Wwrmu%2Fld9ao%2BnCbUG%2BXtKe7yb4MNMRqXqnGpqUv1GO6wKdJnWwXx5%2BKZYB2FWH3QhQ5%2FlXxteBQ1du53%2BaQ6IaVYpuWVp7%2FDa7VeF9ua5iEYd%2Brto45OOw8nnBLkVBFsmat61tbD8jXXjDcHq99wsVY0BcK2aNQgxVXK9APLNNHf3KHllH91d7OqxrHc7X87yKRN9XfP4lZ%2FzDep7qzgTOJDz9eW3SBWYeEDvqEsMNayImwI25Uo%2FxBdHym1%2FVBt%2FLKVNp4G9rBc9mXPZ%2FQa0cdvoeAHED4A8J5PInDmpn7nTkX6wGa%2BRNsYMZ1DM4v%2FCX0dGX8hrwc6HsyfcY%2BOoyglW564xKkKcHqxdj2ujRzZlEIJ4mmqGiPSoN2jEXwZnEM22OTh5lmbH9D3Q2%2Bx24l%2FUG7H8EHV2NpGU%2BNpCsquCIQkzcUbrhsz2Jqb29t5LY9VwVrgep6GZdnkeYdzwXKhF93lpNWLab0F3Rdtg3kIygMYHs1Jdk0SQy4zPUKuZ7SX39zsMa0FhrHnMkIJoDUVIVRGZ2r6ezf78ngZtCv%2BrQDbYAfu3tIZnGTtsDrEnUw%2F%2FTgzgY6pgGCdLvFO1LE5DyoMvhcTNUJ5JbMeHf2MmMXsYvEZ3xAKWscnTEYcDdxB0iLQwBIM4pyc2uZmUOVAEA9oPfMgDJXiISgMESyx4KU1%2FkpD8Xq67rbGgsq%2FrGEXPpNPgFoE7onWlAH0jvG6m9S7IayJDhPGPZGqIz%2FsQQQAWqyTYKJfZfIkN67sgAvYzzheeGyv7puc1a1hG8m%2F1To4SXyL7fQyIoi8ytk&X-Amz-Signature=695d4eaf1667d64c3caee009b7105650d24d0339d5d7d1ab5c5ffae43addd374&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJDSXSRG%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIDG9AoQe%2Fn4DSjK%2B%2FDjBSoY56xARXMWY07O9jm6AVO%2FKAiEAsFVqCNiO8AiK1brYvD11i8g9UanReQOAHpP1ALm0FyAq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDJUHN%2BIJxkxeZj%2BXtSrcA%2FFrFUgRURtm5DuYnDy1k%2F%2BXNjBdqaG857EG2w%2F2oWoBeKcx4kzG%2FPOWwbBHVSIHcnRJ%2F6ypDGRfRmx2izaCIz6vi2Jsqn%2FvbjAPIF9ADSdp%2BXS7AAujMZCcuY2%2BUpoToGstECcbohveD8u1BFMJ%2BONV40oL9pb6cC3NAcA26%2FLEeI2y46KbHZORqM36UaJOijBT5ISJITCA%2Flk%2BjVUeKAgnBPQlSDOqyVloDRyvdsf2zuyUqYwNJdjZwM5jGmRixRO6Ios%2F6k2UOEUb2sBR0crNIF12XxsclZCECubB18lRiGLT1wSo%2FfvvXoBusk4EoqmqT6vQlMC9ErJf0U1PslSSaeV8cMnmymu8y5TQQ2Kz0SA3c2HZOoDtK%2FWQalYRCKEovSiSt5s9yRedxNo%2F7i5d3h4OIR%2BBldrMEMd9glUb2kbim1yvWktrvuJFkxF9g08c7DF%2F2UK3OMVNOABm17pWrPTwM%2B9gyWHR8DXGd%2FVmIXUMK%2BxDiou0AfUXaP%2Ba0IFvKVNMOa2bp4K7OwSWM%2FQecoHFGOh0U0o%2BpJ%2Bc%2BwoIe0j5hpj6ypcGkVHNKc83im7ii0jKzr674DDqv%2BINqp9sMTjq72kyEDf8umFp0mpawKwY91ufNwIUxR6fMOv04M4GOqUB5mf5KZRYbZXO0Ehp5olBKkCbuz8B22UMha6F466kvtxv%2B2xFfmOvPx03ICqy81mncYOxFTTjHxRmmfYKCrgldB8OVAMrysEY3yF1kEmLKuqzjDGy9cQW5LOL9fHiYv1AgBFpm39tbtbeBQkKotKUQQAMqD%2BNGJJ8%2BLwSmdG4Led3Zf9Kn1ne3n5Zjjt5w521oC5SSSUE1CKi%2BmFu%2FrhhhfVFzjWf&X-Amz-Signature=c9f71f520bcee89da19a1fee0a6af692ddd2f89c321179b9def607c134a63172&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QDEFRIZ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIGtl8GixP3xzZTTunFQoJSBsRV888RLcwpdNjsqtM9goAiBPd4vFjrS3ltN3pksw9y%2BDKm3CWLMGzMehoeFKC62Nnyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMNnQQPLQ%2FuaLiP6ZlKtwDHY816ZlpB%2FJHefqlPqK4FtkrjceqJq5toYB5jAmCmlesrxMtDkTALVuXUABdpMM89NL3YJNgORxDSSN8qujellxYfk0Ne4d5EfTGZtFsC6V4YbK7TgVPwrcPRXkLF78UnHvJiwgaSvthqO97FKZxgJ1HAGPG9cDV%2BryOWW%2Fik0hibl7rkY2Cg1hVRhUtjMF6mb2aZWAZkBgW0RGsgrYqGnzBIq6HHMutwUZrIdN27yHTT6lrhCeYWkBGWLvxiFewOrLTbCUln1yUOTeeGVpLwUjKaIE3U9zNlQ6d78XOfPyZMUR3ypo7Cpbc%2FPaUweKDASzhrojNVRFRrD%2FbyCZUAiJR00SoMFrn61aFP4xmRuNvP5DjIymKB%2FG01cqvZwkEUMUGTxvQKkkKIcP8B5rNobJ2Spu1VRScFNTa6nj1Kf%2BmcMeXx63U%2FhJdqXfTGCU3G5RiIlk5zz6gh6bUSVSZU4cAh6jOFrcKssJy5w0qG9x%2BHfqnTdGMoXEjt8em9GKllTgL5KzHhf8%2FGyrC6GfPkM9pmoSpbPoNwJAK9H1%2F8peZ9IDQrmv4L5X9QqLEVUgQzI07U5dOP%2BlAJ6G4r%2BZnJRrRI1M%2B0yGvujlai8rsEt1aIwnwoEkKmuCxBq4w%2B%2FbgzgY6pgEgDIBGAScMKq6oKunGN5NfqcgtbZlu%2BBtLe4ufjArEkwMun7YjDVJRkqwY6XNn5%2Bmc%2FWDvKVJlXh7XG9b065G2vJ0mDBPo6dRtezBUV2QxSB6979PIgsp26tF3%2FjqWgWR7nUA4PWQTS2IvS%2BUa3rbIxetzXXfKEQj2fRfFA9Ciojlg%2BZhrmk63AB%2FzGVUI7L2SpEHkTxss2y2L6eLKmA8qeq1pMoZz&X-Amz-Signature=c548fc693070b3790caf94595c2c238369a4e1e2e23d4cdbd9ab85fae8d0a84f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663QDEFRIZ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010715Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIGtl8GixP3xzZTTunFQoJSBsRV888RLcwpdNjsqtM9goAiBPd4vFjrS3ltN3pksw9y%2BDKm3CWLMGzMehoeFKC62Nnyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMNnQQPLQ%2FuaLiP6ZlKtwDHY816ZlpB%2FJHefqlPqK4FtkrjceqJq5toYB5jAmCmlesrxMtDkTALVuXUABdpMM89NL3YJNgORxDSSN8qujellxYfk0Ne4d5EfTGZtFsC6V4YbK7TgVPwrcPRXkLF78UnHvJiwgaSvthqO97FKZxgJ1HAGPG9cDV%2BryOWW%2Fik0hibl7rkY2Cg1hVRhUtjMF6mb2aZWAZkBgW0RGsgrYqGnzBIq6HHMutwUZrIdN27yHTT6lrhCeYWkBGWLvxiFewOrLTbCUln1yUOTeeGVpLwUjKaIE3U9zNlQ6d78XOfPyZMUR3ypo7Cpbc%2FPaUweKDASzhrojNVRFRrD%2FbyCZUAiJR00SoMFrn61aFP4xmRuNvP5DjIymKB%2FG01cqvZwkEUMUGTxvQKkkKIcP8B5rNobJ2Spu1VRScFNTa6nj1Kf%2BmcMeXx63U%2FhJdqXfTGCU3G5RiIlk5zz6gh6bUSVSZU4cAh6jOFrcKssJy5w0qG9x%2BHfqnTdGMoXEjt8em9GKllTgL5KzHhf8%2FGyrC6GfPkM9pmoSpbPoNwJAK9H1%2F8peZ9IDQrmv4L5X9QqLEVUgQzI07U5dOP%2BlAJ6G4r%2BZnJRrRI1M%2B0yGvujlai8rsEt1aIwnwoEkKmuCxBq4w%2B%2FbgzgY6pgEgDIBGAScMKq6oKunGN5NfqcgtbZlu%2BBtLe4ufjArEkwMun7YjDVJRkqwY6XNn5%2Bmc%2FWDvKVJlXh7XG9b065G2vJ0mDBPo6dRtezBUV2QxSB6979PIgsp26tF3%2FjqWgWR7nUA4PWQTS2IvS%2BUa3rbIxetzXXfKEQj2fRfFA9Ciojlg%2BZhrmk63AB%2FzGVUI7L2SpEHkTxss2y2L6eLKmA8qeq1pMoZz&X-Amz-Signature=de8ed4e337d6935cde7094438f9c835b3839ac78ebb6b323f9871f3961287887&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSKL2EAQ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010703Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIDxRTYwObEN02dGGs0%2BuQArJ30o8PQF2vyqY7rAw4X1qAiEApzYkB4q1SFI9OvrTdc4xM1XShBbzrBA72%2F2zLJn0yRUq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDB8QhBLEzmQmkXtRxircA9nUUdE3Ernc55YRECYO16hsdIMLiilZduGitz5uwaWFBHHNDUk82QdbMqchZB753cCU2QvxDmHaLzrNm44hFM6a3olusgkH8UW%2FHayEyuPEHKzjt1odlwGhixJTaLo2itYLRBuCXFRMtKydl087EiNpCWWJmkgXHfTQYYRpFQtftmNNG%2B4FHjQf3lmOucLJVIGqLj%2BQPvSa%2FWaO69odej8zxSJJlnd4LAf7qIb1GpDpnJG%2FVa9Wu%2FbnjqRi5clGTLTBNujNMW2Oja5yO4g1LFJterHlWfOFjNXp7ACSgUxCQWWnT%2Bcs%2F7Xwb6vhi3rMgZc%2BQkT%2FyaphPCi%2F3U0XASWJF8uowJFqHhCv1Qg8sU%2Fk3Njig%2FBvIGNESNsOQf1mslMJ%2BXs4F4AS15MSGt%2BqfZokt%2FPCyOYfFK9LBntDvveuHmnHi0YoxfZ%2FRKLihRvjn1f1%2BaR5XE8SCzjHWr%2B1GNqtW6gr9ta%2FEITpRIKSqwZwLg8WHWbE7ol%2BesdCT2gGrqyyuD%2F%2Bm3sywH6EBz%2FvwHPuo8KnszW6GnF9euSdnkhrlyF6r0ZgLdkpAcMxIKsKuzdB9WUkSDICdQnsnSfdFA4A6nRenwST86OCPsLKZFa8fxK1exm3%2FcUrOp4UMP%2F04M4GOqUB3b4WKYJglAN8nSJqEfJl6WF2yBTwH55yKPoXJZMheB2PPi%2F9lOLP6yaoTUaKIHDaS%2FVS2MNt7U3CBb0SB65KM9i1MoefYMjhLUWCMEz1K9Z6MfbMrkuu%2F8529QWONzqiSN7H5l4EGQB2OBLis7w5CuWE%2FrmvceyE%2F9no%2BSV8dimLi05%2F5YE2f%2BF9KoJ%2BXv81pwKccRXtfI%2BGlgsgTZ0YHcH6Huaw&X-Amz-Signature=4143b8e66ceee853282b94963cc9e972af46dbd5d44725cd5f889df258238e4f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657M62QVT%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJFMEMCH10hqWHK3QDHciDgreio%2BkA53DmKytYCABbrX9zuARcCIGb%2FCDSWopXlpvsqPti4wgGnzfkHYgdfxvKMBshhnfhQKv8DCCEQABoMNjM3NDIzMTgzODA1Igy5ahjzfQ6VoPFj3dMq3ANJCunH2igszq2s4ubkMi7ceftX4pcvYEnqcwEbhqNFQmlCYRawJCXmdvySzbNPPCuT1KFs0y9%2BOX%2BQwOAFRzm7D8TfYCwkF8WoXp7aw3AgYf%2Bb2yzO%2FWSbhXcnsgAPmZ3wYxp9ZW%2Bt99LugVmiB1Q1HEEj83dsw%2FymBA2d7gIIoJBAhUtQgLfhVqJaK6hJ79GByRg6h24GGVRjg1FieBsWdFjc58RM0mk%2Fl7ehQfvztetwtv2E1t9d1u6pHqgF%2FDyZH6JhXKPhokS2y7JtWQ%2FA21I03MXI44Tl3WsjYr6bk25re38df2wX1yk2oTYz55LkKoW%2BQOali%2B4xwbx%2BtT4LLJp3iSZWckZdAWDF2gJK6mCewIb64TA6M9bs2a9Agmssr%2F1%2FYVypjPDGRuUkgZCYcZNYaIPNQg4nyf7NVSj1c7kaQnXMll1QCEoCgqPVTTeaz7iL3wdPeo7xEnTnD%2BAAbe%2F%2Fg79yel0HcfdeJS5bLctshAN594GCxPjzNwxbeKX9Q0PPsO4I4Y5s%2BKXFZ1qZhBnjKhhI1%2FdcGAyxwmfpQrJG7xhR9aT8XBCuozenGu4%2FT%2BOUwnJ3Cv9jnnxM29dD%2FXSLLweEhQQn6hS2CDzqziD54HwJMlui%2BavidDDE9%2BDOBjqnAVg4I6oTJ8D6vT8akBRb46gUXupQEGjRcghGhwsAKAZupePK3BCYO3iWPnjr1wibEVwUeGaA6M%2ByTmlFmpBbwOQhVtUyToboYVhLhxZYAJA4wTHPFg6kygS%2F8zqm4TfDO1X%2BDWt6onX1VFu5aZ8v%2Bh59msnt62lpfct7dijqSyMP7oxvSKsr7%2FvAsA1a1AU1Fu3n0inUK9s%2FXBPshF4b2q48guOeu5pQ&X-Amz-Signature=5ac381f284fd8491b046ddacec9a8451a5849d44d358567236b657ec0c8603c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46657M62QVT%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010719Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJFMEMCH10hqWHK3QDHciDgreio%2BkA53DmKytYCABbrX9zuARcCIGb%2FCDSWopXlpvsqPti4wgGnzfkHYgdfxvKMBshhnfhQKv8DCCEQABoMNjM3NDIzMTgzODA1Igy5ahjzfQ6VoPFj3dMq3ANJCunH2igszq2s4ubkMi7ceftX4pcvYEnqcwEbhqNFQmlCYRawJCXmdvySzbNPPCuT1KFs0y9%2BOX%2BQwOAFRzm7D8TfYCwkF8WoXp7aw3AgYf%2Bb2yzO%2FWSbhXcnsgAPmZ3wYxp9ZW%2Bt99LugVmiB1Q1HEEj83dsw%2FymBA2d7gIIoJBAhUtQgLfhVqJaK6hJ79GByRg6h24GGVRjg1FieBsWdFjc58RM0mk%2Fl7ehQfvztetwtv2E1t9d1u6pHqgF%2FDyZH6JhXKPhokS2y7JtWQ%2FA21I03MXI44Tl3WsjYr6bk25re38df2wX1yk2oTYz55LkKoW%2BQOali%2B4xwbx%2BtT4LLJp3iSZWckZdAWDF2gJK6mCewIb64TA6M9bs2a9Agmssr%2F1%2FYVypjPDGRuUkgZCYcZNYaIPNQg4nyf7NVSj1c7kaQnXMll1QCEoCgqPVTTeaz7iL3wdPeo7xEnTnD%2BAAbe%2F%2Fg79yel0HcfdeJS5bLctshAN594GCxPjzNwxbeKX9Q0PPsO4I4Y5s%2BKXFZ1qZhBnjKhhI1%2FdcGAyxwmfpQrJG7xhR9aT8XBCuozenGu4%2FT%2BOUwnJ3Cv9jnnxM29dD%2FXSLLweEhQQn6hS2CDzqziD54HwJMlui%2BavidDDE9%2BDOBjqnAVg4I6oTJ8D6vT8akBRb46gUXupQEGjRcghGhwsAKAZupePK3BCYO3iWPnjr1wibEVwUeGaA6M%2ByTmlFmpBbwOQhVtUyToboYVhLhxZYAJA4wTHPFg6kygS%2F8zqm4TfDO1X%2BDWt6onX1VFu5aZ8v%2Bh59msnt62lpfct7dijqSyMP7oxvSKsr7%2FvAsA1a1AU1Fu3n0inUK9s%2FXBPshF4b2q48guOeu5pQ&X-Amz-Signature=5ac381f284fd8491b046ddacec9a8451a5849d44d358567236b657ec0c8603c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VLQF47PN%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T010720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDsBeCSrBA%2BJaTMqi2Bh%2BZtU1E0q8RpZTKaCyiczNPa%2FQIgVs8l0POyKdidsT0Gt%2FVF2cbwR%2FB0DXSm2mTz0mD3Ktgq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDOgh5NfprEhrWYQNyircA9hZfDOC2%2BNvM3rREsJ10DI30aKIjtrIHOxoKdrUdqFmzk7QfnuKTmDqvFIjeeytXqEnGs0Mv3yywGvXDPZENCsz5jtA6VbISciUICuyfChomX5KQ0WfrGXFuPyRKvJCSRB9huhT2fLvSMABjspKVPWZYfg7wZL2tAzNumrWEEFMkts4A4pLCgFIUNcBUMy5XxFqyIwRqCqp571xyNwqZe2RaLGzBx3nFXGMy7PjGGp8fvvfeZj7e0fBnZN1TehdXQaK3%2FdN6YKwKXp6qnAecSDu6PseW3kPWYxb6yEkSRaRAn8dj3lMHmIfoMR94uSBdtMO9gSb%2BreQ%2F9oTfjJ%2F03vq%2F%2B3mCt3KB4Ng3RsTLGwL8IFWNtsINpcJ%2FXmbTPT7YA2pLtFDIEPgFRLxQF7zSjHzugp7kvUDnUM5UzDUUG6VhxomIzgwRImACAnM0igR7S4viB1NDD4w5UCvl7tJwL4RdsqC1ARi6MVdOrpfrn%2BjFRUbOUeSeYoBvfuzc%2Bz1PsYVCJqB3VcRKaKlO7Xhdb4%2BMuFwaIhN2K9CXDSK8QSny%2B3XqVYA9ZWNwCNUfIXpRgepwVoXAVpN7yahEACgqnthALbVeRoPMyTjxUYzf3TPjnVEiJXoFlMMT60oMLD24M4GOqUBxy1ebxPrOhkaeuTXgCK4pELM9QbhD1nTU6cRu%2FCJ9XPq5AsWCI5MTcdjphz7nb2wCEx4Jp1RwOKKnkG95JT%2B8itVQ%2Bn1yw8Dd5pNGJSUSxmsAu5T6CQyOEDt7EhZhfD7KQE7an1k0j8IG51hGzaYsmWjXI0s%2BibX7ouX7JhsSgYK%2FQ5ruO%2BJ0eQdU3pw1bhhkF5XuSlcb4T4VJO4ovb%2BKdqAXmuC&X-Amz-Signature=ca6a79d91870efe52f47c382af858cc4b74648d62806daaa98595ee08fe21cb9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

