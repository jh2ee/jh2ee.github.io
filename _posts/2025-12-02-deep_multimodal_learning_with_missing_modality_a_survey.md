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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B762ODR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCheKq%2BvEvyi6NSqwYlGvl58rU5En%2BQRApPRlZbm3FNEgIgQlopMrzJYJu5GXARTV3svolJrJfITokXP3KVWoFhS%2F8q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBgsMwKEtV1AWtsU7yrcA7GOyza6VG1WmMURmRxTj5edPhlY%2BflpGhIdS0eo8BOHU%2FnImrJ1gcCll7XDTf9l36fJscGQyRvsQOA4B%2FwImf8D6iXnrBPPVE7qETGZjD7HlZ9TtLAA0KQEZyNTHxSMK7xFD74T7M8d3CsSg0ydgRQa5iQ3r9xENt4%2BrHKfBg5zcSZ1zgBjIsygafCdlcZ%2FVcL2eUTqxUQJX2eP2ctR5ErLI7kOxtkjPJJpVUaS4mBBBRseIpvAn9IjFxuWa3CaHg0VdsuL7IyiWXBwnrHylT%2FMoofo05rgXNrPtntDWNwcrwzmts3XN2BNzSaW5kLAarxCdDpKDVbK5gCQwKxFQ2uwHWidXi%2BZZZgILO1HRHUZn8uzYNmZ4qnJ4%2FU5BpcPdaT%2FT7KXhFUoa1%2B6KYO98zYrYAUGnJKHw527ykoLlt3Kk5SA%2B%2FWef08GtDNtvs8UfXMvE49E7on1tYWQkQ5VO9z5pha58ftJVYbSjqhX%2FyLmMyTM9cP2M8XTuqNsfyAN7ctvwmUTZQujfffCSqgs161L6l1%2FODX2QbrbxKfz8g7a%2B6pSe9%2FSkiTb7LoHo1QuNuaOIcdvEYnJZBYV%2FiODbr1t0aETZChIwEuCPfE8Fxuq%2BXXJf08yYeJ0p4RgMJGnv8kGOqUBbSC%2B%2B5zEFIixLBwp7Fpm3uXaH58i6Mw8MBn7EVYMEumdXiZcF4PVFeFASMkm1J1Fkm7%2BXgcnTJnYN36JoFOgHk0gqUHST5m%2BOoN0sf7NXFH76KQmFr7yqB2MYUDjynct%2FUeysePh4KD6saJVkOoTj1akEM6mNtIrV5c2tNSbukHMMw441wYev97rPq6%2B0IqbitM%2FUrLfNSsJBQks04YszoX9K1qD&X-Amz-Signature=f3ad5059875675924292c0285d704605457d66737aecfc26fea7bf79972eedcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B762ODR%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQCheKq%2BvEvyi6NSqwYlGvl58rU5En%2BQRApPRlZbm3FNEgIgQlopMrzJYJu5GXARTV3svolJrJfITokXP3KVWoFhS%2F8q%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDBgsMwKEtV1AWtsU7yrcA7GOyza6VG1WmMURmRxTj5edPhlY%2BflpGhIdS0eo8BOHU%2FnImrJ1gcCll7XDTf9l36fJscGQyRvsQOA4B%2FwImf8D6iXnrBPPVE7qETGZjD7HlZ9TtLAA0KQEZyNTHxSMK7xFD74T7M8d3CsSg0ydgRQa5iQ3r9xENt4%2BrHKfBg5zcSZ1zgBjIsygafCdlcZ%2FVcL2eUTqxUQJX2eP2ctR5ErLI7kOxtkjPJJpVUaS4mBBBRseIpvAn9IjFxuWa3CaHg0VdsuL7IyiWXBwnrHylT%2FMoofo05rgXNrPtntDWNwcrwzmts3XN2BNzSaW5kLAarxCdDpKDVbK5gCQwKxFQ2uwHWidXi%2BZZZgILO1HRHUZn8uzYNmZ4qnJ4%2FU5BpcPdaT%2FT7KXhFUoa1%2B6KYO98zYrYAUGnJKHw527ykoLlt3Kk5SA%2B%2FWef08GtDNtvs8UfXMvE49E7on1tYWQkQ5VO9z5pha58ftJVYbSjqhX%2FyLmMyTM9cP2M8XTuqNsfyAN7ctvwmUTZQujfffCSqgs161L6l1%2FODX2QbrbxKfz8g7a%2B6pSe9%2FSkiTb7LoHo1QuNuaOIcdvEYnJZBYV%2FiODbr1t0aETZChIwEuCPfE8Fxuq%2BXXJf08yYeJ0p4RgMJGnv8kGOqUBbSC%2B%2B5zEFIixLBwp7Fpm3uXaH58i6Mw8MBn7EVYMEumdXiZcF4PVFeFASMkm1J1Fkm7%2BXgcnTJnYN36JoFOgHk0gqUHST5m%2BOoN0sf7NXFH76KQmFr7yqB2MYUDjynct%2FUeysePh4KD6saJVkOoTj1akEM6mNtIrV5c2tNSbukHMMw441wYev97rPq6%2B0IqbitM%2FUrLfNSsJBQks04YszoX9K1qD&X-Amz-Signature=f3ad5059875675924292c0285d704605457d66737aecfc26fea7bf79972eedcd&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SQ4Z2YS%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQC1pLkeKcZi230vpLgZvLLb3fZ7rZi%2FkTmXRCT2h6jvtgIgZa%2F565rHaSul%2FK8IeMcENUSNKGD1EoMZlXDD9YIjZYoq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDHJIrJpQh3hFQg8qISrcA4id7xPtl4GBRzHv%2F1Vtj2XKPS8iA34%2BWgjbkgzZzM6%2FDDKnChuY%2FjzniCubN3CC3GNbKj4SOZqVgxWpvTgOxIFBwR8irHyAPGiwaNTbEGrFOWSPZj0kHKv1Z2OdVG32Os81ZnnsPoA3jxJinVQiBYW4tl9qkYj1tnu7pfWIFGJiHrfdO3JNhLhMtSgSXg7%2FRyhj1A9RtnSCyYDTzOdTXFf7Ow3eqRbGqPGJJZJI18MmeauCPnSFOzQIeMG5OSFHKvvb8b1HLT2nu4TvOjIBET1dPhaJVpyXwI%2Fv8kwifaqdmLaEzen%2BMH1tCWCs5eXxA88Odb7Ofzs%2B5tXLWBXPSjrJgQ0zK%2FiuYb%2BSfNTVg%2FGom6%2FclABtGJkkCFgkynsZf5DMrU5gILoFhHfCX05sd%2F5oaNwehPwd8FDtiGzE9fePcJejWj%2F560TdMb56321SzojpY5M%2BbwG%2FiAWQFgRLbqUFJYHEpulQgGQS7KeAmxJp%2BR0GrOZVdkcgPIZtSHMm4w7GOIn9ixwlm0feTsqyFkqY%2BI8bu3Na%2FgfL7VMQ4PTgHyltf0neS30YH3WtSOzCbw9BYpz66fYMC3AIYEA2paWR8BQ%2B8hatJ5%2FPXxpcK11myUnzTwNfr%2F64UPY0MJCmv8kGOqUBXJddpAwRVkFKxPsOTUK32vAo74lTQVGJgDHStfVJ7PFCWo4tuhPeSSgMGsIXdTLx1nXvUMZ7WJNH7klANP%2FXMrJJvnbjDKCuIvFqNRhYQHjtqFDtT3hqmandgAQB21dSypeRr5D7tiMpOXEHP0ti%2BWv32qwVd0eIZSYty4%2Buski%2FZfLAPzeLKNLA2qNn4BG9o3UmUKmx3kF%2BJaH7G55lgj5MeBNe&X-Amz-Signature=551739bfd00dbb8bfd33f68326a125b4f170eab3227cc7921ab7731f40ed74d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664SQ4Z2YS%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061430Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCIQC1pLkeKcZi230vpLgZvLLb3fZ7rZi%2FkTmXRCT2h6jvtgIgZa%2F565rHaSul%2FK8IeMcENUSNKGD1EoMZlXDD9YIjZYoq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDHJIrJpQh3hFQg8qISrcA4id7xPtl4GBRzHv%2F1Vtj2XKPS8iA34%2BWgjbkgzZzM6%2FDDKnChuY%2FjzniCubN3CC3GNbKj4SOZqVgxWpvTgOxIFBwR8irHyAPGiwaNTbEGrFOWSPZj0kHKv1Z2OdVG32Os81ZnnsPoA3jxJinVQiBYW4tl9qkYj1tnu7pfWIFGJiHrfdO3JNhLhMtSgSXg7%2FRyhj1A9RtnSCyYDTzOdTXFf7Ow3eqRbGqPGJJZJI18MmeauCPnSFOzQIeMG5OSFHKvvb8b1HLT2nu4TvOjIBET1dPhaJVpyXwI%2Fv8kwifaqdmLaEzen%2BMH1tCWCs5eXxA88Odb7Ofzs%2B5tXLWBXPSjrJgQ0zK%2FiuYb%2BSfNTVg%2FGom6%2FclABtGJkkCFgkynsZf5DMrU5gILoFhHfCX05sd%2F5oaNwehPwd8FDtiGzE9fePcJejWj%2F560TdMb56321SzojpY5M%2BbwG%2FiAWQFgRLbqUFJYHEpulQgGQS7KeAmxJp%2BR0GrOZVdkcgPIZtSHMm4w7GOIn9ixwlm0feTsqyFkqY%2BI8bu3Na%2FgfL7VMQ4PTgHyltf0neS30YH3WtSOzCbw9BYpz66fYMC3AIYEA2paWR8BQ%2B8hatJ5%2FPXxpcK11myUnzTwNfr%2F64UPY0MJCmv8kGOqUBXJddpAwRVkFKxPsOTUK32vAo74lTQVGJgDHStfVJ7PFCWo4tuhPeSSgMGsIXdTLx1nXvUMZ7WJNH7klANP%2FXMrJJvnbjDKCuIvFqNRhYQHjtqFDtT3hqmandgAQB21dSypeRr5D7tiMpOXEHP0ti%2BWv32qwVd0eIZSYty4%2Buski%2FZfLAPzeLKNLA2qNn4BG9o3UmUKmx3kF%2BJaH7G55lgj5MeBNe&X-Amz-Signature=551739bfd00dbb8bfd33f68326a125b4f170eab3227cc7921ab7731f40ed74d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XC33B74H%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061429Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJHMEUCICbE%2FkGVxnRsSzh%2BA%2FcB6XT2zWRqfjiW6j7DINAo3DLRAiEAyODe0%2FZS6X8eLqJ4iD%2FPTEpuMNvj4HzaC12R5cobDnsq%2FwMIJxAAGgw2Mzc0MjMxODM4MDUiDNhOdVrhXDZDzfic1ircA8AyV7kOLOf2bgAcf3DKZg4fucEL6ZXtBdBAlPxKoVhKHXAj8fSC1jVktFuY9s8O%2Bq8Y%2FgWCSaUm4vjr%2BkeNpeQeEW00JacE0V8mId%2BY0LU7%2F%2ByqBflb5VphVQ25aLF3pM9w8jrcmdlbv0lEg1xolJXysg2CTyJMsrXYfzPOTN8WgmIoco1YoUwfVRkxQdGIKf3tflwHA99gfY8mKFfZn%2FulJg%2FKRJyuF8p3EfgIYxF4pAiqPqfTc%2F29Uj%2Fy7CQ5ngjYVp17DSS%2Blr6WXyT3GzrRiTgn5WV5PlotTSqBmIm9KvF8pqCtZPLOxj9AHFUjRGCzCVkvEUqrnI%2F9ZH6mlVGKyRsDRO0joiaPvYxmriNckjz%2FpXQ4GYwJscNvjvg1vP%2FbU5qwcaUUeWXVzZGbxnAIHOrKtWxt38CgPvULjeylW8QroD7wRZcZvkodYEHP7JviLUsrQtofosD%2F4hN7TVLKl3nhWCeopmkxLKPuy5xh6Wct8BcvUSd7agdVitVp0TfAsLFzEzOYlkpg6BDNadPdN8DlCrYAhD6rGXHqoKjOuJdKhkTFYp5JqmBk9SVY2FKuiACYfKIOesWNwcMVFdtrCir7Bw11PXuuxx1OvY7O0%2BYuOyUrsUm0Sv1iMOSov8kGOqUBMqHoajEo1tMFxgU2aCrMWRDLN2%2BoevXPUNHbJvieSNBsAEIfJfb8j8piNhvWdHjv8D%2BLPsOItBiy2dizwUgFlxkiS63WXk8PkAWNPBZafS%2FWcSVibinKgHETopgKknvsSFC2zVPosabnCpLdbV1Ls7BZPAg1Ogw7nZe%2BLUPE5ZCX1Yu%2BYnOaFYsmafZQJ8y%2FPwSrK5PoHOox2LGB4KYWOaVZWoZm&X-Amz-Signature=acdf2bc4827a35e56526fc9a49cc54fabc478a57a123635e21eccbb3beaac44b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYNQT5F5%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCEvxqk3XMygx6hxiMbhPp7E4iT64uJn7lwbNI6rZBOwAIhAN7%2B8nVdqwbmpiH%2FmhhXEuElncWY4fsx%2FUQQBt%2Bxc4yIKv8DCCcQABoMNjM3NDIzMTgzODA1IgwpZwqSnrid0i6LXhYq3AODGB%2F6dggtfx7UiZvF5dkbalZ3yxvcHyssxPAnpOnQD%2BtkFtnGLc1xRftjJpyaLIMTHKVm1fg71NSh9J3jQnk90y%2FSt0Yj0GkUEw5zNX150r8GqCuG1ahtRVfCb2sJzkpVcO0Lmsnw4s%2FHUIhXuUmUaVCX6TxQ%2BrkXyKHskr3Wb7LHggUYuBdVC%2BdwiUd9tEvdDRIVrQjLJXtbS3XhI6wXvwXWhUpnHZMXOklwBzaVzl5o%2B%2BEJm1FHjmrwWFrONnR4yzEuHjmgTJHRK1ZbwWuspejnMVypQOFF09wuDnNVYAoH7oQNSpb31udAUuKKgYwyXJvWYFMkI4SFAaiyOkRqISR4ygI9GDNsjRDlWvtOtUuuhNWJ6pv0D8wTN8j1NmKmsRqwUDDFoszq30hT8YnQ1gWePlQUWkZVZ4f1XKtZdsce3Abowb0r3cZ1lS9onE8YSJ9k9SiiyBCXlI%2BqDE6a4VX8ES9jAhhlGx3Kh0qxApux7sRhDUDM7Q8CCGILBS2lnp42j7D4V5W4kPERYa0DrgkdSwUO2cVZg6id4P7Ddx5z42j%2F2cEq72ywT3RuUT0d42Elzs2AuXbfoLjVrGZ9BPiyyXlVKNT58KodZdnoRh%2Fd2MO1Q9E%2BkxGn9zDhpb%2FJBjqkAauaA9DtvJyNTc0z%2BuEpLQoXzqz7vuwCF2tquqnUZiYt55vSodkC%2Fzcj3jQFC8%2BPGozt44IwswrS%2BdaybIE%2BnRQY%2BUck%2BGeIjcixUpNvPodDc1CFNMfYuXjbzRANC%2Frh5nesLRiTA1cZre85dlD5e%2BMLJ%2BD2fDwOddxerZuoSjq2RDHmdZyQWvEL0tm3YjgVTXajnhgtC3ombzkFBdYqgIPuT%2Fg2&X-Amz-Signature=9be9c40c30dcbe4276f8dea3a393b9e9a2afc2b647db1bf034666a6d585019a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYNQT5F5%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T061435Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF4aCXVzLXdlc3QtMiJIMEYCIQCEvxqk3XMygx6hxiMbhPp7E4iT64uJn7lwbNI6rZBOwAIhAN7%2B8nVdqwbmpiH%2FmhhXEuElncWY4fsx%2FUQQBt%2Bxc4yIKv8DCCcQABoMNjM3NDIzMTgzODA1IgwpZwqSnrid0i6LXhYq3AODGB%2F6dggtfx7UiZvF5dkbalZ3yxvcHyssxPAnpOnQD%2BtkFtnGLc1xRftjJpyaLIMTHKVm1fg71NSh9J3jQnk90y%2FSt0Yj0GkUEw5zNX150r8GqCuG1ahtRVfCb2sJzkpVcO0Lmsnw4s%2FHUIhXuUmUaVCX6TxQ%2BrkXyKHskr3Wb7LHggUYuBdVC%2BdwiUd9tEvdDRIVrQjLJXtbS3XhI6wXvwXWhUpnHZMXOklwBzaVzl5o%2B%2BEJm1FHjmrwWFrONnR4yzEuHjmgTJHRK1ZbwWuspejnMVypQOFF09wuDnNVYAoH7oQNSpb31udAUuKKgYwyXJvWYFMkI4SFAaiyOkRqISR4ygI9GDNsjRDlWvtOtUuuhNWJ6pv0D8wTN8j1NmKmsRqwUDDFoszq30hT8YnQ1gWePlQUWkZVZ4f1XKtZdsce3Abowb0r3cZ1lS9onE8YSJ9k9SiiyBCXlI%2BqDE6a4VX8ES9jAhhlGx3Kh0qxApux7sRhDUDM7Q8CCGILBS2lnp42j7D4V5W4kPERYa0DrgkdSwUO2cVZg6id4P7Ddx5z42j%2F2cEq72ywT3RuUT0d42Elzs2AuXbfoLjVrGZ9BPiyyXlVKNT58KodZdnoRh%2Fd2MO1Q9E%2BkxGn9zDhpb%2FJBjqkAauaA9DtvJyNTc0z%2BuEpLQoXzqz7vuwCF2tquqnUZiYt55vSodkC%2Fzcj3jQFC8%2BPGozt44IwswrS%2BdaybIE%2BnRQY%2BUck%2BGeIjcixUpNvPodDc1CFNMfYuXjbzRANC%2Frh5nesLRiTA1cZre85dlD5e%2BMLJ%2BD2fDwOddxerZuoSjq2RDHmdZyQWvEL0tm3YjgVTXajnhgtC3ombzkFBdYqgIPuT%2Fg2&X-Amz-Signature=9be9c40c30dcbe4276f8dea3a393b9e9a2afc2b647db1bf034666a6d585019a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

