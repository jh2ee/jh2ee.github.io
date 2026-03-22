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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5WSTQPC%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBYEHVQa2N%2Fy4TBY6AjcEwiIUdFmWm5D3sLyD2hV8sSVAiB3MrxvghtFeo6UFp%2BVGHqVciNM29Jx2Bb0TxhRuaujAyr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIM04UmTZve595l6mkjKtwDFSQPbQrK%2FIStfGoz%2BFHFdEhvOagoL2qsEWCdA78eZ5Wlipjm9Wrk1FnpHvWQAekU9h%2F2%2FJDLMc54WNK1En1wfT8qglcf8Ba%2B0oxIA5GtNC%2FjHMEYOewdj2Ln1uMg%2F5y35keeUWpinXCpQJScDsk2d7yBBQp691HS5Ptd1BSuidAuEtK%2Bu1g3EJbYHkYgpbkqWIxxIKn7OU5U22tsjDbAmlGHDj%2F8FhhI%2FA46IgFPGCXJbAe3aPop1PiPgONpQqMqnQzO8wvcmDRZVOv2TyVv0zaqPeB6DiZ%2BXhoLkU6R7O0PKei0tddH1qN4lVqMwujaIUtBAV4pSIxXCZQhZnJ4TniigHVkv7KMgZ8rKl5XPRN2H4XLS%2BaEsaG9R%2BHYlRS27lTkCvyoQETxQ184DuKOuxGlsbVr67Ib2rDcujTQ%2B9hqXQ6u3gWW0A8tu5OWlTsHzb8cXygWzDF8VEyCpak0Ub6V9uAsVKeRkdXB5bMzGkj5dKu5QqhgCN95xQreUyZDF%2Fo83i%2FLOFGQqGY9S2ubw6bbHXd0lr7mW4GErnt2%2BtqB8tjXMsiLhBvUZdUEEJ8UAHAgAOmJQk2LiTRo1Pt7qWh4evYF2hgsAAN4xUINkeVlP5kyhmZeWg66i20wnYj%2BzQY6pgG5SAmcDSsoxZKM7o5MqrICSV9uO8Kx7B6LGEzQxhv6rFsBebx6KSsJ4u1aV%2BfkS1tDDLeKC4iUpIAL9LreCPlzRTrsrsxiG3GKI%2FH%2BnnkEz64N7nSmnMdLwjTWXIvhsWc1yr1N9aHI1Xlt0vH6OqXUTFmSBSs6fStTnqes62G%2FkebbXz5tO7THkoS1ZoANzmCGulvtAtTO7LN5vGNWMv5Mik%2BkHird&X-Amz-Signature=fd5d7570616fb1fc286d6292497889836b5442e610603ddbaaf34100d8b7d2d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V5WSTQPC%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBYEHVQa2N%2Fy4TBY6AjcEwiIUdFmWm5D3sLyD2hV8sSVAiB3MrxvghtFeo6UFp%2BVGHqVciNM29Jx2Bb0TxhRuaujAyr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIM04UmTZve595l6mkjKtwDFSQPbQrK%2FIStfGoz%2BFHFdEhvOagoL2qsEWCdA78eZ5Wlipjm9Wrk1FnpHvWQAekU9h%2F2%2FJDLMc54WNK1En1wfT8qglcf8Ba%2B0oxIA5GtNC%2FjHMEYOewdj2Ln1uMg%2F5y35keeUWpinXCpQJScDsk2d7yBBQp691HS5Ptd1BSuidAuEtK%2Bu1g3EJbYHkYgpbkqWIxxIKn7OU5U22tsjDbAmlGHDj%2F8FhhI%2FA46IgFPGCXJbAe3aPop1PiPgONpQqMqnQzO8wvcmDRZVOv2TyVv0zaqPeB6DiZ%2BXhoLkU6R7O0PKei0tddH1qN4lVqMwujaIUtBAV4pSIxXCZQhZnJ4TniigHVkv7KMgZ8rKl5XPRN2H4XLS%2BaEsaG9R%2BHYlRS27lTkCvyoQETxQ184DuKOuxGlsbVr67Ib2rDcujTQ%2B9hqXQ6u3gWW0A8tu5OWlTsHzb8cXygWzDF8VEyCpak0Ub6V9uAsVKeRkdXB5bMzGkj5dKu5QqhgCN95xQreUyZDF%2Fo83i%2FLOFGQqGY9S2ubw6bbHXd0lr7mW4GErnt2%2BtqB8tjXMsiLhBvUZdUEEJ8UAHAgAOmJQk2LiTRo1Pt7qWh4evYF2hgsAAN4xUINkeVlP5kyhmZeWg66i20wnYj%2BzQY6pgG5SAmcDSsoxZKM7o5MqrICSV9uO8Kx7B6LGEzQxhv6rFsBebx6KSsJ4u1aV%2BfkS1tDDLeKC4iUpIAL9LreCPlzRTrsrsxiG3GKI%2FH%2BnnkEz64N7nSmnMdLwjTWXIvhsWc1yr1N9aHI1Xlt0vH6OqXUTFmSBSs6fStTnqes62G%2FkebbXz5tO7THkoS1ZoANzmCGulvtAtTO7LN5vGNWMv5Mik%2BkHird&X-Amz-Signature=fd5d7570616fb1fc286d6292497889836b5442e610603ddbaaf34100d8b7d2d6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SYXLPQGM%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIF112MHGZqsaJvkmy%2BqhfWTOduNZaOWel7UZh%2Bm33U%2FmAiBLg43yfORg8FQbjBg7kHVdm9vLWMDZRyHnNCnzY2w1FCr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMcOi%2FZ3lbdfcOv2cfKtwDHhkF6Kruj8oGQC2PkWuNpMfHXsB335syhw%2BCE6VJ9YJz2x40BzoOG%2BgZ4XLtird8twx4cQpAVByaVdBqzptmmnsQCYrvP02J0Zpa9cdRwrW5EOxNpsU5y%2FClQQ3n14WVTToeBwdC7E8Ovx2C7E0curAqucCtUeQtYJvsdl8lv78InghlTCRdGK79DujVWXbWcId6HuNw5KfhORD%2BIIZyiKpybKQlqfntWvysCBDEWFdav%2FiynYDKccon%2FgGin5PEyVs4y2%2FCqELUGlavBOolmnLbq9zQkPEf3%2Ff%2FQgkeyfI86HV8K05UhZW2dhAGggIM8bRp%2BQk%2FMYUnkHlLDdNAQGwBeSQK1%2Ftx5eiSvfwv8JzYj23Xw%2F9trqx2WULFfjIjlg0%2BW8jEc3pE3OuXdDO3OzW17KWJ18GiWY5i7laJsGu%2BLxBk3roOkZNbdUbcq2LhpeCb5aOXxu70%2Fvgzk7uHyamHavY%2BYfvqdOkaZEhgQTVI5B%2BldYSxroDpE21pKAClyFo3YGN1z7u3mYqESR8qQPsZVf3YasvYQxN20ksyb7hdLPvN9DDewPRRqssEv7zwlrDYENj%2Bsjv2uQUdopt%2BOMmvomc9cwrYq1HIG7ObuwuxyKk8tAoNz4wMf9Ewm4n%2BzQY6pgGf8v1YfjmAmTyFyijicpl8OB96GcjN3nAp3JH8FHhxUmMstTWEirjVo1%2B234vMNN%2F0uPrDLGg1MGyEJ3W5MybE6%2BnHmkwiXSbz%2BO0kOh3OBo5LWiOkaRasWRfthGmJZMkNip4K8JAkMz5Nl6UHHjg06WsEfdbgXlwD%2BeUiag9OaHEbdL%2Bvf8%2Bo%2FUUXmJtiwKxHcc%2F9l359oevkDodxlI6tZulEQWHH&X-Amz-Signature=a79ab703fab769e4d9a1f8d966b302210ad079e85720625aded415a729f43a7d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZZBFIAS%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBCfS8g0G2Cv5PzsDvSL9bpHK5z6J269cC4sk4ppzcPHAiEAx9yk%2FT8UTek1fLEea81Qr%2B0l4qtu64jz9lZ2ZeZks4kq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDFUXajVVRQQrHilNjCrcA17s%2BSgNoSFRK3QhfXedIldtMXhr4scK7NKD%2BKZR1TpXVmXLpqwgOyfU5pQOk9M0p%2F1%2BTbl7Ltsg%2BynjrIi1gWriScibMvyBz%2FH%2BZF8adn63M1ddE%2FZjKlf9c4Az4oCTGFvUHd1k9nvr5XhZf0MVwiRDwG1JDyjAvXoLzbV2Np68bfoQN5HmOBu5W1AgZsz7fqynJNUneoQSbff3UCp4IA83Y1ZbXK52RWyy%2B2S2oPk%2BowV%2Fo2vdzIWCt75DIXQZWnWdBQTQy792eZIJVstMA689VPBuvdU%2FawnIJXMWTJVvhrNAa27Ds%2BbWtfQlu0RGAWVw%2FisGcJPUdiv7fa%2B23F1Nusfcf5gybo%2BnHqiw6CTdpRsN2s2rIZbSslPegzHwF%2FPZPH6la9lCeohM9x6syMvOOPd1E4vYswFC7RAyFU0hKeNpzA%2BkRDzaF4U6G%2FIRnaDKPTYCHSjWrsXEN13HRW7QYQLN22btUid2kSf%2FaMy3Hm4rc%2F6yjTfzSlXSIFjBIP1DQr6wraDhMVwUqNo%2FfzIWvzhtErXimLp%2BJ0sgXLI48GkiYs5A74No09xEhn2USfIbXti6TLvFHdQIAIc08MjSCAfYWRnBQJomvAHK7Lkcger1kQx0iEsHDHMPMJqJ%2Fs0GOqUBu%2Bn2LMtvfw1O496jp579CP604xhweo%2FLgAjGVcNiAJZdMkR1O952wSRzl4kldi%2BNiTWiUz5G9cUJikv1de9ZEXeurrHSoDnhyxzyLTn47%2B%2Bx8m6YgmO3P%2BHdveYxZHwAkXWuDwB5aojs4xX9xcgMBAPv2thZHHt2ouUCk%2BFekCaQxVmnlXcB4FCYTteT77loGm65y2XOGfCF2IRKuGgsdSFizeHR&X-Amz-Signature=178f5d1a82181b6486a789f19bcc34ce47f43745251aa2f53c9c228374deea18&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZZBFIAS%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIBCfS8g0G2Cv5PzsDvSL9bpHK5z6J269cC4sk4ppzcPHAiEAx9yk%2FT8UTek1fLEea81Qr%2B0l4qtu64jz9lZ2ZeZks4kq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDFUXajVVRQQrHilNjCrcA17s%2BSgNoSFRK3QhfXedIldtMXhr4scK7NKD%2BKZR1TpXVmXLpqwgOyfU5pQOk9M0p%2F1%2BTbl7Ltsg%2BynjrIi1gWriScibMvyBz%2FH%2BZF8adn63M1ddE%2FZjKlf9c4Az4oCTGFvUHd1k9nvr5XhZf0MVwiRDwG1JDyjAvXoLzbV2Np68bfoQN5HmOBu5W1AgZsz7fqynJNUneoQSbff3UCp4IA83Y1ZbXK52RWyy%2B2S2oPk%2BowV%2Fo2vdzIWCt75DIXQZWnWdBQTQy792eZIJVstMA689VPBuvdU%2FawnIJXMWTJVvhrNAa27Ds%2BbWtfQlu0RGAWVw%2FisGcJPUdiv7fa%2B23F1Nusfcf5gybo%2BnHqiw6CTdpRsN2s2rIZbSslPegzHwF%2FPZPH6la9lCeohM9x6syMvOOPd1E4vYswFC7RAyFU0hKeNpzA%2BkRDzaF4U6G%2FIRnaDKPTYCHSjWrsXEN13HRW7QYQLN22btUid2kSf%2FaMy3Hm4rc%2F6yjTfzSlXSIFjBIP1DQr6wraDhMVwUqNo%2FfzIWvzhtErXimLp%2BJ0sgXLI48GkiYs5A74No09xEhn2USfIbXti6TLvFHdQIAIc08MjSCAfYWRnBQJomvAHK7Lkcger1kQx0iEsHDHMPMJqJ%2Fs0GOqUBu%2Bn2LMtvfw1O496jp579CP604xhweo%2FLgAjGVcNiAJZdMkR1O952wSRzl4kldi%2BNiTWiUz5G9cUJikv1de9ZEXeurrHSoDnhyxzyLTn47%2B%2Bx8m6YgmO3P%2BHdveYxZHwAkXWuDwB5aojs4xX9xcgMBAPv2thZHHt2ouUCk%2BFekCaQxVmnlXcB4FCYTteT77loGm65y2XOGfCF2IRKuGgsdSFizeHR&X-Amz-Signature=bb5b282dc5a9a22721d4d2adce742c7b780be2b82570560459911321d33b08aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XOB7JO3A%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCxzuJ9bH0wCKLHLzAShH3toiDBcoAx6VJUWa6LtG3LiQIhAIjesMeMN%2Bcjkca%2BCg5ckuI8H%2BG7uuKendzCiv7v46WvKv8DCF8QABoMNjM3NDIzMTgzODA1IgwEXtak5fXIDJ2YKM0q3AMaCO%2F%2FwUnMx2xPwFBaJxyjJlux%2BNBhA3P8R5QHSU80ZO1yuOiqx5pamGtzlCW%2F2p%2FcsLzLYhMvycNSqnwILIugrXyoI%2Fb0x3VjxAgFkFheJt0tPv2TTFoxMpdS7iR94kL2JUp4TCh8pLgSdcRB%2BUNapK9MDqNywfTiiNythUvGSwDWSMSPM3k5amfzx6zBA8yN7Y0D4hGTS6jwWQ0anbxudfMCA4eKHD8tG4J8CVjtpvErvrKNjem3y%2BtGxC43uV8nPYVOsVHbOL5I2yP6nLeNBxpMzpUe0gRBPA9uZJsLB6LZGqhh8Wm8hoGDdSHeJ3bFTXurvq6bdAVrCs2DzQf%2FnSrnTZStbNrKogGBxTpEDAEq3Q40AowHU7krAvLm9JGz58SflaV4xlJWWBM0%2BqVnbp13F3SjXFSgEGBvh6h2zwOOvgWSTmrfVMC8k0TOdUvNuA0J9kA1YpTozWyi0DpWaI1szYCtBIrY7fKbjw9YcwAoLYlnLU4BhajYR6o0oUNuyJcYNXfAPVM5U4dVDaVUMcyt%2FMGZi0RrUMjiPlSGBL5jCEzid%2F7gU4mM2QnjYpNUIwRgE%2FlIzNCER4wZBKkdYSu4cuXyoAw4mwmBE%2FEgKfoc4X4phcHu4WiytTC7iP7NBjqkAakXYmIg%2FxhUS1UohhM%2BlFkerkQ1fEtg5AqG30z1CA1UNJx8F1hV6EayLYT652TqtXHfjXTT23Bv%2BBjVVbAGdLwb2i7HhlrbpMpW9625wQgCbtW5X2JO8IXrMYMqyT9FX2Lj6jsZhIIMawIqAY5z3tLhpwZ52NvwGz%2BKMk1OyRMSavpISeu%2BXc8nfvcgORNXcX%2FoKOV17A%2BqkZTBxAh9NKfk5fxo&X-Amz-Signature=6304b7d8e6c3e7e6b6a80033f2316cf2f1d57942fa478a86bedd3fcd8b1e9286&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YTTUQ5OU%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDQYouwQKUPhJHiXMovK10iwj8bvRZlNVbabkycRJD0JAIhAJvaMibhNKd1lmpiZN5y8OuWikNYnixebRpICG4ZIppoKv8DCF8QABoMNjM3NDIzMTgzODA1IgwPALnlMzazNiOJLnQq3APKVAh2EnlJ1RsNmPivZhS91OFHr17k%2Fp3oYOB%2FNvC%2BkCFEg1av5GAWvQ09eXosOm0c9aOZW2EYIpIgVWBzIfENC%2F%2BDzgczTzAACcwVIvQ2DFKvk9inl%2B8b%2B0y7A6DR3oR8s1NW2M8FiiHMxAJ7yTx7JeF3dJ2ZtZmh90JxlU2GUu6yx7G%2B7eCwwfkMTIeCW%2FiZy3J2WVC%2FwxYypOlU7w9uSCKkgkIGXxTAqEiRJpq7iZaZkjCewJYvzSV0R2McxWSURwOKLm3VBX8E4RNGe8mVtzzWPkqZgaYeNJ7fq6UFwcvnSqJdF1UXkx35tk1RsxNM%2BPKoJgBdW9vyQaTUvzplaaY2AD4V1BoYF5Vgq3cMyhgGHfoXZ%2FuY9%2B4yFzOdH3JC%2B4lQOHe%2FjPWv8sVjgnZmNsPRdyGjL%2FgTaU011jKK9i6F87X4bWHhChNdYes1we3XHJBfDkolm8Hc%2Bfapsn78Yvq4FeXj9bWUSus9tP6Y5cAvRWSEmskb8zhIxINGQlVBQFL%2BbLRwh%2BXNmcHoae31llXyURcueqs0mz98QqBSUnlAImhE1T2F3KUBuqnh5pLfBkrOQOUMVUSCvxBN7zaBUGmbQbRTtmeZEs31d8loSXKW4%2BJR0y25lVF3MzDciP7NBjqkAQAomAAZXa6wwSFbMfb0B9pMKunIMLTMDLrak%2Bn76PHquZG%2FCfv8AG3OdKfjrUTKVQzzKQTPCzJ3M2DWdc7FrxzWR8a6Hkg%2FqM8WrImjycsOoMvYk5khFl3Ga%2FaGOuxVEzED9NvVsmQ0ktza6SZyZIOBFeU29%2FYywK0EBGJ6sO4L7K0F1tT0JqBmDiFnwGOwHRiLmaQp%2BKDFxMXdxbAH4mBOgzPD&X-Amz-Signature=326ace477dcb3daac3d0d88e0992fad1c44b630703e0ef3d0b92e58f447afd65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQWLKVMN%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF4TunHrpR9qG%2BYRtsOJnInL8Ylzp68jdZ7nukBlqNlRAiEAuSeZVxf%2FxMDTJlLLUsHzVpLvXn3Mb5B6yTEFZ5D%2FNIIq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDHvEOWa%2FVwUcsgFoUyrcA%2BsfALiO5sDqAv54avxzHX2Ox9DOqXX5zmcbhEgr0lcCSF0L%2Fr5Q7d0azbZCTo2Dllu7xjI%2BhKmuTkkGoSgrIHy1NQA2Ruaq%2BZ%2BLKH79SVRIdJ1bi5XVyfHjX3XVeWweVjSd9pX%2FFv0Qano2k8F64nJes625Ap4oo6wzJ0hWDxgRABWBvt9PDWLXZvYmu1%2FdA4S48wO%2FD1ahggZuD8vWI81v1JXSTnDaiSu5f1MNGGWvN9D%2Bo9JsMiEZac5JN8A5IdZf%2FKjR4YkT2PGsZDaUTV4uHPbyt4al2gaIcLeuQOi0vUIO%2BmC36I8XkJxFWtg6YLm0Xa5nQgZ%2BGPqp27X71XpwfNSqr0vU1FWS3E9jt9LOFGv3fMtV%2BxWUwuhFO0Epa8gK7P9exs0F7h9019pVLkrGPzOcpl8f4v4v%2FT8qXpalqy4pINWptt6VrhilwmX2sQyqc5iC9NcP8Wk%2Bf5qpJEsiMZXZ1t3BjgbDOR3i%2FwAL%2FiMdNKJPWXHZkFTdFcThiA9ZVtpU3XnPgYl4mt6mGZob%2BuNTOgXqLEBE%2FPQU0iCl1YmNYJFf7gkGmnjQP57H1eIfc335cESi2LNFbyll6lielZoQDbIE1clHS06C1z92WvHpozI4IuuQfPzdMLWI%2Fs0GOqUBzs2a6g39C9Ft8Nb9J12fc%2B7LiyQ2cJ92OHhGw5XjIR60o8sesWEie5ZZtGFViV7jFwbhON5HKIZT2WjS5yT2A2z4Z83TTjmqubx%2BpaKZ8i0Xbc%2BDpp4Q5LJiIQNWaqC%2FzO9jEUBlQHHKLePpzZHNeemkvBaLcvF76KdUfM7X68k5ChZxxhCLHyZot37IgbQHixrY5zvO9y7j9pYw2ykK5RP2aHqW&X-Amz-Signature=5ad4c8f6a5be924639a8837adddccfc7d874e0a690e113d7bd3481a54c425016&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRAEOD6P%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF5%2FEMbkb6RJzh7ZpvUZCjtYlE%2BcGgKrWnYGV6nckywVAiEAi3PmaMr0zHdpcMqc%2FTlXtTZzuNY8pBZK7qzMTCl3Fdsq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDPuIiOw%2FRPMx0GDDmCrcA0rRMHtYVVFTqztYOF1QspIzwg2PapWIyuwfPEv1ms3qD%2F473%2FBBjTplxNX8ej6ch30ScJ%2FyVKxr6%2Fou8c2JefuD9ELQe8yvDMoMNip1gJEHdyo%2Fqte7KvL8CvWiZyhwvEBIKsnYgaTzba%2FSNyVX5HB1BAI2A73aP%2FnNXg3WuPhVPZ4sksMSYwjgbAAPfkDGmfu4dJQaQ50Us59BUo6LEVBgtbjWgR7pkgVT%2F6nleiQ4yh71dSSfKtO%2Bc0r4tQyviWZ6zBJUQHkPk9LkuIQ40KC5QWHBKIMg%2F0RAuCXkEqCD3mF1kTPraJAihkRGanQLGmjsZ8bqYILOTkzEmvPlEkj4tPpIbL5RsdlFEFuWHBdjw5WZj0JsmLyctL5fyDxCf41immU3JRwoyNZCpdabbd%2Fw8ey%2B9%2BvQ5gShs4%2BFK8gYp6hDyRoJLNQfMpQm1LhJ7y4D29oB6D28%2B2CfnhNRqGeeyxn28wq2nOhY6NFgE%2BFR5MgbDIUB6NrtUHTDEjQfGq0gntc3Hztb8CDE8HvHhZigmrNPsssG8NTMp14s%2F2a%2Ff7kPZZ5xCNOTLdtCxLyokmaBThnB4z4nwBu9KXaaMRbs8Cv3Mntq9EpUeLq%2F5q2c4X2qD2wc09CA2UWnMOCI%2Fs0GOqUBSsjkAFq7Uiu2XQNA7%2FnwizUeiMXbSsERqZml4Jd4mYLQL9D7hsvGumaKnxrVL%2FNhQ3q%2F9f32T6lDchQlcAUOeZG2i7zUaZtbk1OFk2YMZtNk1P6VKz4Pf4NkFYz%2FuZJpV%2FK3DXIssBdE%2FgyV5X5Fkc2NxX3JyW308F50IIf0zTe9Wrm4BSQ4EpGCXH6MlfaZkr9ErT%2B78TUTsN9GE6VTJzaXTjJI&X-Amz-Signature=ac69fcb4de4e8c645cb028c066e434a83447a7b1ff667babf62ba19638306a74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RRAEOD6P%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101426Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIF5%2FEMbkb6RJzh7ZpvUZCjtYlE%2BcGgKrWnYGV6nckywVAiEAi3PmaMr0zHdpcMqc%2FTlXtTZzuNY8pBZK7qzMTCl3Fdsq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDPuIiOw%2FRPMx0GDDmCrcA0rRMHtYVVFTqztYOF1QspIzwg2PapWIyuwfPEv1ms3qD%2F473%2FBBjTplxNX8ej6ch30ScJ%2FyVKxr6%2Fou8c2JefuD9ELQe8yvDMoMNip1gJEHdyo%2Fqte7KvL8CvWiZyhwvEBIKsnYgaTzba%2FSNyVX5HB1BAI2A73aP%2FnNXg3WuPhVPZ4sksMSYwjgbAAPfkDGmfu4dJQaQ50Us59BUo6LEVBgtbjWgR7pkgVT%2F6nleiQ4yh71dSSfKtO%2Bc0r4tQyviWZ6zBJUQHkPk9LkuIQ40KC5QWHBKIMg%2F0RAuCXkEqCD3mF1kTPraJAihkRGanQLGmjsZ8bqYILOTkzEmvPlEkj4tPpIbL5RsdlFEFuWHBdjw5WZj0JsmLyctL5fyDxCf41immU3JRwoyNZCpdabbd%2Fw8ey%2B9%2BvQ5gShs4%2BFK8gYp6hDyRoJLNQfMpQm1LhJ7y4D29oB6D28%2B2CfnhNRqGeeyxn28wq2nOhY6NFgE%2BFR5MgbDIUB6NrtUHTDEjQfGq0gntc3Hztb8CDE8HvHhZigmrNPsssG8NTMp14s%2F2a%2Ff7kPZZ5xCNOTLdtCxLyokmaBThnB4z4nwBu9KXaaMRbs8Cv3Mntq9EpUeLq%2F5q2c4X2qD2wc09CA2UWnMOCI%2Fs0GOqUBSsjkAFq7Uiu2XQNA7%2FnwizUeiMXbSsERqZml4Jd4mYLQL9D7hsvGumaKnxrVL%2FNhQ3q%2F9f32T6lDchQlcAUOeZG2i7zUaZtbk1OFk2YMZtNk1P6VKz4Pf4NkFYz%2FuZJpV%2FK3DXIssBdE%2FgyV5X5Fkc2NxX3JyW308F50IIf0zTe9Wrm4BSQ4EpGCXH6MlfaZkr9ErT%2B78TUTsN9GE6VTJzaXTjJI&X-Amz-Signature=4e0580fe297bd9031804534279caf491d346e6f65436a91b7f23af7305de90ba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEA6UA7P%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEWna%2FTPDtPPwMBTTt%2F9VsuSJ11dSB%2FyIwo7EL0Enw0gAiAPG%2BQ3XVe0%2Fk%2BBV%2F0yM7ynzhDq%2FTOl7LM8mG4ylGtntyr%2FAwhfEAAaDDYzNzQyMzE4MzgwNSIMvRPGxgVLE0fcj9mLKtwD1DsoyoQQyEKqByiyJIlsZX8wuO1uDutRgtke7jSC%2F8mR4YOVZWtl6RMrZ1u%2FcVeCvB%2Bh1nGo%2FJyENsmg%2F3k5Kdo30urNBTjvBaYq7icWNvEYzhDoJvcHl%2B6EKtYtrBZpLVYUntTGWmOSyKUAMPEoBiv3u0VV20UWdW20X0pin5Jc3f7zWGaO7FSy1BYRn0wn9Xbox7DGyQlHWEFxicQU7axzD64Ax0rOStrcxl0IOlXfmI%2BNRTMEunlCTSxup8NCXwNv23EIfNQK%2B%2BlpH%2BWJjUY6L9kKhKjxRxyCSr1HoMtnjr%2FqW8ZdLAwE47s3qEmtsERtuw7Ae4hNrW4uUO2LrYYHt5qTjcGTi%2Bwl2XnhtKpW%2FUh8Jxei8NTz39F9m9RmNvB1sBUoxz5ym7nmzo60VhH25aRmef38V1uTlGu%2FOyP0xGPj9InOVHXiMRApn6RFiVfB0X6fG%2F%2BrqhXiMR4cWLhXcjpAYjiue914QH2RFPf3B0bksXLfiu6jFA6a%2F3Zej7ABRMA5KHkB1Jy42bLbCgIzYWXOBKr%2BVXL7Rm8Mx51MFPnnxsDFf5gmU4Kq1HSHTmlXfgyIbzDZmToBdBvw2FZfGOIT%2FZ%2FkaOpPpPpOi9QahY1yRFWyoUSvWrowqIj%2BzQY6pgEZjLEWB%2Bf0D130uiCMhK7y0nxFMekc8ccHhcAfw2NzVt0JSWH9LrbRy5nNtqdCrQDR%2FBramBo%2FCIqldNzSYTF2LzVdLz%2BovEMeys44D9azE8MQbBf%2BAkliLb29c4ycPSARnh2pO4gYMLNWdbadXiYjZrtVVAdFJJpGdtq8YtmyoeX%2BmeV4P6WlWQdpcCSo19uGOcYOjCPsiW1VWePZyYb%2FPEgWMJgs&X-Amz-Signature=c6c597bbfc7926d26a950f96f79268d17e2f4cb01038a385d6259f78898c7492&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FBZVE54%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFFCinYI5qYmGFssh1S5mOgxrWuMThhjs2AH2RxOu6p2AiEAl3NTnlbztcCN60USxtvQv1flx1guGj53jiny8Rq4Mdgq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDBUxxpdS55wxgLKLCCrcA3A3n%2BqIG7%2F3j8uO8zzjHh6pdmyqhlsu%2FWpPBjUw0%2FcLW3cYfVqf%2Fuy0HfPri9VgzngbXanxiEiJucSxtpvyp4aZx2LsLYAhZiD6Z8B2yYNOZrw22k5Z1TRoOvXNmzwr40mZ0hJJDENFVfBgZ76zGn7hOUbDFn4ZjYR4ysVHmwykReOXxObliUbjHjH%2Fe0KY8b85nWqMwUjcKjrHl4PFSC0AzVi8W5Oc77rcSfuUbMuTyRbmmeT8ZGwCgGqYUHIx0J3FsRrqEux%2BSoQDwO%2FdzIZYLqylS8vNsbv8S5dUVRaJ2CnSxbNPhx5JUCmAHKG1vnR5YtvaO%2FhDK1oIph53wraxSUhZklOKOMhYsw7hOzZB60kD2nzCucIWTzXADOPG82EcV%2B67319pigB3KLPcaiwK1lgVQo48kwik9o5etJr2a9IiQ%2F4ZcKjr%2BZoBWttQw8KfLBk1f9k9Sue3zWWeU%2Famk1WbmIXJwYIiT%2BrhAyHNWit6Z79kLKaBEHSXg6NcTDucSG3jrWFqS1DAzSr7HCRDMAg5zvgRi%2FOLz%2BehLl8DcwfDajTesQYLkMntvovt7mT0DWVXmKDhErC4lWEPDdqvp3SsNd49Pw2PZeKW1KStXzE%2BdE98awgO0TpcMKuJ%2Fs0GOqUBTUVGpBQBW5EhpT%2F%2Ffjc%2F4dZQ68OWkWIHnyX%2FCkBFq4KK05aAfYPo5zTLjWno6kQyPxtq6t4jZnYE9f2c1Al1v%2BNiOgOyM4cI6i9IaT43lXtBFpM8WFqlCcvWvW3fNnHiLxldihnV9Mj3D4VWWOyEunwadi6o3NzrIgfsw5vsSe8vdo4ABvDSEdqjzW665gHimZ9E2YYG3kRim4qXJBjTGC%2Bl97zk&X-Amz-Signature=84cd0820e15eb8990f8c6dda0e49777c72e49c51f09f32e298b1b2493a872914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664FBZVE54%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFFCinYI5qYmGFssh1S5mOgxrWuMThhjs2AH2RxOu6p2AiEAl3NTnlbztcCN60USxtvQv1flx1guGj53jiny8Rq4Mdgq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDBUxxpdS55wxgLKLCCrcA3A3n%2BqIG7%2F3j8uO8zzjHh6pdmyqhlsu%2FWpPBjUw0%2FcLW3cYfVqf%2Fuy0HfPri9VgzngbXanxiEiJucSxtpvyp4aZx2LsLYAhZiD6Z8B2yYNOZrw22k5Z1TRoOvXNmzwr40mZ0hJJDENFVfBgZ76zGn7hOUbDFn4ZjYR4ysVHmwykReOXxObliUbjHjH%2Fe0KY8b85nWqMwUjcKjrHl4PFSC0AzVi8W5Oc77rcSfuUbMuTyRbmmeT8ZGwCgGqYUHIx0J3FsRrqEux%2BSoQDwO%2FdzIZYLqylS8vNsbv8S5dUVRaJ2CnSxbNPhx5JUCmAHKG1vnR5YtvaO%2FhDK1oIph53wraxSUhZklOKOMhYsw7hOzZB60kD2nzCucIWTzXADOPG82EcV%2B67319pigB3KLPcaiwK1lgVQo48kwik9o5etJr2a9IiQ%2F4ZcKjr%2BZoBWttQw8KfLBk1f9k9Sue3zWWeU%2Famk1WbmIXJwYIiT%2BrhAyHNWit6Z79kLKaBEHSXg6NcTDucSG3jrWFqS1DAzSr7HCRDMAg5zvgRi%2FOLz%2BehLl8DcwfDajTesQYLkMntvovt7mT0DWVXmKDhErC4lWEPDdqvp3SsNd49Pw2PZeKW1KStXzE%2BdE98awgO0TpcMKuJ%2Fs0GOqUBTUVGpBQBW5EhpT%2F%2Ffjc%2F4dZQ68OWkWIHnyX%2FCkBFq4KK05aAfYPo5zTLjWno6kQyPxtq6t4jZnYE9f2c1Al1v%2BNiOgOyM4cI6i9IaT43lXtBFpM8WFqlCcvWvW3fNnHiLxldihnV9Mj3D4VWWOyEunwadi6o3NzrIgfsw5vsSe8vdo4ABvDSEdqjzW665gHimZ9E2YYG3kRim4qXJBjTGC%2Bl97zk&X-Amz-Signature=84cd0820e15eb8990f8c6dda0e49777c72e49c51f09f32e298b1b2493a872914&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QEQYTJGH%2F20260322%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260322T101428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEj3p2Sam1EPtp%2BHbZWd5DaT8Xwr7ksyHZZncQutKjpBAiEA8ChJCRgIICwDiUU54407u7oi28llLAJupq2c%2FUhfX5wq%2FwMIXxAAGgw2Mzc0MjMxODM4MDUiDEoU8s%2B1y3NxUxZB2SrcA6audXzI%2FI7QY5oRf5OQkjfMDWO8vu5asGZWfoqk1zvTnkAbU7PR6uhdBXeLvrKThgG%2BI5jDlpEa0pjkqK62%2FwT8L0xUu43HZlNmLE2yramAryDkArB4t3c14XsCXxbEuMuHqC99a5A3TE0VooYoyRUdukGizgN5ajehbj8mx%2FkodEvTLjjCCfjtELY0sFfu4PUWDYEz%2FXFTwlP%2FzH1whY2GE5Q2aVh5J7q4i5yrQmqlBCWAz2itrrX3usRZm3bP8Dt%2BpBdnQ2rMnzUM%2Fl5BdZWKtbvn1l5kCXZcX79dQMSYStxJ6r%2BLiZiJqY8FiSFboDvMaxLs5H2B3K17O8A2Ci26Oj0bM9qhXSJYEoOylMdAVK%2Bd263elJZAIsj7Fme8OkTRL5ZUw%2B0HaEDIWosymwoEpnHyUVDgCWZ2%2Fscd%2FTj2WTsyLLFhjSwkXkjVc6b0rAJncHp4y78NzXSYxSk7DHpthUK%2FB06a3yitb7Sz7GGTPdUvvY7WMc0xInpMRWzX3w2WUu5Q4cKDdiOtowZpZLemnylRsVGtvZwGTs81Q%2Bzy38J3mIw2dbh1%2F9b7prwXdeQrP8M4Gb8l%2BB1kqOYLt9BmbyHxsPBNE65s%2F9NJwXDiJBpZ1zEevdwhWlPTMISJ%2Fs0GOqUBzbHmplzVl%2FJ0zA9C7gkh3xorDfOGqMiRF%2Fot%2F5lelDYd1%2F0UvrK8ruzeYNkErpS9R2AAlRzKjCIQbUJqtXJ0rMe1j7rRLeKsejnEDRMQIbKrnILqEBC4E41GAL44VMLQB0%2BWAd9p6iyF2tuIOgZR1A20sIsVG%2FnGkdY347iVmydUY9roQYCThtwCWK9HdeK2AhMPthg%2BsSNU3P%2FxLL4fi6ieo75h&X-Amz-Signature=8d593d5520efb9a46bed07ca1aaf9ec824d6326a054c953448f9f89331e5ef4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

