---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5D7D6VP%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAmEjGXKbHUgwzSj4LWE6SxfsU%2FWK8NWpXDcxXuAVURAAiEAsvVQ8GS%2FiF3v3K3ZZcWG3TuxJIDhQ0wcre%2BP3zdyvo8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDIf3ZHF4mRGqKW5ciCrcA3q10ZwJuYGSog2ZSJTACB320C%2BEZg7vHhwNG3%2BvsbzE3TRpYQrefio8pKB3ZyWDD%2BS7x2D8g9JghJPMtpjhvJTryMcmsJV9%2BhkrrsVlRHh3y6GoQybcXvy2DLePt4DC3eXwPgwaE20Wex1yrpigDNTXLTEUhRZUgJ9EEs%2Bv0s8VzeOv6t8AzS8NfctzDF8NaYPwN2biljuAzmmotaLOtgEngwRouIaFIUREcEtEWu9JF%2BzBdcyl1Pmt%2BWbah5wEs8zjD0HF4ZWQ0XXziZfuhquqFooyUPXtXyIYaaLonHAVUuqgSLl3RtUdEAbirOacO5ZV%2BaPaUM1ze3lOG%2FaZKSypPS2Zy02rP%2BWQf9hyqUH2DzfE2Oi8b5HE2RR%2BWMvghqwogLs9fj4kLUZVXUAxkQ8uP0n7sGIbxujgBGxJ60uKhHhOUWhHFMegM5rJXPY4jZXNNaGK29uodSKMV1lArx3dR5Ne8GC5aEW%2FkJO7Rpcb8car4bDBf8QIbt0UHf0MzLYaSXalLInV6i3W79i46C9dQ3qq5TTZ7A2pfzlDOyYgo7OuSeelc3hMSVcrrYrKasA%2B8yclfu8t9SHhSX8LZ0FLsE7sEWMdRxFcas4FydQ%2B3kkR44N7onhmV7kQMIqswskGOqUBt3E2kbPrR6Qli1zc8vk68LHbsYnX4hFCQ3ATTeBmYyfnYlG5zcrioPrd4YhndsasS6YYHI2daBi1rNXQ1L5xmVDmEXpwf6n88o5ObHZm3IpbQq2CxxNEOo8iJc4dls%2FbRCjdgDsJvHpUIfRLHDfEeJGDSEGyx9R9Bn0Bbd1Uithc%2Fg2a4zesvt%2BdLz9TB4Q1SHjWnrpg7uR6gFES4W21XPa%2B2sAU&X-Amz-Signature=dd2e69f3ea1141766862313ed935f45e269683d60cd0be588b189da35affb1b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z5D7D6VP%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200033Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAmEjGXKbHUgwzSj4LWE6SxfsU%2FWK8NWpXDcxXuAVURAAiEAsvVQ8GS%2FiF3v3K3ZZcWG3TuxJIDhQ0wcre%2BP3zdyvo8q%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDIf3ZHF4mRGqKW5ciCrcA3q10ZwJuYGSog2ZSJTACB320C%2BEZg7vHhwNG3%2BvsbzE3TRpYQrefio8pKB3ZyWDD%2BS7x2D8g9JghJPMtpjhvJTryMcmsJV9%2BhkrrsVlRHh3y6GoQybcXvy2DLePt4DC3eXwPgwaE20Wex1yrpigDNTXLTEUhRZUgJ9EEs%2Bv0s8VzeOv6t8AzS8NfctzDF8NaYPwN2biljuAzmmotaLOtgEngwRouIaFIUREcEtEWu9JF%2BzBdcyl1Pmt%2BWbah5wEs8zjD0HF4ZWQ0XXziZfuhquqFooyUPXtXyIYaaLonHAVUuqgSLl3RtUdEAbirOacO5ZV%2BaPaUM1ze3lOG%2FaZKSypPS2Zy02rP%2BWQf9hyqUH2DzfE2Oi8b5HE2RR%2BWMvghqwogLs9fj4kLUZVXUAxkQ8uP0n7sGIbxujgBGxJ60uKhHhOUWhHFMegM5rJXPY4jZXNNaGK29uodSKMV1lArx3dR5Ne8GC5aEW%2FkJO7Rpcb8car4bDBf8QIbt0UHf0MzLYaSXalLInV6i3W79i46C9dQ3qq5TTZ7A2pfzlDOyYgo7OuSeelc3hMSVcrrYrKasA%2B8yclfu8t9SHhSX8LZ0FLsE7sEWMdRxFcas4FydQ%2B3kkR44N7onhmV7kQMIqswskGOqUBt3E2kbPrR6Qli1zc8vk68LHbsYnX4hFCQ3ATTeBmYyfnYlG5zcrioPrd4YhndsasS6YYHI2daBi1rNXQ1L5xmVDmEXpwf6n88o5ObHZm3IpbQq2CxxNEOo8iJc4dls%2FbRCjdgDsJvHpUIfRLHDfEeJGDSEGyx9R9Bn0Bbd1Uithc%2Fg2a4zesvt%2BdLz9TB4Q1SHjWnrpg7uR6gFES4W21XPa%2B2sAU&X-Amz-Signature=dd2e69f3ea1141766862313ed935f45e269683d60cd0be588b189da35affb1b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UVSQQHZ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDMSWyEI2dtY%2B7pOO4IHRzZ52eh1YeLaItXUK8ZTXxHSgIhAP%2FpGwtyIxwTvX%2FrGd5auYdj22lB9MJSzlDd3kDHK04SKv8DCDUQABoMNjM3NDIzMTgzODA1IgwR6%2B1CXOQDATmOfD8q3ANSn3W1dfYG%2Bb65YeOmjwMK5suS%2FiFBMgvOgnsnj0bkiJINFnlGTpbogwz8mzybEQMyxwkNTgIx%2BCVhLXlbpheYojAJEmKTlwHlfciwWK3q9JnLEvhkBCABqaXx2PBxBvI8TR2%2FzQSKPWtx2K%2FdEtP8wHI6tHormjLQ5uz8H9FV%2BXQT3FXPUuN5W1rOntY8l2cluGHzJ5aNjhhj4vsoricb0tvzngcSZHM5AATeMPjfAQzH%2BuZ9qTorgksVlpXEj3aqg4iurGUJQLjF22tQxxHb3lrpaFDy%2BnKUtUqThonhzvZ1iCe%2FtyRRtb3DCd9y8Vf%2FGAiF0X17Hp2BWEl6A0fZuujc9neRGlxD5bDAs6I7qj9vTGmgofGF%2FFc%2BcqnPUyHjAGdtkMRWhDdzGpN%2BYiUuGEpE%2FFefjV3xlhJYe17G5uK%2Fr0cWYlbHK0W3V1kdq4JIVjWzd4MYnqsv1lIDuhhJPwNh4LPIYu83Ci%2FTlLpNHZORFE8Q50ca6fDj33SqQhmkUUL69VgqVqHIPmDh5JXCUDjnOdAlwUjs%2FQV%2BZnefsSjReoteN2I0RfBJHAhwOSF8LBrTC5sE5OVkmj4uXY99l7Q%2BD0mqQdzXshvVu7TUTa47MN7DdiQhIo56ZTCgrMLJBjqkAeuOTBhBrI%2Fdm0jx5JrEV49lCECMZtg1nFMegxrmTB9EJFrhvObJvEpcn8BBcvm14VVat5vBE%2BDT2RwyOpxlAbOwbhiAXZQ0Oopf8fmCzd%2Fcj%2FjFxQa8nHSWDLRYYqo6B5y%2FFeVXLoZ9G%2Bk72xNwu5h1pfbM0lb9sWI1mq689denZCjReHIKKxxcAxs8FALkoD%2BV01BSKvqGK8T%2FpBFWKbZHkcYy&X-Amz-Signature=ab45c7155ff6856949fe440a7349c5d1814718f610ba8cd4081ed00d2200e99b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UVSQQHZ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200034Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJIMEYCIQDMSWyEI2dtY%2B7pOO4IHRzZ52eh1YeLaItXUK8ZTXxHSgIhAP%2FpGwtyIxwTvX%2FrGd5auYdj22lB9MJSzlDd3kDHK04SKv8DCDUQABoMNjM3NDIzMTgzODA1IgwR6%2B1CXOQDATmOfD8q3ANSn3W1dfYG%2Bb65YeOmjwMK5suS%2FiFBMgvOgnsnj0bkiJINFnlGTpbogwz8mzybEQMyxwkNTgIx%2BCVhLXlbpheYojAJEmKTlwHlfciwWK3q9JnLEvhkBCABqaXx2PBxBvI8TR2%2FzQSKPWtx2K%2FdEtP8wHI6tHormjLQ5uz8H9FV%2BXQT3FXPUuN5W1rOntY8l2cluGHzJ5aNjhhj4vsoricb0tvzngcSZHM5AATeMPjfAQzH%2BuZ9qTorgksVlpXEj3aqg4iurGUJQLjF22tQxxHb3lrpaFDy%2BnKUtUqThonhzvZ1iCe%2FtyRRtb3DCd9y8Vf%2FGAiF0X17Hp2BWEl6A0fZuujc9neRGlxD5bDAs6I7qj9vTGmgofGF%2FFc%2BcqnPUyHjAGdtkMRWhDdzGpN%2BYiUuGEpE%2FFefjV3xlhJYe17G5uK%2Fr0cWYlbHK0W3V1kdq4JIVjWzd4MYnqsv1lIDuhhJPwNh4LPIYu83Ci%2FTlLpNHZORFE8Q50ca6fDj33SqQhmkUUL69VgqVqHIPmDh5JXCUDjnOdAlwUjs%2FQV%2BZnefsSjReoteN2I0RfBJHAhwOSF8LBrTC5sE5OVkmj4uXY99l7Q%2BD0mqQdzXshvVu7TUTa47MN7DdiQhIo56ZTCgrMLJBjqkAeuOTBhBrI%2Fdm0jx5JrEV49lCECMZtg1nFMegxrmTB9EJFrhvObJvEpcn8BBcvm14VVat5vBE%2BDT2RwyOpxlAbOwbhiAXZQ0Oopf8fmCzd%2Fcj%2FjFxQa8nHSWDLRYYqo6B5y%2FFeVXLoZ9G%2Bk72xNwu5h1pfbM0lb9sWI1mq689denZCjReHIKKxxcAxs8FALkoD%2BV01BSKvqGK8T%2FpBFWKbZHkcYy&X-Amz-Signature=ab45c7155ff6856949fe440a7349c5d1814718f610ba8cd4081ed00d2200e99b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YKFI6WT4%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200032Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAiIEjdus6Rm1cZZK2P3LIYfW9RS2kVv0BAaxCdDSNn3AiEAq%2BTpLcGYrxKeDCyapMnPTvGCoSd9ZOZXv%2F5HCtWG4eoq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDOxvQ2Z2df83xJ6uMCrcA3TylbdK16jE7tzxozCXhECXXO%2BkRNFHdU%2Ffud3li6f4yAUrMheq3fgP4ACwB8SwVzz0C6wNn4wR9B0QQmZbtYNdQ%2FV5Uptz14YUYXOFwJvWufliSRXsUBEHtFxYMb2JR%2FslrVju0ZXrrAkELDJR7dyUtwhVK3D5Wo6yy5dYyOyB1U7MF6edi5aRh5SPAdYO11CSbmCyq9aXlVCP9oANScwnkRqDlGjos0UpOiMz5GaI7EP0ILtvgWHzjRKzwCvSrIf49k9fJhiQJ7vC4mwrvTlnhswkska3i94CJEWeUFnGe%2F0o22fHutwW6VOULHcw3q86Vs4IMvURyrW%2FVxXunSJsRuI7gcRxNL7ruVv1hmXYQe9DFNPZ8lWQx7zcN0hXMPB2Z%2FGxfG9M%2BeXid0pIj3L4dJj6oRKifaghcS4all8YywO4nDhgdX3TeEimN2OI3oNWtplDMU%2B5CQIXOH7P2rsUygS%2FsIAPEWiRMpOe1ELKk4diy3dxYTqUg5hwWLzUSZIocmdAW8eBwNJ5V6zPiGRU6r%2BwMi6ykxpgqzNic6oc1bANwcATwkJvzYuBBkCU3e7RevBz7YJOp7uKRPRcHXalweVfFSb1vDsgMjiy0jBfOBQ2Q4J8K7DE2%2BVJMJ6swskGOqUByobSrgzDEmkazYUByEn%2F6JOIs0zdcEEtXk515dEmzFu8SeLXIXbR6rflOLO6vry8e0DsQEFdNTnM8EV4dmydrB8snetK9M66wtEJKPbFUN%2BIBLcLhfgukPgjFJrezbnOJdRt8v6hSh2ZxcX0FDynuyI4nDXeaLbC1Ql8%2BXYaYcVLGYWgJI%2BHNDUV8cV2CMF7%2FGs0v9BbcvdQokd9CEIX0QPJF9AI&X-Amz-Signature=311a15cd86a7ca1f08d42977553d95de3ecb323869cfc8e0f094024019e5c092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633CQXT2M%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAPYX2ZSAjnavfCWSrfhpYfgT6iwzvdlQodZc6I6r4qaAiEAnfesVOSEuXhyX3LZqKU0IKD4x2oYwT2tgpwYeIV3ZZEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDEP1IRUYzrYIWgnQXircA8t5ZiqlOGpWGGHroFDWS6%2BWqjtylf0cVVMhmPM2jMeDBleTKCpkqGGFSCZAk7MPt%2Bq9heUWXqu0rxGKkjH%2BzM4kLlkK30NTKVLNQrtnI8HJgVgUNZyepkHS2ju1Er6V7xzcFLjQiPmTcGehl36hNHcOIPafJxo6nlCakUmOQdJdbheFHB1KDGqyh6gtX6kWmFsSoyXfiXJSIgf%2BhKIcryGlvI6URmMAfPL8ScppdrDOVSoZUXIxr8WvyePcBfPIkWnZU2%2FkE0G6ovmBLpPy%2Fh6jG5cLIPOrVO5stZyF4%2FBRvGWKDFiP%2F4G9WIADqY%2B6GHbPX938V%2F%2BhEHyX3AVIgpUQR65TcFU8%2F6qoYRGqPNAYYfBNv3j%2BA8%2BIKeAOal7bpBcY2rgPC80ys1xhKqUY8M941be9i%2BEIGip%2FQ5Y3yQnfThVIsSabcvl7z6%2FZJ1s8CBlBJECcGD6Ad2%2B3kY8SA4cwk6lBxkf7JRlNKIr3Oy0abrxbJlykP5kQn2DUOUfeRiZaM3wcw66jQWRbKFbJCU3bdD9qeNWmqUx7Jfenf9ioeZYps8ITRwAq6Bx%2FXEkjiaPQZO276jHkBLV0Vx8sLhi4oOzINtErQKNz%2BueYy5YVYKcxRBBXW%2BcawDwCMJuswskGOqUBz%2FnP9tK3UmHyq3hmpXKQfB2YEwgkUGGXWnvaJhoGWhpZ0bcIPrSwlQ8CngcuUBIs5LQ1eubpPxg4jeNlzxG435KchW4v%2BqncgzZwHt4unfeD%2Fv5w9y1DCD8vCI3qRpNP8Qwmkbs74AF87pqAVyGbOVXINrDhmpzS%2F%2Bo3LD7jBxBTCp2qs9vKb7HwrTNcMgqEjP%2B2JahkXE1hFaCuFC0iBlqHYHxJ&X-Amz-Signature=7987d3027c044a0c8882e3e749a98abe4db098bcb29a48313ebff8f98a24600f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633CQXT2M%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T200038Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGwaCXVzLXdlc3QtMiJHMEUCIAPYX2ZSAjnavfCWSrfhpYfgT6iwzvdlQodZc6I6r4qaAiEAnfesVOSEuXhyX3LZqKU0IKD4x2oYwT2tgpwYeIV3ZZEq%2FwMINRAAGgw2Mzc0MjMxODM4MDUiDEP1IRUYzrYIWgnQXircA8t5ZiqlOGpWGGHroFDWS6%2BWqjtylf0cVVMhmPM2jMeDBleTKCpkqGGFSCZAk7MPt%2Bq9heUWXqu0rxGKkjH%2BzM4kLlkK30NTKVLNQrtnI8HJgVgUNZyepkHS2ju1Er6V7xzcFLjQiPmTcGehl36hNHcOIPafJxo6nlCakUmOQdJdbheFHB1KDGqyh6gtX6kWmFsSoyXfiXJSIgf%2BhKIcryGlvI6URmMAfPL8ScppdrDOVSoZUXIxr8WvyePcBfPIkWnZU2%2FkE0G6ovmBLpPy%2Fh6jG5cLIPOrVO5stZyF4%2FBRvGWKDFiP%2F4G9WIADqY%2B6GHbPX938V%2F%2BhEHyX3AVIgpUQR65TcFU8%2F6qoYRGqPNAYYfBNv3j%2BA8%2BIKeAOal7bpBcY2rgPC80ys1xhKqUY8M941be9i%2BEIGip%2FQ5Y3yQnfThVIsSabcvl7z6%2FZJ1s8CBlBJECcGD6Ad2%2B3kY8SA4cwk6lBxkf7JRlNKIr3Oy0abrxbJlykP5kQn2DUOUfeRiZaM3wcw66jQWRbKFbJCU3bdD9qeNWmqUx7Jfenf9ioeZYps8ITRwAq6Bx%2FXEkjiaPQZO276jHkBLV0Vx8sLhi4oOzINtErQKNz%2BueYy5YVYKcxRBBXW%2BcawDwCMJuswskGOqUBz%2FnP9tK3UmHyq3hmpXKQfB2YEwgkUGGXWnvaJhoGWhpZ0bcIPrSwlQ8CngcuUBIs5LQ1eubpPxg4jeNlzxG435KchW4v%2BqncgzZwHt4unfeD%2Fv5w9y1DCD8vCI3qRpNP8Qwmkbs74AF87pqAVyGbOVXINrDhmpzS%2F%2Bo3LD7jBxBTCp2qs9vKb7HwrTNcMgqEjP%2B2JahkXE1hFaCuFC0iBlqHYHxJ&X-Amz-Signature=7987d3027c044a0c8882e3e749a98abe4db098bcb29a48313ebff8f98a24600f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

